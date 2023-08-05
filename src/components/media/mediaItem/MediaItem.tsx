import React, { FC, useCallback } from "react";
import "./styles.scss";
import { Medium } from "../Medium";

interface Props {
  medium: Medium;
}

const MediaItem: FC<Props> = ({ medium }) => {
  const Component = medium.component;

  const onClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      window.open(medium.link, "_blank", "noopener noreferrer");
    },
    [medium.link]
  );

  return (
    <div onClick={onClick} className="medium-item-container dso_card m_r_xxl">
      <div style={{ fill: medium.color }}>
        <Component />
      </div>
    </div>
  );
};

export default MediaItem;
