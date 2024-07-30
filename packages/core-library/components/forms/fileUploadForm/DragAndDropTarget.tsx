import { Stack, Typography } from "@mui/material";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";
import { Ref } from "react";

type DropItem = { files: FileList | null };

interface Props {
  id: string;
  dragActiveLabel?: string;
  dragLabel?: string;
  isLoading?: boolean;
  uploadButton?: React.ReactElement;
  onDrop?(files: FileList | null): void;
}

export const DragAndDropTarget: React.FC<React.PropsWithChildren<Props>> = ({
  id,
  children,
  dragActiveLabel,
  dragLabel,
  isLoading,
  uploadButton,
  onDrop,
}) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop: (item: DropItem) => onDrop?.(item.files),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [onDrop]
  );

  const isActive = canDrop && isOver;
  return (
    <Stack
      id={id}
      ref={drop as unknown as Ref<HTMLDivElement>}
      minHeight={148}
      width="100%"
      py={6}
      border={(theme) =>
        `dashed 2px ${
          isLoading ? theme.palette.primary.light : theme.palette.primary.light
        }`
      }
      borderRadius="4px"
      alignItems="center"
      justifyContent="flex-start"
      gap={4}
      color={(theme) => theme.palette.primary.main}
    >
      {isActive && !isLoading ? (
        dragActiveLabel ? (
          <Typography component="span">{dragActiveLabel}</Typography>
        ) : null
      ) : (
        <Stack direction="row" gap={4} alignItems="center">
          {dragLabel && <Typography component="span">{dragLabel}</Typography>}
          {uploadButton}
        </Stack>
      )}
      {children}
    </Stack>
  );
};
