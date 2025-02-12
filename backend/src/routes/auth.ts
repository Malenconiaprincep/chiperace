import Router from '@koa/router';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = new Router();
const prisma = new PrismaClient();

router.post('/login', async (ctx) => {
  const { username, password } = ctx.request.body;

  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      ctx.status = 401;
      ctx.body = { error: '用户名或密码错误' };
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'your-secret-key', {
      expiresIn: '24h',
    });

    ctx.body = {
      token,
      user: {
        id: user.id,
        username: user.username,
      },
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: '登录失败' };
  }
});

export const authRouter = router; 