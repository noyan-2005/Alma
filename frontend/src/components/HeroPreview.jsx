import "../styles/heroPreview.css";

import dashboard from "../assets/images/hero/dashboard.png";
import mobile from "../assets/images/hero/mobile.png";

const HeroPreview = () => {
    return (
        <div className="hero-preview">

            <img
                className="dashboard-preview"
                src={dashboard}
                alt="Dashboard"
            />

            <img
                className="mobile-preview"
                src={mobile}
                alt="Mobile App"
            />

        </div>
    );
};

export default HeroPreview;