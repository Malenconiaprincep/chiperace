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
            <p>专业的人工智能芯片和智能计算解决方案</p>
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.breadcrumb}>
            <span>产品技术</span>
            <span>智能加速卡</span>
            <span>MLU290-M5</span>
          </div>

          <div className={styles.productDisplay}>
            <div className={styles.productImage}>
              <img src="/img/products/mlu290.png" alt="MLU290-M5智能加速卡" />
            </div>
            <div className={styles.productInfo}>
              <h2>MLU290-M5</h2>
              <p className={styles.description}>
                MLU290-M5智能加速卡采用寒武纪自研芯片方案,采用7nm先进制程工艺,采用MLUv02指令集架构,MLU290-M5智能加速卡主要用于加速深度学习SKOM设计,具备5个MLU Core,1.2TB/s内存带宽及全面支持MLU-Link互联技术,同时支持虚拟化八卡均分,多机多卡机器联合,全面支持AI训练,推理场景和智能计算任务的处理。
              </p>
            </div>
          </div>

          <div className={styles.specsSection}>
            <h3>产品规格</h3>
            <table className={styles.specsTable}>
              <tbody>
                <tr>
                  <td>产品名称</td>
                  <td>MLU290-M5</td>
                </tr>
                <tr>
                  <td>核心架构</td>
                  <td>Cambricon MLUv02 Extended</td>
                </tr>
                <tr>
                  <td>制程工艺</td>
                  <td>7nm</td>
                </tr>
                <tr>
                  <td>自适应精度可调算力</td>
                  <td>
                    512 TOPS (INT8)<br />
                    256 TOPS (INT16)<br />
                    64 TOPS (CINT32)
                  </td>
                </tr>
                <tr>
                  <td>DirectCN™视频解码</td>
                  <td>128 Streams 全高清视频</td>
                </tr>
                <tr>
                  <td>DirectCN™图片解码</td>
                  <td>3200 Frames/s 全高清图片</td>
                </tr>
                <tr>
                  <td>内存类型</td>
                  <td>HBM2高带宽内存</td>
                </tr>
                <tr>
                  <td>内存容量</td>
                  <td>32GB</td>
                </tr>
                <tr>
                  <td>内存位宽</td>
                  <td>4096 bit</td>
                </tr>
                <tr>
                  <td>内存带宽</td>
                  <td>1228 GB/s</td>
                </tr>
                <tr>
                  <td>系统接口</td>
                  <td>×16 PCIe 4.0</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage; 