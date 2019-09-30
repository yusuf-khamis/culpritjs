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
    it('ends_with with string that ends with one of the values in arguments should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayStringFilled.join(','), [], '')).toBe(true)
    })

    it('ends_with with string that does not end with one of the values in arguments should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayMixFilled.join(','), [], '')).toBe(false)
    })

    it('ends_with with string that ends with one of the values in extra args as json object should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], '', obj.propArrayStringFilled)).toBe(true)
    })

    it('ends_with with string that does not end with one of the values in extra args as json object should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], '', obj.propArrayMixFilled)).toBe(false)
    })

    it('ends_with with string that ends with one of the values in extra args as json string should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], '', obj.propStringStringArray)).toBe(true)
    })

    it('ends_with with string that does not end with one of the values in extra args as json string should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], '', obj.propStringMixArray)).toBe(false)
    })

    it('ends_with with string that ends with values in arguments but not in extra args should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayStringFilled.join(','), [], '', obj.propStringMixArray)).toBe(true)
    })

    it('ends_with with string that ends with values in extra args but not in arguments should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayMixFilled.join(','), [], '', obj.propArrayStringFilled)).toBe(false)
    })

    it('ends_with with valid string but no arguments or extra args should throw an error', () => {
      expect(() => validator('propStringRandomOther9', obj, 'ends_with', '', [], '')).toThrow(Error)
    })

    it('ends_with with valid string but no arguments and invalid extra args (not an array) should throw an error', () => {
      expect(() => validator('propStringRandomOther9', obj, 'ends_with', '', [], '', obj.propValidEmail)).toThrow(Error)
    })
  })

  describe('filled', () => {
    it('filled with string that is not empty should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'filled', '', [], '')).toBe(true)
    })

    it('filled with string that is empty should return false', () => {
      expect(validator('propStringEmpty', obj, 'filled', '', [], '')).toBe(false)
    })

    it('filled with string that is not empty but with arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'filled', 'filled', [], '')).toThrow(Error)
    })
  })

  describe('gt', () => {
    it('gt with string that has length greater than the string in argument field should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'gt', 'propStringRandom', [], '')).toBe(true)
    })

    it('gt with string that has length equal to the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gt', 'propStringRandom', [], '')).toBe(false)
    })

    it('gt with string that has length less than the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gt', 'propStringRandomOther2', [], '')).toBe(false)
    })

    it('gt with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gt', '', [], '')).toThrow(Error)
    })

    it('gt with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gt', 'propStringRandomOther2,propStringRandom', [], '')).toThrow(Error)
    })
  })

  describe('gte', () => {
    it('gte with string that has length greater than the string in argument field should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'gte', 'propStringRandom', [], '')).toBe(true)
    })

    it('gte with string that has length equal to the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'gte', 'propStringRandom', [], '')).toBe(true)
    })

    it('gte with string that has length less than the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gte', 'propStringRandomOther2', [], '')).toBe(false)
    })

    it('gte with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gte', '', [], '')).toThrow(Error)
    })

    it('gte with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gte', 'propStringRandomOther2,propStringRandom', [], '')).toThrow(Error)
    })
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
    it('lt with string that has length greater than the string in argument field should return false', () => {
      expect(validator('propStringRandomOther2', obj, 'lt', 'propStringRandom', [], '')).toBe(false)
    })

    it('lt with string that has length equal to the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'lt', 'propStringRandom', [], '')).toBe(false)
    })

    it('lt with string that has length less than the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'lt', 'propStringRandomOther2', [], '')).toBe(true)
    })

    it('lt with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lt', '', [], '')).toThrow(Error)
    })

    it('lt with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lt', 'propStringRandomOther2,propStringRandom', [], '')).toThrow(Error)
    })
  })

  describe('lte', () => {
    it('lte with string that has length greater than the string in argument field should return false', () => {
      expect(validator('propStringRandomOther2', obj, 'lte', 'propStringRandom', [], '')).toBe(false)
    })

    it('lte with string that has length equal to the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'lte', 'propStringRandom', [], '')).toBe(true)
    })

    it('lte with string that has length less than the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'lte', 'propStringRandomOther2', [], '')).toBe(true)
    })

    it('lte with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lte', '', [], '')).toThrow(Error)
    })

    it('lte with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lte', 'propStringRandomOther2,propStringRandom', [], '')).toThrow(Error)
    })
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
