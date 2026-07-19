import { Leaf } from "lucide-react";
import "../styles/badge.css";

const Badge = () => {
  return (
    <div className="badge">
      <Leaf size={16} />
      <span>Smart Nutrition for a Better You</span>
    </div>
  );
};

export default Badge;