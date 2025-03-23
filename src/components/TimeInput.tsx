import React, { useState } from "react";

const TimeInput: React.FC = () => {
  const [value, setValue] = useState("0:00");

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const seconds = Math.max(0, getSecondsFromHHMMSS(inputValue));
    const formattedTime = toHHMMSS(seconds);
    setValue(formattedTime);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
    />
  );
};

const getSecondsFromHHMMSS = (value: string): number => {
  const parts = value.split(":").map(Number);
  if (parts.length === 1) return parts[0]; // seconds
  if (parts.length === 2) return parts[0] * 60 + parts[1]; // minutes:seconds
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2]; // hours:minutes:seconds
  return 0;
};

const toHHMMSS = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor((secs % 3600) / 60);
  const seconds = secs % 60;

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== "00" || index > 0)
    .join(":")
    .replace(/^0/, "");
};

export default TimeInput;