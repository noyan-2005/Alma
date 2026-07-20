import "./../styles/navbar.css";
import Button from "./Button";
import Logo from "../assets/icons/icon.png";

import { useEffect, useState } from "react";

const Navbar = () => {

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setScrolled(window.scrollY > 30);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);

    }, []);

    return (

        <header className={`navbar ${scrolled ? "scrolled" : ""}`}>

            <div className="navbar-container">

                <a href="/" className="logo">

                    <img src={Logo} alt="Alma" />

                    <span>Alma</span>

                </a>

                <nav className="nav-links">

                    <a href="#">Features</a>

                    <a href="#">How it works</a>

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