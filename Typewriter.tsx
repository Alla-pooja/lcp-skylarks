import React from "react";

interface TypewriterProps {
  text: string;
  delay?: number;
  infinite?: boolean;
}

const Typewriter: React.FC<TypewriterProps> = ({ text, delay = 10, infinite = false }) => {
  const [currentText, setCurrentText] = React.useState("");
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    let timeout: NodeJS.Timeout | undefined;

    if (currentIndex <= text.length - 1) {
      timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
    } else if (infinite) {
      setCurrentIndex(0);
      setCurrentText("");
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, infinite, text]);

  return <>{currentText}</>;
};

export default Typewriter;
