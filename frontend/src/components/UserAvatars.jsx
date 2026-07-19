import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import "../styles/userAvatars.css";

import user1 from "../assets/images/avatars/user1.jpg";
import user2 from "../assets/images/avatars/user2.jpg";
import user3 from "../assets/images/avatars/user3.jpg";
import user4 from "../assets/images/avatars/user4.jpg";
import user5 from "../assets/images/avatars/user5.jpg";
import user6 from "../assets/images/avatars/user6.jpg";
import user7 from "../assets/images/avatars/user7.jpg";
import user8 from "../assets/images/avatars/user8.jpg";

const avatarsData = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
];

const UserAvatars = () => {
  const avatars = useMemo(() => avatarsData, []);

  const [queue, setQueue] = useState(avatars.slice(0, 4));

  const [nextIndex, setNextIndex] = useState(4);

  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;

    const timer = setInterval(() => {
      setQueue((prev) => {
        const next = [...prev];

        next.shift();

        next.push(avatars[nextIndex]);

        return next;
      });

      setNextIndex((prev) => (prev + 1) % avatars.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [paused, nextIndex, avatars]);

  return (
    <div className="users">
      <div
        className="avatars"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="popLayout">
          {queue.map((avatar) => (
            <motion.img
              key={avatar}
              layout
              src={avatar}
              alt="User"
              initial={{
                opacity: 0,
                x: 45,
                scale: 0.8,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: -45,
                scale: 0.8,
              }}
              transition={{
                layout: {
                  type: "spring",
                  stiffness: 280,
                  damping: 22,
                },
                duration: 0.35,
              }}
              whileHover={{
                scale: 1.12,
                y: -4,
                zIndex: 10,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="users-info">
        <h4>10K+ Happy Users</h4>
        <p>Join our growing community</p>
      </div>
    </div>
  );
};

export default UserAvatars;