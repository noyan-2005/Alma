import StoryQuestion from "./StoryQuestion";
import StoryCards from "./StoryCards";

import "../styles/storySection.css";

const StorySection = () => {
    return (
        <section className="story-section">

            <StoryQuestion />

            <StoryCards />

        </section>
    );
};

export default StorySection;