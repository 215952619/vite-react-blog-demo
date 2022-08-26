import { useState, useEffect } from "react";

type Position = { x: number; y: number };
const usePosition = (target: HTMLElement): Position => {
  target = target || document;
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e: MouseEvent) => setPosition({ x: e.x, y: e.y });
    target.addEventListener("mousemove", move);
    return () => target.removeEventListener("mousemove", move);
  }, []);
  return position;
};

export default usePosition;
