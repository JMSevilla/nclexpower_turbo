/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box } from "@mui/material";
import { Button } from "../../../../../../../../../../components";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { CSSProperties, useState } from "react";
import { DialogBox } from "../../../../../../../../../../components/Dialog/DialogBox";
import { ImageGallery } from "./ImageGallery";

interface Props {
  image?: string | StaticImport;
  bgColor?: string;
  imgStyle: CSSProperties | undefined;
}

export const LogoSelectionDialog = ({ image, bgColor, imgStyle }: Props) => {
  const [showGallery, setShowGallery] = useState<boolean>(false);
  return (
    <Box sx={{ display: "flex", gap: "10px" }}>
      <Button
        onClick={() => setShowGallery(true)}
        sx={{ width: "80px", height: "80px", borderRadius: "10px" }}
      >
        <PermMediaIcon />
      </Button>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          bgcolor: `${bgColor}`,
          borderRadius: "10px",
        }}
      >
        {image && (
          <Image
            style={imgStyle}
            src={image}
            alt={typeof image === "string" ? image : "Logo"}
          />
        )}
      </Box>
      <DialogBox
        handleClose={() => setShowGallery(false)}
        header="Image Gallery"
        open={showGallery}
        borderRadius="16px"
        children={<ImageGallery />}
        maxWidth="md"
        ContentHeight="650px"
      />
    </Box>
  );
};
