import { useEffect, useState } from 'react';
import axios from 'axios';
import { List, message, Card } from 'antd';
import './css/Sinavlar.css'; 

const Sinavlar = () => {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get('https://v1.nocodeapi.com/erhanpiller/google_sheets/AsnUIdAWwqkPBQfF?tabId=Sheet1');
        const rows = response.data.data;

        const examsGrouped = rows.reduce((acc, row) => {
          const { ID, examName, question, answer1, answer2, answer3, answer4, correctAnswer, examTime } = row;

          if (!acc[ID]) {
            acc[ID] = {
              examName,
              examTime,
              questions: []
            };
          }

          acc[ID].questions.push({
            question,
            answer1,
            answer2,
            answer3,
            answer4,
            correctAnswer,
          });

          return acc;
        }, {});

        setExams(Object.entries(examsGrouped));
      } catch (error) {
        message.error('Sınavlar yüklenirken bir hata oluştu.');
      }
    };

    fetchExams();
  }, []);

  return (
    <div className="sinavlar-container">
      <Card title="Eklenen Sınavlar" className="sinavlar-card">
        <List
          bordered
          dataSource={exams}
          renderItem={([id, { examName, examTime, questions }]) => (
            <List.Item key={id}>
              <div>
                <strong>ID:</strong> {id} <br />
                <strong>Sınav Adı:</strong> {examName} <br />
                <strong>Sınav Süresi:</strong> {examTime} dakika <br />
                <List
                  bordered
                  dataSource={questions}
                  renderItem={(question, index) => (
                    <List.Item key={index}>
                      <strong>Soru:</strong> {question.question} <br />
                      <strong>Cevap 1:</strong> {question.answer1} <br />
                      <strong>Cevap 2:</strong> {question.answer2} <br />
                      <strong>Cevap 3:</strong> {question.answer3} <br />
                      <strong>Cevap 4:</strong> {question.answer4} <br />
                      <strong>Doğru Cevap:</strong> {question.correctAnswer}
                    </List.Item>
                  )}
                />
              </div>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default Sinavlar;
