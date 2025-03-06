'use client';

import { useState } from 'react';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  GoogleOutlined,
  FacebookOutlined,
  GithubOutlined,
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import styles from './Auth.module.css';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      await register(values.name, values.email, values.password);
      message.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    message.info(`${provider} registration is not implemented yet.`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Create an Account</h2>
        <p className={styles.subtitle}>Join EduGenius and start learning</p>
      </div>

      <Form
        name='register'
        initialValues={{ agreement: true }}
        onFinish={onFinish}
        layout='vertical'
        className={styles.form}
      >
        <Form.Item
          name='name'
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input
            prefix={<UserOutlined className='site-form-item-icon' />}
            placeholder='Full Name'
            size='large'
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name='email'
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input
            prefix={<MailOutlined className='site-form-item-icon' />}
            placeholder='Email'
            size='large'
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name='password'
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Password'
            size='large'
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className='site-form-item-icon' />}
            placeholder='Confirm Password'
            size='large'
            className={styles.input}
          />
        </Form.Item>

        <Form.Item
          name='agreement'
          valuePropName='checked'
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error('You must accept the terms and conditions')
                    ),
            },
          ]}
        >
          <Checkbox>
            I agree to the <a href='#'>Terms of Service</a> and{' '}
            <a href='#'>Privacy Policy</a>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.submitButton}
            loading={loading}
            block
          >
            Sign Up
          </Button>
        </Form.Item>

        <Divider plain>Or sign up with</Divider>

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
            Already have an account?{' '}
            <Link to='/login' className={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </Form>
    </div>
  );
};

export default Register;
