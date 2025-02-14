import { cn } from "@/helpers";
import React from "react";
import { GoCheck } from "react-icons/go";

interface StepperProps {
  active: number;
  steps: { key: string; title: string }[];
}

const Stepper = ({ steps, active }: StepperProps) => {
  return (
    <div className="w-full flex justify-center items-center stepper">
      {steps.map((step, i) => (
        <div
          key={step.key}
          className={cn(
            "relative flex items-center justify-center text-center p-2 gap-2",
            `step step-${i}`,
            active === i ? "active" : active > i ? "completed" : ""
          )}
        >
          <div
            className={cn(
              "w-8 h-8 step-number flex items-center justify-center rounded-full"
            )}
          >
            {active > i ? (
              <GoCheck fontSize="1.25rem" color="white" />
            ) : (
              <span className="text-base font-normal">{i + 1}</span>
            )}
          </div>
          <span className="text-sm step-title font-medium">{step.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
