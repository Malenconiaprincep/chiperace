import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import { koaBody } from 'koa-body';
import { PrismaClient } from '.prisma/client';
import serve from 'koa-static';
import mount from 'koa-mount';
import path from 'path';
import fs from 'fs';

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
    maxFileSize: 5 * 1024 * 1024, // 5MB
  }
}));

// 静态文件服务
app.use(mount('/uploads', serve(path.join(__dirname, '../public/uploads'))));

// 获取新闻列表
router.get('/api/news', async (ctx) => {
  const { year, month, page = 1, pageSize = 10 } = ctx.query;

  try {
    let whereClause = {};

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

    const [total, items] = await Promise.all([
      prisma.news.count({ where: whereClause }),
      prisma.news.findMany({
        where: whereClause,
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
        orderBy: {
          date: 'desc'
        }
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

// Banner 接口类型定义
interface BannerRequestBody {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
}

// 获取 Banner 列表
router.get('/api/banners', async (ctx) => {
  const banners = await prisma.banner.findMany({
    orderBy: {
      createdAt: 'desc'
    }
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

// 创建 Banner
router.post('/api/banners', async (ctx) => {
  const data = ctx.request.body as BannerRequestBody;

  try {
    const banner = await prisma.banner.create({
      data: {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        image: data.image,
        link: data.link
      }
    });
    ctx.body = banner;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '创建Banner失败' };
  }
});

// 更新 Banner
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
        link: data.link
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

// 产品接口类型定义
interface ProductRequestBody {
  title: string;
  subtitle: string;
  description: string;
  details?: string;
  image: string;
  link?: string;
}

// 获取产品列表
router.get('/api/products', async (ctx) => {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
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

// 创建产品
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
        link: data.link
      }
    });
    ctx.body = product;
  } catch (error) {
    ctx.status = 400;
    ctx.body = { error: '创建产品失败' };
  }
});

// 更新产品
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
        link: data.link
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

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 