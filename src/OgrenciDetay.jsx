import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, List, message } from 'antd';
import './css/OgrenciDetay.css';

const OgrenciDetay = () => {
  const { id } = useParams();
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

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * (max + 1));
  };

  const generateStudentResults = (questions) => {
    const correct = getRandomInt(questions.length);
    const incorrect = getRandomInt(questions.length - correct);
    const empty = questions.length - correct - incorrect;
    const score = correct * 10;

    return { correct, incorrect, empty, score };
  };

  return (
    <Card title={`Öğrenci ${id} Detayları`} className="ogrenci-detay-card">
      <List
        header={<div>Eklenen Sınavlar</div>}
        bordered
        dataSource={exams}
        renderItem={([examID, { examName, examTime, questions }]) => {
          const results = generateStudentResults(questions);
          return (
            <List.Item key={examID}>
              <div>
                <strong>Sınav Adı:</strong> {examName} <br />
                <strong>Sınav Süresi:</strong> {examTime} dakika <br />
                <strong>Doğru Sayısı:</strong> {results.correct} <br />
                <strong>Yanlış Sayısı:</strong> {results.incorrect} <br />
                <strong>Boş Sayısı:</strong> {results.empty} <br />
                <strong>Puan:</strong> {results.score}
              </div>
            </List.Item>
          );
        }}
      />
    </Card>
  );
};

export default OgrenciDetay;
