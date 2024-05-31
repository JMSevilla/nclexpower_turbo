import { ImageLoaderProps } from "next/image";

export const externalImageLoader = ({
  src,
  quality,
  width,
}: ImageLoaderProps) => {
  const params = [`w=${width}`];
  quality && params.push(`q=${quality}`);
  return `${src}?${params.join("&")}`;
};
