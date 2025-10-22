import StringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

function FollowPointer({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: { name: string; avatar: string; email: string };
}) {
  const color = StringToColor({ str: info.email || "1" });
  return (
    <motion.div
      className="h-4 w-4 z-50 rounded-full absolute"
      style={{ top: y, left: x, pointerEvents: "none" }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <div className={`w-4 h-4 bg-[${color}] rounded-full`}></div>
      <motion.div
        style={{ top: y, left: x, pointerEvents: "none" }}
        initial={{ scale: 0.5, opacity: 0.5 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
      >
        {info?.name || info.email}
      </motion.div>
    </motion.div>
  );
}
export default FollowPointer;
