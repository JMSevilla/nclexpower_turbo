import { Box, Grid } from "@mui/material";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { TabButton } from "../Button/TabButton";
import { useResolution } from "../../hooks";
import { TabsItem } from "../../core/utils/contants/tabs-item";

interface Props {
  id?: string;
  tabsItem: TabsItem[];
  justifyContent?: "flex-start" | "center" | "flex-end";
  width?: string | number;
  selectedTabIndex?: (value: number) => void;
}

export const Tabs: React.FC<Props> = ({
  id,
  tabsItem,
  justifyContent,
  width,
  selectedTabIndex,
}) => {
  const { isMobile } = useResolution();
  const [selected, setSelected] = useState(1);
  const tabs = tabsHeader(tabsItem);
  const selectedTab = tabs.find((tab) => tab.id === selected);
  const tabsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    selectedTabIndex && selectedTabIndex(selected);
  }, [selectedTabIndex]);

  return (
    <Grid container spacing={12}>
      {!isMobile && (
        <Grid container item xs={12} justifyContent={justifyContent}>
          {tabs.map((tab, index) => (
            <Grid item key={tab.id}>
              <TabButton
                width={width}
                ref={(el) => {
                  tabsRef.current[tab.id] = el!;
                }}
                id={`tab-${index + 1}`}
                active={selected === tab.id}
                href={`#tab-section-${index + 1}`}
                sx={{
                  marginLeft: tab.id !== 1 ? "-1px" : "unset",
                }}
                onClick={(e) => handleSelected(e, tab.id)}
                onKeyDown={(e) => handleKeyDown(e, tab.id)}
                data-testid={`tab-${tab.id}-button`}
              >
                {tab.title}
              </TabButton>
            </Grid>
          ))}
        </Grid>
      )}
      {isMobile
        ? tabs?.map((tab, index) => (
            <Grid item xs={12} key={tab.id}>
              {tab.content}
              {tabs.length - 1 !== index && (
                <Box
                  mt={12}
                  sx={{
                    backgroundColor: "primary.main",
                    height: "4px",
                    width: "100%",
                  }}
                />
              )}
            </Grid>
          ))
        : selectedTab && (
            <Grid item xs={12}>
              {selectedTab.content}
            </Grid>
          )}
    </Grid>
  );

  function selectedTabId(id: number) {
    return `tab-section-${tabs.findIndex((tab) => tab.id === id) + 1}`;
  }

  function handleSelected(
    e: React.MouseEvent<HTMLElement> | React.KeyboardEvent,
    id: number
  ) {
    e?.preventDefault();
    setSelected(id);
    tabsRef?.current[id]?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent, id: number) {
    const tabsLength = tabs.length;

    switch (e.code) {
      case "ArrowLeft":
        if (id > 1) {
          handleSelected(e, id - 1);
        }
        break;
      case "ArrowRight":
        if (id < tabsLength) {
          handleSelected(e, id + 1);
        }
        break;
      default:
        break;
    }
  }
};

const tabsHeader = (
  tabs: TabsItem[]
): { id: number; title: string; content?: ReactNode | ReactElement }[] =>
  tabs.map((tab, index) => ({
    id: index + 1,
    title: tab.title ?? "",
    content: tab.content,
  }));
