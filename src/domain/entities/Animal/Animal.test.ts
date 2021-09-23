import Animal from './Animal';

describe('Entity: Animal', () => {
  it('should instantiate a new Animal correctly without passing an id', () => {
    const animal = new Animal({
      name: 'Rex',
      type: 'dog',
      size: 'M',
      gender: 'M',
    });

    expect(animal.id).toBeTruthy();
    expect(animal).toMatchObject({
      name: 'Rex',
      type: 'dog',
      size: 'M',
      gender: 'M',
      pictureUrl: '',
    });
  });

  it('should instantiate a new Animal correctly passing an id in parameters', () => {});
});
