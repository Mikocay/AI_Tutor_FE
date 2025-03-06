'use client';

import { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Button, Badge, theme } from 'antd';
import {
  HomeOutlined,
  MessageOutlined,
  CalendarOutlined,
  BarChartOutlined,
  TeamOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import styles from './UserLayout.module.css';

const { Header, Sider, Content } = Layout;

const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const { token } = theme.useToken();

  useEffect(() => {
    // Check if dark mode is enabled
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const menuItems = [
    {
      key: '/dashboard',
      icon: <HomeOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/ai-chat',
      icon: <MessageOutlined />,
      label: 'AI Tutor',
    },
    {
      key: '/study-planner',
      icon: <CalendarOutlined />,
      label: 'Study Planner',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics',
    },
    {
      key: '/community',
      icon: <TeamOutlined />,
      label: 'Community',
    },
    {
      key: '/profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: () => {
        logout();
        navigate('/login');
      },
    },
  ];

  return (
    <Layout className='min-h-screen'>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={`${styles.sider} ${darkMode ? 'dark' : ''}`}
        width={250}
      >
        <div className='p-4 flex items-center justify-center'>
          <div
            className={`${styles.logo} ${
              collapsed ? styles.logoCollapsed : ''
            }`}
          >
            {collapsed ? 'EDG' : 'EduGenius'}
          </div>
        </div>
        <Menu
          theme={darkMode ? 'dark' : 'light'}
          mode='inline'
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          className={styles.menu}
        />
      </Sider>
      <Layout>
        <Header
          className={`${styles.header} ${
            darkMode ? 'dark:bg-gray-800' : 'bg-white'
          } flex items-center justify-between px-6 shadow-sm`}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className='text-lg'
          />
          <div className='flex items-center gap-4'>
            <Button
              type='text'
              icon={darkMode ? <SunOutlined /> : <MoonOutlined />}
              onClick={toggleDarkMode}
              className='text-lg'
            />
            <Badge count={notifications} size='small'>
              <Button type='text' icon={<BellOutlined />} className='text-lg' />
            </Badge>
            <Dropdown menu={{ items: userMenuItems }} placement='bottomRight'>
              <div className='flex items-center gap-2 cursor-pointer'>
                <Avatar src={user?.avatar} icon={<UserOutlined />} />
                {!collapsed && (
                  <span className='font-medium'>{user?.name}</span>
                )}
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          className={`${styles.content} ${
            darkMode ? 'dark:bg-gray-900' : 'bg-gray-50'
          } p-6`}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;
