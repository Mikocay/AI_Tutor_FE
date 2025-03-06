'use client';

import { useState } from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Auth.module.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      setLoading(true);
      await login(values.email, values.password);
      message.success('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    message.info(`${provider} login is not implemented yet.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Welcome Back</h2>
        <p className={styles.subtitle}>Sign in to continue to EduGenius</p>
      </div>

      <Form
        name='login'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout='vertical'
        className={styles.form}
      >
        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Email'
            size='large'
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            size='large'
            className={styles.input}
          />
        </Form.Item>

        <Form.Item>
          <div className='flex justify-between items-center'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Link to='/forgot-password' className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.submitButton}
            loading={loading}
            block
          >
            Sign In
          </Button>
        </Form.Item>

        <Divider plain>Or continue with</Divider>

        <div className={styles.socialButtons}>
          <Button
            icon={<GoogleOutlined />}
            onClick={() => handleSocialLogin('Google')}
            className={styles.googleButton}
          >
            Google
          </Button>
          <Button
            icon={<FacebookOutlined />}
            onClick={() => handleSocialLogin('Facebook')}
            className={styles.facebookButton}
          >
            Facebook
          </Button>
          <Button
            icon={<GithubOutlined />}
            onClick={() => handleSocialLogin('GitHub')}
            className={styles.githubButton}
          >
            GitHub
          </Button>
        </div>

        <div className={styles.footer}>
          <p>
            Don't have an account?{' '}
            <Link to='/register' className={styles.link}>
              Sign up
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Login;
