import { isFullMonth } from '.';

describe('isFullMonth', () => {
  it('Handles 30 day month', async () => {
    var startDate = '04-01-2000';
    var endDate = '04-30-2000';
    expect(isFullMonth(startDate, endDate)).toBe(true);

    startDate = '04-01-2000';
    endDate = '04-10-2000';
    expect(isFullMonth(startDate, endDate)).toBe(false);
  });

  it('Handles 31 day month', async () => {
    var startDate = '05-01-2000';
    var endDate = '05-31-2000';
    expect(isFullMonth(startDate, endDate)).toBe(true);

    startDate = '05-01-2000';
    endDate = '05-30-2000';
    expect(isFullMonth(startDate, endDate)).toBe(false);
  });

  it('Handles February', async () => {
    var startDate = '02-01-2000';
    var endDate = '02-29-2000';
    expect(isFullMonth(startDate, endDate)).toBe(true);

    startDate = '02-01-2000';
    endDate = '02-28-2001';
    expect(isFullMonth(startDate, endDate)).toBe(true);

    startDate = '02-01-2000';
    endDate = '02-27-2000';
    expect(isFullMonth(startDate, endDate)).toBe(false);
  });
});
