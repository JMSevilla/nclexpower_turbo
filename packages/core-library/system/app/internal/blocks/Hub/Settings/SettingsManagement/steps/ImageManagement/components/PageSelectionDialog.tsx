/**
 * Property of the NCLEX Power.
 * Reuse as a whole or in part is prohibited without permission.
 * Created by the Software Strategy & Development Division
 */
import { Box, Typography } from "@mui/material";
import {
  imageCollectionType,
  List,
  WCGenericRouteWithImages,
} from "../constant/constant";
import { Card } from "../../../../../../../../../../components";
import { useEffect, useState } from "react";
import Image from "next/image";
import { IconComponent } from "../../../../../../../../../../components/GenericDrawerLayout/utils/icon-component";
import { DialogBox } from "../../../../../../../../../../components/Dialog/DialogBox";
import { ImageGallery } from "./ImageGallery";

interface Props {
  app?: string;
}

export const PageSelectionDialog = ({ app = "ImageGallery" }: Props) => {
  const [selectedMenu, setSelectedMenu] = useState<number>(1);
  const [showGallery, setShowGallery] = useState<boolean>(false);
  const [imageCollection, setImageCollection] =
    useState<imageCollectionType[]>();

  useEffect(() => {
    if (app === "Web Customer") {
      setImageCollection(WCGenericRouteWithImages);
    }
  }, [app]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar
        app={app}
        imageCollection={imageCollection}
        selectedMenu={selectedMenu}
        setSelectedMenu={setSelectedMenu}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingX: "30px",
            }}
          >
            {imageCollection &&
              imageCollection.length > 0 &&
              imageCollection.map((item, index) => (
                <Box key={index}>
                  {item.id == selectedMenu &&
                    item.content.length > 0 &&
                    item.content.map((categoryItem, index) => (
                      <Box key={index} marginY="20px">
                        <Typography fontWeight={700}>
                          {categoryItem.category}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            gap: "10px",
                            borderRadius: "10px",
                            bgcolor: "#D9D9D9",
                            padding: "20px",
                            overflowX: "auto",
                            width: "550px",
                            "&::-webkit-scrollbar": {
                              width: "12px",
                              height: "12px",
                            },
                            "&::-webkit-scrollbar-track": {
                              boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
                              borderRadius: "10px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                              backgroundColor: "darkgrey",
                              borderRadius: "10px",
                              boxShadow: 1,
                            },
                          }}
                        >
                          <CategoryCardItem
                            arrayItem={categoryItem.list}
                            type="CardItem"
                            fixedImageCount={categoryItem.fixedCount}
                            setShowGallery={setShowGallery}
                          />
                          <DynamicImages
                            IsFixedCount={categoryItem.fixedCount}
                            setShowGallery={setShowGallery}
                          />
                        </Box>
                      </Box>
                    ))}
                </Box>
              ))}
          </Box>
        </Box>
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

interface dynamicImages {
  IsFixedCount: number;
  setShowGallery: (value: boolean) => void;
}

interface SidebarType {
  app: string;
  imageCollection: imageCollectionType[] | undefined;
  selectedMenu: number;
  setSelectedMenu: (value: number) => void;
}

interface CategoryCardItemType {
  arrayItem: List[];
  type: string;
  fixedImageCount: number;
  setShowGallery: (value: boolean) => void;
}

const DynamicImages = ({ IsFixedCount, setShowGallery }: dynamicImages) => {
  switch (IsFixedCount) {
    case 0:
      return (
        <Card
          onClick={() => setShowGallery(true)}
          sx={{
            minWidth: "100px",
            borderRadius: "10px",
            bgcolor: "#B1B1B1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              lineHeight: "15px",
              fontSize: "12px",
              fontWeight: 600,
            }}
          >
            + <br /> Add Image
          </Typography>
        </Card>
      );
    default:
      return null;
  }
};

const CategoryCardItem = ({
  arrayItem,
  type,
  fixedImageCount,
  setShowGallery,
}: CategoryCardItemType) => {
  switch (type) {
    case "CardItem":
      return (
        arrayItem.length > 0 &&
        arrayItem.map((item, index) => (
          <Card
            sx={{
              minWidth: "150px",
              borderRadius: "10px",
              boxShadow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "pointer",
            }}
            key={index}
          >
            <Box>
              <Image height={150} src={item.image} alt={item.image} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: "10px",
                gap: "10px",
              }}
            >
              <Typography variant="subtitle2" lineHeight="15px">
                {item.title}
              </Typography>
              <Typography variant="subtitle2" lineHeight="15px">
                {fixedImageCount == 0 ? (
                  IconComponent("DeleteIcon", false, "error")
                ) : (
                  <Box onClick={() => setShowGallery(true)}>
                    {IconComponent("FindReplaceIcon", false, "warning")}
                  </Box>
                )}
              </Typography>
            </Box>
          </Card>
        ))
      );

    default:
      return null;
  }
};

const Sidebar = ({
  app,
  imageCollection,
  selectedMenu,
  setSelectedMenu,
}: SidebarType) => {
  return (
    <Box
      sx={{
        position: "sticky",
        top: "0px",
        height: "450px",
        width: "190px",
      }}
    >
      <Typography
        variant="h3"
        fontWeight={700}
        lineHeight="25px"
        marginBottom="15px"
      >
        {app}
      </Typography>
      <Box
        sx={{
          bgcolor: "#D9D9D9",
          height: "300px",
          paddingX: "10px",
          paddingY: "30px",
          borderRadius: "10px",
          boxShadow: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "150px",
          }}
        >
          {imageCollection &&
            imageCollection.length > 0 &&
            imageCollection.map((item: imageCollectionType, index: number) => (
              <Typography
                onClick={() => setSelectedMenu(item.id)}
                lineHeight="20px"
                fontWeight={selectedMenu == item.id ? 700 : "normal"}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    textDecoration: "underline",
                    fontWeight: 700,
                  },
                }}
                key={index}
              >
                {item.title}
              </Typography>
            ))}
        </Box>
      </Box>
    </Box>
  );
};
