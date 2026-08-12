import { HOME_STATS } from "@/constants/stats";
import { StatCounter } from "./StatCounter";

export function Statistics() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {HOME_STATS.map((stat, i) => (
        <StatCounter key={stat.key} stat={stat} delay={i * 120} />
      ))}
    </div>
  );
}
