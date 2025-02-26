import axios from "axios";
import { vi } from "vitest";
import { mockXml } from "../../mocks/podcast";

export const mockAxiosGet = () => {
    vi.mock("axios");
    const mockedAxios = vi.mocked(axios, { deep: true });

    mockedAxios.get.mockResolvedValue({
        data: mockXml,
        status: 200,
        statusText: "OK",
        config: {},
    });

    return mockedAxios;
};
