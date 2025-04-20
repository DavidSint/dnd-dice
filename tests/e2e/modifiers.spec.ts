import { expect, test } from '@playwright/test';
import { getCurrentModifier, getRollTotal, joinGame, resetModifier, setModifier } from '../utils';

test.describe('Modifiers', () => {
  test.beforeEach(async ({ page }) => {
    await joinGame(page);
  });

  test('should allow setting a +2 modifier', async ({ page }) => {
    const modValue = 2;
    await setModifier(page, modValue);

    await expect(page.getByTestId('mod')).toHaveText('+2');
  });

  test('should allow setting a -2 modifier', async ({ page }) => {
    const modValue = -2;
    await setModifier(page, modValue);

    await expect(page.getByTestId('mod')).toHaveText('-2');
  });

  test('should apply a +2 modifier when rolling a D20', async ({ page }) => {
    const modValue = 2;
    const d20 = page.getByTestId('D20');

    await setModifier(page, modValue);
    await d20.click();
    await page.getByTestId('roll').click();

    // Check that the result is between 3 (1+2) and 22 (20+2)
    const total = await getRollTotal(page);
    expect(total).toBeGreaterThanOrEqual(1 + modValue);
    expect(total).toBeLessThanOrEqual(20 + modValue);
  });

  test('should apply a +4 modifier when rolling two D20s', async ({ page }) => {
      const modValue = 4;
      const d20 = page.getByTestId('D20');

      await setModifier(page, modValue);
      await d20.click();
      await d20.click();
      await page.getByTestId('roll').click();

      // Check that the result is between 6 (1+1+4) and 44 (20+20+4)
      const total = await getRollTotal(page);
      expect(total).toBeGreaterThanOrEqual(1 + 1 + modValue);
      expect(total).toBeLessThanOrEqual(20 + 20 + modValue);
  });

  test('should apply a +1 modifier when rolling a D20 and a D4', async ({ page }) => {
      const modValue = 1;
      const d20 = page.getByTestId('D20');
      const d4 = page.getByTestId('D4');

      await setModifier(page, modValue);
      await d20.click();
      await d4.click();
      await page.getByTestId('roll').click();

      const total = await getRollTotal(page);
      expect(total).toBeGreaterThanOrEqual(1 + 1 + modValue);
      expect(total).toBeLessThanOrEqual(20 + 4 + modValue);
  });

  test('should allow resetting a modifier', async ({ page }) => {
    const modValue = 5;
    await setModifier(page, modValue);

    expect(await getCurrentModifier(page)).toBe('+5');

    await resetModifier(page);

    expect(await getCurrentModifier(page)).toBe('+/-');
  });
});
