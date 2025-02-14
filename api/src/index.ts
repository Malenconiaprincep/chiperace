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
  const news = await prisma.news.findMany({
    orderBy: {
      date: 'desc'
    }
  });
  ctx.body = news;
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

app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
}); 