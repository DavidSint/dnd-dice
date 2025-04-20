import { randomUUID } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { changeName, getRollHistory, getRollTotal, joinGame } from '../utils';

test.describe('Multi-User Interactions', () => {
  test('User B should see User A\'s roll', async ({ browser }) => {
    const gameId = randomUUID();
    
    const contextA = await browser.newContext();
    const pageA = await contextA.newPage();
    const userAName = 'User A';
    await joinGame(pageA, gameId)
    await changeName(pageA, userAName)

    const contextB = await browser.newContext();
    const pageB = await contextB.newPage();
    const userBName = 'User B';
    await joinGame(pageB, gameId)
    await changeName(pageB, userBName)

    const d20A = pageA.getByTestId('D20');
    await d20A.click();
    await pageA.getByTestId('roll').click();
    const pageATotal = await getRollTotal(pageA)
    
    const historyB = await getRollHistory(pageB);
    const pageBTotal = await getRollTotal(pageB)
    expect(pageATotal).toBe(pageBTotal);
    const rollMatch = historyB?.match(/(.+): \d+ \+ 0 \((\d+)\)/)
    'User A:  13 + 0 (13)'
    expect(rollMatch?.[1]).toBe('User A');
    const total = parseInt(rollMatch?.[2] ?? '0', 10)
    expect(total).toBeGreaterThanOrEqual(1);
    expect(total).toBeLessThanOrEqual(20 + 2 * 6);
    expect(total).toBe(pageATotal)

    await contextA.close();
    await contextB.close();
  });
});
