import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './styles.module.css';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  source: string;
  link: string;
  image?: string;
  isFeature?: boolean;
}

const mockNews: NewsItem[] = [
  {
    id: 1,
    date: '2024-10-09',
    title: '关于寒武纪用家武汉公司名义进行虚假招聘的声明',
    source: '来源：',
    link: '#',
    image: '/img/news/statement.jpg',
    isFeature: true
  },
  {
    id: 2,
    date: '2022-09-02',
    title: '2022 WAIC：寒武纪展现全算力产品实力用"芯"助力行业快速升级',
    source: '来源：',
    link: '#',
    image: '/img/news/waic2022.jpg'
  },
  {
    id: 3,
    date: '2022-03-21',
    title: '寒武纪发布新款AI训练卡MLU370-X8',
    source: '来源：寒武纪公众号',
    link: '#',
    image: '/img/news/mlu370.jpg'
  },
  {
    id: 4,
    date: '2021-07-09',
    title: '硬核产品、多行业落地案例，寒武纪强势亮相2021 WAIC',
    source: '来源：',
    link: '#',
    image: '/img/news/waic2021.jpg'
  },
  {
    id: 5,
    date: '2021-01-21',
    title: '寒武纪首颗 7nm 训练芯片昆仑 290 及云思1000加速器正式亮相',
    source: '来源：寒武纪',
    link: '#',
    image: '/img/news/chip290.jpg'
  },
  {
    id: 6,
    date: '2020-07-10',
    title: '寒武纪2021届校园招聘研发类优招正式启动！',
    source: '来源：寒武纪科技微信公众号',
    link: '#',
    image: '/img/news/recruitment.jpg'
  }
];

export default function NewsPage(): JSX.Element {
  return (
    <Layout>
      <div className={styles.newsContainer}>
        <div className={styles.banner}>
          <h1>新闻中心</h1>
        </div>

        <div className={styles.newsContent}>
          <div className={styles.filterBar}>
            <div className={styles.filterItem}>公司新闻</div>
            <div className={styles.yearFilter}>
              <span>全部年份</span>
              <span>月份</span>
            </div>
          </div>

          <div className={styles.newsList}>
            {mockNews.map((news) => (
              <div
                key={news.id}
                className={`${styles.newsItem} ${news.isFeature ? styles.featureNews : ''}`}
              >
                {news.image && (
                  <div className={styles.newsImage}>
                    <img src={news.image} alt={news.title} />
                  </div>
                )}
                <div className={styles.newsContent}>
                  <div className={styles.newsDate}>
                    <span className={styles.day}>{news.date.split('-')[2]}</span>
                    <span className={styles.yearMonth}>
                      {news.date.split('-')[0]}.{news.date.split('-')[1]}
                    </span>
                  </div>
                  <div className={styles.newsInfo}>
                    <h3>{news.title}</h3>
                    <p>{news.source}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.pagination}>
            <span>25条</span>
            <span>上一页</span>
            <span className={styles.active}>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>下一页</span>
          </div>
        </div>
      </div>
    </Layout>
  );
} 