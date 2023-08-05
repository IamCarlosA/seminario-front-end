import React, { FC } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.scss";
import MediaItem from "../mediaItem/MediaItem";
import { Medium } from "../Medium";

interface Props {
  media: Medium[];
}

const MediaList: FC<Props> = ({ media }) => (
  <div className="media-list-container p_xl">
    {media.map((medium) => (
      <MediaItem key={uuidv4()} medium={medium} />
    ))}
  </div>
);

export default MediaList;
