import React, { ChangeEvent, FC, useState, useRef, useEffect } from "react";
import "./UploadInput.scss";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { Typography, Button } from "@ecommerce-ozon/design_system";
import { ReactComponent as Close } from "@ecommerce-ozon/design_system/dist/public/static/icons/close-circle.svg";
import { ReactComponent as Camera } from "@ecommerce-ozon/design_system/dist/public/static/icons/camera.svg";
import { ReactComponent as Image } from "@ecommerce-ozon/design_system/dist/public/static/icons/image.svg";
import { OnTakePictureProps } from "components/camera/Camera";
import SelfieModal from "components/selfieModal/SelfieModal";
import { ReactComponent as ViewerIcon } from "../../../static/images/uploadInput/documento_preview_icono.svg";
import UploadPdfBk from "../../../static/images/uploadInput/documento_preview_recibo.png";

export interface OnUploadInputChangeProps {
  imageData: string | null;
  imageFile: File | null;
  name: string;
}

type Accept =
  | "image/jpeg,image/png,application/pdf"
  | "application/pdf"
  | "image/jpeg,image/png"
  | "image/jpeg"
  | "image/png";

interface Props {
  placeholderIcon: React.ReactElement;
  tooltip?: React.ReactElement;
  title?: string;
  titleFocus?: string;
  subTitle?: string;
  name: string;
  accept?: Accept;
  error?: string;
  value?: OnUploadInputChangeProps;
  // eslint-disable-next-line no-unused-vars
  onChange?: (data: OnUploadInputChangeProps) => void;
}

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}

function isPdf(file: File | null): boolean {
  if (!file) {
    return false;
  }
  return file.type === "application/pdf";
}

const UploadInput: FC<Props> = ({
  value,
  title,
  tooltip,
  titleFocus,
  subTitle,
  error,
  placeholderIcon,
  onChange,
  name,
  accept = "image/jpeg,image/png,application/pdf",
}) => {
  const [open, setOpen] = useState(false);
  const [imageData, setImageData] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (value) {
      setImageData(value.imageData);
      setImageFile(value.imageFile);
    }
  }, [value]);
  const handleUploadFileClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTakePicture = (data: OnTakePictureProps) => {
    setImageData(data.imageData);
    setImageFile(data.imageFile);
    if (onChange) {
      onChange({ imageData: data.imageData, imageFile: data.imageFile, name });
    }
  };

  const handleClearPicture = () => {};

  const clearImageData = () => {
    setImageData(null);
    setImageFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onChange) {
      onChange({ name, imageData: null, imageFile: null });
    }
  };

  const handleImageFileAdded = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const uploadedFile = event?.target?.files[0];
    setImageFile(uploadedFile);
    const base64 = await getBase64(uploadedFile);
    setImageData(base64);
    if (onChange) {
      onChange({ imageData: base64, imageFile: uploadedFile, name });
    }
  };

  useEffect(() => {
  }, [imageData]);


  return (
    <div className="flex_center_col">
      <Typography
        weight="400"
        scale="small"
        className="text_center m_b_xs pos_relative"
      >
        {title}
        <Typography weight="600" scale="small" className="" component="span">
          {titleFocus}
        </Typography>
        {tooltip && (
          <Tippy content={tooltip} className="bg_neutral_0 shadow_hard">
            <div className="bg_neutral_500 br_circle dim_lg tooltip_obj cursor_pointer">
              <Typography
                weight="600"
                scale="small"
                textColor="neutral_700"
                className=" pos_absolute center"
              >
                !
              </Typography>
            </div>
          </Tippy>
        )}
      </Typography>
      <Typography
        weight="400"
        scale="xsmall"
        className="text_center m_b_md"
        component="span"
      >
        {subTitle}
      </Typography>
      {error && (
        <Typography
          weight="600"
          scale="xxsmall"
          textColor="red_300"
          className="text_center m_b_md"
          component="span"
        >
          {error}
        </Typography>
      )}
      {
        // eslint-disable-next-line no-nested-ternary
        imageData ? (
          <div className="w_100_per pos_relative">
            <div
              className="dso_card br_md image_preview fill m_b_lg"
              style={{
                backgroundImage: isPdf(imageFile) ? `url(${UploadPdfBk})` : "",
                backgroundSize: "cover",
              }}
            >
              {isPdf(imageFile) ? (
                <div className="dso_card_img border_primary_300 bg_neutral_200 p_lg display_flex w_fit center">
                  <ViewerIcon className="dim_xl" />
                </div>
              ) : (
                <img className="" src={imageData} alt="" />
              )}
            </div>
            <Button
              onClick={clearImageData}
              variant="icon"
              subvariant="edit"
              scale="small"
              className="image-preview-close"
              icon={<Close />}
            />
          </div>
        ) : (
          <div className="dso_card bg_neutral_0 image_preview m_b_lg">
            <div className="dso_card_img bg_neutral_200 p_lg display_flex overflow_hidden w_fit center">
              {placeholderIcon}
            </div>
          </div>
        )
      }
      {accept.includes("image/jpeg,image/png") && (
        <Button
          className="m_b_md w_100_per"
          onClick={() => {
            setOpen(true);
          }}
          variant="outline"
          scale="small"
          icon={<Camera />}
        >
          Tomar foto
        </Button>
      )}
      <Button
        className="w_100_per"
        onClick={handleUploadFileClick}
        variant="outline"
        scale="small"
        icon={<Image />}
      >
        {accept.includes("image/jpeg,image/png")
          ? "Añadir imagen"
          : "Añadir Archivo"}
      </Button>
      <input
        name={name}
        onChange={handleImageFileAdded}
        ref={fileInputRef}
        type="file"
        className="display_none"
        accept={accept}
      />
      <SelfieModal
        onClearPicture={handleClearPicture}
        onTakePicture={handleTakePicture}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
};

export default UploadInput;
