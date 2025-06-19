"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

type ProgressBarProps = {
  initialState: number;
  currentState: number;
  delay: number;
};

export function ProgressBar({
  initialState,
  currentState,
  delay,
}: ProgressBarProps) {
  const [progress, setProgress] = React.useState(initialState);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(currentState), delay);
    return () => clearTimeout(timer);
  }, [currentState, delay]);

  return <Progress value={progress} className="w-[60%]" />;
}
