import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateFreshness } from '../src/data/calculator.js';

const item = { name: 'Test food', idealStorage: 'fridge', safetyRating: 'moderate_risk',
  refrigLife: { openedDays: 7, unopenedDays: 7 }, pantryLife: { openedDays: 0, unopenedDays: 0 }, freezeLife: { days: 90 } };
const RealDate = Date;
function at(iso, action) {
  globalThis.Date = class extends RealDate {
    constructor(...args) { super(...(args.length ? args : [iso])); }
    static now() { return new RealDate(iso).getTime(); }
  };
  try { action(); } finally { globalThis.Date = RealDate; }
}

test('purchase date stays on the selected calendar day in western time zones', () => {
  process.env.TZ = 'America/Los_Angeles';
  at('2026-11-10T20:00:00Z', () => {
    const result = calculateFreshness({ item, selectedDate: '2026-11-10' });
    assert.equal(result.daysElapsed, 0);
    assert.equal(result.daysRemaining, 7);
    assert.equal(result.expiryDate, 'Nov 17, 2026');
  });
});

test('elapsed days count calendar dates across daylight saving start', () => {
  process.env.TZ = 'America/Los_Angeles';
  at('2026-03-09T19:00:00Z', () => {
    assert.equal(calculateFreshness({ item, selectedDate: '2026-03-07' }).daysElapsed, 2);
  });
});

test('default purchase day follows local date near midnight', () => {
  process.env.TZ = 'Asia/Kolkata';
  at('2026-11-09T20:00:00Z', () => {
    assert.equal(calculateFreshness({ item }).daysElapsed, 0);
  });
});
