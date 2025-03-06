import { useState, useEffect } from 'react';
import {
  Table,
  Card,
  Input,
  Button,
  Tag,
  Space,
  Modal,
  Form,
  Select,
  Avatar,
  Typography,
  Dropdown,
  Menu,
  Badge,
  Tabs,
} from 'antd';
import {
  SearchOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
  MailOutlined,
  FilterOutlined,
  ExportOutlined,
  ImportOutlined,
  PlusOutlined,
  EllipsisOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from './UserManagement.module.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  registrationDate: string;
  subscription: string;
  avatar?: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setUsers(generateMockUsers());
      setLoading(false);
    }, 1000);
  }, []);

  const generateMockUsers = (): User[] => {
    return [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'student',
        status: 'active',
        lastLogin: '2025-03-05 14:30',
        registrationDate: '2024-12-10',
        subscription: 'Premium',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'student',
        status: 'active',
        lastLogin: '2025-03-06 09:15',
        registrationDate: '2025-01-05',
        subscription: 'Basic',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      {
        id: '3',
        name: 'Robert Johnson',
        email: 'robert.johnson@example.com',
        role: 'teacher',
        status: 'active',
        lastLogin: '2025-03-04 16:45',
        registrationDate: '2024-11-20',
        subscription: 'Premium',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'student',
        status: 'inactive',
        lastLogin: '2025-02-15 10:30',
        registrationDate: '2025-01-15',
        subscription: 'Free',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      {
        id: '5',
        name: 'Michael Wilson',
        email: 'michael.wilson@example.com',
        role: 'student',
        status: 'suspended',
        lastLogin: '2025-02-28 13:20',
        registrationDate: '2024-12-05',
        subscription: 'Basic',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      {
        id: '6',
        name: 'Sarah Thompson',
        email: 'sarah.thompson@example.com',
        role: 'teacher',
        status: 'active',
        lastLogin: '2025-03-06 11:10',
        registrationDate: '2024-10-30',
        subscription: 'Premium',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      {
        id: '7',
        name: 'David Lee',
        email: 'david.lee@example.com',
        role: 'student',
        status: 'active',
        lastLogin: '2025-03-05 15:45',
        registrationDate: '2025-02-01',
        subscription: 'Free',
        avatar: '/placeholder.svg?height=40&width=40',
      },
    ];
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      subscription: user.subscription,
    });
    setIsModalVisible(true);
  };

  const handleDeleteUser = (userId: string) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this user?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        setUsers(users.filter((user) => user.id !== userId));
      },
    });
  };

  const handleStatusChange = (userId: string, newStatus: User['status']) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentUser(null);
  };

  const handleModalSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (currentUser) {
          setUsers(
            users.map((user) =>
              user.id === currentUser.id ? { ...user, ...values } : user
            )
          );
        }
        setIsModalVisible(false);
        setCurrentUser(null);
      })
      .catch((errorInfo) => {
        console.log('Validation failed:', errorInfo);
      });
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const getStatusTag = (status: User['status']) => {
    if (status === 'active') return <Tag color='green'>Active</Tag>;
    if (status === 'inactive') return <Tag color='orange'>Inactive</Tag>;
    return <Tag color='red'>Suspended</Tag>;
  };

  const getRoleTag = (role: string) => {
    if (role === 'student') return <Tag color='blue'>Student</Tag>;
    if (role === 'teacher') return <Tag color='purple'>Teacher</Tag>;
    return <Tag color='cyan'>Admin</Tag>;
  };

  const getSubscriptionTag = (subscription: string) => {
    if (subscription === 'Premium') return <Tag color='gold'>Premium</Tag>;
    if (subscription === 'Basic') return <Tag color='blue'>Basic</Tag>;
    return <Tag>Free</Tag>;
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<User> = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (_, user) => (
        <div className={styles.userCell}>
          <Avatar src={user.avatar} icon={<UserOutlined />} />
          <div className={styles.userInfo}>
            <Text strong>{user.name}</Text>
            <Text type='secondary'>{user.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => getRoleTag(role),
      filters: [
        { text: 'Student', value: 'student' },
        { text: 'Teacher', value: 'teacher' },
        { text: 'Admin', value: 'admin' },
      ],
      onFilter: (value, record) => record.role === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Inactive', value: 'inactive' },
        { text: 'Suspended', value: 'suspended' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Subscription',
      dataIndex: 'subscription',
      key: 'subscription',
      render: (subscription) => getSubscriptionTag(subscription),
      filters: [
        { text: 'Premium', value: 'Premium' },
        { text: 'Basic', value: 'Basic' },
        { text: 'Free', value: 'Free' },
      ],
      onFilter: (value, record) => record.subscription === value,
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      sorter: (a, b) =>
        new Date(a.lastLogin).getTime() - new Date(b.lastLogin).getTime(),
    },
    {
      title: 'Registration Date',
      dataIndex: 'registrationDate',
      key: 'registrationDate',
      sorter: (a, b) =>
        new Date(a.registrationDate).getTime() -
        new Date(b.registrationDate).getTime(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, user) => (
        <Space size='small'>
          <Button
            type='text'
            icon={<EditOutlined />}
            onClick={() => handleEditUser(user)}
          />
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'View Details',
                  icon: <UserOutlined />,
                },
                {
                  key: '2',
                  label: 'Send Email',
                  icon: <MailOutlined />,
                },
                user.status === 'active'
                  ? {
                      key: '3',
                      label: 'Suspend',
                      icon: <LockOutlined />,
                      danger: true,
                      onClick: () => handleStatusChange(user.id, 'suspended'),
                    }
                  : {
                      key: '3',
                      label: 'Activate',
                      icon: <UnlockOutlined />,
                      onClick: () => handleStatusChange(user.id, 'active'),
                    },
                {
                  key: '4',
                  label: 'Delete',
                  icon: <DeleteOutlined />,
                  danger: true,
                  onClick: () => handleDeleteUser(user.id),
                },
              ],
            }}
          >
            <Button type='text' icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title level={2}>User Management</Title>
        <div className={styles.actions}>
          <Input
            placeholder='Search users'
            prefix={<SearchOutlined />}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
          <Button
            type='primary'
            icon={<PlusOutlined />}
            onClick={handleAddUser}
          >
            Add User
          </Button>
          <Dropdown
            menu={{
              items: [
                {
                  key: '1',
                  label: 'Export Users',
                  icon: <ExportOutlined />,
                },
                {
                  key: '2',
                  label: 'Import Users',
                  icon: <ImportOutlined />,
                },
              ],
            }}
          >
            <Button icon={<FilterOutlined />}>More Actions</Button>
          </Dropdown>
        </div>
      </div>

      <Card>
        <Tabs defaultActiveKey='1'>
          <TabPane
            tab={
              <span>
                <Badge
                  count={users.filter((u) => u.status === 'active').length}
                  overflowCount={999}
                >
                  <span>Active Users</span>
                </Badge>
              </span>
            }
            key='1'
          >
            <Table
              columns={columns}
              dataSource={filteredUsers.filter((u) => u.status === 'active')}
              loading={loading}
              rowKey='id'
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <Badge
                  count={users.filter((u) => u.status !== 'active').length}
                  overflowCount={999}
                >
                  <span>Inactive/Suspended</span>
                </Badge>
              </span>
            }
            key='2'
          >
            <Table
              columns={columns}
              dataSource={filteredUsers.filter((u) => u.status !== 'active')}
              loading={loading}
              rowKey='id'
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
          <TabPane tab='All Users' key='3'>
            <Table
              columns={columns}
              dataSource={filteredUsers}
              loading={loading}
              rowKey='id'
              pagination={{ pageSize: 10 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      <Modal
        title={currentUser ? 'Edit User' : 'Add User'}
        open={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key='cancel' onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key='submit' type='primary' onClick={handleModalSubmit}>
            {currentUser ? 'Save Changes' : 'Add User'}
          </Button>,
        ]}
      >
        <Form form={form} layout='vertical'>
          <Form.Item
            name='name'
            label='Name'
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='email'
            label='Email'
            rules={[
              { required: true, message: 'Please enter an email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name='role'
            label='Role'
            rules={[{ required: true, message: 'Please select a role' }]}
          >
            <Select>
              <Option value='student'>Student</Option>
              <Option value='teacher'>Teacher</Option>
              <Option value='admin'>Admin</Option>
            </Select>
          </Form.Item>

          {currentUser && (
            <Form.Item
              name='status'
              label='Status'
              rules={[{ required: true, message: 'Please select a status' }]}
            >
              <Select>
                <Option value='active'>Active</Option>
                <Option value='inactive'>Inactive</Option>
                <Option value='suspended'>Suspended</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name='subscription'
            label='Subscription'
            rules={[
              { required: true, message: 'Please select a subscription' },
            ]}
          >
            <Select>
              <Option value='Premium'>Premium</Option>
              <Option value='Basic'>Basic</Option>
              <Option value='Free'>Free</Option>
            </Select>
          </Form.Item>

          {!currentUser && (
            <Form.Item
              name='password'
              label='Password'
              rules={[{ required: true, message: 'Please enter a password' }]}
            >
              <Input.Password />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default UserManagement;
