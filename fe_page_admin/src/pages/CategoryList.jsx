import { useState, useEffect } from 'react';
import { categoryService } from '../services/categoryService';
import '../styles/pages/CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [submitting, setSubmitting] = useState(false);
  // thêm state để phân biệt create/update
  const [editingCategoryId, setEditingCategoryId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryService.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa category này?')) {
      try {
        await categoryService.deleteCategory(id);
        fetchCategories();
      } catch (err) {
        alert('Lỗi khi xóa: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên category');
      return;
    }

    try {
      setSubmitting(true);
      if (editingCategoryId) {
        // update
        await categoryService.updateCategory(editingCategoryId, formData);
      } else {
        // create
        await categoryService.createCategory(formData);
      }
      setShowModal(false);
      setFormData({ name: '', description: '' });
      setEditingCategoryId(null);
      fetchCategories();
    } catch (err) {
      alert(`Lỗi khi ${editingCategoryId ? 'cập nhật' : 'tạo'} category: ` + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = (category) => {
    setEditingCategoryId(category.idCategory);
    setFormData({
      name: category.name,
      description: category.description || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({ name: '', description: '' });
    setEditingCategoryId(null);
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner">⏳</div>
      <p>Đang tải dữ liệu...</p>
    </div>
  );

  if (error) return (
    <div className="error-container">
      <div className="error-icon">❌</div>
      <p>Lỗi: {error}</p>
      <button onClick={fetchCategories} className="retry-btn">Thử lại</button>
    </div>
  );

  return (
    <div className="category-page">
      <div className="page-header">
        <h2>📂 Quản lý Categories</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Thêm Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📂</div>
          <p>Chưa có category nào</p>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            Thêm category đầu tiên
          </button>
        </div>
      ) : (
        <div className="data-container">
          {/* Desktop & Tablet Table */}
          <div className="table-view">
            <table className="category-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tên Category</th>
                  <th className="desc-col">Mô tả</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {categories.map(category => (
                  <tr key={category.idCategory}>
                    <td>
                      <span className="category-id">#{category.idCategory}</span>
                    </td>
                    <td>
                      <span className="name-text">{category.name}</span>
                    </td>
                    <td className="desc-col">
                      <span className="category-desc">{category.description || 'Không có mô tả'}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="edit-btn" 
                        onClick={() => handleEdit(category)}
                        title="Chỉnh sửa">✏️</button>
                        <button
                          className="delete-btn"
                          onClick={() => handleDelete(category.idCategory)}
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="cards-view">
            {categories.map(category => (
              <div key={category.idCategory} className="category-card">
                <div className="card-header">
                  <span className="card-id">#{category.idCategory}</span>
                  <div className="card-actions">
                    <button className="edit-btn">Sửa</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(category.idCategory)}
                    >
                      Xóa
                    </button>
                  </div>
                </div>
                <div className="card-name">{category.name}</div>
                <div className="card-desc">
                  {category.description || 'Không có mô tả'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingCategoryId ? 'Cập nhật Category' : 'Thêm Category Mới'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Tên Category *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Nhập tên category"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Mô tả</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Nhập mô tả (tùy chọn)"
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Hủy
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Đang xử lý...' : (editingCategoryId ? 'Cập nhật' : 'Tạo Category')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
