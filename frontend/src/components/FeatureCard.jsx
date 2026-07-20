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
                x: stage >= 2 ? 0 : 0,
                scale: stage >= 2 ? 1 : 0.96,
            }}
            transition={{
                duration: 0.1,
                ease: [0.4, 0, 0.2, 1],
            }}
            whileHover={{
                y: -5,
                scale: 1.03,
            }}
        >
            <motion.div
                className="feature-icon"
            >
                <Icon size={28} />
            </motion.div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>
        </motion.div>
    );
};

export default FeatureCard;