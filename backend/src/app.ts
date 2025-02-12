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

app.use(router.routes()).use(router.allowedMethods());

export default app;