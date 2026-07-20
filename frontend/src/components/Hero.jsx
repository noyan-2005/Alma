import { motion } from "framer-motion";

import "../styles/hero.css";

import Badge from "./Badge";
import Heading from "./Heading";
import Description from "./Description";
import HeroButtons from "./HeroButtons";
import UserAvatars from "./UserAvatars";
import HeroPreview from "./HeroPreview";

const Hero = ({ stage }) => {
    return (
        <motion.section
            className="hero"
            animate={{
                opacity: stage >= 1 ? 0 : 1,
                scale: stage >= 1 ? 0.96 : 1,
                y: stage >= 1 ? -30 : 0,
                filter: stage >= 1 ? "blur(12px)" : "blur(0px)",
                pointerEvents: stage >= 1 ? "none" : "auto",
            }}
            transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
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
                    transition={{ delay: 0.45, duration: 0.6 }}
                >
                    <Heading />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                >
                    <Description />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.25, duration: 0.6 }}
                >
                    <HeroButtons />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.45, duration: 0.6 }}
                >
                    <UserAvatars />
                </motion.div>

            </div>

            <div className="hero-right">
                <HeroPreview />
            </div>

        </motion.section>
    );
};

export default Hero;