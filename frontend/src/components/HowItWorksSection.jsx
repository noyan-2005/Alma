import { motion } from "framer-motion";

import { timeline } from "../data/timeLine";
import TimelineStep from "./TimelineStep";

import "../styles/howItWorksSection.css";

const HowItWorksSection = ({ stage }) => {

    const visible = stage >= 3 && stage <= 6;

    return (
        <section
            className="how-section"
            style={{
                pointerEvents: visible ? "auto" : "none",
            }}
        >
            <motion.div
                className="how-wrapper"
                initial={false}
                animate={{
                    opacity: visible ? 1 : 0,
                    y: visible ? 0 : 60,
                }}
                transition={{
                    duration: .6,
                }}
            >

                {/* ================= HEADER ================= */}

                <div className="how-header">

                    <h2>How Alma Works</h2>

                    <p>
                        Start your journey in just three simple steps.
                    </p>

                </div>

                {/* ================= TIMELINE ================= */}

                <div className="timeline">

                    {timeline.map((item) => (

                        <TimelineStep
                            key={item.id}
                            item={item}
                            activeStage={stage}
                        />

                    ))}

                </div>

            </motion.div>
        </section>
    );
};

export default HowItWorksSection;