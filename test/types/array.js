const validate = require('../../lib/types/array')
const obj = require('../object')

describe('array', () => {
  it('array with valid array and arguments but with invalid validation rule should throw an error', () => {
    expect(() => validate('propArrayNumberFilled', obj, 'array_test', '2,10', [], '')).toThrow(Error)
  })

  describe('between', () => {
    it('between with array of length between specified max and min should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '2,10', [], '')).toBe(true)
    })

    it('between with array of length between a lower value and length of the array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '2,5', [], '')).toBe(true)
    })

    it('between with array of length between the length of the array and a higher value should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '5,10', [], '')).toBe(true)
    })

    it('between with array of length out of the bounds specified should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '10,20', [], '')).toBe(false)
    })

    it('between with array with invalid number arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', 'yes,no', [], '')).toThrow(Error)
    })

    it('between with array with arguments of min greater than max should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '20,10', [], '')).toThrow(Error)
    })

    it('between with array with one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '10', [], '')).toThrow(Error)
    })

    it('between with array with more than two arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '10,25,30', [], '')).toThrow(Error)
    })

    it('between with array with no arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '', [], '')).toThrow(Error)
    })
  })

  describe('distinct', () => {
    it('distinct with distinct array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'distinct', '', [], '')).toBe(true)
    })

    it('distinct with non-distinct array should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'distinct', '', [], '')).toBe(false)
    })

    it('distinct with distinct array and arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'distinct', 'true', [], '')).toThrow(Error)
    })
  })

  describe('gt', () => {
    it('gt with array length greater than argument array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gt', 'propArrayMixFilled', [], '')).toBe(true)
    })

    it('gt with array length greater than argument array of json string should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gt', 'propStringMixArray', [], '')).toBe(true)
    })

    it('gt with array length same as argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propArrayMixFilled', [], '')).toBe(false)
    })

    it('gt with array length same as argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propStringMixArray', [], '')).toBe(false)
    })

    it('gt with array length less than argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propArrayNumberFilled', [], '')).toBe(false)
    })

    it('gt with array length less than argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propStringNumberArray', [], '')).toBe(false)
    })

    it('gt with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'currentDate', [], '')).toThrow(Error)
    })

    it('gt with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'propValidEmail', [], '')).toThrow(Error)
    })

    it('gt with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', '', [], '')).toThrow(Error)
    })

    it('gt with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'propArrayMixFilled,propStringMixArray', [], '')).toThrow(Error)
    })
  })

  describe('gte', () => {
    it('gte with array length greater than argument array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gte', 'propArrayMixFilled', [], '')).toBe(true)
    })

    it('gte with array length greater than argument array of json string should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gte', 'propStringMixArray', [], '')).toBe(true)
    })

    it('gte with array length same as argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propArrayMixFilled', [], '')).toBe(true)
    })

    it('gte with array length same as argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propStringMixArray', [], '')).toBe(true)
    })

    it('gte with array length less than argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propArrayNumberFilled', [], '')).toBe(false)
    })

    it('gte with array length less than argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propStringNumberArray', [], '')).toBe(false)
    })

    it('gte with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'currentDate', [], '')).toThrow(Error)
    })

    it('gte with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'propValidEmail', [], '')).toThrow(Error)
    })

    it('gte with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', '', [], '')).toThrow(Error)
    })

    it('gte with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'propArrayMixFilled,propStringMixArray', [], '')).toThrow(Error)
    })
  })

  describe('lt', () => {
    it('lt with array length greater than argument array should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lt', 'propArrayMixFilled', [], '')).toBe(false)
    })

    it('lt with array length greater than argument array of json string should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lt', 'propStringMixArray', [], '')).toBe(false)
    })

    it('lt with array length same as argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propArrayMixFilled', [], '')).toBe(false)
    })

    it('lt with array length same as argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propStringMixArray', [], '')).toBe(false)
    })

    it('lt with array length less than argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propArrayNumberFilled', [], '')).toBe(true)
    })

    it('lt with array length less than argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propStringNumberArray', [], '')).toBe(true)
    })

    it('lt with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'currentDate', [], '')).toThrow(Error)
    })

    it('lt with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'propValidEmail', [], '')).toThrow(Error)
    })

    it('lt with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', '', [], '')).toThrow(Error)
    })

    it('lt with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'propArrayMixFilled,propStringMixArray', [], '')).toThrow(Error)
    })
  })

  describe('lte', () => {
    it('lte with array length greater than argument array should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lte', 'propArrayMixFilled', [], '')).toBe(false)
    })

    it('lte with array length greater than argument array of json string should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lte', 'propStringMixArray', [], '')).toBe(false)
    })

    it('lte with array length same as argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propArrayMixFilled', [], '')).toBe(true)
    })

    it('lte with array length same as argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propStringMixArray', [], '')).toBe(true)
    })

    it('lte with array length less than argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propArrayNumberFilled', [], '')).toBe(true)
    })

    it('lte with array length less than argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propStringNumberArray', [], '')).toBe(true)
    })

    it('lte with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'currentDate', [], '')).toThrow(Error)
    })

    it('lte with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'propValidEmail', [], '')).toThrow(Error)
    })

    it('lte with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', '', [], '')).toThrow(Error)
    })

    it('lte with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'propArrayMixFilled,propStringMixArray', [], '')).toThrow(Error)
    })
  })

  describe('max', () => {
    it('max with array length greater than argument the argument value should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'max', '4', [], '')).toBe(false)
    })

    it('max with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'max', '4', [], '')).toBe(true)
    })

    it('max with array length less than argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'max', '10', [], '')).toBe(true)
    })

    it('max with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', 'twelve', [], '')).toThrow(Error)
    })

    it('max with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', '', [], '')).toThrow(Error)
    })

    it('max with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', '9,5,36', [], '')).toThrow(Error)
    })
  })

  describe('min', () => {
    it('min with array length greater than argument the argument value should return true', () => {
      expect(validate('propArrayNotDistinct', obj, 'min', '4', [], '')).toBe(true)
    })

    it('min with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'min', '4', [], '')).toBe(true)
    })

    it('min with array length less than argument the argument value should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'min', '10', [], '')).toBe(false)
    })

    it('min with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', 'twelve', [], '')).toThrow(Error)
    })

    it('min with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', '', [], '')).toThrow(Error)
    })

    it('min with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', '5,6', [], '')).toThrow(Error)
    })
  })

  describe('size', () => {
    it('size with array length greater than argument the argument value should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'size', '4', [], '')).toBe(false)
    })

    it('size with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'size', '4', [], '')).toBe(true)
    })

    it('size with array length less than argument the argument value should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'size', '10', [], '')).toBe(false)
    })

    it('size with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', 'twelve', [], '')).toThrow(Error)
    })

    it('size with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', '', [], '')).toThrow(Error)
    })

    it('size with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', '2,5,4', [], '')).toThrow(Error)
    })
  })
})
