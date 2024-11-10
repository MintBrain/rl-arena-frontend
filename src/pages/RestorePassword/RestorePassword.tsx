import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, FormProps } from "antd";
import EmailForm from "./EmailForm.tsx";
import CodeForm from "./CodeForm.tsx";
import NewPasswordForm from "./NewPasswordForm.tsx";
import "../../styles/Form.css";

interface RestorePasswordProps {
  email?: string;
}

const formProps: FormProps = {
  name: "basic",
  layout: "vertical",
  scrollToFirstError: true,
  requiredMark: false,
  validateTrigger: "onSubmit"
};

export interface StepFormProps {
  email?: string;
  formProps: FormProps;
  nextStep?: () => void;
  onReturnClick?: () => void;
}

const RestorePassword: React.FC<RestorePasswordProps> = ({ email }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = () => setCurrentStep(prev => prev + 1);
  const prevStep = () => setCurrentStep(prev => prev - 1);

  email = "1@1.ru";
  const stepComponents: Record<number, React.ReactNode> = {
    0: <EmailForm email={email} formProps={formProps} nextStep={nextStep} onReturnClick={() => navigate("/login")} />,
    1: <CodeForm email={email} formProps={formProps} nextStep={nextStep} onReturnClick={prevStep} />,
    2: <NewPasswordForm formProps={formProps} />
  };

  return (
    <div className="form-container">
      <div className="form">
        <Typography.Title level={4}
                          className="text-left mt-0 text-textSecondary font-bold"
                          style={{ marginBottom: 12 }}>
          Восстановление пароля через E-mail
        </Typography.Title>

        {stepComponents[currentStep]}
      </div>
    </div>
  );
};

export default RestorePassword;