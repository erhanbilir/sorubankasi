import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {

      const apiUrl = 'https://v1.nocodeapi.com/erhanpiller/google_sheets/yXfGrHrYmIwfXcFZ?tabId=Sheet1';

      const fetchData = async (url, retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const response = await axios.get(url);
            return response.data.data;
          } catch (error) {
            if (error.response.status === 429) {
              const retryAfter = parseInt(error.response.headers['retry-after'], 10) || 1;
              await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            } else {
              throw error;
            }
          }
        }
        throw new Error('Maximum retries exceeded');
      };

      const users = await fetchData(apiUrl);

      const user = users.find(u => u.Username === values.username && u.Password === values.password);

      if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));

        onLogin();
        navigate('/profil');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.error('Error while fetching user data:', error);
      message.error('Failed to login. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginPage.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginPage;
