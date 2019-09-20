const validate = require('../../lib/types/array')
const obj = require('../object')

describe('array', () => {
  it('array with valid array and arguments but with invalid validation rule should throw an error', () => {
    expect(() => validate('propArrayNumberFilled', obj, 'array_test', '2,10', [], '')).toThrow(Error)
  })

  describe('between', () => {
    const betweenErrorMessages = []

    it('between with array of length between specified max and min should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '2,10', betweenErrorMessages, '')).toBe(true)
    })

    it('between with array of length between a lower value and length of the array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '2,5', betweenErrorMessages, '')).toBe(true)
    })

    it('between with array of length between the length of the array and a higher value should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '5,10', betweenErrorMessages, '')).toBe(true)
    })

    it('between with array of length out of the bounds specified should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '10,20', betweenErrorMessages, '')).toBe(false)
    })

    it('between with array with invalid number arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', 'yes,no', betweenErrorMessages, '')).toThrow(Error)
    })

    it('between with array with arguments of min greater than max should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '20,10', betweenErrorMessages, '')).toThrow(Error)
    })

    it('between with array with one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '10', betweenErrorMessages, '')).toThrow(Error)
    })

    it('between with array with more than two arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '10,25,30', betweenErrorMessages, '')).toThrow(Error)
    })

    it('between with array with no arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '', betweenErrorMessages, '')).toThrow(Error)
    })
  })

  describe('distinct', () => {
    const distinctErrorMessages = []

    it('distinct with distinct array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'distinct', '', distinctErrorMessages, '')).toBe(true)
    })

    it('distinct with non-distinct array should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'distinct', '', distinctErrorMessages, '')).toBe(false)
    })

    it('distinct with distinct array and arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'distinct', 'true', distinctErrorMessages, '')).toThrow(Error)
    })
  })

  describe('gt', () => {
    const gtErrorMessages = []

    it('gt with array length greater than argument array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gt', 'propArrayMixFilled', gtErrorMessages, '')).toBe(true)
    })

    it('gt with array length greater than argument array of json string should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gt', 'propStringMixArray', gtErrorMessages, '')).toBe(true)
    })

    it('gt with array length same as argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propArrayMixFilled', gtErrorMessages, '')).toBe(false)
    })

    it('gt with array length same as argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propStringMixArray', gtErrorMessages, '')).toBe(false)
    })

    it('gt with array length less than argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propArrayNumberFilled', gtErrorMessages, '')).toBe(false)
    })

    it('gt with array length less than argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propStringNumberArray', gtErrorMessages, '')).toBe(false)
    })

    it('gt with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'currentDate', gtErrorMessages, '')).toThrow(Error)
    })

    it('gt with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'propValidEmail', gtErrorMessages, '')).toThrow(Error)
    })

    it('gt with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', '', gtErrorMessages, '')).toThrow(Error)
    })

    it('gt with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'propArrayMixFilled,propStringMixArray', gtErrorMessages, '')).toThrow(Error)
    })
  })

  describe('gte', () => {
    const gteErrorMessages = []

    it('gte with array length greater than argument array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gte', 'propArrayMixFilled', gteErrorMessages, '')).toBe(true)
    })

    it('gte with array length greater than argument array of json string should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gte', 'propStringMixArray', gteErrorMessages, '')).toBe(true)
    })

    it('gte with array length same as argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propArrayMixFilled', gteErrorMessages, '')).toBe(true)
    })

    it('gte with array length same as argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propStringMixArray', gteErrorMessages, '')).toBe(true)
    })

    it('gte with array length less than argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propArrayNumberFilled', gteErrorMessages, '')).toBe(false)
    })

    it('gte with array length less than argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propStringNumberArray', gteErrorMessages, '')).toBe(false)
    })

    it('gte with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'currentDate', gteErrorMessages, '')).toThrow(Error)
    })

    it('gte with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'propValidEmail', gteErrorMessages, '')).toThrow(Error)
    })

    it('gte with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', '', gteErrorMessages, '')).toThrow(Error)
    })

    it('gte with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'propArrayMixFilled,propStringMixArray', gteErrorMessages, '')).toThrow(Error)
    })
  })

  describe('lt', () => {
    const ltErrorMessages = []

    it('lt with array length greater than argument array should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lt', 'propArrayMixFilled', ltErrorMessages, '')).toBe(false)
    })

    it('lt with array length greater than argument array of json string should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lt', 'propStringMixArray', ltErrorMessages, '')).toBe(false)
    })

    it('lt with array length same as argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propArrayMixFilled', ltErrorMessages, '')).toBe(false)
    })

    it('lt with array length same as argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propStringMixArray', ltErrorMessages, '')).toBe(false)
    })

    it('lt with array length less than argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propArrayNumberFilled', ltErrorMessages, '')).toBe(true)
    })

    it('lt with array length less than argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propStringNumberArray', ltErrorMessages, '')).toBe(true)
    })

    it('lt with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'currentDate', ltErrorMessages, '')).toThrow(Error)
    })

    it('lt with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'propValidEmail', ltErrorMessages, '')).toThrow(Error)
    })

    it('lt with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', '', ltErrorMessages, '')).toThrow(Error)
    })

    it('lt with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'propArrayMixFilled,propStringMixArray', ltErrorMessages, '')).toThrow(Error)
    })
  })

  describe('lte', () => {
    const lteErrorMessages = []

    it('lte with array length greater than argument array should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lte', 'propArrayMixFilled', lteErrorMessages, '')).toBe(false)
    })

    it('lte with array length greater than argument array of json string should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lte', 'propStringMixArray', lteErrorMessages, '')).toBe(false)
    })

    it('lte with array length same as argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propArrayMixFilled', lteErrorMessages, '')).toBe(true)
    })

    it('lte with array length same as argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propStringMixArray', lteErrorMessages, '')).toBe(true)
    })

    it('lte with array length less than argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propArrayNumberFilled', lteErrorMessages, '')).toBe(true)
    })

    it('lte with array length less than argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propStringNumberArray', lteErrorMessages, '')).toBe(true)
    })

    it('lte with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'currentDate', lteErrorMessages, '')).toThrow(Error)
    })

    it('lte with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'propValidEmail', lteErrorMessages, '')).toThrow(Error)
    })

    it('lte with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', '', lteErrorMessages, '')).toThrow(Error)
    })

    it('lte with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'propArrayMixFilled,propStringMixArray', lteErrorMessages, '')).toThrow(Error)
    })
  })

  describe('max', () => {
    const maxErrorMessages = []

    it('max with array length greater than argument the argument value should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'max', '4', maxErrorMessages, '')).toBe(false)
    })

    it('max with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'max', '4', maxErrorMessages, '')).toBe(true)
    })

    it('max with array length less than argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'max', '10', maxErrorMessages, '')).toBe(true)
    })

    it('max with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', 'twelve', maxErrorMessages, '')).toThrow(Error)
    })

    it('max with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', '', maxErrorMessages, '')).toThrow(Error)
    })

    it('max with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', '9,5,36', maxErrorMessages, '')).toThrow(Error)
    })
  })

  describe('min', () => {
    const minErrorMessages = []

    it('min with array length greater than argument the argument value should return true', () => {
      expect(validate('propArrayNotDistinct', obj, 'min', '4', minErrorMessages, '')).toBe(true)
    })

    it('min with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'min', '4', minErrorMessages, '')).toBe(true)
    })

    it('min with array length less than argument the argument value should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'min', '10', minErrorMessages, '')).toBe(false)
    })

    it('min with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', 'twelve', minErrorMessages, '')).toThrow(Error)
    })

    it('min with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', '', minErrorMessages, '')).toThrow(Error)
    })

    it('min with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', '5,6', minErrorMessages, '')).toThrow(Error)
    })
  })

  describe('size', () => {
    const sizeErrorMessages = []

    it('size with array length greater than argument the argument value should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'size', '4', sizeErrorMessages, '')).toBe(false)
    })

    it('size with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'size', '4', sizeErrorMessages, '')).toBe(true)
    })

    it('size with array length less than argument the argument value should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'size', '10', sizeErrorMessages, '')).toBe(false)
    })

    it('size with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', 'twelve', sizeErrorMessages, '')).toThrow(Error)
    })

    it('size with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', '', sizeErrorMessages, '')).toThrow(Error)
    })

    it('size with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', '2,5,4', sizeErrorMessages, '')).toThrow(Error)
    })
  })
})
