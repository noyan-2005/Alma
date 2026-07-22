import { useEffect, useRef, useState } from "react";

const SCROLL_THRESHOLD = 100;
const ANIMATION_DURATION = 700;

const useStageController = (maxStage) => {

    const [stage, setStage] = useState(0);

    const scrollProgress = useRef(0);
    const isAnimating = useRef(false);

    useEffect(() => {

        const handleWheel = (e) => {

            e.preventDefault();

            if (isAnimating.current) return;

            scrollProgress.current += e.deltaY;

            if (scrollProgress.current >= SCROLL_THRESHOLD) {

                isAnimating.current = true;

                setStage((prev) => Math.min(prev + 1, maxStage));

                scrollProgress.current = 0;

                setTimeout(() => {

                    isAnimating.current = false;

                }, ANIMATION_DURATION);

            }

            if (scrollProgress.current <= -SCROLL_THRESHOLD) {

                isAnimating.current = true;

                setStage((prev) => Math.max(prev - 1, 0));

                scrollProgress.current = 0;

                setTimeout(() => {

                    isAnimating.current = false;

                }, ANIMATION_DURATION);

            }

        };

        window.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {

            window.removeEventListener("wheel", handleWheel);

        };

    }, [maxStage]);

    return {

        stage,

    };

};

export default useStageController;