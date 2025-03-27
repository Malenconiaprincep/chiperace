import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import { koaBody } from 'koa-body';
import { PrismaClient } from '.prisma/client';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import fs from 'fs';
import ChatBot from 'dingtalk-robot-sender';

const app = new Koa();
const router = new Router();
const prisma = new PrismaClient();

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 中间件配置
app.use(cors());
app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir,
    keepExtensions: true,
    maxFileSize: 200 * 1024 * 1024, // 5MB
  },
  jsonLimit: '50mb',    // JSON 请求体大小限制
  formLimit: '50mb',    // 表单请求体大小限制
  textLimit: '50mb',    // 文本请求体大小限制
}));

// 静态文件服务
app.use(mount('/uploads', serve(path.join(__dirname, '../public/uploads'))));

// 获取新闻列表
router.get('/api/news', async (ctx) => {
  const { year, month, page = 1, pageSize = 10, isNormal = false } = ctx.query;

  try {
    let whereClause: any = {};

    // 确保 year 和 month 是有效的数字
    const numYear = year ? Number(year) : null;
    const numMonth = month ? Number(month) : null;

    if (numYear && !isNaN(numYear)) {
      if (numMonth && !isNaN(numMonth) && numMonth >= 1 && numMonth <= 12) {
        // 如果同时有年份和月份
        const startDate = new Date(Date.UTC(numYear, numMonth - 1, 1, 0, 0, 0, 0));
        const endDate = new Date(Date.UTC(numYear, numMonth, 0, 23, 59, 59, 999));

        whereClause = {
          date: {
            gte: startDate,
            lte: endDate
          }
        };
      } else {
        // 只有年份
        const startDate = new Date(Date.UTC(numYear, 0, 1, 0, 0, 0, 0));
        const endDate = new Date(Date.UTC(numYear, 11, 31, 23, 59, 59, 999));

        whereClause = {
          date: {
            gte: startDate,
            lte: endDate
          }
        };
      }
    }

    console.log('查询条件:', whereClause); // 添加日志以便调试

    if (isNormal) {
      whereClause.isFeature = false
    }

    const [total, items] = await Promise.all([
      prisma.news.count({ where: whereClause }),
      prisma.news.findMany({
        where: whereClause,
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          date: 'desc'
        },
        select: {
          id: true,
          title: true,
          source: true,
          image: true,
          link: true,
          isFeature: true,
          date: true,
          "createdAt": true,
          "updatedAt": true,
          // 不包含details字段
        },
      })
    ]);

    ctx.body = {
      data: items,
      total
    };
  } catch (error) {
    console.error('获取新闻列表失败:', error);
    ctx.status = 500;
    ctx.body = { error: '获取新闻列表失败' };
  }
});

router.get('/api/news/feature', async (ctx) => {
  try {
    const featureNews = await prisma.news.findMany({
      where: {
        isFeature: true,
      },
      orderBy: {
        date: 'desc'
      },
      select: {
        id: true,
        title: true,
        source: true,
        image: true,
        link: true,
        isFeature: true,
        date: true,
        "createdAt": true,
        "updatedAt": true,
        // 不包含details字段
      },
      take: 3 // 限制返回的特色新闻数量
    });

    ctx.body = featureNews;
  } catch (error) {
    console.error('获取特色新闻失败:', error);
    ctx.status = 500;
    ctx.body = { error: '获取特色新闻失败' };
  }
});

// 获取单个新闻
router.get('/api/news/:id', async (ctx) => {
  const { id } = ctx.params;
  const news = await prisma.news.findUnique({
    where: { id: Number(id) }
  });

  if (!news) {
    ctx.status = 404;
    ctx.body = { error: '新闻不存在' };
    return;
  }

  ctx.body = news;
});

interface NewsRequestBody {
  title: string;
  content: string;
  source: string;
  link: string;
  image?: string;
  isFeature?: boolean;
  date?: string | Date;
}

