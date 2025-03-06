import { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Typography,
  Select,
  Statistic,
  Progress,
  Tabs,
  DatePicker,
  Empty,
  Spin,
  Button,
} from 'antd';
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  TrophyOutlined,
  RiseOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { Line, Pie, Column } from '@ant-design/charts';
import styles from './Analytics.module.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface SubjectData {
  subject: string;
  hours: number;
  color: string;
}

interface ProgressData {
  date: string;
  value: number;
  category: string;
}

interface PerformanceData {
  subject: string;
  score: number;
}

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [subjectData, setSubjectData] = useState<SubjectData[]>([]);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);

  useEffect(() => {
    // Simulate data loading
    setLoading(true);
    setTimeout(() => {
      setSubjectData(generateSubjectData());
      setProgressData(generateProgressData(timeRange));
      setPerformanceData(generatePerformanceData());
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const generateSubjectData = (): SubjectData[] => {
    return [
      { subject: 'Mathematics', hours: 12.5, color: '#4F46E5' },
      { subject: 'Physics', hours: 8.2, color: '#8B5CF6' },
      { subject: 'Computer Science', hours: 10.8, color: '#10B981' },
      { subject: 'History', hours: 5.5, color: '#F59E0B' },
      { subject: 'Literature', hours: 4.2, color: '#EC4899' },
    ];
  };

  const generateProgressData = (range: string): ProgressData[] => {
    const data: ProgressData[] = [];
    const categories = ['Study Hours', 'Completed Tasks', 'Quiz Score'];
    const now = new Date();
    let days = 7;

    if (range === 'month') days = 30;
    else if (range === 'year') days = 365;

    for (let i = days; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      categories.forEach((category) => {
        let value = Math.floor(Math.random() * 100);
        if (category === 'Study Hours')
          value = Math.floor(Math.random() * 8) + 1;
        data.push({
          date: dateStr,
          value,
          category,
        });
      });
    }

    return data;
  };

  const generatePerformanceData = (): PerformanceData[] => {
    return [
      { subject: 'Mathematics', score: 85 },
      { subject: 'Physics', score: 78 },
      { subject: 'Computer Science', score: 92 },
      { subject: 'History', score: 70 },
      { subject: 'Literature', score: 82 },
    ];
  };

  const totalStudyHours = subjectData.reduce(
    (total, item) => total + item.hours,
    0
  );
  const completedTasks = 24;
  const totalTasks = 32;
  const averageScore = Math.round(
    performanceData.reduce((total, item) => total + item.score, 0) /
      performanceData.length
  );

  const pieConfig = {
    data: subjectData,
    angleField: 'hours',
    colorField: 'subject',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name}: {percentage}',
    },
    interactions: [{ type: 'element-active' }],
  };

  const lineConfig = {
    data: progressData,
    xField: 'date',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      title: {
        text: 'Value',
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

  const columnConfig = {
    data: performanceData,
    xField: 'subject',
    yField: 'score',
    label: {
      position: 'top',
    },
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    color: '#4F46E5',
  };

  const handleTimeRangeChange = (value: string) => {
    setTimeRange(value);
  };

  const handleExportData = () => {
    alert('Analytics data export feature coming soon!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <Title level={2}>Learning Analytics</Title>
          <Text type='secondary'>
            Track your study progress and performance
          </Text>
        </div>
        <div className={styles.actions}>
          <Select
            defaultValue='week'
            onChange={handleTimeRangeChange}
            className={styles.timeRangeSelect}
          >
            <Option value='week'>Last 7 Days</Option>
            <Option value='month'>Last 30 Days</Option>
            <Option value='year'>Last Year</Option>
          </Select>
          <Button
            type='primary'
            icon={<DownloadOutlined />}
            onClick={handleExportData}
          >
            Export Data
          </Button>
        </div>
      </div>

      <Spin spinning={loading}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title='Total Study Hours'
                value={totalStudyHours.toFixed(1)}
                precision={1}
                valueStyle={{ color: '#4F46E5' }}
                prefix={<ClockCircleOutlined />}
                suffix='hrs'
              />
              <Text type='secondary'>This {timeRange}</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title='Tasks Completed'
                value={completedTasks}
                valueStyle={{ color: '#10B981' }}
                prefix={<CheckCircleOutlined />}
                suffix={`/ ${totalTasks}`}
              />
              <Progress
                percent={Math.round((completedTasks / totalTasks) * 100)}
                showInfo={false}
                strokeColor='#10B981'
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title='Average Score'
                value={averageScore}
                valueStyle={{ color: '#F59E0B' }}
                prefix={<TrophyOutlined />}
                suffix='%'
              />
              <Progress
                percent={averageScore}
                showInfo={false}
                strokeColor='#F59E0B'
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title='Learning Streak'
                value={14}
                valueStyle={{ color: '#EC4899' }}
                prefix={<RiseOutlined />}
                suffix='days'
              />
              <Text type='secondary'>Keep it up!</Text>
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.chartRow}>
          <Col xs={24} lg={12}>
            <Card title='Study Time Distribution' className={styles.chartCard}>
              <Pie {...pieConfig} />
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title='Subject Performance' className={styles.chartCard}>
              <Column {...columnConfig} />
            </Card>
          </Col>
        </Row>

        <Card title='Progress Over Time' className={styles.progressCard}>
          <Line {...lineConfig} />
        </Card>

        <Card className={styles.recommendationsCard}>
          <Tabs defaultActiveKey='1'>
            <TabPane tab='Recommendations' key='1'>
              <div className={styles.recommendationsList}>
                <div className={styles.recommendationItem}>
                  <div className={styles.recommendationIcon}>
                    <RiseOutlined />
                  </div>
                  <div className={styles.recommendationContent}>
                    <Title level={5}>Increase Mathematics Study Time</Title>
                    <Text>
                      Based on your recent quiz scores, we recommend increasing
                      your study time for Mathematics by 2 hours per week.
                    </Text>
                  </div>
                </div>
                <div className={styles.recommendationItem}>
                  <div className={styles.recommendationIcon}>
                    <CheckCircleOutlined />
                  </div>
                  <div className={styles.recommendationContent}>
                    <Title level={5}>Complete Physics Practice Problems</Title>
                    <Text>
                      You're doing well in theory, but need more practice. Try
                      completing the recommended problem sets.
                    </Text>
                  </div>
                </div>
                <div className={styles.recommendationItem}>
                  <div className={styles.recommendationIcon}>
                    <TrophyOutlined />
                  </div>
                  <div className={styles.recommendationContent}>
                    <Title level={5}>Great Progress in Computer Science</Title>
                    <Text>
                      You're excelling in this subject! Consider exploring
                      advanced topics or helping peers to reinforce your
                      knowledge.
                    </Text>
                  </div>
                </div>
              </div>
            </TabPane>
            <TabPane tab='Insights' key='2'>
              <div className={styles.insightsList}>
                <div className={styles.insightItem}>
                  <Title level={5}>Study Pattern Analysis</Title>
                  <Text>
                    You tend to be most productive in the morning hours (8-11
                    AM). Consider scheduling challenging subjects during this
                    time.
                  </Text>
                </div>
                <div className={styles.insightItem}>
                  <Title level={5}>Learning Style</Title>
                  <Text>
                    Your interaction patterns suggest you're a visual learner.
                    Try incorporating more diagrams, charts, and videos in your
                    study materials.
                  </Text>
                </div>
                <div className={styles.insightItem}>
                  <Title level={5}>Retention Rate</Title>
                  <Text>
                    Your quiz performance shows higher retention when you review
                    material within 48 hours of first studying it.
                  </Text>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Card>
      </Spin>
    </div>
  );
};

export default Analytics;
