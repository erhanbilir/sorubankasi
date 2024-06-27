import { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Button, Modal, Form, Input, message } from 'antd';
import axios from 'axios';
import './css/Profil.css'; 

const { Title } = Typography;

const Profil = () => {
  const [userData, setUserData] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
      setUserData(loggedInUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleEdit = () => {
    setEditing(true);
    form.setFieldsValue({
      username: userData.Username,
      password: '',
      name: userData.Name,
      surname: userData.Surname,
      email: userData.Email,
      phone: userData.Phone,
      profileImage: userData.ProfileImage,
    });
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const endpoint = `https://v1.nocodeapi.com/erhanpiller/google_sheets/yXfGrHrYmIwfXcFZ?tabId=Sheet1`;

      const payload = {
        row_id: userData.ID,
        Username: values.username,
        Password: values.password || userData.Password,
        Name: values.name,
        Surname: values.surname,
        Email: values.email,
        Phone: values.phone,
        ProfileImage: values.profileImage,
      };

      await axios.put(endpoint, payload);

      const updatedUser = {
        ...userData,
        Username: values.username,
        Password: values.password || userData.Password,
        Name: values.name,
        Surname: values.surname,
        Email: values.email,
        Phone: values.phone,
        ProfileImage: values.profileImage,
      };
      setUserData(updatedUser);
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      message.success('Profil güncellendi');
      setEditing(false);
    } catch (error) {
      console.error('Error while updating profile:', error);
      message.error('Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  if (!userData) {
    return null;
  }

  return (
    <Card className="profile-card">
      <Avatar src={userData.ProfileImage} size={128} className="profile-avatar" />
      <Title level={2} className="profile-title">{`${userData.Name} ${userData.Surname}`}</Title>
      <p className="profile-info"><strong>Kullanıcı Adı:</strong> {userData.Username}</p>
      <p className="profile-info"><strong>Email:</strong> {userData.Email}</p>
      <p className="profile-info"><strong>Telefon:</strong> {userData.Phone}</p>

      <Button type="primary" onClick={handleEdit} style={{ marginRight: 16 }}>
        Düzenle
      </Button>
      <Button type="primary" danger onClick={handleLogout}>
        Çıkış yap
      </Button>

      <Modal
        title="Profil Düzenle"
        open={editing}
        onOk={handleSave}
        onCancel={handleCancel}
        okText="Kaydet"
        cancelText="İptal"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="username" label="Kullanıcı Adı" rules={[{ required: true, message: 'Kullanıcı adı gereklidir' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Şifre">
            <Input.Password />
          </Form.Item>
          <Form.Item name="name" label="İsim" rules={[{ required: true, message: 'İsim gereklidir' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="surname" label="Soyisim" rules={[{ required: true, message: 'Soyisim gereklidir' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="E-posta" rules={[{ required: true, message: 'E-posta gereklidir' }, { type: 'email', message: 'Geçerli bir e-posta adresi giriniz' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Telefon">
            <Input />
          </Form.Item>
          <Form.Item name="profileImage" label="Profil Fotoğrafı URL'si">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default Profil;