// 创建新闻
router.post('/api/news', async (ctx) => {
  const data = ctx.request.body as NewsRequestBody;

  try {
    const news = await prisma.news.create({
      data: {
        title: data.title,
        content: data.content,
        source: data.source,
        link: data.link,
        image: data.image,
        isFeature: data.isFeature,
        date: new Date(data.date || Date.now())
      }
    });
    ctx.body = news;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '创建新闻失败' };
  }
});

// 更新新闻
router.put('/api/news/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = ctx.request.body as NewsRequestBody;

  try {
    const news = await prisma.news.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        content: data.content,
        source: data.source,
        link: data.link,
        image: data.image,
        isFeature: data.isFeature,
        date: new Date(data.date || Date.now())
      }
    });
    ctx.body = news;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '更新新闻失败' };
  }
});

// 删除新闻
router.delete('/api/news/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    await prisma.news.delete({
      where: { id: Number(id) }
    });
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '删除新闻失败' };
  }
});

interface BatchDeleteBody {
  ids: number[];
}

// 批量删除新闻
router.post('/api/news/batch-delete', async (ctx) => {
  const { ids } = ctx.request.body as BatchDeleteBody;

  try {
    await prisma.news.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    });
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '批量删除失败' };
  }
});

// 文件上传接口
router.post('/api/upload', async (ctx) => {
  try {
    const file = ctx.request.files?.file;
    if (!file || Array.isArray(file)) {
      throw new Error('文件上传失败');
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.mimetype as string)) {
      throw new Error('只支持 jpg、png、gif 格式的图片');
    }

    // 获取文件名
    const filename = path.basename(file.filepath);

    ctx.body = {
      url: `/uploads/${filename}`,
      success: true
    };
  } catch (error) {
    ctx.status = 400;
    ctx.body = {
      error: error instanceof Error ? error.message : '文件上传失败',
      success: false
    };
  }
});

// 更新 Banner 接口类型定义
interface BannerRequestBody {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  order: number;  // 添加order字段
}

// 修改获取 Banner 列表接口，按order排序
router.get('/api/banners', async (ctx) => {
  const banners = await prisma.banner.findMany({
    orderBy: [
      { order: 'asc' },  // 首先按order排序
      { createdAt: 'desc' }  // 其次按创建时间排序
    ]
  });
  ctx.body = banners;
});

// 获取单个 Banner
router.get('/api/banners/:id', async (ctx) => {
  const { id } = ctx.params;
  const banner = await prisma.banner.findUnique({
    where: { id: Number(id) }
  });

  if (!banner) {
    ctx.status = 404;
    ctx.body = { error: 'Banner不存在' };
    return;
  }

  ctx.body = banner;
});

// 修改创建 Banner 接口
router.post('/api/banners', async (ctx) => {
  const data = ctx.request.body as BannerRequestBody;

  try {
    const banner = await prisma.banner.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        link: data.link,
        order: data.order  // 添加order字段
      }
    });
    ctx.body = banner;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '创建Banner失败' };
  }
});

// 修改更新 Banner 接口
router.put('/api/banners/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = ctx.request.body as BannerRequestBody;

  try {
    const banner = await prisma.banner.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        link: data.link,
        order: data.order  // 添加order字段
      }
    });
    ctx.body = banner;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '更新Banner失败' };
  }
});

// 删除 Banner
router.delete('/api/banners/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    await prisma.banner.delete({
      where: { id: Number(id) }
    });
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '删除Banner失败' };
  }
});

// 修改产品接口类型定义
interface ProductRequestBody {
  title: string;
  subtitle: string;
  description: string;
  details?: string;
  image: string;
  link?: string;
  order: number;  // 添加序号字段
}

// 修改获取产品列表接口，按序号排序
router.get('/api/products', async (ctx) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      order: true,
      title: true,
      subtitle: true,
      description: true,
      image: true,
      link: true,
      "createdAt": true,
      "updatedAt": true,
    },
    orderBy: [
      { order: 'asc' },  // 首先按序号排序
      { createdAt: 'desc' }  // 其次按创建时间排序
    ]
  });
  ctx.body = products;
});

