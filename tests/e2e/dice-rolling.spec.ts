import { expect, test } from '@playwright/test';
import { getRollTotal, joinGame } from '../utils';

test.describe('Dice Rolling', () => {
  test.beforeEach(async ({ page }) => {
    await joinGame(page);
  });
  
  const diceTypes = [4, 6, 8, 10, 12, 20, 100];

  for (const sides of diceTypes) {
    test(`should allow rolling a D${sides}`, async ({ page }) => {
      await page.getByTestId(`D${sides}`).click();

      await page.getByTestId('roll').click();

      await expect(page.getByTestId('roll-result-total')).toBeVisible();
      const total = await getRollTotal(page);
      expect(total).toBeGreaterThanOrEqual(1);
      expect(total).toBeLessThanOrEqual(sides);
    });
  }

  test('should allow rolling two D20s', async ({ page }) => {
    const d20 = page.getByTestId('D20');

    await d20.click();
    await d20.click();
    await page.getByTestId('roll').click();

    const total = await getRollTotal(page);
    expect(total).toBeGreaterThanOrEqual(1+1);
    expect(total).toBeLessThanOrEqual(20+20);
  });

  test('should allow rolling a D20 and a D4', async ({ page }) => {
    const d20 = page.getByTestId('D20');
    const d4 = page.getByTestId('D4');

    await d20.click();
    await d4.click();

    await page.getByTestId('roll').click();

    const total = await getRollTotal(page);
    expect(total).toBeGreaterThanOrEqual(1+1);
    expect(total).toBeLessThanOrEqual(20+4);
  });

  test('should allow rolling ten D4s', async ({ page }) => {
    const d4 = page.getByTestId('D4');

    for (let i = 0; i < 10; i++) {
     await d4.click();
    }

    await page.getByTestId('roll').click();

    const total = await getRollTotal(page);
    expect(total).toBeGreaterThanOrEqual(10*1);
    expect(total).toBeLessThanOrEqual(10*4);
  });
});
