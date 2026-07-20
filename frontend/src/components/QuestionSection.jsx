import { motion } from "framer-motion";

import { features } from "../data/features";
import FeatureCard from "./FeatureCard";

import "../styles/questionSection.css";

const QuestionSection = ({ stage }) => {
    return (
        <section className="question-section">

            <motion.div
                className={`question-wrapper ${
                    stage >= 2 ? "question-top" : "question-center"
                }`}
                layout
                transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                }}
            >

                {/* ================= HEADER ================= */}

                <motion.div
                    className="question-header"
                    initial={false}
                    animate={{
                        opacity: stage >= 1 ? 1 : 0,
                        scale: stage >= 2 ? .85 : 1,
                    }}
                    transition={{
                        duration: .6,
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

        </section>
    );
};

export default QuestionSection;