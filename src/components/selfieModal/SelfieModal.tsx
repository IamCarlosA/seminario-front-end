import React, { FC, useCallback } from "react";
import { Typography, Modal, Button } from "@ecommerce-ozon/design_system";
import Camera, { OnTakePictureProps, RenderCameraButtonsProps, RenderErrorProps } from "../camera/Camera";
import OzonCamera from "../ozonCamera/OzonCamera";

interface Props {
  setOpen: Function;
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onTakePicture: (data: OnTakePictureProps) => void;
  onClearPicture: () => void;
}


const RenderCameraButtonsWithoutImage: FC<RenderCameraButtonsProps> = ({ takePicture }) => <div
  className="m_t_xxl display_flex w_100_per flex_justify_center">
  <Button className="w_70_per" variant="outline" scale="small" onClick={takePicture}>
    Tomar foto
  </Button>
</div>;

const ErrorRender: FC<RenderErrorProps> = ({ getVideo }) => <div className="display_flex flex_col flex_align_center">
  <Typography weight="600" scale="large" className="text_center">
    Necesitas otorgar permisos para usar la cámara
  </Typography>
  <Button variant="outline" scale="small" className="w_80_per m_y_lg" onClick={getVideo}>
    Intentar de nuevo
  </Button>
</div>;

const SelfieModal: FC<Props> = ({ setOpen, open, onTakePicture, onClearPicture }) => {
  const [imageData, setImageData] = React.useState<OnTakePictureProps | null>(null);


  const handleTakePicture = (data: OnTakePictureProps) => {
    setImageData(data);
    if (imageData) {
      if (onTakePicture) {
        onTakePicture(imageData);
      }
    }
    setOpen(false);
  };

  const handleClearPicture = () => {
    setImageData(null);
    onClearPicture();
  };

  const RenderCameraButtonsWithImage: FC<RenderCameraButtonsProps> = useCallback(({ clearPicture }) => <div
    className="m_t_xxl display_flex w_100_per flex_justify_center">
    <Button className="w_30_per m_r_lg" variant="outline" scale="small" onClick={clearPicture}>
      Probar de nuevo
    </Button>
    <Button className="w_30_per m_r_lg" variant="outline" scale="small" onClick={() => {
      if (imageData) {
        if (onTakePicture) {
          onTakePicture(imageData);
        }
      }
      setOpen(false);
    }}>
      Confirmar
    </Button>
  </div>, [setOpen, imageData]);

  return <Modal onClose={() => setImageData(null)} className="city-modal" open={open} setOpen={setOpen}>
    {open &&
      // <Camera width={500} onTakePicture={handleTakePicture} onClearPicture={handleClearPicture}
      //         render={imageData ? RenderCameraButtonsWithImage : RenderCameraButtonsWithoutImage}
      //         errorRender={ErrorRender} />
      <OzonCamera
                  onTakePicture={onTakePicture}
                  handleTakePicture={handleTakePicture}
                  handleClearPicture={handleClearPicture}/>
    }
  </Modal>;
};


export default SelfieModal;
