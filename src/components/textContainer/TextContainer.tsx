import React, {useState} from "react";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import "./TextContainer.scss";

interface TextContainerProps {
  text: string;
  maxLength: number;
}

const TextContainer: React.FC<TextContainerProps> = ({text, maxLength}) => {
  const [showFullText, setShowFullText] = useState(false);

  const truncatedText = text.slice(0, maxLength);
  const remainingText = text.slice(maxLength);

  const toggleShowFullText = () => setShowFullText((prev) => !prev);

  const renderTextButton = () => {
    return <div
      className="text-center"
      onClick={toggleShowFullText}
      style={{
        marginTop: "2vh",
        cursor: "pointer",
        color: "#286EE8",
      }}
    >
      {showFullText
        ? <div style={{display: "flex", alignItems: "center"}}>Leer Menos<ArrowDropUpIcon/></div>
        : <div style={{display: "flex", alignItems: "center"}}>Leer Todo<ArrowDropDownIcon/></div>}
    </div>;
  };

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <div className="text-container"
           style={{
             height: "auto",
             textAlign:"justify",
             textJustify:"inter-word"
      }}>
        {showFullText ? (
          <>
            {text}
            <br/>
          </>
        ) : (
          <>
            {truncatedText}
            {remainingText.length > 0 && (
              <>
                ...{" "}
                <br/>
                <div className="text-gradient"/>
              </>
            )}
          </>
        )}
      </div>
      {renderTextButton()}
    </div>

  );
};

export default TextContainer;
