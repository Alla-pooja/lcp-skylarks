import { convertSecondsToMMSS } from "../utils/helper";

export interface DurationProps {
  className?: string;
  seconds: number;
}

export default function Duration({ className, seconds }: DurationProps) {
  return (
    <time dateTime={`P${Math.round(seconds)}S`} className={className}>
      {convertSecondsToMMSS(seconds)}
    </time>
  );
}
