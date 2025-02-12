import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';

const router = new Router();
const prisma = new PrismaClient();

// 获取新闻列表
router.get('/', async (ctx) => {
  const { page = '1', limit = '10', isFeature } = ctx.query;
  const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

  try {
    const [total, items] = await Promise.all([
      prisma.news.count({
        where: isFeature ? { isFeature: isFeature === 'true' } : undefined
      }),
      prisma.news.findMany({
        skip,
        take: parseInt(limit as string),
        where: isFeature ? { isFeature: isFeature === 'true' } : undefined,
        orderBy: { createdAt: 'desc' }
      })
    ]);

    ctx.body = {
      items,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string)
      }
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch news' };
  }
});

export const newsRouter = router;