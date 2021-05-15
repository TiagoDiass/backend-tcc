import { DateUtils } from 'lib/utils';
import MockDate from 'mockdate';

describe('DateUtils tests', () => {
  it('should return the current date in the format YYYY-MM-DD', () => {
    MockDate.set(new Date('2021-05-16 12:00:00'));
    expect(DateUtils.currentDate()).toBe('2021-05-16');
  });
});
