import { randomUUID } from "node:crypto";
import { Page } from "@playwright/test";

export const BASE_URL = `http://localhost:${process.env.PORT}`;

export async function changeName(page: Page, name: string) {
  page.on("dialog", (dialog) => {
    if (dialog.message() === "Please enter your character name") {
      return dialog.accept(name);
    }
  });

  await page.getByTestId("change-name").click();

  page.removeAllListeners("dialog");
}

export async function joinGame(page: Page, path?: string) {
  await page.goto(`${BASE_URL}/${path ? path : randomUUID()}`);
}

export async function selectDice(page: Page, dice: string[]) {
  for (const die of dice) {
    await page.getByTestId(die).click();
  }
}

export async function deselectDice(page: Page, dice: string[]) {
  for (const die of dice) {
    await page.getByTestId(die).click({ button: "right" });
  }
}

export async function saveCurrentRoll(page: Page, saveName: string) {
  page.on("dialog", (dialog) => {
    if (dialog.message() === "Please enter a name for this type of roll") {
      return dialog.accept(saveName);
    }
  });
  await page.getByTestId('save').click();
  page.removeAllListeners("dialog");
}

export async function rollSavedRoll(page: Page, saveName: string) {
  await page.getByTestId(`saved-roll-${saveName}`).click();
}

export async function deleteSavedRoll(page: Page, saveName: string) {
  await page.getByTestId(`saved-roll-${saveName}`).click({ button: "right" });
}

export async function getSavedRolls(page: Page): Promise<string[]> {
  const savedRollLocators = await page.locator('.filterScroller-item').all();
  const savedRolls = savedRollLocators.map(locator => locator.textContent()).filter(x => x !== null);
  return Promise.all(savedRolls);
}

export async function getCurrentModifier(page: Page) {
  return page.getByTestId('mod').innerText();
}

export async function setModifier(page: Page, modValue: number) {
  page.on("dialog", (dialog) => {
    if (dialog.message() === "Please enter a modifier") {
      return dialog.accept(String(modValue));
    }
  });
  await page.getByTestId('mod').click();
}

export async function resetModifier(page: Page) {
  await page.getByTestId('mod').click({ button: 'right' });
}

export async function getRollTotal(page: Page): Promise<number> {
  const totalText = await page.getByTestId('roll-result-total').textContent() ?? "";
  const match = totalText.match(/Total:(\d+)/);

  return parseInt(match?.[1] || '0', 10);
}

export async function getRollHistory(page: Page): Promise<string | null> {
  let message: string | null = null;
  page.on("dialog", (dialog) => {
    if(dialog.type() === "alert") {
      message = dialog.message()
    }
    return dialog.dismiss();
  });

  await page.getByTestId("roll-history").click();
  page.removeAllListeners("dialog");
  return message
}


