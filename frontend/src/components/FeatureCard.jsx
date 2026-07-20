import { motion } from "framer-motion";

import "../styles/featureCard.css";

const FeatureCard = ({ feature, stage, index }) => {
    const Icon = feature.icon;

    const isLeft = index % 2 === 0;

    return (
        <motion.div
            className="feature-card"
            initial={false}
            animate={{
                opacity: stage >= 2 ? 1 : 0,
                x: stage >= 2 ? 0 : isLeft ? -80 : 80,
                scale: stage >= 2 ? 1 : 0.96,
            }}
            transition={{
                duration: 0.6,
                delay: stage >= 2 ? index * 0.12 : 0,
                ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={{
                y: -10,
                scale: 1.03,
            }}
        >
            <motion.div
                className="feature-icon"
                whileHover={{
                    rotate: 10,
                    scale: 1.12,
                }}
                transition={{
                    duration: 0.25,
                }}
            >
                <Icon size={28} />
            </motion.div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
        </motion.div>
    );
};

export default FeatureCard;