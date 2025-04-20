import { expect, test } from '@playwright/test';
import { deleteSavedRoll, deselectDice, getRollTotal, getSavedRolls, joinGame, rollSavedRoll, saveCurrentRoll, selectDice } from '../utils';

test.describe('Saved Rolls', () => {
  test.beforeEach(async ({ page }) => {
    await joinGame(page);
  });

  test('should allow saving a roll configuration and rolling it', async ({ page }) => {
    const diceToSave = ['D20', 'D6'];
    const saveName = 'Attack Roll';

    await selectDice(page, diceToSave);
    await saveCurrentRoll(page, saveName);

    await expect(page.getByTestId(`saved-roll-${saveName}`)).toBeVisible();
    expect(await getSavedRolls(page)).toContain(saveName);

    await rollSavedRoll(page, saveName);

    const total = await getRollTotal(page);
    expect(total).toBeGreaterThanOrEqual(1 + 1);
    expect(total).toBeLessThanOrEqual(20 + 6);
  });

  test('should allow saving multiple rolls and deleting them', async ({ page }) => {
    const saveName1 = 'Fireball Dmg';
    const dice1 = ['D6', 'D6', 'D6', 'D6', 'D6', 'D6', 'D6', 'D6'];
    const saveName2 = 'Sneak Attack';
    const dice2 = ['D20', 'D6', 'D6'];

    // Save first roll
    await selectDice(page, dice1);
    await saveCurrentRoll(page, saveName1);
    await deselectDice(page, dice1);
    expect(await getSavedRolls(page)).toContain(saveName1);

    // Save second roll
    await selectDice(page, dice2);
    await saveCurrentRoll(page, saveName2);
    expect(await getSavedRolls(page)).toContain(saveName2);
    expect(await getSavedRolls(page)).toHaveLength(2);

    // Roll first saved roll
    await rollSavedRoll(page, saveName1);

    const total1 = await getRollTotal(page);
    expect(total1).toBeGreaterThanOrEqual(8);
    expect(total1).toBeLessThanOrEqual(8 * 6);

    // Roll second saved roll
    await rollSavedRoll(page, saveName2);
    const total2 = await getRollTotal(page);
    expect(total2).toBeGreaterThanOrEqual(3);
    expect(total2).toBeLessThanOrEqual(20 + 2 * 6);

    // Delete second saved roll
    await deleteSavedRoll(page, saveName2);
    expect(await getSavedRolls(page)).not.toContain(saveName2);
    expect(await getSavedRolls(page)).toContain(saveName1);
    expect(await getSavedRolls(page)).toHaveLength(1);

    // Delete first saved roll
    await deleteSavedRoll(page, saveName1);
    expect(await getSavedRolls(page)).not.toContain(saveName1);
    expect(await getSavedRolls(page)).toHaveLength(0);
  });

  test('should not allow saving a roll without selecting dice', async ({ page }) => {
    await expect(page.getByTestId('save')).not.toBeVisible();
  });
});
