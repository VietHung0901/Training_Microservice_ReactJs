import { Link } from 'react-router-dom';

const Sidebar = ({ collapsed }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Categories', path: '/categories', icon: '📂' },
    { name: 'Products', path: '/products', icon: '📦' },
    { name: 'Orders', path: '/orders', icon: '🛒' },
    { name: 'Settings', path: '/settings', icon: '⚙️' }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path} title={item.name}>
                <div className="menu-item">
                  <div>
                    <span className="menu-icon">{item.icon}</span>
                  </div>
                  <div>
                    <span className="menu-text">{item.name}</span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
