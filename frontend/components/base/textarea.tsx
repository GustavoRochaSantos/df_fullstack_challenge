import React, { TextareaHTMLAttributes } from "react";

interface Params extends TextareaHTMLAttributes<HTMLTextAreaElement> {}

const TextArea = ({ cols = 1, rows = 6, wrap, ...props }: Params) => {
  return <textarea rows={rows} wrap={wrap} {...props} />;
};

export default TextArea;
