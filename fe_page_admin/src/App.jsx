import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import CategoryList from './pages/CategoryList'
import ProductList from './pages/ProductList'

import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <div className="dashboard">
              <h2>Dashboard</h2>
              <div className="dashboard-cards">
                <div className="card">
                  <h3>Total Users</h3>
                  <p>1,234</p>
                </div>
                <div className="card">
                  <h3>Total Orders</h3>
                  <p>567</p>
                </div>
                <div className="card">
                  <h3>Revenue</h3>
                  <p>$12,345</p>
                </div>
              </div>
            </div>
          } />
          <Route path="/categories" element={<CategoryList />} />
          <Route path="/products" element={<ProductList />} />

        </Routes>
      </Layout>
    </Router>
  )
}

export default App
