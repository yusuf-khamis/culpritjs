const validator = require('../../lib/types/string')
const obj = require('../object')

describe('string', () => {
  it('string_test should throw an error because it is not a valid validation rule for string', () => {
    expect(() => validator('propStringRandom', obj, 'string_test', '', [], '')).toThrow(Error)
  })

  describe('alpha', () => {
    it('alpha with alpha characters should return true', () => {
      expect(validator('propStringRandom', obj, 'alpha', '', [], '')).toBe(true)
    })

    it('alpha with non-alpha characters should return false', () => {
      expect(validator('propStringMixArray', obj, 'alpha', '', [], '')).toBe(false)
    })

    it('alpha with alpha characters but with arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'alpha', 'true', [], '')).toThrow(Error)
    })
  })

  describe('alpha_dash', () => {
    it('alpha_dash with alpha characters only should return true', () => {
      expect(validator('propStringRandom', obj, 'alpha_dash', '', [], '')).toBe(true)
    })

    it('alpha_dash with alpha characters and underscore should return true', () => {
      expect(validator('propStringRandomOther1', obj, 'alpha_dash', '', [], '')).toBe(true)
    })

    it('alpha_dash with alpha characters and hyphen should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'alpha_dash', '', [], '')).toBe(true)
    })

    it('alpha_dash with alpha characters and hyphen and underscore should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'alpha_dash', '', [], '')).toBe(true)
    })

    it('alpha_dash with non-alpha_dash characters should return false', () => {
      expect(validator('propValidEmail', obj, 'alpha_dash', '', [], '')).toBe(false)
    })

    it('alpha_dash with valid alpha_dash string value but with arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'alpha_dash', 'true', [], '')).toThrow(Error)
    })
  })

  describe('alpha_num', () => {
    it('alpha_num with alpha characters should return true', () => {
      expect(validator('propStringRandom', obj, 'alpha_num', '', [], '')).toBe(true)
    })

    it('alpha_num with alpha numeric characters should return true', () => {
      expect(validator('propStringRandomOther4', obj, 'alpha_num', '', [], '')).toBe(true)
    })

    it('alpha_num with numeric characters should return true', () => {
      expect(validator('propStringRandomOther8', obj, 'alpha_num', '', [], '')).toBe(true)
    })

    it('alpha_num with non-alpha numeric characters should return false', () => {
      expect(validator('propStringMixArray', obj, 'alpha_num', '', [], '')).toBe(false)
    })

    it('alpha_num with valid alpha numeric characters but with arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'alpha_num', 'true', [], '')).toThrow(Error)
    })
  })

  describe('between', () => {
    it('between with string length between the range in arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'between', '2,5', [], '')).toBe(true)
    })

    it('between with string length as min number of the range should return true', () => {
      expect(validator('propStringRandom', obj, 'between', '3,5', [], '')).toBe(true)
    })

    it('between with string length as max number of the range should return true', () => {
      expect(validator('propStringRandom', obj, 'between', '1,3', [], '')).toBe(true)
    })

    it('between with string length outside the range provided should return false', () => {
      expect(validator('propStringRandom', obj, 'between', '5,13', [], '')).toBe(false)
    })

    it('between with string length between the range but with the first bigger than the second should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '5,2', [], '')).toThrow(Error)
    })

    it('between with string length between the range but with the first bigger than the second should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '5,2', [], '')).toThrow(Error)
    })

    it('between with valid string but with one argument passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '52', [], '')).toThrow(Error)
    })

    it('between with valid string but with more than two arguments passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '52,60,125', [], '')).toThrow(Error)
    })

    it('between with valid string but with no arguments passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '', [], '')).toThrow(Error)
    })

    it('between with valid string but with non-number arguments passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', 'yes,no', [], '')).toThrow(Error)
    })

    it('between with valid string but with first non-number argument passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', 'yes,76', [], '')).toThrow(Error)
    })

    it('between with valid string but with second non-number argument passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '94,no', [], '')).toThrow(Error)
    })
  })

  describe('confirmed', () => {
    it('confirmed with property with matching confirmation field should return true', () => {
      expect(validator('stringWithMatchingConfirm', obj, 'confirmed', '', [], '')).toBe(true)
    })

    it('confirmed with property with matching custom confirmation field should return true', () => {
      expect(validator('propStringRandom', obj, 'confirmed', 'propStringRandomClone', [], '')).toBe(true)
    })

    it('confirmed with property without matching confirmation field should return false', () => {
      expect(validator('stringWithoutMatchingConfirm', obj, 'confirmed', '', [], '')).toBe(false)
    })

    it('confirmed with property without matching custom confirmation field should return false', () => {
      expect(validator('stringWithoutMatchingConfirm', obj, 'confirmed', 'propStringRandomClone', [], '')).toBe(false)
    })

    it('confirmed with property with matching confirmation field that does not exist should return false', () => {
      expect(validator('propStringFalse', obj, 'confirmed', '', [], '')).toBe(false)
    })

    it('confirmed with property with matching custom confirmation field that does not exist should return false', () => {
      expect(validator('propStringFalse', obj, 'confirmed', 'notExists', [], '')).toBe(false)
    })

    it('confirmed with property with matching confirmation field but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringFalse', obj, 'confirmed', 'confirmed,confirmed', [], '')).toThrow(Error)
    })
  })

  describe('card', () => {
    it('card with valid card number should return true', () => {
      expect(validator('stringValidCardNumber', obj, 'card', '', [], '')).toBe(true)
    })

    it('card with invalid card number should return false', () => {
      expect(validator('stringInvalidCardNumber', obj, 'card', '', [], '')).toBe(false)
    })

    it('card with random value should return false', () => {
      expect(validator('propStringRandomClone', obj, 'card', '', [], '')).toBe(false)
    })

    it('card with valid card number but with arguments should throw an error', () => {
      expect(() => validator('stringValidCardNumber', obj, 'card', 'propStringRandomClone', [], '')).toThrow(Error)
    })
  })

  describe('different', () => {
    it('different with value equal to the value of argument field should return false', () => {
      expect(validator('propStringRandom', obj, 'different', 'propStringRandomClone', [], '')).toBe(false)
    })

    it('different with value not equal to the value of argument field should return true', () => {
      expect(validator('propValidEmail', obj, 'different', 'propStringRandomClone', [], '')).toBe(true)
    })

    it('different with valid value but with field in argument that does not exists should return true', () => {
      expect(validator('propValidEmail', obj, 'different', 'propNotExists', [], '')).toBe(true)
    })

    it('different with valid value but with field in argument with value null should return true', () => {
      expect(validator('propValidEmail', obj, 'different', 'propNull', [], '')).toBe(true)
    })

    it('different with valid value but with no arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'different', '', [], '')).toThrow(Error)
    })

    it('different with valid value but with multiple arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'different', 'propNull,propStringRandomClone', [], '')).toThrow(Error)
    })
  })

  describe('email', () => {
    it('email with valid email should return true', () => {
      expect(validator('propValidEmail', obj, 'email', '', [], '')).toBe(true)
    })

    it('email with invalid email should return false', () => {
      expect(validator('propStringTrue', obj, 'email', '', [], '')).toBe(false)
    })

    it('email with valid email but with arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'email', 'true', [], '')).toThrow(Error)
    })
  })

  describe('ends_with', () => {
    //
  })

  describe('filled', () => {
    //
  })

  describe('gt', () => {
    //
  })

  describe('gte', () => {
    //
  })

  describe('in', () => {
    //
  })

  describe('in_array', () => {
    //
  })

  describe('ip', () => {
    //
  })

  describe('json', () => {
    //
  })

  describe('lt', () => {
    //
  })

  describe('lte', () => {
    //
  })

  describe('max', () => {
    //
  })

  describe('min', () => {
    //
  })

  describe('not_in', () => {
    //
  })

  describe('not_regex', () => {
    //
  })

  describe('numeric', () => {
    //
  })

  describe('present', () => {
    //
  })

  describe('regex', () => {
    //
  })

  describe('same', () => {
    //
  })

  describe('size', () => {
    //
  })

  describe('starts_with', () => {
    //
  })

  describe('timezone', () => {
    //
  })

  describe('url', () => {
    //
  })

  describe('uuid', () => {
    //
  })
})
