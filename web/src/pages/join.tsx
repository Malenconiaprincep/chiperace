import React from 'react';
import styles from './join.module.css';
import Layout from '@site/src/components/Layout';
import bannerStyles from '../styles/banner.module.css';

interface JobPosition {
  title: string;
  department: string;
  requirements: string[];
  responsibilities: string[];
}

const positions: JobPosition[] = [
  // {
  //   title: '软件工程师',
  //   department: '研发部',
  //   requirements: [
  //     '计算机相关专业本科及以上学历',
  //     '熟练掌握 JavaScript/TypeScript, React 等前端技术',
  //     '良好的团队协作能力和沟通能力',
  //   ],
  //   responsibilities: [
  //     '负责公司产品的前端开发工作',
  //     '参与产品需求分析和技术方案设计',
  //     '持续优化前端性能和用户体验',
  //   ],
  // },
  // {
  //   title: '产品经理',
  //   department: '产品部',
  //   requirements: [
  //     '3年以上产品经理经验',
  //     '优秀的产品思维和市场洞察力',
  //     '出色的项目管理能力',
  //   ],
  //   responsibilities: [
  //     '负责产品规划和需求分析',
  //     '协调各部门推进产品落地',
  //     '持续跟踪和优化产品体验',
  //   ],
  // },
];

const JoinPage: React.FC = () => {
  return (
    <Layout>
      <div className={bannerStyles.banner}>
        <div className={bannerStyles.bannerContent}>
          <h1>加入我们</h1>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.section}>
          <h2>关于我们</h2>
          <p>
            芯培森是一家专注于人工智能芯片和智能计算解决方案的高科技企业。
            在这里，你将有机会参与具有挑战性的项目，与优秀的团队共同成长。
            我们提供具有竞争力的薪资待遇、灵活的工作时间以及良好的职业发展空间。
          </p>
          <p>
            如果您对我们的职位感兴趣，请将简历发送至：
            <a href="mailto:hr@chipforce.com">hr@chipforce.com</a>
          </p>
        </div>

        {
          positions.length > 0 && (
            <div className={styles.section}>
              <h2>开放职位</h2>
              <div className={styles.positionList}>
                {positions.map((position, index) => (
                  <div key={index} className={styles.positionCard}>
                    <h3>{position.title}</h3>
                    <p className={styles.department}>{position.department}</p>

                    <div className={styles.details}>
                      <h4>岗位要求：</h4>
                      <ul>
                        {position.requirements.map((req, idx) => (
                          <li key={idx}>{req}</li>
                        ))}
                      </ul>

                      <h4>工作职责：</h4>
                      <ul>
                        {position.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>

                    <button className={styles.applyButton}>
                      申请职位
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        {/* <div className={styles.section}>
          <h2>联系我们</h2>
          
        </div> */}
      </div>
    </Layout>
  );
};

export default JoinPage;
