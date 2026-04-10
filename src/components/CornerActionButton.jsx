import { useState } from "react";

function CornerActionButton({ onClick, icon, hoverIcon, style = {} }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.button,
        ...style,
      }}
    >
      <img
        src={isHovered && hoverIcon ? hoverIcon : icon}
        alt=""
        style={{
          ...styles.icon,
          transform: isHovered ? "translateY(-1px)" : "translateY(0)",
          transition: "transform 0.2s ease",
        }}
      />
    </button>
  );
}

const styles = {
  button: {
    position: "absolute",
    border: "none",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    zIndex: 20,
  },

  icon: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    pointerEvents: "none",
  },
};

export default CornerActionButton;