import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import styles from './AuthLayout.module.css';

const AuthLayout = () => {
  return (
    <Layout className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
        <div className={styles.rightPanel}>
          <div className={styles.overlay}>
            <div className={styles.branding}>
              <h1 className={styles.title}>EduGenius</h1>
              <p className={styles.subtitle}>
                Your AI-powered learning companion
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthLayout;
