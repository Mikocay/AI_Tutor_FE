import { useState } from 'react';
import {
  Calendar,
  Badge,
  Card,
  Typography,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  TimePicker,
  Row,
  Col,
  Tabs,
  List,
  Tag,
  Tooltip,
} from 'antd';
import {
  PlusOutlined,
  ClockCircleOutlined,
  BookOutlined,
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  CalendarOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import styles from './StudyPlanner.module.css';
import { Checkbox } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;

interface StudySession {
  id: string;
  title: string;
  subject: string;
  date: string;
  startTime: string;
  endTime: string;
  completed: boolean;
  description?: string;
}

interface Goal {
  id: string;
  title: string;
  deadline: string;
  progress: number;
  subject: string;
}

const StudyPlanner = () => {
  const [sessions, setSessions] = useState<StudySession[]>([
    {
      id: '1',
      title: 'Math Calculus Review',
      subject: 'Mathematics',
      date: '2025-03-06',
      startTime: '09:00',
      endTime: '10:30',
      completed: false,
      description: 'Review differential equations and practice problems',
    },
    {
      id: '2',
      title: 'Physics Lab Preparation',
      subject: 'Physics',
      date: '2025-03-06',
      startTime: '13:00',
      endTime: '14:30',
      completed: true,
      description: 'Prepare for upcoming lab experiment on wave properties',
    },
    {
      id: '3',
      title: 'History Essay Research',
      subject: 'History',
      date: '2025-03-07',
      startTime: '10:00',
      endTime: '12:00',
      completed: false,
      description: 'Research sources for the Renaissance period essay',
    },
    {
      id: '4',
      title: 'Programming Assignment',
      subject: 'Computer Science',
      date: '2025-03-08',
      startTime: '15:00',
      endTime: '17:00',
      completed: false,
      description: 'Complete the data structures assignment',
    },
  ]);

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete Calculus Course',
      deadline: '2025-04-15',
      progress: 65,
      subject: 'Mathematics',
    },
    {
      id: '2',
      title: 'Finish Programming Project',
      deadline: '2025-03-20',
      progress: 40,
      subject: 'Computer Science',
    },
    {
      id: '3',
      title: 'Prepare for History Exam',
      deadline: '2025-03-25',
      progress: 25,
      subject: 'History',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isGoalModalVisible, setIsGoalModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [goalForm] = Form.useForm();
  const [editingSession, setEditingSession] = useState<StudySession | null>(
    null
  );
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const subjectColors: Record<string, string> = {
    Mathematics: 'blue',
    Physics: 'purple',
    Chemistry: 'green',
    Biology: 'cyan',
    History: 'orange',
    Literature: 'magenta',
    'Computer Science': 'geekblue',
    Languages: 'red',
    Other: 'default',
  };

  const dateCellRender = (value: Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const listData = sessions.filter((session) => session.date === dateStr);

    return (
      <ul className={styles.events}>
        {listData.map((item) => (
          <li key={item.id}>
            <Badge
              status={item.completed ? 'success' : 'processing'}
              text={<span className={styles.eventText}>{item.title}</span>}
              color={subjectColors[item.subject] || 'blue'}
            />
          </li>
        ))}
      </ul>
    );
  };

  const showModal = (session?: StudySession) => {
    setEditingSession(session || null);
    if (session) {
      form.setFieldsValue({
        ...session,
        time: [
          dayjs(session.startTime, 'HH:mm'),
          dayjs(session.endTime, 'HH:mm'),
        ],
        date: dayjs(session.date),
      });
    } else {
      form.resetFields();
      form.setFieldsValue({
        date: dayjs(),
      });
    }
    setIsModalVisible(true);
  };

  const showGoalModal = (goal?: Goal) => {
    setEditingGoal(goal || null);
    if (goal) {
      goalForm.setFieldsValue({
        ...goal,
        deadline: dayjs(goal.deadline),
      });
    } else {
      goalForm.resetFields();
    }
    setIsGoalModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingSession(null);
  };

  const handleGoalCancel = () => {
    setIsGoalModalVisible(false);
    setEditingGoal(null);
  };

  const handleSubmit = (values: any) => {
    const newSession: StudySession = {
      id: editingSession ? editingSession.id : Date.now().toString(),
      title: values.title,
      subject: values.subject,
      date: values.date.format('YYYY-MM-DD'),
      startTime: values.time[0].format('HH:mm'),
      endTime: values.time[1].format('HH:mm'),
      completed: values.completed || false,
      description: values.description,
    };

    if (editingSession) {
      setSessions(
        sessions.map((s) => (s.id === editingSession.id ? newSession : s))
      );
    } else {
      setSessions([...sessions, newSession]);
    }

    setIsModalVisible(false);
    setEditingSession(null);
  };

  const handleGoalSubmit = (values: any) => {
    const newGoal: Goal = {
      id: editingGoal ? editingGoal.id : Date.now().toString(),
      title: values.title,
      subject: values.subject,
      deadline: values.deadline.format('YYYY-MM-DD'),
      progress: values.progress || 0,
    };

    if (editingGoal) {
      setGoals(goals.map((g) => (g.id === editingGoal.id ? newGoal : g)));
    } else {
      setGoals([...goals, newGoal]);
    }

    setIsGoalModalVisible(false);
    setEditingGoal(null);
  };

  const deleteSession = (id: string) => {
    setSessions(sessions.filter((session) => session.id !== id));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
  };

  const toggleComplete = (id: string) => {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  };

  const todaySessions = sessions.filter(
    (session) => session.date === dayjs().format('YYYY-MM-DD')
  );

  const upcomingSessions = sessions
    .filter(
      (session) =>
        dayjs(session.date).isAfter(dayjs(), 'day') && !session.completed
    )
    .sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className={styles.calendarCard}>
            <div className={styles.calendarHeader}>
              <Title level={4}>Study Calendar</Title>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => showModal()}
              >
                Add Session
              </Button>
            </div>
            <Calendar
              dateCellRender={dateCellRender}
              className={styles.calendar}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className={styles.sessionsCard}>
            <Tabs defaultActiveKey='1'>
              <TabPane
                tab={
                  <span>
                    <ClockCircleOutlined />
                    Today
                  </span>
                }
                key='1'
              >
                <div className={styles.sessionsList}>
                  {todaySessions.length > 0 ? (
                    <List
                      itemLayout='horizontal'
                      dataSource={todaySessions}
                      renderItem={(item) => (
                        <List.Item
                          key={item.id}
                          actions={[
                            <Tooltip
                              title={
                                item.completed
                                  ? 'Mark as incomplete'
                                  : 'Mark as complete'
                              }
                            >
                              <Button
                                type='text'
                                icon={
                                  item.completed ? (
                                    <CheckCircleOutlined
                                      style={{ color: '#52c41a' }}
                                    />
                                  ) : (
                                    <CheckCircleOutlined />
                                  )
                                }
                                onClick={() => toggleComplete(item.id)}
                              />
                            </Tooltip>,
                            <Tooltip title='Edit'>
                              <Button
                                type='text'
                                icon={<EditOutlined />}
                                onClick={() => showModal(item)}
                              />
                            </Tooltip>,
                            <Tooltip title='Delete'>
                              <Button
                                type='text'
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => deleteSession(item.id)}
                              />
                            </Tooltip>,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <div className={styles.sessionTitle}>
                                <Text
                                  style={{
                                    textDecoration: item.completed
                                      ? 'line-through'
                                      : 'none',
                                    opacity: item.completed ? 0.6 : 1,
                                  }}
                                >
                                  {item.title}
                                </Text>
                                <Tag color={subjectColors[item.subject]}>
                                  {item.subject}
                                </Tag>
                              </div>
                            }
                            description={
                              <div>
                                <div className={styles.sessionTime}>
                                  <ClockCircleOutlined /> {item.startTime} -{' '}
                                  {item.endTime}
                                </div>
                                {item.description && (
                                  <div className={styles.sessionDesc}>
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <div className={styles.emptyState}>
                      <Text type='secondary'>
                        No study sessions scheduled for today
                      </Text>
                      <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => showModal()}
                        className={styles.emptyButton}
                      >
                        Add Session
                      </Button>
                    </div>
                  )}
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CalendarOutlined />
                    Upcoming
                  </span>
                }
                key='2'
              >
                <div className={styles.sessionsList}>
                  {upcomingSessions.length > 0 ? (
                    <List
                      itemLayout='horizontal'
                      dataSource={upcomingSessions}
                      renderItem={(item) => (
                        <List.Item
                          key={item.id}
                          actions={[
                            <Tooltip title='Edit'>
                              <Button
                                type='text'
                                icon={<EditOutlined />}
                                onClick={() => showModal(item)}
                              />
                            </Tooltip>,
                            <Tooltip title='Delete'>
                              <Button
                                type='text'
                                danger
                                icon={<DeleteOutlined />}
                                onClick={() => deleteSession(item.id)}
                              />
                            </Tooltip>,
                          ]}
                        >
                          <List.Item.Meta
                            title={
                              <div className={styles.sessionTitle}>
                                <Text>{item.title}</Text>
                                <Tag color={subjectColors[item.subject]}>
                                  {item.subject}
                                </Tag>
                              </div>
                            }
                            description={
                              <div>
                                <div className={styles.sessionDate}>
                                  <CalendarOutlined />{' '}
                                  {dayjs(item.date).format('MMM D, YYYY')}
                                </div>
                                <div className={styles.sessionTime}>
                                  <ClockCircleOutlined /> {item.startTime} -{' '}
                                  {item.endTime}
                                </div>
                                {item.description && (
                                  <div className={styles.sessionDesc}>
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            }
                          />
                        </List.Item>
                      )}
                    />
                  ) : (
                    <div className={styles.emptyState}>
                      <Text type='secondary'>No upcoming study sessions</Text>
                      <Button
                        type='primary'
                        icon={<PlusOutlined />}
                        onClick={() => showModal()}
                        className={styles.emptyButton}
                      >
                        Add Session
                      </Button>
                    </div>
                  )}
                </div>
              </TabPane>
            </Tabs>
          </Card>

          <Card className={styles.goalsCard}>
            <div className={styles.goalsHeader}>
              <Title level={4}>Study Goals</Title>
              <Button
                type='primary'
                icon={<PlusOutlined />}
                onClick={() => showGoalModal()}
              >
                Add Goal
              </Button>
            </div>
            <div className={styles.goalsList}>
              {goals.length > 0 ? (
                <List
                  itemLayout='horizontal'
                  dataSource={goals}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      actions={[
                        <Tooltip title='Edit'>
                          <Button
                            type='text'
                            icon={<EditOutlined />}
                            onClick={() => showGoalModal(item)}
                          />
                        </Tooltip>,
                        <Tooltip title='Delete'>
                          <Button
                            type='text'
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => deleteGoal(item.id)}
                          />
                        </Tooltip>,
                      ]}
                    >
                      <List.Item.Meta
                        title={
                          <div className={styles.goalTitle}>
                            <Text>{item.title}</Text>
                            <Tag color={subjectColors[item.subject]}>
                              {item.subject}
                            </Tag>
                          </div>
                        }
                        description={
                          <div>
                            <div className={styles.goalDeadline}>
                              <CalendarOutlined /> Deadline:{' '}
                              {dayjs(item.deadline).format('MMM D, YYYY')}
                            </div>
                            <div className={styles.goalProgress}>
                              <div className={styles.progressLabel}>
                                <Text>Progress: {item.progress}%</Text>
                              </div>
                              <div className={styles.progressBar}>
                                <div
                                  className={styles.progressFill}
                                  style={{ width: `${item.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              ) : (
                <div className={styles.emptyState}>
                  <Text type='secondary'>No study goals set</Text>
                  <Button
                    type='primary'
                    icon={<PlusOutlined />}
                    onClick={() => showGoalModal()}
                    className={styles.emptyButton}
                  >
                    Add Goal
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Study Session Modal */}
      <Modal
        title={editingSession ? 'Edit Study Session' : 'Add Study Session'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            name='title'
            label='Session Title'
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder='e.g., Math Review' />
          </Form.Item>

          <Form.Item
            name='subject'
            label='Subject'
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select placeholder='Select a subject'>
              {Object.keys(subjectColors).map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='date'
            label='Date'
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name='time'
            label='Time'
            rules={[{ required: true, message: 'Please select a time range' }]}
          >
            <TimePicker.RangePicker format='HH:mm' style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item name='description' label='Description'>
            <Input.TextArea
              placeholder='Add details about this study session'
              rows={3}
            />
          </Form.Item>

          {editingSession && (
            <Form.Item name='completed' valuePropName='checked'>
              <Checkbox>Mark as completed</Checkbox>
            </Form.Item>
          )}

          <Form.Item>
            <div className={styles.modalButtons}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                {editingSession ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* Goal Modal */}
      <Modal
        title={editingGoal ? 'Edit Study Goal' : 'Add Study Goal'}
        open={isGoalModalVisible}
        onCancel={handleGoalCancel}
        footer={null}
      >
        <Form form={goalForm} layout='vertical' onFinish={handleGoalSubmit}>
          <Form.Item
            name='title'
            label='Goal Title'
            rules={[{ required: true, message: 'Please enter a title' }]}
          >
            <Input placeholder='e.g., Complete Calculus Course' />
          </Form.Item>

          <Form.Item
            name='subject'
            label='Subject'
            rules={[{ required: true, message: 'Please select a subject' }]}
          >
            <Select placeholder='Select a subject'>
              {Object.keys(subjectColors).map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name='deadline'
            label='Deadline'
            rules={[{ required: true, message: 'Please select a deadline' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name='progress'
            label='Progress (%)'
            rules={[
              { required: true, message: 'Please enter progress' },
              {
                type: 'number',
                min: 0,
                max: 100,
                message: 'Progress must be between 0 and 100',
              },
            ]}
          >
            <Input type='number' min={0} max={100} />
          </Form.Item>

          <Form.Item>
            <div className={styles.modalButtons}>
              <Button onClick={handleGoalCancel}>Cancel</Button>
              <Button type='primary' htmlType='submit'>
                {editingGoal ? 'Update' : 'Create'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default StudyPlanner;
