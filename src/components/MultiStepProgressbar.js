import React, { useState, useEffect } from "react";
import "./MultiStepProgressBar.css";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { Button, Container } from "react-bootstrap";

const MultiStepProgressBar = ({ currentStep, setCurrentStep }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth < 768;

  let stepPercentage = 0;
  if (currentStep === 1) {
    stepPercentage = 0;
  } else if (currentStep === 2) {
    stepPercentage = 16;
  } else if (currentStep === 3) {
    stepPercentage = 35;
  } else if (currentStep === 4) {
    stepPercentage = 57;
  } else if (currentStep === 5) {
    stepPercentage = 77;
  } else if (currentStep === 6) {
    stepPercentage = 98;
  } else {
    stepPercentage = 0;
  }

  const steps = [
    "Personal Details",
    "Documents",
    "Employment Details",
    "References",
    "Nominee",
    "Bank Details",
  ];
  const handleProgress = (index) => {
    if (currentStep > index) {
      setCurrentStep(index + 1);
    }
  };
  return (
    <Container fluid className="my-5 mx-2">
      <ProgressBar percent={stepPercentage}>
        {steps.map((step, index) => (
          <Step key={index}>
            {({ accomplished }) => (
              <Button
                onClick={() => handleProgress(index)}
                className={`indexedStep ${
                  accomplished ? "accomplished" : null
                } fw-bold`}
              >
                {isSmallScreen ? index + 1 : step}
              </Button>
            )}
          </Step>
        ))}
      </ProgressBar>
    </Container>
  );
};

export default MultiStepProgressBar;
