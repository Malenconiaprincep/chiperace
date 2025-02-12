import Koa from 'koa';
import Router from '@koa/router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import { newsRouter } from './routes/news';

const app = new Koa();
const router = new Router();

// 中间件
app.use(cors());
app.use(bodyParser());

// 路由
router.use('/api/news', newsRouter.routes());

router.get('/api/test', (ctx) => {
  console.log('test');
  ctx.body = {
    message: 'Hello, World!'
  };
});

// 全局错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error('Error:', err);
    ctx.status = err.status || 500;
    ctx.body = {
      error: err.message || 'Internal Server Error'
    };
  }
});

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
}); 