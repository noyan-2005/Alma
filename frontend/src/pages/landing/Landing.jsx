import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import QuestionSection from "../../components/QuestionSection";
import HowItWorksSection from "../../components/HowItWorksSection";
import useStageController from "../../hooks/useStageController";
import DashboardPreview from "../../components/DashboardPreview";

import "../../styles/ScrollScene.css";

const MAX_STAGE = 7 ;

const Landing = () => {

    const { stage } = useStageController(MAX_STAGE);
 
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

                <HowItWorksSection stage={stage} />

                <DashboardPreview stage={stage} />

            </div>
        </div>
    );
};

export default Landing;