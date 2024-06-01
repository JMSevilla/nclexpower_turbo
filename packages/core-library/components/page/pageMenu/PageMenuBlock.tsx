import { Box, List, ListItem, Typography } from "@mui/material";
import { KeyboardEvent, MouseEvent, useRef, useState } from "react";
import { useUpdateBlockInViewOnScroll } from "./hooks";
import { PageMenuItem } from "./types";

interface Props {
  id?: string;
  items: PageMenuItem[];
}

export const PageMenuBlock: React.FC<Props> = ({ id = "page-menu", items }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const [gradualActiveBlockIndex, activeBlockIndex, updateBlockIndex] =
    useUpdateBlockInViewOnScroll(items);

  if (!items.length) {
    return null;
  }

  return (
    <List
      id={id}
      sx={{
        position: "sticky",
        top: 0,
        left: 0,
        pt: 10,
        transition: (theme) => theme.transitions.create("top"),
      }}
    >
      {items.map((item, idx) => (
        <ListItem
          key={idx}
          sx={{
            px: 6,
            py: 4,
            cursor: "pointer",
            borderLeftWidth: 4,
            borderLeftStyle: "solid",
            borderLeftColor:
              idx === gradualActiveBlockIndex
                ? "appColors.primary"
                : "transparent",
            transition: (theme) =>
              theme.transitions.create("border-color", {
                duration: 300,
                easing: "ease-in-out",
              }),
          }}
          tabIndex={0}
          divider={idx !== items.length - 1}
          onClick={(e) => handleItemClick(e, idx)}
          onKeyDown={(e: React.KeyboardEvent) =>
            e.code === "Enter" && handleItemClick(e, idx)
          }
        >
          <Typography
            variant="body2"
            component="a"
            color="inherit"
            sx={{ textDecoration: "none" }}
            href={"#" + item.key.value}
          >
            {item.value.value}
          </Typography>
        </ListItem>
      ))}
    </List>
  );

  function handleItemClick(e: MouseEvent | KeyboardEvent, index: number) {
    e.preventDefault();
    updateBlockIndex(index);
  }
};
