import type { ReactNode } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus was designed from the ground up to be easily installed and
        used to get your website up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Docusaurus lets you focus on your docs, and we&apos;ll do the chores. Go
        ahead and move your docs into the <code>docs</code> directory.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. Docusaurus can
        be extended while reusing the same header and footer.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

type BenchmarkData = {
  category: string;
  name: string;
  scores: {
    [key: string]: number | string;
  };
};

const benchmarkData: BenchmarkData[] = [
  {
    category: 'English',
    name: 'MMLU (5-shot)',
    scores: {
      'DeepSeek-V3': 89.1,
      'DeepSeek V2.5': 80.3,
      'OpenAI-3.5': 85.6,
      'Llama2.1': 86.2,
      'Claude-3.5': 88.9,
      'GPT-4': 88.0,
    }
  },
  {
    category: 'Code',
    name: 'HumanEval-Mul (Pass@1)',
    scores: {
      'DeepSeek-V3': 82.5,
      'DeepSeek V2.5': 77.4,
      'OpenAI-3.5': 77.3,
      'Llama2.1': 77.2,
      'Claude-3.5': 81.7,
      'GPT-4': 80.5,
    }
  },
  {
    category: 'Math',
    name: 'MATH-500 (EM)',
    scores: {
      'DeepSeek-V3': 90.2,
      'DeepSeek V2.5': 74.7,
      'OpenAI-3.5': 80.0,
      'Llama2.1': 73.8,
      'Claude-3.5': 78.3,
      'GPT-4': 74.6,
    }
  },
  {
    category: 'Chinese',
    name: 'C-Eval (EM)',
    scores: {
      'DeepSeek-V3': 86.5,
      'DeepSeek V2.5': 79.5,
      'OpenAI-3.5': 68.1,
      'Llama2.1': 61.5,
      'Claude-3.5': 76.7,
      'GPT-4': 76.0,
    }
  },
];

const models = ['DeepSeek-V3', 'DeepSeek V2.5', 'OpenAI-3.5', 'Llama2.1', 'Claude-3.5', 'GPT-4'];

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className={styles.benchmarkContainer}>
          <h2 className={styles.benchmarkTitle}>性能对比</h2>
          <p className={styles.benchmarkDescription}>
            在多个主流评测基准上的表现对比
          </p>

          <div className={styles.tableWrapper}>
            <table className={styles.benchmarkTable}>
              <thead>
                <tr>
                  <th>类别</th>
                  <th>评测项</th>
                  {models.map((model) => (
                    <th key={model}>{model}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {benchmarkData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.category}</td>
                    <td>{item.name}</td>
                    {models.map((model) => (
                      <td
                        key={model}
                        className={clsx({
                          [styles.highlightScore]: item.scores[model] === Math.max(...Object.values(item.scores) as number[])
                        })}
                      >
                        {item.scores[model]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
