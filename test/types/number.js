const validator = require('../../lib/types/number')
const obj = require('../object')

describe('number', function () {
  describe('between', () => {
    it('between with number value between the number values in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'between', '240,310', [], '')).toBe(true)
    })

    it('between with number value equal to the min number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'between', '275,310', [], '')).toBe(true)
    })

    it('between with number value equal to the max number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'between', '120,275', [], '')).toBe(true)
    })

    it('between with number value not between the number values in the arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'between', '120,250', [], '')).toBe(false)
    })

    it('between with number value NaN and valid arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'between', '120,250', [], '')).toBe(false)
    })

    it('between with number value between the number values in the arguments but with first one bigger than the second one should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '320,250', [], '')).toThrow(Error)
    })

    it('between with one argument passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '275', [], '')).toThrow(Error)
    })

    it('between with no arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '', [], '')).toThrow(Error)
    })

    it('between with non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', 'yes,false', [], '')).toThrow(Error)
    })
  })

  describe('different', () => {
    it('different with number value not equal to the  number value of the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNumberZero', [], '')).toBe(true)
    })

    it('different with number value equal to the  number value of the argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNumberRandomClone', [], '')).toBe(false)
    })

    it('different with number value but with argument of field that does not exists should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNotExist', [], '')).toBe(true)
    })

    it('different with number value NaN and argument of field with valid number value should return true', () => {
      expect(validator('propNaN', obj, 'different', 'propNumberRandomClone', [], '')).toBe(true)
    })

    it('different with valid number value and argument of field NaN number value should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNaN', [], '')).toBe(true)
    })

    it('different with valid number value and argument of field null value should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNull', [], '')).toBe(true)
    })

    it('different with NaN number value and argument of field NaN number value should return false', () => {
      expect(validator('propNaN', obj, 'different', 'propNaN', [], '')).toBe(false)
    })

    it('different with null value and argument of field with valid number value should return true', () => {
      expect(validator('propNull', obj, 'different', 'propNumberRandom', [], '')).toBe(true)
    })

    it('different with number value but with more than argument should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'different', 'propNumberRandomClone,propNumberZero', [], '')).toThrow(Error)
    })

    it('different with number value but with no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'different', '', [], '')).toThrow(Error)
    })
  })

  describe('digits', () => {
    it('digits with number with digits specified by argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits', '3', [], '')).toBe(true)
    })

    it('digits with number with digits greater than specified by argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits', '2', [], '')).toBe(false)
    })

    it('digits with number with digits less than specified by argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits', '5', [], '')).toBe(false)
    })

    it('digits with valid number and no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits', '', [], '')).toThrow(Error)
    })

    it('digits with valid number and more than one arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits', '2,5,6', [], '')).toThrow(Error)
    })

    it('digits with valid number and a non-number argument should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits', 'yes', [], '')).toThrow(Error)
    })
  })

  describe('digits_between', () => {
    it('digits_between with number value between the number values in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '2,5', [], '')).toBe(true)
    })

    it('digits_between with number value equal to the min number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '3,5', [], '')).toBe(true)
    })

    it('digits_between with number value equal to the max number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '1,3', [], '')).toBe(true)
    })

    it('digits_between with number value not between the number values in the arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '10,25', [], '')).toBe(false)
    })

    it('digits_between with number value NaN and valid arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '120,250', [], '')).toBe(false)
    })

    it('digits_between with number value between the number values in the arguments but with first one bigger than the second one should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', '320,250', [], '')).toThrow(Error)
    })

    it('digits_between with one argument passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', '275', [], '')).toThrow(Error)
    })

    it('digits_between with no arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', '', [], '')).toThrow(Error)
    })

    it('digits_between with non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', 'yes,false', [], '')).toThrow(Error)
    })
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

  describe('integer', () => {
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

  describe('number', () => {
    //
  })

  describe('same', () => {
    //
  })

  describe('size', () => {
    //
  })
})
