import { motion } from "framer-motion";

import "../styles/heroPreview.css";

import dashboard from "../assets/images/hero/dashboard.png";
import mobile from "../assets/images/hero/mobile.png";

const HeroPreview = () => {
    return (
        <div className="hero-preview">

            <motion.img
                initial={{ opacity: 0, y: 0, scale: 0.19 }}
                animate={{  opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}

                className="dashboard-preview"
                src={dashboard}
                alt="Dashboard"
            />

           <motion.img
                className="mobile-preview"
                src={mobile}
                alt="Mobile"

                initial={{ opacity: 0, x: 120, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: 0.35, type: "spring", stiffness: 50, damping: 18}}
            />


        </div>
    );
};

export default HeroPreview;