import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';

const DoctorManager = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    user_id: '', specialty_id: '', license_number: '', status: 'active'
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setDoctors(JSON.parse(localStorage.getItem('doctors') || '[]'));
    setSpecialties(JSON.parse(localStorage.getItem('specialties') || '[]'));
    setUsers(JSON.parse(localStorage.getItem('users') || '[]'));
  }, []);

  const saveToStorage = updated => {
    setDoctors(updated);
    localStorage.setItem('doctors', JSON.stringify(updated));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      const updated = doctors.map(d =>
        d.id === editingId ? { ...d, ...form } : d
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      const newDoctor = { ...form, id: Date.now() };
      saveToStorage([...doctors, newDoctor]);
    }
    setForm({ user_id: '', specialty_id: '', license_number: '', status: 'active' });
    setShowModal(false);
  };

  const handleEdit = d => {
    setForm({ ...d });
    setEditingId(d.id);
    setShowModal(true);
  };

  const handleDelete = id => {
    if (window.confirm('Bạn có chắc muốn xóa bác sĩ này?')) {
      const updated = doctors.filter(d => d.id !== id);
      saveToStorage(updated);
    }
  };

  const handleAdd = () => {
    setForm({ user_id: '', specialty_id: '', license_number: '', status: 'active' });
    setEditingId(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({ user_id: '', specialty_id: '', license_number: '', status: 'active' });
    setEditingId(null);
  };

  const getUserName = id => users.find(u => u.id === Number(id))?.name || 'N/A';
  const getSpecialtyName = id => specialties.find(s => s.id === Number(id))?.name || 'N/A';

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">👨‍⚕️ Quản lý Bác sĩ</h2>
        <Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>Thêm bác sĩ mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Tên bác sĩ</th>
            <th>Chuyên khoa</th>
            <th>Số giấy phép</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>{index + 1}</td>
              <td>{getUserName(doctor.user_id)}</td>
              <td>{getSpecialtyName(doctor.specialty_id)}</td>
              <td>{doctor.license_number}</td>
              <td>
                <span className={`badge ${doctor.status === 'active' ? 'bg-success' : 'bg-danger'}`}>
                  {doctor.status === 'active' ? 'Hoạt động' : 'Ngưng hoạt động'}
                </span>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(doctor)}>
                  <i className="bi bi-pencil me-1"></i>Sửa
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(doctor.id)}>
                  <i className="bi bi-trash me-1"></i>Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Sửa thông tin bác sĩ' : 'Thêm bác sĩ mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Bác sĩ</Form.Label>
              <Form.Select
                value={form.user_id}
                onChange={e => setForm({ ...form, user_id: e.target.value })}
                required
              >
                <option value="">-- Chọn bác sĩ --</option>
                {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chuyên khoa</Form.Label>
              <Form.Select
                value={form.specialty_id}
                onChange={e => setForm({ ...form, specialty_id: e.target.value })}
                required
              >
                <option value="">-- Chọn chuyên khoa --</option>
                {specialties.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số giấy phép hành nghề</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập số giấy phép"
                value={form.license_number}
                onChange={e => setForm({ ...form, license_number: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Trạng thái</Form.Label>
              <Form.Select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                <option value="active">Hoạt động</option>
                <option value="inactive">Ngưng hoạt động</option>
              </Form.Select>
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

export default DoctorManager;