// 获取单个产品
router.get('/api/products/:id', async (ctx) => {
  const { id } = ctx.params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) }
  });

  if (!product) {
    ctx.status = 404;
    ctx.body = { error: '产品不存在' };
    return;
  }

  ctx.body = product;
});

// 修改创建产品接口
router.post('/api/products', async (ctx) => {
  const data = ctx.request.body as ProductRequestBody;

  try {
    const product = await prisma.product.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        details: data.details,
        image: data.image,
        link: data.link,
        order: data.order  // 添加序号字段
      }
    });
    ctx.body = product;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '创建产品失败' };
  }
});

// 修改更新产品接口
router.put('/api/products/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = ctx.request.body as ProductRequestBody;

  try {
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        details: data.details,
        image: data.image,
        link: data.link,
        order: data.order  // 添加序号字段
      }
    });
    ctx.body = product;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '更新产品失败' };
  }
});

// 删除产品
router.delete('/api/products/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    await prisma.product.delete({
      where: { id: Number(id) }
    });
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '删除产品失败' };
  }
});

// 采购申请接口类型定义
interface PurchaseFormRequestBody {
  company: string;
  contact: string;
  phone: string;
  email: string;
  requirements: string;
}

// 获取采购申请列表
router.get('/api/purchases', async (ctx) => {
  try {
    const purchases = await prisma.purchaseForm.findMany({
      orderBy: {
        submitTime: 'desc'
      }
    });
    ctx.body = purchases;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '获取采购申请列表失败' };
  }
});

// 创建采购申请
router.post('/api/purchases', async (ctx) => {
  const data = ctx.request.body as PurchaseFormRequestBody;

  try {
    const purchase = await prisma.purchaseForm.create({
      data: {
        company: data.company,
        contact: data.contact,
        phone: data.phone,
        email: data.email,
        requirements: data.requirements,
      }
    });

    await robot.send({
      msgtype: 'text',
      text: {
        content: `芯培森通知 采购申请已提交，请及时处理。
        公司名称：${data.company}
        联系人：${data.contact}
        联系电话：${data.phone}
        邮箱：${data.email}
        需求：${data.requirements}`
      },
    });

    ctx.body = purchase;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '创建采购申请失败' };
  }
});

// 更新采购申请状态
router.put('/api/purchases/:id/status', async (ctx) => {
  const { id } = ctx.params;
  const { status } = ctx.request.body;

  try {
    const purchase = await prisma.purchaseForm.update({
      where: { id: Number(id) },
      data: { status }
    });
    ctx.body = purchase;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '更新状态失败' };
  }
});

// 搜索采购申请
router.get('/api/purchases/search', async (ctx) => {
  const { query, status } = ctx.query;

  try {
    const whereClause: any = {};

    if (query) {
      whereClause.OR = [
        { company: { contains: query as string, mode: 'insensitive' } },
        { contact: { contains: query as string, mode: 'insensitive' } }
      ];
    }

    if (status && status !== 'all') {
      whereClause.status = status;
    }

    const purchases = await prisma.purchaseForm.findMany({
      where: whereClause,
      orderBy: {
        submitTime: 'desc'
      }
    });

    ctx.body = purchases;
  } catch (error) {
    console.log(error)
    ctx.status = 500;
    ctx.body = { error: '搜索采购申请失败' };
  }
});

// 获取单个采购申请
router.get('/api/purchases/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    const purchase = await prisma.purchaseForm.findUnique({
      where: { id: Number(id) }
    });

    if (!purchase) {
      ctx.status = 404;
      ctx.body = { error: '采购申请不存在' };
      return;
    }

    ctx.body = purchase;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '获取采购申请失败' };
  }
});

