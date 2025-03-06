import { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Tabs,
  Form,
  Input,
  Button,
  Select,
  Switch,
  Slider,
  Space,
  Table,
  Tag,
  Progress,
  Alert,
  Divider,
  Row,
  Col,
  Statistic,
  Spin,
} from 'antd';
import {
  SettingOutlined,
  RobotOutlined,
  DatabaseOutlined,
  ApiOutlined,
  SaveOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/charts';
import styles from './AIConfiguration.module.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface ModelConfig {
  id: string;
  name: string;
  provider: string;
  version: string;
  status: 'active' | 'inactive';
  accuracy: number;
  latency: number;
  lastUpdated: string;
}

interface PerformanceData {
  date: string;
  value: number;
  metric: string;
}

const AIConfiguration = () => {
  const [loading, setLoading] = useState(true);
  const [modelConfigs, setModelConfigs] = useState<ModelConfig[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [form] = Form.useForm();
  const [systemForm] = Form.useForm();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setModelConfigs(generateMockModelConfigs());
      setPerformanceData(generateMockPerformanceData());
      setLoading(false);
    }, 1000);
  }, []);

  const generateMockModelConfigs = (): ModelConfig[] => {
    return [
      {
        id: '1',
        name: 'GPT-4o',
        provider: 'OpenAI',
        version: '1.0',
        status: 'active',
        accuracy: 92,
        latency: 1.2,
        lastUpdated: '2025-03-01',
      },
      {
        id: '2',
        name: 'Claude 3',
        provider: 'Anthropic',
        version: '1.0',
        status: 'inactive',
        accuracy: 89,
        latency: 1.5,
        lastUpdated: '2025-02-15',
      },
      {
        id: '3',
        name: 'Gemini Pro',
        provider: 'Google',
        version: '1.0',
        status: 'inactive',
        accuracy: 88,
        latency: 1.8,
        lastUpdated: '2025-02-10',
      },
    ];
  };

  const generateMockPerformanceData = (): PerformanceData[] => {
    const data: PerformanceData[] = [];
    const metrics = ['Accuracy', 'Response Time', 'User Satisfaction'];
    const now = new Date();

    for (let i = 30; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      metrics.forEach((metric) => {
        let value = Math.floor(Math.random() * 20) + 80; // 80-100 for accuracy and satisfaction
        if (metric === 'Response Time') value = Math.random() * 2 + 0.5; // 0.5-2.5 for response time
        data.push({
          date: dateStr,
          value,
          metric,
        });
      });
    }

    return data;
  };

  const handleSaveModelConfig = (values: any) => {
    console.log('Model configuration saved:', values);
    // In a real app, you would update the model configuration in the backend
  };

  const handleSaveSystemConfig = (values: any) => {
    console.log('System configuration saved:', values);
    // In a real app, you would update the system configuration in the backend
  };

  const handleToggleModelStatus = (modelId: string) => {
    setModelConfigs(
      modelConfigs.map((model) => {
        if (model.id === modelId) {
          return {
            ...model,
            status: model.status === 'active' ? 'inactive' : 'active',
          };
        }
        return model;
      })
    );
  };

  const columns = [
    {
      title: 'Model',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) =>
        status === 'active' ? (
          <Tag color='green'>Active</Tag>
        ) : (
          <Tag color='orange'>Inactive</Tag>
        ),
    },
    {
      title: 'Accuracy',
      dataIndex: 'accuracy',
      key: 'accuracy',
      render: (accuracy: number) => (
        <Progress
          percent={accuracy}
          size='small'
          status={accuracy >= 90 ? 'success' : 'normal'}
        />
      ),
    },
    {
      title: 'Latency (s)',
      dataIndex: 'latency',
      key: 'latency',
    },
    {
      title: 'Last Updated',
      dataIndex: 'lastUpdated',
      key: 'lastUpdated',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: ModelConfig) => (
        <Space size='small'>
          <Button
            type={record.status === 'active' ? 'default' : 'primary'}
            size='small'
            onClick={() => handleToggleModelStatus(record.id)}
          >
            {record.status === 'active' ? 'Deactivate' : 'Activate'}
          </Button>
          <Button type='link' size='small'>
            Configure
          </Button>
        </Space>
      ),
    },
  ];

  const lineConfig = {
    data: performanceData,
    xField: 'date',
    yField: 'value',
    seriesField: 'metric',
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

  return (
    <div className={styles.container}>
      <Title level={2}>AI Configuration</Title>

      <Spin spinning={loading}>
        <Row gutter={[16, 16]} className={styles.statsRow}>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title='Active AI Models'
                value={modelConfigs.filter((m) => m.status === 'active').length}
                valueStyle={{ color: '#4F46E5' }}
                prefix={<RobotOutlined />}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title='Average Response Time'
                value={1.2}
                precision={1}
                valueStyle={{ color: '#10B981' }}
                prefix={<ClockCircleOutlined />}
                suffix='s'
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card>
              <Statistic
                title='Knowledge Base Size'
                value={1250}
                valueStyle={{ color: '#F59E0B' }}
                prefix={<FileTextOutlined />}
                suffix='MB'
              />
            </Card>
          </Col>
        </Row>

        <Card className={styles.performanceCard}>
          <Title level={4}>AI Performance Metrics</Title>
          <Line {...lineConfig} />
        </Card>

        <Tabs defaultActiveKey='1' className={styles.tabs}>
          <TabPane
            tab={
              <span>
                <RobotOutlined />
                Model Configuration
              </span>
            }
            key='1'
          >
            <Card>
              <Alert
                message='Active Model: GPT-4o'
                description='This model is currently serving all AI tutor requests.'
                type='info'
                showIcon
                icon={<InfoCircleOutlined />}
                className={styles.alert}
              />

              <Table
                columns={columns}
                dataSource={modelConfigs}
                rowKey='id'
                pagination={false}
              />

              <Divider />

              <Title level={4}>Model Parameters</Title>
              <Form
                form={form}
                layout='vertical'
                initialValues={{
                  temperature: 0.7,
                  maxTokens: 2048,
                  topP: 0.9,
                  frequencyPenalty: 0.5,
                  presencePenalty: 0.5,
                }}
                onFinish={handleSaveModelConfig}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='temperature'
                      label={
                        <Space>
                          <span>Temperature</span>
                          <Tooltip title='Controls randomness: Lower values make responses more focused and deterministic, higher values make responses more creative and diverse.'>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Space>
                      }
                    >
                      <Slider min={0} max={1} step={0.1} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='maxTokens'
                      label={
                        <Space>
                          <span>Max Tokens</span>
                          <Tooltip title='The maximum number of tokens to generate in the response.'>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Space>
                      }
                    >
                      <Slider min={256} max={4096} step={256} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='topP'
                      label={
                        <Space>
                          <span>Top P</span>
                          <Tooltip title='Controls diversity via nucleus sampling: 0.5 means half of all likelihood-weighted options are considered.'>
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Space>
                      }
                    >
                      <Slider min={0} max={1} step={0.1} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='frequencyPenalty'
                      label={
                        <Space>
                          <span>Frequency Penalty</span>
                          <Tooltip title="Decreases the model's likelihood to repeat the same line verbatim.">
                            <InfoCircleOutlined />
                          </Tooltip>
                        </Space>
                      }
                    >
                      <Slider min={0} max={2} step={0.1} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name='presencePenalty'
                  label={
                    <Space>
                      <span>Presence Penalty</span>
                      <Tooltip title="Increases the model's likelihood to talk about new topics.">
                        <InfoCircleOutlined />
                      </Tooltip>
                    </Space>
                  }
                >
                  <Slider min={0} max={2} step={0.1} />
                </Form.Item>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    icon={<SaveOutlined />}
                  >
                    Save Model Configuration
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <DatabaseOutlined />
                Knowledge Base
              </span>
            }
            key='2'
          >
            <Card>
              <div className={styles.knowledgeBaseStats}>
                <Statistic
                  title='Total Documents'
                  value={1250}
                  prefix={<FileTextOutlined />}
                />
                <Statistic
                  title='Last Updated'
                  value='2025-03-05'
                  prefix={<ClockCircleOutlined />}
                />
                <Statistic
                  title='Index Status'
                  value='Healthy'
                  valueStyle={{ color: '#52c41a' }}
                  prefix={<CheckCircleOutlined />}
                />
              </div>

              <Divider />

              <div className={styles.knowledgeBaseActions}>
                <Button type='primary' icon={<SyncOutlined />}>
                  Update Knowledge Base
                </Button>
                <Button icon={<FileTextOutlined />}>Upload Documents</Button>
                <Button icon={<LineChartOutlined />}>View Analytics</Button>
              </div>

              <Divider />

              <Title level={4}>Knowledge Sources</Title>
              <Paragraph>
                Configure the sources that the AI tutor uses to provide
                information and answer questions.
              </Paragraph>

              <Form layout='vertical'>
                <Form.Item
                  label='Academic Databases'
                  name='academicDatabases'
                  initialValue={['jstor', 'googleScholar', 'pubMed']}
                >
                  <Select
                    mode='multiple'
                    placeholder='Select academic databases'
                  >
                    <Option value='jstor'>JSTOR</Option>
                    <Option value='googleScholar'>Google Scholar</Option>
                    <Option value='pubMed'>PubMed</Option>
                    <Option value='arxiv'>arXiv</Option>
                    <Option value='ieee'>IEEE Xplore</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label='Textbooks'
                  name='textbooks'
                  initialValue={true}
                >
                  <Switch defaultChecked />
                </Form.Item>

                <Form.Item
                  label='Educational Websites'
                  name='educationalWebsites'
                  initialValue={true}
                >
                  <Switch defaultChecked />
                </Form.Item>

                <Form.Item
                  label='Custom Knowledge Base'
                  name='customKnowledgeBase'
                  initialValue={true}
                >
                  <Switch defaultChecked />
                </Form.Item>

                <Form.Item>
                  <Button type='primary' icon={<SaveOutlined />}>
                    Save Knowledge Base Configuration
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <SettingOutlined />
                System Settings
              </span>
            }
            key='3'
          >
            <Card>
              <Alert
                message='System Status: Operational'
                description='All AI systems are functioning normally.'
                type='success'
                showIcon
                icon={<CheckCircleOutlined />}
                className={styles.alert}
              />

              <Form
                form={systemForm}
                layout='vertical'
                initialValues={{
                  maxConcurrentUsers: 1000,
                  requestTimeout: 30,
                  maxResponseLength: 2000,
                  loggingLevel: 'info',
                  enableCaching: true,
                  enableRateLimiting: true,
                  rateLimitRequests: 100,
                  rateLimitPeriod: 60,
                }}
                onFinish={handleSaveSystemConfig}
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='maxConcurrentUsers'
                      label='Max Concurrent Users'
                      rules={[{ required: true }]}
                    >
                      <Input type='number' min={100} max={10000} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='requestTimeout'
                      label='Request Timeout (seconds)'
                      rules={[{ required: true }]}
                    >
                      <Input type='number' min={5} max={120} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='maxResponseLength'
                      label='Max Response Length (tokens)'
                      rules={[{ required: true }]}
                    >
                      <Input type='number' min={500} max={4000} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='loggingLevel'
                      label='Logging Level'
                      rules={[{ required: true }]}
                    >
                      <Select>
                        <Option value='debug'>Debug</Option>
                        <Option value='info'>Info</Option>
                        <Option value='warn'>Warning</Option>
                        <Option value='error'>Error</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='enableCaching'
                      label='Enable Response Caching'
                      valuePropName='checked'
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='enableRateLimiting'
                      label='Enable Rate Limiting'
                      valuePropName='checked'
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='rateLimitRequests'
                      label='Rate Limit Requests'
                      rules={[{ required: true }]}
                    >
                      <Input type='number' min={10} max={1000} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name='rateLimitPeriod'
                      label='Rate Limit Period (seconds)'
                      rules={[{ required: true }]}
                    >
                      <Input type='number' min={10} max={3600} />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                  <Button
                    type='primary'
                    htmlType='submit'
                    icon={<SaveOutlined />}
                  >
                    Save System Configuration
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>

          <TabPane
            tab={
              <span>
                <ApiOutlined />
                API Integration
              </span>
            }
            key='4'
          >
            <Card>
              <Alert
                message='API Status: Active'
                description='All API endpoints are functioning normally.'
                type='success'
                showIcon
                icon={<CheckCircleOutlined />}
                className={styles.alert}
              />

              <Title level={4}>API Keys</Title>
              <Paragraph>
                Manage API keys for external integrations with the AI tutor
                system.
              </Paragraph>

              <div className={styles.apiKeySection}>
                <div className={styles.apiKey}>
                  <div>
                    <Text strong>Production API Key</Text>
                    <div className={styles.apiKeyValue}>
                      <Input.Password
                        value='sk_prod_2025_abcdefghijklmnopqrstuvwxyz'
                        readOnly
                      />
                      <Button>Copy</Button>
                      <Button danger>Regenerate</Button>
                    </div>
                  </div>
                </div>

                <div className={styles.apiKey}>
                  <div>
                    <Text strong>Development API Key</Text>
                    <div className={styles.apiKeyValue}>
                      <Input.Password
                        value='sk_dev_2025_zyxwvutsrqponmlkjihgfedcba'
                        readOnly
                      />
                      <Button>Copy</Button>
                      <Button danger>Regenerate</Button>
                    </div>
                  </div>
                </div>
              </div>

              <Divider />

              <Title level={4}>Webhook Configuration</Title>
              <Paragraph>
                Configure webhooks to receive notifications about AI tutor
                events.
              </Paragraph>

              <Form layout='vertical'>
                <Form.Item
                  label='Webhook URL'
                  name='webhookUrl'
                  initialValue='https://example.com/webhook'
                >
                  <Input placeholder='https://your-domain.com/webhook' />
                </Form.Item>

                <Form.Item
                  label='Webhook Events'
                  name='webhookEvents'
                  initialValue={[
                    'ai.response.created',
                    'user.feedback.submitted',
                  ]}
                >
                  <Select mode='multiple' placeholder='Select events'>
                    <Option value='ai.response.created'>
                      AI Response Created
                    </Option>
                    <Option value='user.feedback.submitted'>
                      User Feedback Submitted
                    </Option>
                    <Option value='user.session.started'>
                      User Session Started
                    </Option>
                    <Option value='user.session.ended'>
                      User Session Ended
                    </Option>
                    <Option value='system.error'>System Error</Option>
                  </Select>
                </Form.Item>

                <Form.Item label='Webhook Secret' name='webhookSecret'>
                  <Input.Password placeholder='Webhook secret for signature verification' />
                </Form.Item>

                <Form.Item>
                  <Button type='primary'>Save Webhook Configuration</Button>
                  <Button style={{ marginLeft: 8 }}>Test Webhook</Button>
                </Form.Item>
              </Form>
            </Card>
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};

export default AIConfiguration;
