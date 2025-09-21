import { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { categoryService } from '../services/categoryService';
import '../styles/pages/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imagepath: null,
    categoryId: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await productService.getProducts();
      setProducts(res.data?.content || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await categoryService.getCategories();
      setCategories(res.data || []);
    } catch (err) {
      console.error('Lỗi load categories: ', err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (err) {
        alert('Lỗi khi xóa: ' + err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Vui lòng nhập tên sản phẩm');
      return;
    }
    if (!formData.price || isNaN(formData.price)) {
      alert('Giá phải là số');
      return;
    }
    if (!formData.categoryId) {
      alert('Vui lòng chọn Category');
      return;
    }
    if (!formData.imagepath) {
      alert('Vui lòng chọn imagepath');
      return;
    }

    try {
      setSubmitting(true);
      const productPayload = new FormData();
      productPayload.append('name', formData.name);
      productPayload.append('price', formData.price);
      productPayload.append('description', formData.description);
      if (formData.imagepath) {
        productPayload.append('imagepath', formData.imagepath);
      }
      productPayload.append('categoryId', formData.categoryId);

      if (editingProductId) {
        await productService.updateProduct(editingProductId, productPayload);
      } else {
        await productService.createProduct(productPayload);
      }

      closeModal();
      fetchProducts();
    } catch (err) {
      alert(`Lỗi khi ${editingProductId ? 'cập nhật' : 'tạo'} sản phẩm: ` + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagepath') {
      const file = files[0];
      setFormData({
        ...formData,
        imagepath: file,
        image: file ? URL.createObjectURL(file) : null
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleEdit = (product) => {
    setEditingProductId(product.idProduct);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description || '',
      categoryId: product.categoryId || '',
      imagepath: null,
      image: product.imagepath ? `http://localhost:8083${product.imagepath}` : null
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      price: '',
      description: '',
      imagepath: null,
      categoryId: ''
    });
    setEditingProductId(null);
  };

  if (loading) return <p>⏳ Đang tải dữ liệu...</p>;
  if (error) return <p>❌ Lỗi: {error}</p>;

  return (
    <div className="product-page">
      <div className="page-header">
        <h2>🛒 Quản lý Products</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Thêm Product
        </button>
      </div>

      {products.length === 0 ? (
        <p>Chưa có sản phẩm nào</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Category</th>
              <th>Ảnh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.idProduct}>
                <td>#{p.idProduct}</td>
                <td>{p.name}</td>
                <td>{p.price.toLocaleString()} đ</td>
                <td>
                  {p.description
                    ? (p.description.length > 20
                      ? p.description.substring(0, 20) + "..."
                      : p.description)
                    : '-'}
                </td>
                <td>{p.categoryId || '-'}</td>
                <td>
                  {p.imagepath ? (
                    <img src={`http://localhost:8083${p.imagepath}`} alt={p.name} className="thumb" />
                  ) : '—'}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(p)}>✏️</button>
                  <button className="delete-btn" onClick={() => handleDelete(p.idProduct)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{editingProductId ? 'Cập nhật Product' : 'Thêm Product Mới'}</h3>
              <button className="close-btn" onClick={closeModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="name">Tên *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Giá *</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
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
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label htmlFor="categoryId">Category *</label>
                <select
                  id="categoryId"
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">-- Chọn category --</option>
                  {categories.map(c => (
                    <option key={c.idCategory} value={c.idCategory}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="imagepath">Ảnh</label>
                <input
                  type="file"
                  id="imagepath"
                  name="imagepath"
                  accept="image/*"
                  onChange={handleInputChange}
                  required={!editingProductId}
                />
                {formData.image && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={formData.image}
                      alt="Preview"
                      style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover', border: '1px solid #ddd' }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={closeModal}>
                  Hủy
                </button>
                <button type="submit" className="submit-btn" disabled={submitting}>
                  {submitting ? 'Đang xử lý...' : (editingProductId ? 'Cập nhật' : 'Tạo Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
