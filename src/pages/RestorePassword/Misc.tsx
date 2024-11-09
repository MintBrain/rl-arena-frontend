import React from "react";
import { Button, Form } from "antd";

interface NextButtonProps {
  loading: boolean;
  text: string;
  style?: React.CSSProperties
}

interface ReturnLinkProps {
  text: string;
  onClick: () => void;
}

export const NextButton: React.FC<NextButtonProps> = ({ text, loading,
                                                        style={ marginTop: 24, marginBottom: 20 } }) => {
  return (
    <Form.Item style={style}>
      <Button type="primary" htmlType="submit" loading={loading} className="w-full bg-accentColor">
        {text}
      </Button>
    </Form.Item>
  );
};

export const ReturnLink: React.FC<ReturnLinkProps> = ({ text, onClick }) => {
  return (
    <Form.Item className="flex justify-center my-0">
      <Button type="link" className="text-accentColor ml-2" onClick={onClick}>{text}</Button>
    </Form.Item>
  );
};