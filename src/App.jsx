import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, FileOutlined, UserOutlined, TeamOutlined, FileAddOutlined, BankOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import Profil from './Profil';
import Sinavlar from './Sinavlar';
import Ogrenciler from './Ogrenciler';
import LoginPage from './LoginPage';
import SinavEkle from './SinavEkle';
import OgrenciDetay from './OgrenciDetay';
import ProfilDuzenle from './ProfilDuzenle';
import MainPage from './MainPage';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const menuItems = [
    {
      key: '1',
      icon: <BankOutlined />,
      label: <Link to="/anasayfa">Soru Bank</Link>,
    },
    {
      key: '2',
      icon: <UserOutlined />,
      label: <Link to="/profil">Profil</Link>,
    },
    ...(isAuthenticated ? [
      {
        key: '3',
        icon: <FileOutlined />,
        label: <Link to="/sinavlar">Sınavlar</Link>,
      },
      {
        key: '4',
        icon: <TeamOutlined />,
        label: <Link to="/ogrenciler">Öğrenciler</Link>,
      },
      {
        key: '5',
        icon: <FileAddOutlined />,
        label: <Link to="/sinavekle">Sınav Ekle</Link>,
      },
    ] : []),
    {
      key: '6',
      label: isAuthenticated ? (
        <Button type="primary" danger onClick={handleLogout}>
          Çıkış Yap
        </Button>
      ) : (
        <Button type="primary" onClick={() => window.location.href = '/login'}>
          Giriş Yap
        </Button>
      ),
    },
  ];

  return (
    <Router>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 1080,
              minWidth: 1700,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Routes>
              <Route path="/anasayfa" element={<MainPage />} />
              <Route path="/profil" element={isAuthenticated ? <Profil /> : <Navigate to="/login" />} />
              <Route path="/profil/duzenle" element={isAuthenticated ? <ProfilDuzenle /> : <Navigate to="/login" />} />
              <Route path="/sinavlar" element={isAuthenticated ? <Sinavlar /> : <Navigate to="/login" />} />
              <Route path="/ogrenciler" element={isAuthenticated ? <Ogrenciler /> : <Navigate to="/login" />} />
              <Route path="/ogrenci/:id" element={isAuthenticated ? <OgrenciDetay /> : <Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage onLogin={handleLoginSuccess} />} />
              <Route path="/sinavekle" element={isAuthenticated ? <SinavEkle /> : <Navigate to="/login" />} />
              <Route path="/" element={<Navigate to="/anasayfa" />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
