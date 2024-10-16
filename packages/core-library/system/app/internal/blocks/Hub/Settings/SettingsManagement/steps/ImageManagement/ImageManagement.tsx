/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Button, Typography } from "@mui/material";
import { SettingsSelectionType } from "../../types";
import { Card } from "../../../../../../../../../components";
import Image from "next/image";
import { cardItems, LogoData } from "./constant/constant";
import { DialogBox } from "../../../../../../../../../components/Dialog/DialogBox";
import { CSSProperties, useState } from "react";
import { LogoSelectionDialog } from "./components/LogoSelectionDialog";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ImageGallery } from "./components/ImageGallery";
import { PageSelectionDialog } from "./components/PageSelectionDialog";

interface Props {
  nextStep(values: Partial<SettingsSelectionType>): void;
  previousStep(): void;
  values: Partial<SettingsSelectionType>;
  previous: () => void;
  reset: () => void;
}

interface LogoSelectProps {
  image: string | StaticImport;
  bgColor: string;
  imgStyle: CSSProperties | undefined;
}

export const ImageManagement: React.FC<Props> = ({
  previousStep,
  previous,
  reset,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [logoContainer, setLogoContainer] = useState<string | StaticImport>();
  const [bgColorContainer, setBgColorContainer] = useState<string>();
  const [categoryToChange, setCategoryToChange] = useState<string>();

  const [logoSxContainer, seLogoSxContainer] = useState<
    CSSProperties | undefined
  >();

  const cardBGSx = {
    bgcolor: "#d9d9d9",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    gap: "10px",
    flexGrow: 1,
    flexBasis: "250px",
    cursor: "pointer",
  };
  const cardItemSx = {
    bgcolor: "#fefefe",
    borderRadius: "10px",
    height: "150px",
    flexGrow: 1,
    display: "flex",
    padding: "10px",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleLogoSelect = ({ image, bgColor, imgStyle }: LogoSelectProps) => {
    setShowModal(true);
    setLogoContainer(image);
    setBgColorContainer(bgColor);
    seLogoSxContainer(imgStyle);
    setCategoryToChange("Logo");
  };

  const handleCardDialog = (type: string) => {
    setShowModal(true);
    setCategoryToChange(type);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: 5,
        fontFamily: "Poppins",
      }}
    >
      <Button onClick={previousStep} variant="text" size="small" sx={{ mb: 5 }}>
        Back
      </Button>
      <Box>
        <Typography variant="h2" sx={{ fontWeight: "600" }}>
          Content Image Assignation
        </Typography>
        <Box>
          <Typography variant="h2" sx={{ fontWeight: "600", marginY: "20px" }}>
            Logo
          </Typography>
          <Box
            sx={{
              bgcolor: "#d9d9d9",
              borderRadius: "10px",
              display: "flex",
              padding: "10px",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            {LogoData.length > 0 &&
              LogoData.map((card, index) => (
                <Card
                  key={index}
                  onClick={() =>
                    handleLogoSelect({
                      image: card.imgSrc,
                      bgColor: card.bgColor,
                      imgStyle: card.imgStyle,
                    })
                  }
                  sx={{
                    borderRadius: "10px",
                    height: "150px",
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    flexBasis: 200,
                    bgcolor: card.bgColor,
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: card.bgColor === "#404040" ? "white" : "black",
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexGrow: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <Image
                      src={card.imgSrc}
                      alt={card.imgAlt}
                      style={card.imgStyle || {}}
                    />
                  </Box>
                </Card>
              ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              marginY: "20px",
              flexWrap: "wrap",
            }}
          >
            {cardItems.length > 0 &&
              cardItems.map((item, index) => (
                <Box
                  key={index}
                  sx={cardBGSx}
                  onClick={() => handleCardDialog(item.content)}
                >
                  <Typography sx={{ fontWeight: "600" }}>
                    {item.title}
                  </Typography>
                  <Box sx={cardItemSx}>
                    <Typography variant="h3" sx={{ fontStyle: "italic" }}>
                      {item.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
          </Box>
        </Box>
      </Box>

      {categoryToDisplay({
        category: categoryToChange,
        logoContainer,
        bgColorContainer,
        logoSxContainer,
        setShowModal,
        showModal,
      })}
    </Box>
  );
};

type categoryToDisplayType = {
  category?: string;
  logoContainer?: string | StaticImport;
  bgColorContainer?: string;
  logoSxContainer: CSSProperties | undefined;
  setShowModal?: (value: boolean) => void;
  showModal?: boolean;
};

function categoryToDisplay({
  category,
  logoContainer,
  bgColorContainer,
  logoSxContainer,
  setShowModal,
  showModal = false,
}: categoryToDisplayType) {
  switch (category) {
    case "Logo":
      return (
        <DialogBox
          handleClose={() => setShowModal && setShowModal(false)}
          header="Replace Image"
          open={showModal}
          borderRadius="16px"
          children={
            <LogoSelectionDialog
              image={logoContainer}
              bgColor={bgColorContainer}
              imgStyle={logoSxContainer}
            />
          }
          maxWidth="sm"
          overflowContent="hidden"
          ContentHeight="270px"
        />
      );
    case "Images":
      return (
        <DialogBox
          handleClose={() => setShowModal && setShowModal(false)}
          header="Image Gallery"
          open={showModal}
          borderRadius="16px"
          children={<ImageGallery isEditable />}
          maxWidth="md"
          ContentHeight="650px"
        />
      );
    case "Web Customer":
      return (
        <DialogBox
          handleClose={() => setShowModal && setShowModal(false)}
          open={showModal}
          borderRadius="16px"
          children={<PageSelectionDialog app="Web Customer" />}
          maxWidth="md"
          ContentHeight="650px"
        />
      );
    //-----------------------------------------------------------
    // This is for preparation if Backoffice will also have an Image
    //-----------------------------------------------------------
    // case "Web Backoffice":
    //   return (
    //     <DialogBox
    //       handleClose={() => setShowModal && setShowModal(false)}
    //       header="Image Gallery"
    //       open={showModal}
    //       borderRadius="16px"
    //       children={<PageSelectionDialog app="Web Backoffice" />}
    //       maxWidth="md"
    //       ContentHeight="650px"
    //     />
    //   );
    default:
      return null;
  }
}
