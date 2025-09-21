const Header = ({ toggleSidebar, sidebarCollapsed }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ☰
          </button>
          <div className="logo flex items-center space-x-3">
            <img
              src="/hq_fullstack_logo.svg"
              alt="HQ Logo"
              className="logo-icon w-14 h-14"
            />
            <span className="logo-text font-semibold text-2xl">Admin</span>
          </div>
        </div>
        <div className="header-center">
          <div className="search-box">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">🔍</button>
          </div>
        </div>
        <div className="header-actions">
          <span>Welcome, Admin</span>
          <button>Logout</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