// 删除采购申请
router.delete('/api/purchases/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    await prisma.purchaseForm.delete({
      where: { id: Number(id) }
    });
    ctx.body = { success: true };
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '删除采购申请失败' };
  }
});

// 自定义文档路由

// 获取所有文档
router.get('/api/custom-docs', async (ctx) => {
  try {
    const docs = await prisma.customDoc.findMany({
      orderBy: {
        updatedAt: 'desc'
      }
    });
    ctx.body = docs;
  } catch (error) {
    console.error('获取文档列表失败:', error);
    ctx.status = 500;
    ctx.body = { error: '获取文档列表失败' };
  }
});

// 获取单个文档
router.get('/api/custom-docs/:id', async (ctx) => {
  const { id } = ctx.params;
  try {
    const doc = await prisma.customDoc.findUnique({
      where: { id: Number(id) }
    });

    if (!doc) {
      ctx.status = 404;
      ctx.body = { error: '文档不存在' };
      return;
    }

    ctx.body = doc;
  } catch (error) {
    console.error('获取文档失败:', error);
    ctx.status = 500;
    ctx.body = { error: '获取文档失败' };
  }
});

// 创建文档
router.post('/api/custom-docs', async (ctx) => {
  const { type, content } = ctx.request.body;

  try {
    // 检查是否已存在同类型的文档
    const existingDoc = await prisma.customDoc.findFirst({
      where: { type }
    });

    if (existingDoc) {
      ctx.status = 400;
      ctx.body = { error: '该类型的文档已存在' };
      return;
    }

    const doc = await prisma.customDoc.create({
      data: {
        type,
        content
      }
    });

    ctx.status = 201;
    ctx.body = doc;
  } catch (error) {
    console.error('创建文档失败:', error);
    ctx.status = 500;
    ctx.body = { error: '创建文档失败' };
  }
});

// 更新文档
router.put('/api/custom-docs/:id', async (ctx) => {
  const { id } = ctx.params;
  const { type, content } = ctx.request.body;

  try {
    // 检查是否存在其他同类型的文档
    const existingDoc = await prisma.customDoc.findFirst({
      where: {
        type,
        NOT: { id: Number(id) }
      }
    });

    if (existingDoc) {
      ctx.status = 400;
      ctx.body = { error: '该类型的文档已存在' };
      return;
    }

    const doc = await prisma.customDoc.update({
      where: { id: Number(id) },
      data: {
        type,
        content
      }
    });

    ctx.body = doc;
  } catch (error) {
    console.error('更新文档失败:', error);
    ctx.status = 500;
    ctx.body = { error: '更新文档失败' };
  }
});

// 删除文档
router.delete('/api/custom-docs/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    await prisma.customDoc.delete({
      where: { id: Number(id) }
    });
    ctx.status = 204;
  } catch (error) {
    console.error('删除文档失败:', error);
    ctx.status = 500;
    ctx.body = { error: '删除文档失败' };
  }
});

// 应用领域接口

// 获取应用领域列表
router.get('/api/applications', async (ctx) => {
  try {
    const { page = 1, pageSize = 12 } = ctx.query;
    const pageNum = Number(page);
    const pageSizeNum = Number(pageSize);

    // 获取总数
    const total = await prisma.application.count();

    // 获取分页数据
    const applications = await prisma.application.findMany({
      select: {
        id: true,
        order: true,
        title: true,
        description: true,
        image: true,
        link: true,
        details: true,
      },
      orderBy: {
        order: 'asc'
      },
      skip: (pageNum - 1) * pageSizeNum,
      take: pageSizeNum
    });

    // 处理结果，添加hasDetails字段并移除details内容
    const processedApplications = applications.map(app => {
      const hasDetails = app.details !== null && app.details !== undefined && app.details.trim() !== '';
      const { details, ...rest } = app;
      return {
        ...rest,
        hasDetails // 添加表示是否有details内容的字段
      };
    });

    ctx.body = {
      data: processedApplications,
      total,
      page: pageNum,
      pageSize: pageSizeNum,
      totalPages: Math.ceil(total / pageSizeNum)
    };

  } catch (error) {
    console.error('获取应用领域列表失败:', error);
    ctx.status = 500;
    ctx.body = { error: '获取应用领域列表失败' };
  }
});

