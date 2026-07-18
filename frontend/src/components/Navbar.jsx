import "./../styles/navbar.css";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <a href="/" className="logo"> Alma </a>

                <nav className="nav-links">
                    <a href="#">Features</a>
                    <a href="#">How it work</a>
                    <a href="#">Pricing</a>
                    <a href="#">About</a>
                </nav>

                <div className="nav-actions">
                    <button className="login-btn"> Login </button>
                    <button className="primary-btn"> Get Started </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;