'use client';

import type React from 'react';

import { useState, useRef, useEffect } from 'react';
import {
  Input,
  Button,
  Avatar,
  Spin,
  Typography,
  Card,
  Tooltip,
  Select,
} from 'antd';
import {
  SendOutlined,
  UserOutlined,
  RobotOutlined,
  AudioOutlined,
  PictureOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import styles from './AIChat.module.css';

const { Text, Title } = Typography;
const { Option } = Select;

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hello! I'm your AI Tutor. How can I help you with your studies today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [subject, setSubject] = useState('general');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input, subject),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setLoading(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string, subject: string) => {
    // This is a mock function - in a real app, you would call your AI service
    const responses: Record<string, string[]> = {
      general: [
        "That's a great question! Let me help you understand this concept better.",
        "I'd be happy to explain this topic. Let's break it down step by step.",
        "Great question! Here's what you need to know about this subject.",
      ],
      math: [
        "Let's solve this math problem together. First, we need to identify the key variables.",
        'This mathematical concept is fascinating. Let me explain how it works.',
        'For this math problem, we can apply the following formula...',
      ],
      science: [
        'In science, this phenomenon is explained by the following principles...',
        'This scientific concept relates to several key theories. Let me explain.',
        'From a scientific perspective, we can understand this by looking at...',
      ],
      history: [
        'This historical event had several important causes and consequences...',
        'In historical context, this development was significant because...',
        'Historians generally interpret this event in the following ways...',
      ],
    };

    const subjectResponses = responses[subject] || responses.general;
    return subjectResponses[
      Math.floor(Math.random() * subjectResponses.length)
    ];
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleVoiceInput = () => {
    // This would integrate with a speech-to-text service
    alert('Voice input feature coming soon!');
  };

  const handleImageUpload = () => {
    // This would handle image uploads for visual questions
    alert('Image upload feature coming soon!');
  };

  return (
    <div className={styles.container}>
      <Card className={styles.chatCard}>
        <div className={styles.header}>
          <Title level={4}>AI Tutor</Title>
          <Select
            value={subject}
            onChange={setSubject}
            className={styles.subjectSelect}
          >
            <Option value='general'>General</Option>
            <Option value='math'>Mathematics</Option>
            <Option value='science'>Science</Option>
            <Option value='history'>History</Option>
          </Select>
        </div>

        <div className={styles.messagesContainer}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.message} ${
                message.sender === 'user'
                  ? styles.userMessage
                  : styles.aiMessage
              }`}
            >
              <div className={styles.messageAvatar}>
                {message.sender === 'user' ? (
                  <Avatar icon={<UserOutlined />} />
                ) : (
                  <Avatar
                    icon={<RobotOutlined />}
                    style={{ backgroundColor: '#4F46E5' }}
                  />
                )}
              </div>
              <div className={styles.messageContent}>
                <div className={styles.messageText}>{message.content}</div>
                <div className={styles.messageTime}>
                  {message.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.aiMessage}`}>
              <div className={styles.messageAvatar}>
                <Avatar
                  icon={<RobotOutlined />}
                  style={{ backgroundColor: '#4F46E5' }}
                />
              </div>
              <div className={styles.messageContent}>
                <Spin size='small' />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className={styles.inputContainer}>
          <Tooltip title='Upload Image'>
            <Button
              type='text'
              icon={<PictureOutlined />}
              onClick={handleImageUpload}
              className={styles.actionButton}
            />
          </Tooltip>
          <Tooltip title='Voice Input'>
            <Button
              type='text'
              icon={<AudioOutlined />}
              onClick={handleVoiceInput}
              className={styles.actionButton}
            />
          </Tooltip>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Ask me anything...'
            className={styles.input}
            suffix={
              <Button
                type='primary'
                icon={<SendOutlined />}
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={styles.sendButton}
              />
            }
          />
        </div>
      </Card>

      <Card className={styles.historyCard}>
        <div className={styles.historyHeader}>
          <Title level={5}>
            <HistoryOutlined /> Chat History
          </Title>
        </div>
        <div className={styles.historyList}>
          <div className={styles.historyItem + ' ' + styles.activeHistory}>
            <Text>Current Session</Text>
            <Text type='secondary'>Today</Text>
          </div>
          <div className={styles.historyItem}>
            <Text>Math Homework Help</Text>
            <Text type='secondary'>Yesterday</Text>
          </div>
          <div className={styles.historyItem}>
            <Text>Science Project Research</Text>
            <Text type='secondary'>3 days ago</Text>
          </div>
          <div className={styles.historyItem}>
            <Text>History Essay Outline</Text>
            <Text type='secondary'>1 week ago</Text>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
