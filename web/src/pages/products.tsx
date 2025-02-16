import React from 'react';
import Layout from '@site/src/components/Layout';
import styles from './products.module.css';

const ProductsPage = (): JSX.Element => {
  return (
    <Layout>
      <div className={styles.productsContainer}>
        <div className={styles.banner}>
          <div className={styles.bannerBg}></div>
          <div className={styles.bannerContent}>
            <h1>产品技术</h1>
            <p>专业的高性能计算解决方案</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.productDisplay}>
            <div className={styles.productImages}>
              <img src="/img/products/apu-1.jpg" alt="APU-Server v1.0 正面" />
              <img src="/img/products/apu-2.jpg" alt="APU-Server v1.0 侧面" />
              <img src="/img/products/apu-3.jpg" alt="APU-Server v1.0 前面板" />
            </div>
            <div className={styles.productInfo}>
              <h2>原子级高性能计算服务器APU-Server v1.0</h2>
              <h3>高速高精度分子动力学计算</h3>
              <p>采用非冯·诺依曼架构技术，实现分子动力学高速推理</p>
            </div>
          </div>

          <div className={styles.specsSection}>
            <h3>产品规格</h3>
            <div className={styles.specsContent}>
              <p>原子级高性能计算服务器APU-Server v1.0，基于FPGA，同等功耗和精度下，单节点（台式机大小，200-300W）计算速度等同于≈1000个Intel Xeon CPU 核并行速度；或≈10 张"对华禁运"的 NVIDIA A100 GPU 卡（约 2-3 kW）并行速度，产品和服务已应用于九院、国防科大、华为等30多家单位。</p>

              <table className={styles.specsTable}>
                <tbody>
                  <tr>
                    <td>计算架构</td>
                    <td>非冯·诺依曼架构</td>
                  </tr>
                  <tr>
                    <td>计算性能</td>
                    <td>相当于1000个Intel Xeon CPU核心</td>
                  </tr>
                  <tr>
                    <td>功率消耗</td>
                    <td>200-300W</td>
                  </tr>
                  <tr>
                    <td>性能对比</td>
                    <td>等同于10张NVIDIA A100 GPU卡(2-3kW)</td>
                  </tr>
                  <tr>
                    <td>核心技术</td>
                    <td>基于FPGA</td>
                  </tr>
                  <tr>
                    <td>应用场景</td>
                    <td>分子动力学计算、高性能科学计算</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={styles.advantagesSection}>
            <h3>产品优势</h3>
            <div className={styles.advantages}>
              <div className={styles.advantageItem}>
                <h4>超高性能</h4>
                <p>单机性能相当于1000个CPU核心</p>
              </div>
              <div className={styles.advantageItem}>
                <h4>低功耗设计</h4>
                <p>仅需200-300W功率消耗</p>
              </div>
              <div className={styles.advantageItem}>
                <h4>广泛应用</h4>
                <p>已服务30多家科研院所和企业</p>
              </div>
            </div>
          </div>

          <div className={styles.customersSection}>
            <h3>产品与服务用户</h3>
            <div className={styles.customerLogos}>
              <div className={styles.logoItem}>
                <img src="/img/customers/huawei.png" alt="华为" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/aist.png" alt="北京量子智能研究院" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/nudt.png" alt="国防科技大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/jilin.png" alt="吉林大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/dp.png" alt="深势科技" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/ustb.png" alt="北京科技大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/xmu.png" alt="厦门大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/zzu.png" alt="郑州大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/pku.png" alt="北京大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/hbnu.png" alt="湖北第二师范学院" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/scut.png" alt="华南理工大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/whu.png" alt="武汉大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/cityu.png" alt="香港城市大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/nwpu.png" alt="西北工业大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/kunming.png" alt="昆明理工大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/hku.png" alt="香港大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/inner-mongolia.png" alt="内蒙古师范大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/physics-cas.png" alt="中国科学院物理研究所" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/bit.png" alt="北京理工大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/tsinghua.png" alt="清华大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/chongqing.png" alt="重庆大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/caep.png" alt="中国工程物理研究院" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/huazhong.png" alt="华中科技大学" />
              </div>
              <div className={styles.logoItem}>
                <img src="/img/customers/hunan.png" alt="湖南大学" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage; 