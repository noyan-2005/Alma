import "../styles/hero.css";

import Badge from "./Badge";
import Heading from "./Heading";
import Description from "./Description";
import HeroButtons from "./HeroButtons";
import UserAvatars from "./UserAvatars";
import HeroPreview from "./HeroPreview";

const Hero = () => {
    return (
        <section className="hero">

            <div className="hero-left">

                <Badge />

                <Heading />

                <Description />

                <HeroButtons />

                <UserAvatars />

            </div>

            <div className="hero-right">

            <HeroPreview />

            </div>

        </section>
    );
};

export default Hero;