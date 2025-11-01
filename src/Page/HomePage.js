import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const [contents, setContents] = useState([]);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy dữ liệu từ localStorage
        const storedContents = JSON.parse(localStorage.getItem('contents')) || [];
        // Chỉ lấy những bài đã xuất bản
        const publishedContents = storedContents.filter(content => content.published);
        setContents(publishedContents);

        // Tạo danh sách categories từ contents
        const uniqueCategories = [...new Set(publishedContents.map(content => content.category))];
        setCategories(uniqueCategories);
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <Container className="py-5">
            {/* Phần Hero */}
            <div className="text-center mb-5">
                <h1 className="display-4 text-primary mb-3">Thông tin Y tế & Sức khỏe</h1>
                <p className="lead text-muted">
                    Cập nhật những thông tin y tế mới nhất và hữu ích từ đội ngũ chuyên gia
                </p>
            </div>

            {/* Danh mục */}
            <div className="mb-4">
                <h4 className="mb-3">Danh mục</h4>
                <div className="d-flex gap-2 flex-wrap">
                    {categories.map(category => (
                        <Badge 
                            key={category} 
                            bg="primary" 
                            className="px-3 py-2 cursor-pointer"
                            style={{ cursor: 'pointer' }}
                        >
                            {category}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Danh sách bài viết */}
            <Row xs={1} md={2} lg={3} className="g-4">
                {contents.map(content => (
                    <Col key={content.id}>
                        <Card className="h-100 shadow-sm hover-shadow">
                            {content.image && (
                                <Card.Img 
                                    variant="top" 
                                    src={content.image}
                                    style={{
                                        height: '200px',
                                        objectFit: 'cover'
                                    }}
                                />
                            )}
                            <Card.Body>
                                <Badge bg="info" className="mb-2">
                                    {content.category}
                                </Badge>
                                <Card.Title className="h5 text-primary">
                                    {content.title}
                                </Card.Title>
                                <Card.Text className="text-muted">
                                    {content.body.length > 150 
                                        ? content.body.substring(0, 150) + '...'
                                        : content.body
                                    }
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-transparent text-muted small">
                                <i className="bi bi-clock me-2"></i>
                                Cập nhật: {formatDate(content.updated_at)}
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Hiển thị khi không có bài viết */}
            {contents.length === 0 && (
                <div className="text-center py-5">
                    <h3 className="text-muted">Chưa có bài viết nào</h3>
                    <p>Các bài viết sẽ sớm được cập nhật</p>
                </div>
            )}
        </Container>
    );
}

export default HomePage;
