import React from 'react';
import { List, Avatar, Card } from 'antd';
import { Link } from 'react-router-dom';
import './css/Ogrenciler.css'; 

const Ogrenciler = () => {
  const students = Array.from({ length: 10 }, (_, i) => ({
    name: `Öğrenci ${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/thumb/men/${i + 1}.jpg` 
  }));

  return (
    <Card title="Öğrenciler" className="ogrenciler-card">
      <List
        bordered
        dataSource={students}
        renderItem={(student, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={student.avatar} />}
              title={<Link to={`/ogrenci/${index + 1}`} className="student-link">{student.name}</Link>}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default Ogrenciler;
