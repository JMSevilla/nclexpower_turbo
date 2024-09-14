export const openInNewTab = (link: string) => {
  const a = document.createElement("a");
  a.setAttribute("href", link);
  a.setAttribute("target", "_blank");
  a.setAttribute("rel", "noopener,noreferrer");
  a.click();

  return a;
};

export const openInNewWindow = (url: string) => {
  window?.open(url, "_blank", "noopener,noreferrer,resizable")?.focus();
};
