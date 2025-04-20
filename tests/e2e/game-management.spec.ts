import { expect, test } from "@playwright/test";
import { joinGame } from "../utils";

const BASE_URL = `http://localhost:${process.env.PORT}`;

test.describe("Game Management", () => {
  test("should allow a user to join a game", async ({ page }) => {
    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter a game ID");
      expect(dialog.defaultValue()).toBe("");

      return dialog.accept("Playwright Game");
    });

    await page.goto(BASE_URL);
    await page.waitForURL("**/Playwright%20Game");

    expect(await page.getByTestId("heading").innerText()).toBe("D&DDice - Playwright Game");
    page.removeAllListeners("dialog");
  });

  test("should allow a user to cancel joining a game", async ({ page }) => {
    let dialogCount = 0;
    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.defaultValue()).toBe("");
      if (dialogCount % 2 === 0) {
        expect(dialog.message()).toBe("Please enter a game ID");
        dialogCount += 1;
        return dialog.dismiss();
      } else {
        expect(dialog.message()).toBe("You must enter a game ID. Please enter a game ID or close the tab/window.");
        dialogCount += 1;
        return dialog.accept("Playwright Game");
      }
    });

    await page.goto(BASE_URL);
    await page.waitForURL("**/Playwright%20Game");

    expect(await page.getByTestId("heading").innerText()).toBe("D&DDice - Playwright Game");
    page.removeAllListeners("dialog");
  });

  test("should allow a user to change name", async ({ page }) => {
    await joinGame(page);

    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter your character name");
      expect(dialog.defaultValue()).toBe("Anon");

      return dialog.accept("Name");
    });

    expect(page.getByTestId("change-name")).toHaveText("Anon");
    await page.getByTestId("change-name").click();
    await expect(page.getByTestId("change-name")).toHaveText("Name");

    page.removeAllListeners("dialog");
  });

  test("should allow checking of (empty) roll history", async ({ page }) => {
    await joinGame(page);
    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("alert");
      expect(dialog.message()).toBe("No rolls recorded yet");

      return dialog.dismiss();
    });

    await page.getByTestId("roll-history").click();
  });

  test.skip("should allow copying the game link", async ({ page, context }) => {
    await joinGame(page);
    await page.getByTestId("share-link").click();

    try {
      await context.grantPermissions(["clipboard-read", "clipboard-write"], { origin: page.url() });
    } catch (error) {
      // biome-ignore lint/complexity/noUselessCatch: test-only
      throw error;
    }

    const clipboardText = await page.evaluate(async () => {
      try {
        return await navigator.clipboard.readText();
      } catch (error) {
        // biome-ignore lint/complexity/noUselessCatch: test-only
        throw error;
      }
    });

    expect(clipboardText).toBe(page.url());
  });

  test("should allow leaving a game", async ({ page }) => {
    await joinGame(page);

    page.on("dialog", (dialog) => {
      expect(dialog.type()).toBe("prompt");
      expect(dialog.message()).toBe("Please enter a game ID");
      expect(dialog.defaultValue()).toBe("");

      return dialog.accept("Playwright Game");
    });

    await page.getByTestId("leave-game").click();

    await page.waitForURL("**/Playwright%20Game");

    expect(await page.getByTestId("heading").innerText()).toBe("D&DDice - Playwright Game");
    page.removeAllListeners("dialog");
  });
});
