import { getAgeFromDate } from './index';

// Tests that providing a valid birthday date returns the correct age.
it('test_happy_path_age_calculation', () => {
  const birthday = new Date('1990-01-01');
  const age = getAgeFromDate(birthday);
  expect(age).toBe(31);
});

// Tests that providing a future date as the birthday returns 0.
it('test_edge_case_future_date', () => {
  const birthday = new Date('2050-01-01');
  const age = getAgeFromDate(birthday);
  expect(age).toBe(0);
});

// Tests that providing an invalid date (e.g. "abc") throws an error.
it('test_edge_case_invalid_date', () => {
  const birthday = 'abc';
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  expect(() => getAgeFromDate(birthday)).toThrow();
});

// Tests that the function always returns a non-negative integer.
it('test_general_behavior_non_negative_integer', () => {
  const birthday = new Date('1990-01-01');
  const age = getAgeFromDate(birthday);
  expect(age).toBeGreaterThanOrEqual(0);
  expect(Number.isInteger(age)).toBe(true);
});

// Tests that the function handles leap years correctly.
it('test_important_leap_years', () => {
  const birthday1 = new Date('2000-02-29');
  const birthday2 = new Date('2001-02-28');
  const age1 = getAgeFromDate(birthday1);
  const age2 = getAgeFromDate(birthday2);
  expect(age1).toBe(21);
  expect(age2).toBe(20);
});

// Tests that the function is not affected by timezone differences or different locales.
it('test_important_timezone_and_locale', () => {
  const birthday = new Date('1990-01-01T00:00:00-05:00');
  const age = getAgeFromDate(birthday);
  expect(age).toBe(31);
});
