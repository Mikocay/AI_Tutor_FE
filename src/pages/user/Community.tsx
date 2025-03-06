import { useState, useEffect } from 'react';
import {
  Card,
  Avatar,
  Typography,
  Button,
  Tabs,
  List,
  Input,
  Space,
  Tag,
  Dropdown,
  Menu,
  Modal,
  Form,
  Select,
  Divider,
  Badge,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  TrophyOutlined,
  CommentOutlined,
  LikeOutlined,
  ShareAltOutlined,
  EllipsisOutlined,
  PlusOutlined,
  SearchOutlined,
  LikeFilled,
  FireOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import styles from './Community.module.css';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;

interface Post {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  liked: boolean;
  subject?: string;
}

interface Friend {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'studying';
  subject?: string;
  streak?: number;
}

interface LeaderboardUser {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
}

const Community = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);
  const [postSubject, setPostSubject] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setPosts(generateMockPosts());
      setFriends(generateMockFriends());
      setLeaderboard(generateMockLeaderboard());
      setLoading(false);
    }, 1000);
  }, []);

  const generateMockPosts = (): Post[] => {
    return [
      {
        id: '1',
        author: {
          id: '101',
          name: 'Jane Smith',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
          'Just finished my calculus assignment! The integration techniques we learned last week were super helpful. Anyone else working on this?',
        timestamp: '2 hours ago',
        likes: 12,
        comments: 5,
        liked: true,
        subject: 'Mathematics',
      },
      {
        id: '2',
        author: {
          id: '102',
          name: 'Michael Johnson',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
          "Looking for study partners for the upcoming physics exam. I'm focusing on thermodynamics and quantum mechanics. Let me know if you want to join!",
        timestamp: '5 hours ago',
        likes: 8,
        comments: 10,
        liked: false,
        subject: 'Physics',
      },
      {
        id: '3',
        author: {
          id: '103',
          name: 'Emily Davis',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
          'Just discovered an amazing resource for learning data structures and algorithms. Check out this link: https://example.com/algorithms',
        timestamp: '1 day ago',
        likes: 24,
        comments: 7,
        liked: false,
        subject: 'Computer Science',
      },
      {
        id: '4',
        author: {
          id: '104',
          name: 'Robert Wilson',
          avatar: '/placeholder.svg?height=40&width=40',
        },
        content:
          "Has anyone used the AI Tutor for history essays? I'm working on a paper about the Renaissance and could use some guidance on structuring my arguments.",
        timestamp: '2 days ago',
        likes: 15,
        comments: 12,
        liked: true,
        subject: 'History',
      },
    ];
  };

  const generateMockFriends = (): Friend[] => {
    return [
      {
        id: '101',
        name: 'Jane Smith',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'studying',
        subject: 'Mathematics',
        streak: 15,
      },
      {
        id: '102',
        name: 'Michael Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'online',
        streak: 8,
      },
      {
        id: '103',
        name: 'Emily Davis',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'offline',
        streak: 21,
      },
      {
        id: '104',
        name: 'Robert Wilson',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'studying',
        subject: 'History',
        streak: 5,
      },
      {
        id: '105',
        name: 'Sarah Thompson',
        avatar: '/placeholder.svg?height=40&width=40',
        status: 'online',
        streak: 12,
      },
    ];
  };

  const generateMockLeaderboard = (): LeaderboardUser[] => {
    return [
      {
        id: '201',
        name: 'Alex Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 1250,
        rank: 1,
      },
      {
        id: '202',
        name: 'Maria Garcia',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 1180,
        rank: 2,
      },
      {
        id: '101',
        name: 'Jane Smith',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 1050,
        rank: 3,
      },
      {
        id: '203',
        name: 'David Lee',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 980,
        rank: 4,
      },
      {
        id: '204',
        name: 'Sophia Chen',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 920,
        rank: 5,
      },
      {
        id: '103',
        name: 'Emily Davis',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 890,
        rank: 6,
      },
      {
        id: '205',
        name: 'James Wilson',
        avatar: '/placeholder.svg?height=40&width=40',
        score: 850,
        rank: 7,
      },
    ];
  };

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.liked ? post.likes - 1 : post.likes + 1,
            liked: !post.liked,
          };
        }
        return post;
      })
    );
  };

  const handleCommentPost = (postId: string) => {
    // In a real app, this would open a comment modal or section
    alert(`Comment on post ${postId} - This feature is coming soon!`);
  };

  const handleSharePost = (postId: string) => {
    // In a real app, this would open sharing options
    alert(`Share post ${postId} - This feature is coming soon!`);
  };

  const handleCreatePost = () => {
    if (!postContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      author: {
        id: 'current-user',
        name: 'Current User',
        avatar: '/placeholder.svg?height=40&width=40',
      },
      content: postContent,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      liked: false,
      subject: postSubject,
    };

    setPosts([newPost, ...posts]);
    setPostContent('');
    setPostSubject(undefined);
    setIsPostModalVisible(false);
  };

  const handleAddFriend = () => {
    // In a real app, this would open a friend search/add modal
    alert('Add friend feature is coming soon!');
  };

  const getStatusIcon = (status: Friend['status']) => {
    if (status === 'studying')
      return <BookOutlined style={{ color: '#10B981' }} />;
    if (status === 'online')
      return (
        <div
          className={styles.statusDot}
          style={{ backgroundColor: '#10B981' }}
        />
      );
    return (
      <div
        className={styles.statusDot}
        style={{ backgroundColor: '#9CA3AF' }}
      />
    );
  };

  const getStatusText = (friend: Friend) => {
    if (friend.status === 'studying') return `Studying ${friend.subject}`;
    if (friend.status === 'online') return 'Online';
    return 'Offline';
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const subjectOptions = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' },
    { value: 'Computer Science', label: 'Computer Science' },
    { value: 'History', label: 'History' },
    { value: 'Literature', label: 'Literature' },
    { value: 'Languages', label: 'Languages' },
  ];

  return (
    <div className={styles.container}>
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className={styles.feedCard}>
            <div className={styles.postInput}>
              <Avatar
                src='/placeholder.svg?height=40&width=40'
                icon={<UserOutlined />}
              />
              <Button
                className={styles.postButton}
                onClick={() => setIsPostModalVisible(true)}
              >
                Share your study update or question...
              </Button>
            </div>

            <Divider />

            <List
              itemLayout='vertical'
              dataSource={posts}
              loading={loading}
              renderItem={(post) => (
                <List.Item
                  key={post.id}
                  actions={[
                    <Button
                      key='like'
                      type='text'
                      icon={post.liked ? <LikeFilled /> : <LikeOutlined />}
                      onClick={() => handleLikePost(post.id)}
                      className={post.liked ? styles.likedButton : ''}
                    >
                      {post.likes}
                    </Button>,
                    <Button
                      key='comment'
                      type='text'
                      icon={<CommentOutlined />}
                      onClick={() => handleCommentPost(post.id)}
                    >
                      {post.comments}
                    </Button>,
                    <Button
                      key='share'
                      type='text'
                      icon={<ShareAltOutlined />}
                      onClick={() => handleSharePost(post.id)}
                    >
                      Share
                    </Button>,
                  ]}
                  extra={
                    <Dropdown
                      menu={{
                        items: [
                          { key: '1', label: 'Save Post' },
                          { key: '2', label: 'Report' },
                          { key: '3', label: 'Hide' },
                        ],
                      }}
                      placement='bottomRight'
                    >
                      <Button type='text' icon={<EllipsisOutlined />} />
                    </Dropdown>
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={post.author.avatar} />}
                    title={
                      <div className={styles.postHeader}>
                        <Text strong>{post.author.name}</Text>
                        <Text type='secondary'>{post.timestamp}</Text>
                      </div>
                    }
                    description={
                      post.subject && <Tag color='blue'>{post.subject}</Tag>
                    }
                  />
                  <Paragraph className={styles.postContent}>
                    {post.content}
                  </Paragraph>
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <div className={styles.sideCardTitle}>
                <span>
                  <TeamOutlined /> Friends
                </span>
                <Button
                  type='primary'
                  size='small'
                  icon={<PlusOutlined />}
                  onClick={handleAddFriend}
                >
                  Add
                </Button>
              </div>
            }
            className={styles.friendsCard}
          >
            <Input
              placeholder='Search friends'
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />

            <List
              itemLayout='horizontal'
              dataSource={filteredFriends}
              loading={loading}
              renderItem={(friend) => (
                <List.Item key={friend.id}>
                  <List.Item.Meta
                    avatar={
                      <Badge
                        count={friend.streak}
                        overflowCount={99}
                        offset={[-5, 5]}
                      >
                        <Avatar src={friend.avatar} />
                      </Badge>
                    }
                    title={
                      <div className={styles.friendName}>
                        <Text strong>{friend.name}</Text>
                        {getStatusIcon(friend.status)}
                      </div>
                    }
                    description={
                      <div className={styles.friendStatus}>
                        <Text type='secondary'>{getStatusText(friend)}</Text>
                        {friend.streak && (
                          <Tag icon={<FireOutlined />} color='orange'>
                            {friend.streak} day streak
                          </Tag>
                        )}
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>

          <Card
            title={
              <span>
                <TrophyOutlined /> Weekly Leaderboard
              </span>
            }
            className={styles.leaderboardCard}
          >
            <List
              itemLayout='horizontal'
              dataSource={leaderboard}
              loading={loading}
              renderItem={(user) => (
                <List.Item key={user.id}>
                  <List.Item.Meta
                    avatar={
                      <div className={styles.rankAvatar}>
                        <div className={styles.rank}>
                          {user.rank <= 3 ? (
                            <TrophyOutlined
                              style={{
                                color:
                                  user.rank === 1
                                    ? 'gold'
                                    : user.rank === 2
                                    ? 'silver'
                                    : '#CD7F32',
                              }}
                            />
                          ) : (
                            user.rank
                          )}
                        </div>
                        <Avatar src={user.avatar} />
                      </div>
                    }
                    title={<Text strong>{user.name}</Text>}
                    description={
                      <div className={styles.score}>
                        <Text type='secondary'>{user.score} points</Text>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
            <div className={styles.leaderboardFooter}>
              <Button type='link'>View Full Leaderboard</Button>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title='Create Post'
        open={isPostModalVisible}
        onCancel={() => setIsPostModalVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsPostModalVisible(false)}>
            Cancel
          </Button>,
          <Button
            key='submit'
            type='primary'
            onClick={handleCreatePost}
            disabled={!postContent.trim()}
          >
            Post
          </Button>,
        ]}
      >
        <Form layout='vertical'>
          <Form.Item label="What's on your mind?">
            <TextArea
              rows={4}
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder='Share your study update, question, or achievement...'
            />
          </Form.Item>
          <Form.Item label='Subject (optional)'>
            <Select
              placeholder='Select a subject'
              allowClear
              value={postSubject}
              onChange={(value) => setPostSubject(value)}
              style={{ width: '100%' }}
            >
              {subjectOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Community;
