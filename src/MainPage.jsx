import { Image, Typography, Row, Col, Card } from "antd";
import './css/MainPage.css'; 

const { Title, Paragraph } = Typography;

const MainPage = () => {
  return (
    <div className="main-page">
      <Title level={1} className="main-title">Soru Bank</Title>
      <Paragraph className="main-paragraph">
        Soru Bankamız, çeşitli sınavlara yönelik geniş bir soru yelpazesi sunmaktadır. Öğrenciler ve öğretmenler için mükemmel bir kaynak olan soru bankamız, yüksek kaliteli sorular ve ayrıntılı çözümlerle desteklenmiştir.
      </Paragraph>

      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card hoverable className="feature-card">
            <Image src="https://stylemixthemes.com/masterstudy/wp-content/themes/masterstudy-landing/assets/images/home-page/manage_courses/quiz_review.png" />
            <Title level={3} className="card-title">Çeşitli Soru Türleri</Title>
            <Paragraph className="card-paragraph">
              Çoktan seçmeli, doğru-yanlış ve açık uçlu sorular ile çeşitli sınav türlerine hazırlanın.
            </Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className="feature-card">
            <Image src="https://www.careerpower.in/blog/wp-content/uploads/2024/06/08154008/PTET-Answer-Key-2024.webp" />
            <Title level={3} className="card-title">Detaylı Çözümler</Title>
            <Paragraph className="card-paragraph">
              Her sorunun ayrıntılı çözümleri ile konuları daha iyi anlayın ve sınavlarda başarılı olun.
            </Paragraph>
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable className="feature-card">
            <Image src="https://blog.magmalabs.io/wp-content/uploads/2018/09/quality-1200x855.jpg" />
            <Title level={3} className="card-title">Kalite ve Güven</Title>
            <Paragraph className="card-paragraph">
              Yüksek kaliteli içeriklerimiz ve güvenilir kaynaklarımızla en iyi hazırlığı yapın.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Title level={2} className="section-title">Sunduğumuz Olanaklar</Title>
      <Paragraph className="section-paragraph">
        Soru Bankamız, geniş soru yelpazesi ve detaylı çözümleri ile öğrencilere ve öğretmenlere aşağıdaki olanakları sunar:
      </Paragraph>
      <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card className="feature-card">
            <Title level={4} className="card-title">Geniş Soru Yelpazesi</Title>
            <Paragraph className="card-paragraph">
              Farklı konularda ve zorluk seviyelerinde geniş bir soru yelpazesi sunarak her seviyedeki öğrenciye hitap eder.
            </Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="feature-card">
            <Title level={4} className="card-title">Detaylı Çözümler</Title>
            <Paragraph className="card-paragraph">
              Her sorunun ayrıntılı çözümü ile öğrencilerin konuyu anlamalarını kolaylaştırır ve eksiklerini görmelerini sağlar.
            </Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="feature-card">
            <Title level={4} className="card-title">Kullanıcı Dostu Arayüz</Title>
            <Paragraph className="card-paragraph">
              Kolay ve anlaşılır arayüzümüz sayesinde sorulara hızlıca ulaşabilir ve çalışmalarınızı verimli bir şekilde sürdürebilirsiniz.
            </Paragraph>
          </Card>
        </Col>
        <Col span={12}>
          <Card className="feature-card">
            <Title level={4} className="card-title">Güncel İçerik</Title>
            <Paragraph className="card-paragraph">
              Soru bankamız sürekli güncellenen içeriklerle her zaman en güncel bilgilere ulaşmanızı sağlar.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Title level={2} className="section-title">İletişim</Title>
      <Paragraph className="section-paragraph">
        Bizimle iletişime geçmek için aşağıdaki bilgileri kullanabilirsiniz.
      </Paragraph>
      <Row justify="center" style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card className="contact-card">
            <Title level={4} className="card-title">Adres</Title>
            <Paragraph className="card-paragraph">
              1234 Sokak, Şükrüpaşa, Edirne, Türkiye
            </Paragraph>
            <Title level={4} className="card-title">Telefon</Title>
            <Paragraph className="card-paragraph">
              +90 123 456 7890
            </Paragraph>
            <Title level={4} className="card-title">Email</Title>
            <Paragraph className="card-paragraph">
              sorubank@info.com
            </Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default MainPage;
