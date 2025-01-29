import { deepStrictEqual } from "node:assert";
import { describe, it } from "node:test";

import { MakeRequestFactory } from "@test-helpers/factories/make-request-factory";

export function pageNotFoundErrorEndToEndTests(): void {
  describe("Page not found error", () => {
    it("should be able return 404 not found error", async () => {
      const headers = new Headers();
      headers.append("Content-Type", "application/json");

      await MakeRequestFactory.execute({
        url: `${String(process.env.TEST_SERVER_URL)}/fake-route`,
        method: "GET",
        headers,
      }).then(async (response) => {
        const responseBody = await response.json();

        deepStrictEqual(response.status, 404);
        deepStrictEqual(responseBody, {
          statusCode: 404,
          message: "Page not found",
          error: "Not Found",
        });
      });
    });
  });
}
