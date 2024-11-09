import React from "react";
import { Typography } from "antd";

interface LabelProps {
  text: string;
}

const FormItemLabel: React.FC<LabelProps>  = ({text}) => {
  return (
    <>
      <Typography.Text className="font-bold" key={text}>{text}</Typography.Text>
    </>
  )
}

export default FormItemLabel;