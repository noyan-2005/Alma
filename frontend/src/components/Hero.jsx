import { motion } from "framer-motion";
  
import "../styles/hero.css";

import Badge from "./Badge";
import Heading from "./Heading";
import Description from "./Description";
import HeroButtons from "./HeroButtons";
import UserAvatars from "./UserAvatars";
import HeroPreview from "./HeroPreview";

const Hero = () => {
    return (
        <section className="hero">

            <div className="hero-left">

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Badge />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.6 }}
                >
                    <Heading />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.30, duration: 0.6 }}
                >
                    <Description />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45, duration: 0.6 }}
                >
                    <HeroButtons />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.60, duration: 0.6 }}
                >
                    <UserAvatars />
                </motion.div>

            </div>

            <div className="hero-right">

            <HeroPreview />

            </div>

        </section>
    );
};

export default Hero;