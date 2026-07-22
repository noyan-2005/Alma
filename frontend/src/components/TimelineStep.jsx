import { motion } from "framer-motion";

import "../styles/timelineStep.css";

const TimelineStep = ({ item, activeStage }) => {

    const Icon = item.icon;

    const isActive = activeStage === item.stage;

    return (

        <motion.div
            className={`timeline-step ${item.side}`}
            layout
            transition={{
                layout: {
                    duration: .6,
                    ease: ["easeIn"],
                },
            }}
        >

            {/* ================= DOT ================= */}

            <motion.div
                className={`timeline-dot ${isActive ? "active" : ""}`}
                animate={{
                    scale: isActive ? 1 : .82,
                    opacity: isActive ? 1 : .35,
                }}
                transition={{
                    duration: .45,
                }}
            >
                <Icon size={24}/>
            </motion.div>

            {/* ================= CARD ================= */}

            <motion.div
                className={`timeline-card ${
                    isActive ? "active" : "inactive"
                }`}
                animate={{
                    scale: isActive ? 1 : .80,

                    opacity: isActive ? 1 : .58,

                    filter: isActive
                        ? "blur(0px)"
                        : "blur(5px)",
                }}
                transition={{
                    duration: .55,
                    ease: ["linear"],
                }}
            >

                <h3>{item.title}</h3>

                <p>{item.description}</p>

            </motion.div>

        </motion.div>

    );

};

export default TimelineStep;