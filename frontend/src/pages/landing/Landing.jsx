import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import QuestionSection from "../../components/QuestionSection";

import "../../styles/ScrollScene.css";

const MAX_STAGE = 3;

const Landing = () => {
    const [stage, setStage] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();

            if (isAnimating) return;

            setIsAnimating(true);

            if (e.deltaY > 0) {
                setStage((prev) => Math.min(prev + 1, MAX_STAGE));
            } else if (e.deltaY < 0) {
                setStage((prev) => Math.max(prev - 1, 0));
            }

            setTimeout(() => {
                setIsAnimating(false);
            }, 700);
        };

        window.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            window.removeEventListener("wheel", handleWheel);
        };
    }, [isAnimating]);

    return (
        <div
            className={`landing ${
                stage >= 1 ? "landing-dark" : ""
            }`}
        >
            <Navbar />

            <div className="scene">
                <Hero stage={stage} />

                <QuestionSection stage={stage} />
            </div>
        </div>
    );
};

export default Landing;