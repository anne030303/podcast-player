import { describe, expect, it } from "vitest";

import { mockAxiosGet } from "./axiosMock";

describe("Axios XML Response", () => {
    it("should parse XML response correctly", async () => {
        // 模擬 Axios 的 GET 請求
        const mockedAxiosInstance = mockAxiosGet();

        // 呼叫 Axios
        const response = await mockedAxiosInstance.get("/api/data");
        const xmlText = await response.data;

        const cleanedXmlText = xmlText.replace(/<!\[CDATA\[(.*?)\]\]>/gs, "$1");

        // 解析 XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(cleanedXmlText, "text/xml");

        // 驗證解析後的資料
        const channelTitleSelector = "channel > title";
        expect(
            xmlDoc.querySelector(channelTitleSelector)?.textContent?.trim()
        ).toBe("Gooaye 股癌");

        const items = xmlDoc.querySelectorAll("item");
        for (const item of items) {
            const title = item.querySelector("title");
            expect(title).not.toBeNull(); // 檢查 title 是否存在
            expect(title?.textContent?.trim()).toBeTruthy(); // 檢查 title 是否有內容
        }
    });
});