// 获取单个应用领域
router.get('/api/applications/:id', async (ctx) => {
  const { id } = ctx.params;
  try {
    const application = await prisma.application.findUnique({
      where: { id: Number(id) }
    });

    if (!application) {
      ctx.status = 404;
      ctx.body = { error: '应用领域不存在' };
      return;
    }

    ctx.body = application;
  } catch (error) {
    console.error('获取应用领域失败:', error);
    ctx.status = 500;
    ctx.body = { error: '获取应用领域失败' };
  }
});

// 创建应用领域
router.post('/api/applications', async (ctx) => {
  const data = ctx.request.body;

  try {
    // 验证必填字段
    if (!data.title || !data.description || !data.image) {
      ctx.status = 400;
      ctx.body = { error: '标题、描述和图片为必填项' };
      return;
    }

    const application = await prisma.application.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link || null,
        details: data.details || null,
        order: data.order || 0
      }
    });

    ctx.status = 201;
    ctx.body = application;
  } catch (error) {
    console.error('创建应用领域失败:', error);
    ctx.status = 500;
    ctx.body = { error: '创建应用领域失败' };
  }
});

// 更新应用领域
router.put('/api/applications/:id', async (ctx) => {
  const { id } = ctx.params;
  const data = ctx.request.body;

  try {
    // 验证必填字段
    if (!data.title || !data.description || !data.image) {
      ctx.status = 400;
      ctx.body = { error: '标题、描述和图片为必填项' };
      return;
    }

    const application = await prisma.application.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        link: data.link || null,
        details: data.details || null,
        order: data.order
      }
    });

    ctx.body = application;
  } catch (error) {
    console.error('更新应用领域失败:', error);
    ctx.status = 500;
    ctx.body = { error: '更新应用领域失败' };
  }
});

// 删除应用领域
router.delete('/api/applications/:id', async (ctx) => {
  const { id } = ctx.params;

  try {
    await prisma.application.delete({
      where: { id: Number(id) }
    });
    ctx.status = 204;
    ctx.body = { success: true };
  } catch (error) {
    console.error('删除应用领域失败:', error);
    ctx.status = 500;
    ctx.body = { error: '删除应用领域失败' };
  }
});

// 添加钉钉机器人配置
const robot = new ChatBot({
  webhook: process.env.DINGTALK_WEBHOOK || 'https://oapi.dingtalk.com/robot/send?access_token=0be9137b533f0fa7bd6fa38a59bba86b6383ce0cd9397bd66add65089ba457f8', // 从环境变量获取webhook地址
  secret: process.env.DINGTALK_SECRET || 'SECfd0293980fdacadd64c6e71175a0870e645eca1675c3fc303e24c78aa81d4dc7'    // 从环境变量获取加签密钥
});

// 添加发送钉钉消息的接口
interface DingMessageBody {
  msgtype: 'text' | 'link' | 'markdown';
  content: string;
  title?: string;
  picUrl?: string;
  messageUrl?: string;
  atMobiles?: string[];
  isAtAll?: boolean;
}

router.post('/api/send-ding-message', async (ctx) => {
  const data = ctx.request.body as DingMessageBody;

  try {
    let response;
    switch (data.msgtype) {
      case 'text':
        response = await robot.send({
          msgtype: 'text',
          text: {
            content: data.content
          },
          at: {
            atMobiles: data.atMobiles || [],
            isAtAll: data.isAtAll || false
          }
        });
        break;


      default:
        throw new Error('不支持的消息类型');
    }

    ctx.body = {
      success: true,
    };
  } catch (error) {
    console.error('发送钉钉消息失败:', error);
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: error instanceof Error ? error.message : '发送钉钉消息失败'
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 