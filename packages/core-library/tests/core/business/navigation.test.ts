import {
  openInNewTab,
  openInNewWindow,
} from "../../../core/business/navigation";

describe("Business navigation logic", () => {
  describe("openInNewTab", () => {
    it("should create link with attributes and open it", () => {
      const url = "/url";
      const anchorMocked = { click: jest.fn(), setAttribute: jest.fn() } as any;
      const createElementSpyOn = jest
        .spyOn(document, "createElement")
        .mockReturnValueOnce(anchorMocked);
      openInNewTab(url);
      expect(createElementSpyOn).toBeCalledWith("a");
      expect(anchorMocked.setAttribute.mock.calls[0]).toEqual(["href", "/url"]);
      expect(anchorMocked.setAttribute.mock.calls[1]).toEqual([
        "target",
        "_blank",
      ]);
      expect(anchorMocked.setAttribute.mock.calls[2]).toEqual([
        "rel",
        "noopener,noreferrer",
      ]);
      expect(anchorMocked.click).toBeCalledTimes(1);
    });
  });

  describe("openInNewWindow", () => {
    it("should open window with correct arguments", () => {
      const url = "/url";
      const spyWindowOpen = jest.spyOn(window, "open");
      spyWindowOpen.mockImplementation(jest.fn());
      openInNewWindow(url);
      expect(spyWindowOpen).toBeCalled();
      expect(spyWindowOpen.mock.calls[0][0]).toBe(url);
      expect(spyWindowOpen.mock.calls[0][1]).toBe("_blank");
      expect(spyWindowOpen.mock.calls[0][2]).toBe(
        "noopener,noreferrer,resizable"
      );
    });
  });
});
