import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Badge } from 'react-bootstrap';

const ContentManager = () => {
  const [contents, setContents] = useState([]);
  const [form, setForm] = useState({
    title: '', category: '', body: '', published: true
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('contents') || '[]');
    setContents(stored);
  }, []);

  const saveToStorage = updated => {
    setContents(updated);
    localStorage.setItem('contents', JSON.stringify(updated));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      const updated = contents.map(c =>
        c.id === editingId ? { ...c, ...form } : c
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      const newContent = {
        ...form,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      saveToStorage([...contents, newContent]);
    }
    setForm({ title: '', category: '', body: '', published: true });
    setShowModal(false);
  };

  const handleEdit = c => {
    setForm({ ...c });
    setEditingId(c.id);
    setShowModal(true);
  };

  const handleDelete = id => {
    if (window.confirm('Bạn có chắc muốn xóa nội dung này?')) {
      const updated = contents.filter(c => c.id !== id);
      saveToStorage(updated);
    }
  };

  const togglePublished = id => {
    const updated = contents.map(c =>
      c.id === id ? { ...c, published: !c.published } : c
    );
    saveToStorage(updated);
  };

  const handleAdd = () => {
    setForm({ title: '', category: '', body: '', published: true });
    setEditingId(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({ title: '', category: '', body: '', published: true });
    setEditingId(null);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">📢 Quản lý Nội dung y tế</h2>
        <Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>Thêm nội dung mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tiêu đề</th>
            <th>Danh mục</th>
            <th>Nội dung</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {contents.map((content, index) => (
            <tr key={content.id}>
              <td>{index + 1}</td>
              <td>{content.title}</td>
              <td>{content.category}</td>
              <td>
                <div style={{ maxHeight: '100px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {content.body}
                </div>
              </td>
              <td>
                <Badge bg={content.published ? 'success' : 'warning'}>
                  {content.published ? '✅ Đã xuất bản' : '🚫 Nháp'}
                </Badge>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(content)}>
                  <i className="bi bi-pencil me-1"></i>Sửa
                </Button>
                <Button 
                  variant={content.published ? 'info' : 'success'} 
                  size="sm" 
                  className="me-2"
                  onClick={() => togglePublished(content.id)}
                >
                  <i className={`bi bi-${content.published ? 'eye-slash' : 'eye'} me-1`}></i>
                  {content.published ? 'Ẩn' : 'Xuất bản'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(content.id)}>
                  <i className="bi bi-trash me-1"></i>Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Sửa nội dung' : 'Thêm nội dung mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tiêu đề"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập danh mục (ví dụ: bệnh, chữa trị, phòng ngừa...)"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Nhập nội dung bài viết"
                value={form.body}
                onChange={e => setForm({ ...form, body: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Xuất bản ngay"
                checked={form.published}
                onChange={e => setForm({ ...form, published: e.target.checked })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" type="submit">
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default ContentManager;