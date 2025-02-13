#!/bin/bash

# 设置颜色
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}开始构建项目...${NC}\n"

# 构建管理后台
echo -e "${GREEN}构建管理后台...${NC}"
cd manage
npm install
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}管理后台构建成功${NC}\n"
else
    echo -e "${RED}管理后台构建失败${NC}\n"
    exit 1
fi

# 构建网站
echo -e "${GREEN}构建网站...${NC}"
cd ../web
npm install
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}网站构建成功${NC}\n"
else
    echo -e "${RED}网站构建失败${NC}\n"
    exit 1
fi

# 构建API服务
echo -e "${GREEN}构建API服务...${NC}"
cd ../api
npm install
npx prisma generate
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}API服务构建成功${NC}\n"
else
    echo -e "${RED}API服务构建失败${NC}\n"
    exit 1
fi

echo -e "${GREEN}所有项目构建完成!${NC}" 