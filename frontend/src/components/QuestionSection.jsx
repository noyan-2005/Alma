import { motion } from "framer-motion";

import { features } from "../data/features";
import FeatureCard from "./FeatureCard";

import "../styles/questionSection.css";

const QuestionSection = ({ stage }) => {
    return (
        <motion.section
            className="question-section"
            style={{
                pointerEvents: stage >= 1 && stage < 7 ? "auto" : "none",
                visibility: stage >= 1 && stage < 7 ? "visible" : "hidden",
            }}
            
        >

            <motion.div
                className={`question-wrapper ${
                    stage >= 2 ? "question-top" : "question-center"
                }`}
                layout
                transition={{
                    duration: 0.8,
                    ease: ["linear"],
                }}
                animate={{
                    opacity: stage < 3 ? 1 : 0, 
                }}
            >

                {/* ================= HEADER ================= */}

                <motion.div
                    className="question-header"
                    initial={false}
                    animate={{
                        opacity: stage >= 1 ? 1 : 0,

                        scale: stage >= 2 ? 0.85 : 1,

                        y: stage >= 2 ? -5 : 200,
                    }}
                    transition={{
                        duration: 0,
                        ease: ["linear"],
                    }}
                >
                    <h2>Why Alma?</h2>

                    <p>
                        Build faster, collaborate smarter and manage your
                        workflow in one place.
                    </p>
                </motion.div>

                {/* ================= FEATURES ================= */}

                <motion.div
                    className="features-grid"
                    initial={false}
                    animate={{
                        opacity: stage >= 2 ? 1 : 0,
                        y: stage >= 2 ? 0 : 80,
                    }}
                    transition={{
                        duration: .55,
                        delay: stage >= 2 ? .15 : 0,
                    }}
                    style={{
                        pointerEvents: stage >= 2 ? "auto" : "none",
                        visibility: stage >= 2 ? "visible" : "hidden",
                    }}
                >
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={feature.id}
                            feature={feature}
                            index={index}
                            stage={stage}
                        />
                    ))}
                </motion.div>

            </motion.div>

        </motion.section>
    );
};

export default QuestionSection;