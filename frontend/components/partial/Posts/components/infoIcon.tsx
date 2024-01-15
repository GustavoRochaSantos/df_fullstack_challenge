import React from "react";

interface Params {
  icon: React.ReactNode;
  text?: string | number | undefined;
  handleClick?: () => void;
}

const InfoIcon = ({ icon, text = "", handleClick }: Params) => {
  return (
    <div className="post-info-detail" onClick={handleClick}>
      {icon}
      {text}
    </div>
  );
};

export default InfoIcon;
