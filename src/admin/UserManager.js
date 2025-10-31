import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, Badge } from 'react-bootstrap';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: '', phone: '',
    avatar: '', email_verified_at: '', active: true
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(stored);
  }, []);

  const saveToStorage = updated => {
    setUsers(updated);
    localStorage.setItem('users', JSON.stringify(updated));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (editingId) {
      const updated = users.map(u =>
        u.id === editingId ? { ...u, ...form } : u
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      const newUser = {
        ...form,
        id: Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      saveToStorage([...users, newUser]);
    }
    setForm({
      name: '', email: '', password: '', role: '', phone: '',
      avatar: '', email_verified_at: '', active: true
    });
    setShowModal(false);
  };

  const handleEdit = u => {
    setForm({ ...u });
    setEditingId(u.id);
    setShowModal(true);
  };

  const handleDelete = id => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      const updated = users.filter(u => u.id !== id);
      saveToStorage(updated);
    }
  };

  const toggleActive = id => {
    const updated = users.map(u =>
      u.id === id ? { ...u, active: !u.active } : u
    );
    saveToStorage(updated);
  };

  const handleAdd = () => {
    setForm({
      name: '', email: '', password: '', role: '', phone: '',
      avatar: '', email_verified_at: '', active: true
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setForm({
      name: '', email: '', password: '', role: '', phone: '',
      avatar: '', email_verified_at: '', active: true
    });
    setEditingId(null);
  };

  return (
    <div className="container-fluid p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">👥 Quản lý Tài khoản người dùng</h2>
        <Button variant="primary" onClick={handleAdd}>
          <i className="bi bi-plus-lg me-2"></i>Thêm người dùng mới
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Avatar</th>
            <th>Họ tên</th>
            <th>Email</th>
            <th>SĐT</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>
                {user.avatar && (
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                )}
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>
                <Badge bg={
                  user.role === 'admin' ? 'danger' :
                  user.role === 'doctor' ? 'info' :
                  'success'
                }>
                  {user.role}
                </Badge>
              </td>
              <td>
                <Badge bg={user.active ? 'success' : 'secondary'}>
                  {user.active ? '✅ Hoạt động' : '🚫 Đã khóa'}
                </Badge>
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(user)}>
                  <i className="bi bi-pencil me-1"></i>Sửa
                </Button>
                <Button 
                  variant={user.active ? 'secondary' : 'success'} 
                  size="sm" 
                  className="me-2"
                  onClick={() => toggleActive(user.id)}
                >
                  <i className={`bi bi-${user.active ? 'lock' : 'unlock'} me-1`}></i>
                  {user.active ? 'Khóa' : 'Mở khóa'}
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>
                  <i className="bi bi-trash me-1"></i>Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Sửa thông tin người dùng' : 'Thêm người dùng mới'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Họ tên</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập họ tên"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Nhập email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </Form.Group>

            {!editingId && (
              <Form.Group className="mb-3">
                <Form.Label>Mật khẩu</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required={!editingId}
                />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Vai trò</Form.Label>
              <Form.Select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                required
              >
                <option value="">-- Chọn vai trò --</option>
                <option value="admin">Admin</option>
                <option value="doctor">Bác sĩ</option>
                <option value="patient">Bệnh nhân</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Số điện thoại</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Nhập số điện thoại"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Avatar URL</Form.Label>
              <Form.Control
                type="url"
                placeholder="Nhập URL hình đại diện"
                value={form.avatar}
                onChange={e => setForm({ ...form, avatar: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="active-switch"
                label="Tài khoản hoạt động"
                checked={form.active}
                onChange={e => setForm({ ...form, active: e.target.checked })}
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

export default UserManager;