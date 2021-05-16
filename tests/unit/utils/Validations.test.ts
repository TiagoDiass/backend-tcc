import { Validations } from 'lib/utils';

describe('Validations utils tests', () => {
  it('id(uuid) validation', () => {
    expect(Validations.id('id not valid')).toBe(false);
    expect(Validations.id('57e22f35-f7b7-46b5-96ec-14ec065014b3')).toBe(true);
  });

  it('date YYYY_MM_DD validation', () => {
    expect(Validations.date_YYYY_MM_DD('2021-10-01')).toBe(true);
    expect(Validations.date_YYYY_MM_DD('2021-06-31')).toBe(true); // date-fns will format this to 2021-07-01
    expect(Validations.date_YYYY_MM_DD('2021-17-02')).toBe(false);
    expect(Validations.date_YYYY_MM_DD('2021-14-01')).toBe(false);
    expect(Validations.date_YYYY_MM_DD('12/05/2021')).toBe(false);
    expect(Validations.date_YYYY_MM_DD('2019')).toBe(false);
    expect(Validations.date_YYYY_MM_DD('2')).toBe(false);
  });
});
