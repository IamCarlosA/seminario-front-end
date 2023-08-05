/* eslint-disable jsx-a11y/media-has-caption */
import React, { FC, memo, useEffect, useRef } from "react";

export interface RenderCameraButtonsProps {
  takePicture: () => void;
  clearPicture: () => void;
}

export interface RenderErrorProps {
  error: any;
  getVideo: () => void;
}

export interface OnTakePictureProps {
  imageData: string;
  imageFile: File;
  imageBlob: Blob;
}

interface Props {
  width?: number;
  errorRender?: FC<RenderErrorProps>;
  render: FC<RenderCameraButtonsProps>;
  onTakePicture?: ({
    // eslint-disable-next-line no-unused-vars
    imageData,
    // eslint-disable-next-line no-unused-vars
    imageFile,
    // eslint-disable-next-line no-unused-vars
    imageBlob,
  }: OnTakePictureProps) => void;
  onClearPicture?: () => void;
}

const Camera: FC<Props> = ({
  width = 400,
  errorRender,
  render,
  onTakePicture,
  onClearPicture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const photoRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = React.useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream>();
  const [error, setError] = React.useState(null);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        video.play();
        mediaStreamRef.current = stream;
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  const takePicture = () => {
    const video = videoRef.current;
    const photo = photoRef.current;
    if (!video || !photo) return;

    const imageWidth = video.offsetWidth;
    const imageHeight = video.offsetHeight;
    [photo.width, photo.height] = [imageWidth, imageHeight];
    const ctx = photo.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, imageWidth, imageHeight);
    const imageData = photo.toDataURL("image/webp");
    setImage(imageData);
    if (onTakePicture) {
      photo.toBlob((imageBlob) => {
        if (imageBlob) {
          onTakePicture({
            imageData,
            imageBlob,
            imageFile: new File(
              [imageData],
              `capture_${new Date().getTime()}.jpg`,
              {
                type: "image/jpeg",
              }
            ),
          });
        }
      });
    }
  };

  const clearPicture = () => {
    const photo = photoRef.current;
    if (!photo) return;
    const ctx = photo.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, photo.width, photo.height);
    setImage(null);
    if (onClearPicture) onClearPicture();
  };

  useEffect(() => {
    getVideo();
  }, []);

  useEffect(
    () => () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => {
          track.stop();
        });
      }
    },
    []
  );

  return (
    <div className="camera-container display_flex flex_col flex_align_center flex_justify_center">
      <video
        width={width}
        className={image ? "display_none" : ""}
        ref={videoRef}
      />
      <canvas
        width={width}
        className={!image ? "display_none" : ""}
        ref={photoRef}
      />
      {!error
        ? render({ takePicture, clearPicture })
        : errorRender && errorRender({ error, getVideo })}
    </div>
  );
};

export default memo(Camera);
