import { useState, useEffect } from 'react';
import { Form, Input, Button, Select, List, message, Card } from 'antd';
import axios from 'axios';
import './css/SinavEkle.css'; 

const { Option } = Select;

const SinavEkle = () => {
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([]);
  const [examName, setExamName] = useState('');
  const [examTime, setExamTime] = useState('');
  const [nextId, setNextId] = useState(1);
  const [editingQuestion, setEditingQuestion] = useState(null);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('https://v1.nocodeapi.com/erhanpiller/google_sheets/AsnUIdAWwqkPBQfF?tabId=Sheet1');
        const rows = response.data.data;
        const ids = rows.map(row => parseInt(row.ID)).filter(id => !isNaN(id));
        if (ids.length > 0) {
          setNextId(Math.max(...ids) + 1);
        }
      } catch (error) {
        console.error('Veriler çekilirken hata oluştu:', error);
      }
    };
    fetchExams();
  }, []);

  const handleAddOrUpdateQuestion = (values) => {
    if (editingQuestion !== null) {
      const updatedQuestions = questions.map((question, index) => (
        index === editingQuestion ? values : question
      ));
      setQuestions(updatedQuestions);
      setEditingQuestion(null);
    } else {
      if (questions.length >= 10) {
        message.error('Maksimum 10 soru ekleyebilirsiniz.');
        return;
      }
      setQuestions([...questions, values]);
    }
    form.resetFields();
  };

  const handleEditQuestion = (index) => {
    setEditingQuestion(index);
    form.setFieldsValue(questions[index]);
  };

  const handleSaveExam = async () => {
    if (questions.length < 10) {
      message.error('10 soru eklemelisiniz.');
      return;
    }

    const payload = questions.map((question) => [
      nextId,
      examName,
      question.question,
      question.answer1,
      question.answer2,
      question.answer3,
      question.answer4,
      question.correctAnswer,
      examTime
    ]);

    try {
      await axios.post(
        'https://v1.nocodeapi.com/erhanpiller/google_sheets/AsnUIdAWwqkPBQfF?tabId=Sheet1',
        payload
      );
      message.success('Sınav başarıyla kaydedildi.');
      setQuestions([]);
      setExamName('');
      setExamTime('');
      setNextId(nextId + 1);
    } catch (error) {
      console.error('Veriler kaydedilirken hata oluştu:', error);
      message.error('Sınav kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <div className="sinav-ekle-container">
      <Card className="sinav-ekle-card">
        {!examName ? (
          <Form
            onFinish={(values) => {
              setExamName(values.examName);
              setExamTime(values.examTime);
              message.success('Sınav adı ve süresi başarıyla kaydedildi.');
            }}
            layout="vertical"
          >
            <Form.Item
              name="examName"
              label="Sınav Adı"
              rules={[{ required: true, message: 'Lütfen sınav adını girin' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="examTime"
              label="Sınav Süresi (dakika)"
              rules={[{ required: true, message: 'Lütfen sınav süresini girin' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            <h2 className="sinav-ekle-title">{examName} Sınavı</h2>
            <Form form={form} onFinish={handleAddOrUpdateQuestion} layout="vertical">
              <Form.Item
                name="question"
                label="Soru"
                rules={[{ required: true, message: 'Lütfen soruyu girin' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="answer1"
                label="Cevap 1"
                rules={[{ required: true, message: 'Lütfen cevabı girin' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="answer2"
                label="Cevap 2"
                rules={[{ required: true, message: 'Lütfen cevabı girin' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="answer3"
                label="Cevap 3"
                rules={[{ required: true, message: 'Lütfen cevabı girin' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="answer4"
                label="Cevap 4"
                rules={[{ required: true, message: 'Lütfen cevabı girin' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="correctAnswer"
                label="Doğru Cevap"
                rules={[{ required: true, message: 'Lütfen doğru cevabı seçin' }]}
              >
                <Select>
                  <Option value="answer1">Cevap 1</Option>
                  <Option value="answer2">Cevap 2</Option>
                  <Option value="answer3">Cevap 3</Option>
                  <Option value="answer4">Cevap 4</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  {editingQuestion !== null ? 'Güncelle' : 'Ekle'}
                </Button>
              </Form.Item>
            </Form>

            <List
              header={<div>Eklenen Sorular</div>}
              bordered
              dataSource={questions}
              renderItem={(item, index) => (
                <List.Item key={index} actions={[<Button key="edit" onClick={() => handleEditQuestion(index)}>Düzenle</Button>]}>
                  <strong>Soru:</strong> {item.question} <br />
                  <strong>Cevap 1:</strong> {item.answer1} <br />
                  <strong>Cevap 2:</strong> {item.answer2} <br />
                  <strong>Cevap 3:</strong> {item.answer3} <br />
                  <strong>Cevap 4:</strong> {item.answer4} <br />
                  <strong>Doğru Cevap:</strong> {item.correctAnswer}
                </List.Item>
              )}
            />

            <Button type="primary" onClick={handleSaveExam} disabled={questions.length < 10}>
              Kaydet
            </Button>
          </>
        )}
      </Card>
    </div>
  );
};

export default SinavEkle;
