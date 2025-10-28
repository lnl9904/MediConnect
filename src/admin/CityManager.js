import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const CityManager = () => {
  const [cities, setCities] = useState([]);
  const [form, setForm] = useState({ name: '' });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cities') || '[]');
    setCities(stored);
  }, []);

  const saveToStorage = updated => {
    setCities(updated);
    localStorage.setItem('cities', JSON.stringify(updated));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      const updated = cities.map(c =>
        c.id === editingId ? { ...c, ...form } : c
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      const newCity = { ...form, id: Date.now() };
      saveToStorage([...cities, newCity]);
    }
    setForm({ name: '' });
    setShowModal(false);
  };

  const handleEdit = c => {
    setForm({ name: c.name });
    setEditingId(c.id);
    setShowModal(true);
  };

  const handleDelete = id => {
    if (window.confirm('Bạn có chắc muốn xóa thành phố này?')) {
      const updated = cities.filter(c => c.id !== id);
      saveToStorage(updated);
    }
  };

  const handleAdd = () => {
    setForm({ name: '' });
    setEditingId(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({ name: '' });
    setEditingId(null);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">🏙️ Quản lý Thành phố</h2>
        <Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>Thêm thành phố mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên thành phố</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={city.id}>
              <td>{index + 1}</td>
              <td>{city.name}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(city)}>
                  <i className="bi bi-pencil me-1"></i>Sửa
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(city.id)}>
                  <i className="bi bi-trash me-1"></i>Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Sửa thành phố' : 'Thêm thành phố mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Tên thành phố</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập tên thành phố"
                value={form.name}
                onChange={e => setForm({ name: e.target.value })}
                required
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

export default CityManager;