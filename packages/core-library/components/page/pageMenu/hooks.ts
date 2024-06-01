import { useEffect, useRef, useState } from "react";
import { useScroll } from "../../../core";
import { PageMenuItem } from "./types";

export const useUpdateBlockInViewOnScroll = (
  items: PageMenuItem[]
): [number, number, (value: number) => void] => {
  const scroll = useScroll();
  const allowAutoBlockIndexUpdate = useRef(true);
  const oldScrollPos = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );
  const [gradualIndex, finalIndex, setIndex] = useGradualIndex(0);

  useEffect(() => {
    const updateBlockInView = () => {
      if (!allowAutoBlockIndexUpdate.current) return;

      const topReached = window.scrollY === 0;
      if (topReached) {
        return setIndex(0);
      }

      const bottomReached =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight;
      if (bottomReached) {
        return setIndex(items.length - 1);
      }

      const itemInViewport = items.findIndex((item) =>
        isElementInViewport(item.key.value)
      );
      if (itemInViewport > -1) {
        const direction = oldScrollPos.current > window.scrollY ? "up" : "down";
        oldScrollPos.current = window.scrollY;
        return setIndex((oldIndex) =>
          direction === "down"
            ? Math.max(oldIndex, itemInViewport)
            : itemInViewport
        );
      }

      const everyItemIsOutsideViewport = items.every((item) =>
        isElementOutsideViewport(item.key.value)
      );
      if (everyItemIsOutsideViewport) {
        return setIndex(-1);
      }
    };

    window.addEventListener("scroll", updateBlockInView, false);
    window.addEventListener("resize", updateBlockInView, false);
    return () => {
      window.removeEventListener("scroll", updateBlockInView, false);
      window.removeEventListener("resize", updateBlockInView, false);
    };
  }, [items]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const allowAutomaticBlockInViewUpdates = () => {
      timeout && clearTimeout(timeout);
      timeout = setTimeout(() => {
        allowAutoBlockIndexUpdate.current = true;
      }, 150);
    };

    window.addEventListener("scroll", allowAutomaticBlockInViewUpdates, false);

    if (!allowAutoBlockIndexUpdate.current && finalIndex > -1) {
      scroll.scrollTo(items[finalIndex].key.value);
    }

    oldScrollPos.current = window.scrollY;

    return () => {
      window.removeEventListener(
        "scroll",
        allowAutomaticBlockInViewUpdates,
        false
      );
      clearTimeout(timeout);
    };
  }, [finalIndex, items]);

  return [
    gradualIndex,
    finalIndex,
    (value: number) => {
      allowAutoBlockIndexUpdate.current = false;
      setIndex(value);
    },
  ];
};

const useGradualIndex = (
  defaultIndex: number
): [number, number, React.Dispatch<React.SetStateAction<number>>] => {
  const [index, setIndex] = useState(defaultIndex);
  const [finalIndex, setFinalIndex] = useState(defaultIndex);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (index !== finalIndex) {
      timeout = setTimeout(
        () => setIndex(index > finalIndex ? index - 1 : index + 1),
        100
      );
    }
    return () => clearTimeout(timeout);
  }, [index, finalIndex]);

  return [index, finalIndex, setFinalIndex];
};

function isElementInViewport(id: string, offsetTop: number = 48) {
  const el = document.getElementById(id);
  const rect = el?.getBoundingClientRect();

  return rect ? rect.bottom > offsetTop && rect.top < offsetTop : false;
}

function isElementOutsideViewport(id: string) {
  const el = document.getElementById(id);
  const rect = el?.getBoundingClientRect();

  return rect
    ? rect.bottom < 0 ||
        rect.top > (window.innerHeight || document.documentElement.clientHeight)
    : true;
}
