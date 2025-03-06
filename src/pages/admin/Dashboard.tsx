'use client';

import { useState, useEffect } from 'react';
import {
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Typography,
  Progress,
  DatePicker,
} from 'antd';
import {
  UserOutlined,
  MessageOutlined,
  ClockCircleOutlined,
  RiseOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import type { ColumnsType } from 'antd/es/table';
import styles from './Dashboard.module.css';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;

interface UserActivity {
  key: string;
  user: string;
  activity: string;
  time: string;
  status: string;
}

interface UsageData {
  date: string;
  value: number;
  category: string;
}

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [usageData, setUsageData] = useState<UsageData[]>([]);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setUsageData(generateMockUsageData());
      setLoading(false);
    }, 1000);
  }, []);

  const generateMockUsageData = (): UsageData[] => {
    const data: UsageData[] = [];
    const categories = [
      'AI Interactions',
      'Study Sessions',
      'Quiz Completions',
    ];
    const now = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      categories.forEach((category) => {
        data.push({
          date: dateStr,
          value: Math.floor(Math.random() * 100) + 50,
          category,
        });
      });
    }

    return data;
  };

  const columns: ColumnsType<UserActivity> = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Activity',
      dataIndex: 'activity',
      key: 'activity',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = '';
        if (status === 'Completed') color = 'green';
        else if (status === 'In Progress') color = 'blue';
        else if (status === 'Failed') color = 'red';

        return <Text style={{ color }}>{status}</Text>;
      },
    },
  ];

  const recentActivities: UserActivity[] = [
    {
      key: '1',
      user: 'John Doe',
      activity: 'AI Chat Session',
      time: '10 minutes ago',
      status: 'Completed',
    },
    {
      key: '2',
      user: 'Jane Smith',
      activity: 'Study Plan Creation',
      time: '25 minutes ago',
      status: 'Completed',
    },
    {
      key: '3',
      user: 'Robert Johnson',
      activity: 'Quiz Attempt',
      time: '1 hour ago',
      status: 'Failed',
    },
    {
      key: '4',
      user: 'Emily Davis',
      activity: 'AI Chat Session',
      time: '2 hours ago',
      status: 'In Progress',
    },
    {
      key: '5',
      user: 'Michael Wilson',
      activity: 'Study Session',
      time: '3 hours ago',
      status: 'Completed',
    },
  ];

  const config = {
    data: usageData,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      title: {
        text: 'Count',
      },
    },
    legend: {
      position: 'top',
    },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2}>Admin Dashboard</Title>
        <RangePicker />
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Total Users'
              value={1254}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#4F46E5' }}
            />
            <Text type='secondary'>+12% from last month</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='AI Interactions'
              value={8721}
              prefix={<MessageOutlined />}
              valueStyle={{ color: '#10B981' }}
            />
            <Text type='secondary'>+24% from last month</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Avg. Study Time'
              value='42 min'
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#F59E0B' }}
            />
            <Text type='secondary'>+8% from last month</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title='Retention Rate'
              value='87%'
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#EC4899' }}
            />
            <Text type='secondary'>+5% from last month</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.chartRow}>
        <Col xs={24} lg={16}>
          <Card title='Platform Usage' className={styles.chartCard}>
            <Line {...config} loading={loading} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title='AI Model Performance' className={styles.performanceCard}>
            <div className={styles.performanceItem}>
              <div className={styles.performanceLabel}>
                <Text>Response Accuracy</Text>
                <Text strong>92%</Text>
              </div>
              <Progress percent={92} status='active' strokeColor='#4F46E5' />
            </div>
            <div className={styles.performanceItem}>
              <div className={styles.performanceLabel}>
                <Text>Response Time</Text>
                <Text strong>1.2s</Text>
              </div>
              <Progress percent={85} status='active' strokeColor='#10B981' />
            </div>
            <div className={styles.performanceItem}>
              <div className={styles.performanceLabel}>
                <Text>User Satisfaction</Text>
                <Text strong>88%</Text>
              </div>
              <Progress percent={88} status='active' strokeColor='#F59E0B' />
            </div>
            <div className={styles.performanceItem}>
              <div className={styles.performanceLabel}>
                <Text>Error Rate</Text>
                <Text strong>3%</Text>
              </div>
              <Progress percent={3} status='exception' strokeColor='#EF4444' />
            </div>
          </Card>
        </Col>
      </Row>

      <Card title='Recent User Activities' className={styles.activitiesCard}>
        <Table
          columns={columns}
          dataSource={recentActivities}
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default AdminDashboard;
