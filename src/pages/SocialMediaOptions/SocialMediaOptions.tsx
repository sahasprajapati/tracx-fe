import React from "react";
import "./index.css";
interface Props {
  onClick?: () => void;
  logo: string;
  title: string;
}

const SocialMediaLoginOptions: React.FC<Props> = ({ onClick, logo, title }) => {
  return (
    <div  onClick={onClick}>
      <div >
        <img src={logo} alt="google-logo" />
      </div>
      <h6 style={{
        color: '#ffff'
      }}>{title}</h6>
    </div>
  );
};

export default React.memo(SocialMediaLoginOptions);
