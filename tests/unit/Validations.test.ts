import Validations from 'lib/utils/Validations';

describe('Validations utils tests', () => {
  describe('id(uuid) validation', () => {
    it('should return false if id is not an uuid', () => {
      expect(Validations.id('id not valid')).toBe(false);
    });

    it('should return true if id is an uuid', () => {
      expect(Validations.id('57e22f35-f7b7-46b5-96ec-14ec065014b3')).toBe(true);
    });
  });
});
