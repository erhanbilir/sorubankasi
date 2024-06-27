import { useState, useEffect } from 'react';
import { Button, Form, Input, Card, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilDuzenle = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    
    if (loggedInUser) {
      form.setFieldsValue({
        ID: loggedInUser.ID,
        Username: loggedInUser.Username,
        Password: '',
        Name: loggedInUser.Name,
        Surname: loggedInUser.Surname,
        Email: loggedInUser.Email,
        Phone: loggedInUser.Phone,
        ProfileImage: loggedInUser.ProfileImage,
      });
    } else {
      window.location.href = '/login';
    }
  }, [form]);

  const handleFinish = async (values) => {
    setLoading(true);

    try {
      const endpoint = `https://v1.nocodeapi.com/erhanpiller/google_sheets/yXfGrHrYmIwfXcFZ?tabId=Sheet1`;

      const payload = {
        row_id: values.ID,
        Username: values.Username,
        Password: values.Password || undefined,
        Name: values.Name,
        Surname: values.Surname,
        Email: values.Email,
        Phone: values.Phone,
        ProfileImage: values.ProfileImage,
      };

      const response = await axios.put(endpoint, payload);

      console.log('Response from NoCodeAPI:', response.data);

      const updatedUser = {
        ID: values.ID,
        Username: values.Username,
        Password: values.Password || undefined,
        Name: values.Name,
        Surname: values.Surname,
        Email: values.Email,
        Phone: values.Phone,
        ProfileImage: values.ProfileImage,
      };
      localStorage.setItem('loggedInUser', JSON.stringify(updatedUser));

      message.success('Profil başarıyla güncellendi');
      setLoading(false);
      navigate('/profil');
    } catch (error) {
      console.error('Profil güncellenirken hata oluştu:', error);
      message.error('Profil güncellenirken bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <Card style={{ maxWidth: 600, margin: '0 auto', marginTop: '100px' }}>
      <Form
        form={form}
        name="profileEdit"
        onFinish={handleFinish}
        layout="vertical"
      >
        <Form.Item
          name="ID"
          label="ID"
          rules={[{ required: true, message: 'Lütfen ID girin!' }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          name="Username"
          label="Kullanıcı Adı"
          rules={[{ required: true, message: 'Lütfen kullanıcı adınızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Password"
          label="Şifre"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="Name"
          label="İsim"
          rules={[{ required: true, message: 'Lütfen isminizi girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Surname"
          label="Soyisim"
          rules={[{ required: true, message: 'Lütfen soyisminizi girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Email"
          label="Email"
          rules={[{ required: true, message: 'Lütfen email adresinizi girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="Phone"
          label="Telefon"
          rules={[{ required: true, message: 'Lütfen telefon numaranızı girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ProfileImage"
          label="Profil Fotoğrafı URL'si"
          rules={[{ required: true, message: 'Lütfen profil fotoğrafı URL\'si girin!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProfilDuzenle;
