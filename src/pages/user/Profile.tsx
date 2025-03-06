import { useState } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Tabs,
  Button,
  Row,
  Col,
  Statistic,
  Progress,
  List,
  Tag,
  Form,
  Input,
  Select,
  Upload,
  message,
  Divider,
  Switch,
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  SettingOutlined,
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  BellOutlined,
  LockOutlined,
  CreditCardOutlined,
  GlobalOutlined,
  UploadOutlined,
  FireOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import styles from './Profile.module.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  icon: React.ReactNode;
}

interface Subject {
  name: string;
  progress: number;
  level: string;
  hours: number;
}

const Profile = () => {
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [form] = Form.useForm();

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Math Master',
      description: 'Completed 50 math problems with 90% accuracy',
      date: 'Mar 1, 2025',
      icon: <TrophyOutlined style={{ color: '#F59E0B' }} />,
    },
    {
      id: '2',
      title: 'Study Streak',
      description: 'Maintained a 30-day study streak',
      date: 'Feb 15, 2025',
      icon: <FireOutlined style={{ color: '#EF4444' }} />,
    },
    {
      id: '3',
      title: 'Quiz Champion',
      description: 'Scored 100% on 5 consecutive quizzes',
      date: 'Jan 20, 2025',
      icon: <TrophyOutlined style={{ color: '#8B5CF6' }} />,
    },
    {
      id: '4',
      title: 'Early Bird',
      description: 'Completed 20 study sessions before 9 AM',
      date: 'Jan 5, 2025',
      icon: <ClockCircleOutlined style={{ color: '#10B981' }} />,
    },
  ];

  const subjects: Subject[] = [
    {
      name: 'Mathematics',
      progress: 75,
      level: 'Advanced',
      hours: 42,
    },
    {
      name: 'Physics',
      progress: 60,
      level: 'Intermediate',
      hours: 28,
    },
    {
      name: 'Computer Science',
      progress: 90,
      level: 'Advanced',
      hours: 56,
    },
    {
      name: 'History',
      progress: 40,
      level: 'Beginner',
      hours: 18,
    },
  ];

  const handleEditProfile = () => {
    setEditMode(true);
    form.setFieldsValue({
      name: user?.name,
      email: user?.email,
      bio: 'Computer Science student passionate about AI and machine learning.',
      language: 'english',
      notifications: true,
      darkMode: localStorage.getItem('darkMode') === 'true',
    });
  };

  const handleSaveProfile = () => {
    form
      .validateFields()
      .then((values) => {
        message.success('Profile updated successfully!');
        setEditMode(false);
        // In a real app, you would update the user profile in the backend
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  const handleUploadAvatar = (info: any) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleDarkModeToggle = (checked: boolean) => {
    localStorage.setItem('darkMode', String(checked));
    if (checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <Avatar
                size={100}
                src={user?.avatar}
                icon={<UserOutlined />}
                className={styles.avatar}
              />
              {!editMode && (
                <div className={styles.profileInfo}>
                  <Title level={3}>{user?.name}</Title>
                  <Text type='secondary'>{user?.email}</Text>
                  <Paragraph className={styles.bio}>
                    Computer Science student passionate about AI and machine
                    learning.
                  </Paragraph>
                  <div className={styles.stats}>
                    <div className={styles.stat}>
                      <Text strong>30</Text>
                      <Text type='secondary'>Day Streak</Text>
                    </div>
                    <div className={styles.stat}>
                      <Text strong>145</Text>
                      <Text type='secondary'>Hours</Text>
                    </div>
                    <div className={styles.stat}>
                      <Text strong>4</Text>
                      <Text type='secondary'>Subjects</Text>
                    </div>
                  </div>
                  <Button
                    type='primary'
                    icon={<EditOutlined />}
                    onClick={handleEditProfile}
                    className={styles.editButton}
                  >
                    Edit Profile
                  </Button>
                </div>
              )}

              {editMode && (
                <Form form={form} layout='vertical' className={styles.editForm}>
                  <Form.Item name='avatar' label='Profile Picture'>
                    <Upload
                      name='avatar'
                      listType='picture-card'
                      className={styles.avatarUploader}
                      showUploadList={false}
                      action='https://www.mocky.io/v2/5cc8019d300000980a055e76'
                      onChange={handleUploadAvatar}
                    >
                      <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                      </div>
                    </Upload>
                  </Form.Item>

                  <Form.Item
                    name='name'
                    label='Name'
                    rules={[
                      { required: true, message: 'Please enter your name' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    name='email'
                    label='Email'
                    rules={[
                      { required: true, message: 'Please enter your email' },
                      { type: 'email', message: 'Please enter a valid email' },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item name='bio' label='Bio'>
                    <Input.TextArea rows={3} />
                  </Form.Item>

                  <div className={styles.formActions}>
                    <Button onClick={handleCancelEdit}>Cancel</Button>
                    <Button type='primary' onClick={handleSaveProfile}>
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </div>
          </Card>

          <Card
            title={
              <span>
                <TrophyOutlined /> Achievements
              </span>
            }
            className={styles.achievementsCard}
          >
            <List
              itemLayout='horizontal'
              dataSource={achievements}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <div className={styles.achievementIcon}>{item.icon}</div>
                    }
                    title={item.title}
                    description={
                      <div>
                        <div>{item.description}</div>
                        <Text type='secondary'>{item.date}</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} md={16}>
          <Card className={styles.tabsCard}>
            <Tabs defaultActiveKey='1'>
              <TabPane
                tab={
                  <span>
                    <BookOutlined />
                    Learning Progress
                  </span>
                }
                key='1'
              >
                <div className={styles.subjectsGrid}>
                  {subjects.map((subject) => (
                    <Card key={subject.name} className={styles.subjectCard}>
                      <div className={styles.subjectHeader}>
                        <Title level={4}>{subject.name}</Title>
                        <Tag color='blue'>{subject.level}</Tag>
                      </div>
                      <div className={styles.subjectProgress}>
                        <div className={styles.progressLabel}>
                          <Text>Progress</Text>
                          <Text strong>{subject.progress}%</Text>
                        </div>
                        <Progress percent={subject.progress} showInfo={false} />
                      </div>
                      <div className={styles.subjectStats}>
                        <Statistic
                          title='Study Hours'
                          value={subject.hours}
                          suffix='hrs'
                          valueStyle={{ fontSize: '1.5rem' }}
                        />
                      </div>
                    </Card>
                  ))}
                </div>
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <SettingOutlined />
                    Settings
                  </span>
                }
                key='2'
              >
                <div className={styles.settingsSection}>
                  <Title level={4}>Account Settings</Title>
                  <Form layout='vertical'>
                    <Form.Item label='Language'>
                      <Select defaultValue='english' style={{ width: 200 }}>
                        <Option value='english'>English</Option>
                        <Option value='spanish'>Spanish</Option>
                        <Option value='french'>French</Option>
                        <Option value='german'>German</Option>
                        <Option value='chinese'>Chinese</Option>
                      </Select>
                    </Form.Item>

                    <Form.Item label='Notifications'>
                      <Switch defaultChecked />
                      <Text type='secondary' style={{ marginLeft: 8 }}>
                        Receive notifications about study reminders and updates
                      </Text>
                    </Form.Item>

                    <Form.Item label='Dark Mode'>
                      <Switch
                        defaultChecked={
                          localStorage.getItem('darkMode') === 'true'
                        }
                        onChange={handleDarkModeToggle}
                      />
                      <Text type='secondary' style={{ marginLeft: 8 }}>
                        Enable dark mode for better night-time viewing
                      </Text>
                    </Form.Item>
                  </Form>
                </div>

                <Divider />

                <div className={styles.settingsSection}>
                  <Title level={4}>Subscription</Title>
                  <div className={styles.subscriptionInfo}>
                    <div className={styles.subscriptionDetails}>
                      <Text strong>Current Plan: Premium</Text>
                      <Text type='secondary'>Renews on April 15, 2025</Text>
                    </div>
                    <Button type='primary'>Manage Subscription</Button>
                  </div>
                </div>

                <Divider />

                <div className={styles.settingsSection}>
                  <Title level={4}>Security</Title>
                  <Button icon={<LockOutlined />}>Change Password</Button>
                </div>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
