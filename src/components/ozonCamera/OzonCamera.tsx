/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState, useRef, useCallback } from "react";
import Webcam, { WebcamProps } from "react-webcam";
import FlipCameraIosIcon from "@mui/icons-material/FlipCameraIos";
import {Fab} from "@mui/material";
import {Button} from "@ecommerce-ozon/design_system";

type CameraProps = MediaDeviceInfo & { facingMode: string };

const getCameraLabel = (camera: CameraProps) =>
  camera.label ||
  `Camera ${camera.deviceId.slice(0, 4)}... (${camera.facingMode})`;

export const CameraSwitcher: React.FC<{
  availableCameras: CameraProps[];
  currentCameraIndex: number;
  onCameraChange: (index: number) => void;
}> = ({ availableCameras, currentCameraIndex, onCameraChange }) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      onCameraChange(parseInt(value, 10));
    },
    [onCameraChange]
  );

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>
        Select Camera:
        <select value={currentCameraIndex} onChange={handleChange}>
          {availableCameras.map((camera, index) => (
            <option key={camera.deviceId} value={index}>
              {getCameraLabel(camera)}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

type OzonCameraProps = {
  handleClearPicture:any;
  onTakePicture:any;
  handleTakePicture: any;
}

const OzonCamera: React.FC<OzonCameraProps> = ({
                                                 handleClearPicture,
                                                 handleTakePicture,
                                                 onTakePicture,
                                               }) => {
  const [availableCameras, setAvailableCameras] = useState<CameraProps[]>([]);
  const [currentCameraIndex, setCurrentCameraIndex] = useState<number>(0);
  const webcamRef = useRef<Webcam>(null);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const [imageSrc, setImageSrc] = useState<any>(undefined);
  const [capturedImage, setCapturedImage] = useState<any>(undefined);
  const [imageMetaData, setImageMetaData] = useState<any>(null);


  const handleCameraChange = useCallback((index: number) => {
    setCurrentCameraIndex(index);
  }, []);


  const handleClearPhoto = () => {
    handleClearPicture();
    setImageSrc(undefined);
    setCapturedImage(undefined);
    setImageMetaData(null);
  };

  const handleUserMedia = useCallback((stream: MediaStream) => {
    const cameras = stream.getVideoTracks().map((track) => ({
      deviceId: track.getSettings().deviceId,
      facingMode: track.getSettings().facingMode,
      groupId: track.getSettings().groupId,
      kind: track.kind,
      label: track.label,
    })) as CameraProps[];
    setAvailableCameras(cameras);
  }, []);

  const videoConstraints: any = {
    deviceId: {
      exact: availableCameras[currentCameraIndex]?.deviceId,
    },
  };



  const handleCapture = useCallback(() => {
    // eslint-disable-next-line no-shadow
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      // eslint-disable-next-line no-use-before-define
      const blob = dataURLtoBlob(imageSrc);
      const file = new File([blob], "stepperPhoto.jpg", { type: "image/jpeg" });
      setCapturedImage(file);
    }
    setImageSrc(imageSrc);
  }, [webcamRef]);



  const handleImgSave = ()=>{
    setImageMetaData({
      imageData: imageSrc,
      imageFile: capturedImage
    });
    // setOpen(false);
  };

  React.useEffect(() => {

    if(imageMetaData){
      onTakePicture(imageMetaData);
      handleTakePicture(imageMetaData);
    }
  }, [imageMetaData]);


  const dataURLtoBlob = (dataURL: string) => {
    const split = dataURL.split(",");
    // @ts-ignore
    const mimeType = split[0].match(/:(.*?);/)[1];
    const byteString = atob(split[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([arrayBuffer], { type: mimeType });
  };

  const handleSwitchCamera = useCallback(() => {
    setFacingMode((prevFacingMode) => (prevFacingMode === "user" ? "environment" : "user"));
  }, []);

  return (
    <>
      {!imageSrc  ? <>

        <div>
          <Webcam
            height="100%"
            width="100%"
            audio={false}
            forceScreenshotSourceSize
            imageSmoothing
            mirrored={facingMode === "user"}
            videoConstraints={{ facingMode }}
            screenshotFormat="image/jpeg"
            screenshotQuality={5}
            onUserMedia={handleUserMedia}
            ref={webcamRef}
          />
          <div className="display_none_desktop"
            onClick={handleSwitchCamera}
            style={{
            position: "absolute",
            bottom:"100px",
            right:"35px",
            backgroundColor:"rgba(0,0,0, 0.4)",
            borderRadius:"50px",
            color:"white",
            cursor:"pointer",
            padding:"10px"
          }}>
            <FlipCameraIosIcon  style={{fontSize:"20px"}}/>
          </div>
        </div>

          {/*<CameraSwitcher*/}
          {/*  availableCameras={availableCameras}*/}
          {/*  currentCameraIndex={currentCameraIndex}*/}
          {/*  onCameraChange={handleCameraChange}*/}
          {/*/>*/}

          <div
            className="m_t_xxl display_flex w_100_per flex_justify_center">
            <Button className="w_70_per" variant="outline" scale="small" onClick={handleCapture}>
              Tomar foto
            </Button>
          </div>

        </>
        :   <>

          <img src={imageSrc} alt="Captured" style={{width:"100%"}}/>
          <div style={{display:"flex",
            justifyContent:"space-between"
          }}>
            <Button variant="outline" scale="small" className="w_80_per m_lg" onClick={handleClearPhoto}>Probar de nuevo </Button>
            <Button variant="outline" scale="small" className="w_80_per m_lg" onClick={handleImgSave}>
              Guardar
            </Button>
          </div>
        </>
      }
    </>
  );
};


export default OzonCamera;
