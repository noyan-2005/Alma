import { CalendarHeart, CircleCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import "../styles/DashboardPreview.css";

import Dashboard from "../assets/images/hero/dashboard.png";
import Button from "./Button"

const DashboardPreview = ({stage}) => {
    return(
        <>
        <motion.div
            className="dashboard-preview"
            initial={false}
            animate={{
                opacity: stage >= 7 ? 1 : 0,
                x: stage >= 7 ? 0 : -200,
                y: stage >= 7 ? 70 : 70,
                scale: stage >= 7 ? 1 : 0.97,
            }}
            transition={{
                duration: 0.8,
                ease: "easeOut",
            }}
            style={{
                pointerEvents: stage >= 7 ? "auto" : "none",
                visibility: stage >= 7 ? "visible" : "hidden",
            }}
         >
            <div className="dash-container">
                 <img src={Dashboard} alt="Dashboard preview" className="dashboard-image" />
            </div>
            <section className="dashboard-content">
                <div className="badge">
                <CalendarHeart size={16} />
                <span>Your data, your health</span>
                </div>
                <div className="heading">
                    <h3>All your health data <br/> in one smart dashboard</h3>
                </div>
                <div className="features">
                    <div className="feature">
                        <CircleCheck size={20} />
                        <p>Track calories, macros, and water intake</p>
                    </div>
                    <div className="feature">
                        <CircleCheck size={20} />
                        <p>Monitor weight and body measurements</p>
                    </div>
                    <div className="feature">
                        <CircleCheck size={20} />
                        <p>See trends and progress over time</p>
                    </div>
                    <div className="feature">
                        <CircleCheck size={20} />
                        <p>Get insights to make better decisions</p>
                    </div>
                    <Button label="Explore Dashboard" className="Btn">Explore Dashboard <ArrowRight size={20} /> </Button>
                        

                </div>

            </section>

        </motion.div>
        </>

    )
}

export default  DashboardPreview;