import "./../styles/navbar.css";
import Button from "./Button";
import Logo from "../assets/icons/icon.png";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar-container">
                <div className="logo" >
                    <img src={Logo} alt="Alma" />
                    <span>Alma</span>
                </div>
                

                <nav className="nav-links">
                    <a href="#">Features</a>
                    <a href="#">How it work</a>
                    <a href="#">Pricing</a>
                    <a href="#">About</a>
                </nav>

                <div className="nav-actions">
                    <Button variant="secondary">
                        Login
                    </Button>

                    <Button>
                        Get Started
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;