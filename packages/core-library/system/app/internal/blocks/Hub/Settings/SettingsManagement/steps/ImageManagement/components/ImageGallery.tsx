/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import {
  Button,
  Checkbox,
  LottieAnimation,
} from "../../../../../../../../../../components";
import { IconComponent } from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import { useState } from "react";
import { ImageLists, LottieLists } from "../../../../../../../../../../assets";
import Divider from "../../../../../../../../../../components/Divider/Divider";

interface Props {
  isEditable?: boolean;
}

export const ImageGallery = ({ isEditable = false }: Props) => {
  const [IsDeletingMultiple, setIsDeletingMultiple] = useState<boolean>(false);
  const [toDelete, setToDelete] = useState<number[]>([]);

  const handleMultipleDelete = () => {
    setIsDeletingMultiple(false);
    console.log("Deleting : ", toDelete);
  };

  const handleSingleDeletion = (id: number) => {
    console.log("Single Deleting : ", id);
  };

  const handleMultipleSelection = (item: number) => {
    setToDelete((prev) => {
      if (prev.includes(item)) {
        return prev.filter((id) => id !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      console.log("Selected file:", file);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      {isEditable && (
        <Box sx={{ display: "flex", gap: "15px" }}>
          <Button
            sx={{
              borderRadius: "10px",
              width: "120px",
              lineHeight: "20px",
            }}
          >
            <label htmlFor="file-upload" className="custom-file-upload">
              Upload Image
            </label>
            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/png, image/jpeg, application/json, image/svg+xml"
              onChange={(e) => handleFileUpload(e)}
            />
          </Button>

          {IsDeletingMultiple ? (
            <Button
              onClick={() => handleMultipleDelete()}
              sx={{
                borderRadius: "10px",
                width: "120px",
                lineHeight: "20px",
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "#aa0000",
                },
              }}
            >
              Confirm Delete
            </Button>
          ) : (
            <Button
              onClick={() => setIsDeletingMultiple(true)}
              sx={{
                borderRadius: "10px",
                width: "120px",
                lineHeight: "20px",
                bgcolor: "red",
                "&:hover": {
                  bgcolor: "#aa0000",
                },
              }}
            >
              Delete Multiple
            </Button>
          )}
        </Box>
      )}
      <Divider />
      <ImageBundle
        label="Images"
        type="image"
        IsDeletingMultiple={IsDeletingMultiple}
        compiledAssets={ImageLists}
        handleMultipleSelection={handleMultipleSelection}
        handleSingleDeletion={handleSingleDeletion}
        isEditable={isEditable}
      />
      <Divider />
      <ImageBundle
        label="Lottie Animations"
        type="lottie"
        IsDeletingMultiple={IsDeletingMultiple}
        compiledAssets={LottieLists}
        handleMultipleSelection={handleMultipleSelection}
        handleSingleDeletion={handleSingleDeletion}
        isEditable={isEditable}
      />
    </Box>
  );
};

interface ImageType {
  id: number;
  label: string;
  image: string;
}

interface ImageBundleType {
  type: "lottie" | "image";
  label: string;
  compiledAssets: ImageType[];
  IsDeletingMultiple: boolean;
  handleMultipleSelection: (value: number) => void;
  isEditable: boolean;
  handleSingleDeletion: (value: number) => void;
}

const ImageBundle = ({
  type,
  label,
  compiledAssets,
  IsDeletingMultiple,
  handleMultipleSelection,
  isEditable,
  handleSingleDeletion,
}: ImageBundleType) => {
  return (
    <>
      <Typography variant="h2" fontWeight={700}>
        {label}
      </Typography>
      <Box sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {compiledAssets.length > 0 &&
          compiledAssets.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                flexBasis: "120px",
                bgcolor: "#d9d9d9",
                borderRadius: "5px",
                padding: "10px",
                cursor: "pointer",
              }}
            >
              {IsDeletingMultiple && (
                <Checkbox onChange={() => handleMultipleSelection(item.id)} />
              )}
              {type == "image" ? (
                <Image
                  style={{
                    width: "120px",
                    height: "80px",
                    objectFit: "contain",
                  }}
                  src={item.image}
                  alt={item.label}
                />
              ) : (
                <LottieAnimation
                  animationData={item.image}
                  width={120}
                  height={120}
                />
              )}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingTop: "10px",
                  gap: "10px",
                }}
              >
                <Typography variant="sublabel" sx={{ lineHeight: "10px" }}>
                  {item.label}
                </Typography>
                {isEditable && (
                  <Typography
                    variant="subtitle2"
                    lineHeight="15px"
                    onClick={() => handleSingleDeletion(item.id)}
                  >
                    {!IsDeletingMultiple &&
                      IconComponent("DeleteIcon", false, "error")}
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
      </Box>
    </>
  );
};
