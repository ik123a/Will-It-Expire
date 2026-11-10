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

test('invalid and nonexistent dates return an explicit unknown estimate', () => {
  process.env.TZ = 'America/Los_Angeles';
  at('2026-11-10T20:00:00Z', () => {
    for (const selectedDate of ['', 'not-a-date', '2026-02-30', '2025-02-29', '2026-13-01', '2026-00-01', '2026-11-00', '2026-04-31', '2026-11-1', '2026-11-10T00:00:00Z', null, 42]) {
      const result = calculateFreshness({ item, selectedDate });
      assert.equal(result.status, 'unknown', String(selectedDate));
      for (const key of ['daysElapsed', 'daysRemaining', 'totalAllowedDays', 'percentage', 'expiryDate']) {
        assert.equal(result[key], null, `${String(selectedDate)}: ${key}`);
      }
    }
  });
});

test('a future purchase date is unknown rather than extra shelf life', () => {
  process.env.TZ = 'America/Los_Angeles';
  at('2026-11-10T20:00:00Z', () => {
    assert.equal(calculateFreshness({ item, selectedDate: '2026-11-11' }).status, 'unknown');
  });
});

test('every known date state describes an estimate without a consumption verdict', () => {
  process.env.TZ = 'America/Los_Angeles';
  at('2026-11-10T20:00:00Z', () => {
    for (const [selectedDate, status, daysRemaining] of [
      ['2026-11-10', 'fresh', 7], ['2026-11-06', 'good', 3],
      ['2026-11-05', 'caution', 2], ['2026-11-03', 'caution', 0], ['2026-11-02', 'expired', -1],
    ]) {
      const result = calculateFreshness({ item, selectedDate });
      assert.equal(result.status, status);
      assert.equal(result.daysRemaining, daysRemaining);
      assert.match(result.statusText, /estimat/i);
      assert.match(result.advice, /cannot determine food safety/i);
      assert.doesNotMatch(result.advice, /safe to (consume|eat)|taste test|smell.*test|plan to eat/i);
    }
  });
});

test('a missing duration or unsupported storage has no countdown estimate', () => {
  at('2026-11-10T20:00:00Z', () => {
    assert.equal(calculateFreshness({ item, storage: 'pantry', selectedDate: '2026-11-10' }).status, 'unknown');
    for (const days of [0, undefined, NaN, Infinity, -1]) {
      const missingFreezer = { ...item, freezeLife: { days } };
      assert.equal(calculateFreshness({ item: missingFreezer, storage: 'freezer', selectedDate: '2026-11-10' }).status, 'unknown');
    }
    assert.equal(calculateFreshness({ item, storage: 'unknown', selectedDate: '2026-11-10' }).status, 'unknown');
  });
});
