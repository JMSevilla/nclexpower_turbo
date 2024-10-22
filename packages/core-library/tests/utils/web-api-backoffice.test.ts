import axios, { AxiosInstance } from "axios";
import { WebApiBackOffice } from "../../api/web/web-api-backoffice";

jest.mock("axios");

jest.mock("../../config", () => ({
  config: { value: jest.fn() },
}));

jest.mock("../../core/router", () => ({
  useRouter: jest.fn(),
}));

describe("WebApiBackoffice ", () => {
  let webApiBackoffice: WebApiBackOffice;
  let mockedAxios: jest.Mocked<AxiosInstance>;
  let mockedSsrAxios: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedSsrAxios = axios.create() as jest.Mocked<AxiosInstance>; // You can mock ssrAxios similarly if needed

    // Instantiate WebApiBackOffice with mocked axios instances
    webApiBackoffice = new WebApiBackOffice(mockedAxios, mockedSsrAxios);
  });

  it("should handle an error response correctly", () => {});

  it("should send a DELETE request to the correct URL", async () => {
    const menuId = "12345";
    const expectedUrl = `/api/v2/content/BaseContent/inapp-route-delete?MenuId=${menuId}`;

    // Mock the Axios delete method
    mockedAxios.delete.mockResolvedValue({ data: 1 });

    // Call the delete_route function
    const result = await webApiBackoffice.delete_route(menuId);

    // Assertions
    expect(mockedAxios.delete).toHaveBeenCalledWith(expectedUrl);
    expect(result).toEqual({ data: 1 });
  });

  it("should handle an error response correctly", async () => {
    const menuId = "12345";
    const expectedUrl = `/api/v2/content/BaseContent/inapp-route-delete?MenuId=${menuId}`;

    // Mock an error response
    mockedAxios.delete.mockRejectedValue(new Error("Request failed"));

    // Call the delete_route function and catch the error
    await expect(webApiBackoffice.delete_route(menuId)).rejects.toThrowError(
      /Request failed/
    );

    // Ensure the delete method was called with the correct URL
    expect(mockedAxios.delete).toHaveBeenCalledWith(expectedUrl);
  });
});
