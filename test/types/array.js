const validate = require('../../lib/types/array')
const obj = require('../object')
const definedMessages = require('../../lib/messages')

describe('array', () => {
  const msgObj = {
    property: '',
    arg: ''
  }

  const errorMessages = []

  it('array with valid array and arguments but with invalid validation rule should throw an error', () => {
    expect(() => validate('propArrayNumberFilled', obj, 'array_test', '2,10', [], msgObj)).toThrow(Error)
  })

  describe('between', () => {
    it('between with array of length between specified max and min should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '2,10', [], msgObj)).toBe(true)
    })

    it('between with array of length between a lower value and length of the array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '2,5', [], msgObj)).toBe(true)
    })

    it('between with array of length between the length of the array and a higher value should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '5,10', [], msgObj)).toBe(true)
    })

    it('between with array of length out of the bounds specified should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'between', '10,20', [], msgObj)).toBe(false)
    })

    it('between with array with invalid number arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', 'yes,no', [], msgObj)).toThrow(Error)
    })

    it('between with array with arguments of min greater than max should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '20,10', [], msgObj)).toThrow(Error)
    })

    it('between with array with one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '10', [], msgObj)).toThrow(Error)
    })

    it('between with array with more than two arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '10,25,30', [], msgObj)).toThrow(Error)
    })

    it('between with array with no arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'between', '', [], msgObj)).toThrow(Error)
    })
  })

  describe('distinct', () => {
    it('distinct with distinct array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'distinct', '', [], msgObj)).toBe(true)
    })

    it('distinct with non-distinct array should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'distinct', '', [], msgObj)).toBe(false)
    })

    it('distinct with distinct array and arguments should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'distinct', 'true', [], msgObj)).toThrow(Error)
    })
  })

  describe('gt', () => {
    it('gt with array length greater than argument array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gt', 'propArrayMixFilled', [], msgObj)).toBe(true)
    })

    it('gt with array length greater than argument array of json string should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gt', 'propStringMixArray', [], msgObj)).toBe(true)
    })

    it('gt with array length same as argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propArrayMixFilled', [], msgObj)).toBe(false)
    })

    it('gt with array length same as argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propStringMixArray', [], msgObj)).toBe(false)
    })

    it('gt with array length less than argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propArrayNumberFilled', [], msgObj)).toBe(false)
    })

    it('gt with array length less than argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propStringNumberArray', [], msgObj)).toBe(false)
    })

    it('gt with array value and argument field null should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propNull', [], msgObj)).toBe(false)
    })

    it('gt with array value and argument field not defined should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gt', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('gt with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'currentDate', [], msgObj)).toThrow(Error)
    })

    it('gt with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'propValidEmail', [], msgObj)).toThrow(Error)
    })

    it('gt with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', '', [], msgObj)).toThrow(Error)
    })

    it('gt with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gt', 'propArrayMixFilled,propStringMixArray', [], msgObj)).toThrow(Error)
    })
  })

  describe('gte', () => {
    it('gte with array length greater than argument array should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gte', 'propArrayMixFilled', [], msgObj)).toBe(true)
    })

    it('gte with array length greater than argument array of json string should return true', () => {
      expect(validate('propArrayNumberFilled', obj, 'gte', 'propStringMixArray', [], msgObj)).toBe(true)
    })

    it('gte with array length same as argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propArrayMixFilled', [], msgObj)).toBe(true)
    })

    it('gte with array length same as argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propStringMixArray', [], msgObj)).toBe(true)
    })

    it('gte with array length less than argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propArrayNumberFilled', [], msgObj)).toBe(false)
    })

    it('gte with array length less than argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propStringNumberArray', [], msgObj)).toBe(false)
    })

    it('gte with array value and argument field not defined should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propNotDefined', [], msgObj)).toBe(false)
    })

    it('gte with array value and argument field null should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'gte', 'propNull', [], msgObj)).toBe(false)
    })

    it('gte with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'currentDate', [], msgObj)).toThrow(Error)
    })

    it('gte with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'propValidEmail', [], msgObj)).toThrow(Error)
    })

    it('gte with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', '', [], msgObj)).toThrow(Error)
    })

    it('gte with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'gte', 'propArrayMixFilled,propStringMixArray', [], msgObj)).toThrow(Error)
    })
  })

  describe('lt', () => {
    it('lt with array length greater than argument array should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lt', 'propArrayMixFilled', [], msgObj)).toBe(false)
    })

    it('lt with array length greater than argument array of json string should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lt', 'propStringMixArray', [], msgObj)).toBe(false)
    })

    it('lt with array length same as argument array should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propArrayMixFilled', [], msgObj)).toBe(false)
    })

    it('lt with array length same as argument array of json string should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propStringMixArray', [], msgObj)).toBe(false)
    })

    it('lt with array length less than argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propArrayNumberFilled', [], msgObj)).toBe(true)
    })

    it('lt with array length less than argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propStringNumberArray', [], msgObj)).toBe(true)
    })

    it('lt with array value and argument field null should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propNull', [], msgObj)).toBe(false)
    })

    it('lt with array value and argument field undefined should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lt', 'propNonExists', [], msgObj)).toBe(false)
    })

    it('lt with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'currentDate', [], msgObj)).toThrow(Error)
    })

    it('lt with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'propValidEmail', [], msgObj)).toThrow(Error)
    })

    it('lt with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', '', [], msgObj)).toThrow(Error)
    })

    it('lt with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lt', 'propArrayMixFilled,propStringMixArray', [], msgObj)).toThrow(Error)
    })

    it('lt failing validation with custom message should result in array with the message with all tokens replaced with real values', () => {
      msgObj.property = definedMessages.array.lt
      errorMessages.splice(0, errorMessages.length)

      validate('propArrayStringFilled', obj, 'lt', 'propStringMixArray', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propArrayStringFilled').replace(':value', 'propStringMixArray'))
    })
  })

  describe('lte', () => {
    it('lte with array length greater than argument array should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lte', 'propArrayMixFilled', [], msgObj)).toBe(false)
    })

    it('lte with array length greater than argument array of json string should return false', () => {
      expect(validate('propArrayNumberFilled', obj, 'lte', 'propStringMixArray', [], msgObj)).toBe(false)
    })

    it('lte with array length same as argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propArrayMixFilled', [], msgObj)).toBe(true)
    })

    it('lte with array length same as argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propStringMixArray', [], msgObj)).toBe(true)
    })

    it('lte with array length less than argument array should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propArrayNumberFilled', [], msgObj)).toBe(true)
    })

    it('lte with array length less than argument array of json string should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propStringNumberArray', [], msgObj)).toBe(true)
    })

    it('lte with array value and argument field null should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propNull', [], msgObj)).toBe(false)
    })

    it('lte with array value and argument field undefined should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'lte', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('lte with array value and argument field not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'currentDate', [], msgObj)).toThrow(Error)
    })

    it('lte with array value and argument field of string but not an array should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'propValidEmail', [], msgObj)).toThrow(Error)
    })

    it('lte with array value with no argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', '', [], msgObj)).toThrow(Error)
    })

    it('lte with array value with more than one argument should throw an error', () => {
      expect(() => validate('propArrayStringFilled', obj, 'lte', 'propArrayMixFilled,propStringMixArray', [], msgObj)).toThrow(Error)
    })
  })

  describe('max', () => {
    it('max with array length greater than argument the argument value should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'max', '4', [], msgObj)).toBe(false)
    })

    it('max with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'max', '4', [], msgObj)).toBe(true)
    })

    it('max with array length less than argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'max', '10', [], msgObj)).toBe(true)
    })

    it('max with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', 'twelve', [], msgObj)).toThrow(Error)
    })

    it('max with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', '', [], msgObj)).toThrow(Error)
    })

    it('max with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'max', '9,5,36', [], msgObj)).toThrow(Error)
    })

    it('max failing validation with a custom message should result in the final messages list having the message with all the tokens replaced with real values', () => {
      msgObj.property = definedMessages.array.max
      errorMessages.splice(0, errorMessages.length)

      validate('propArrayNotDistinct', obj, 'max', '4', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propArrayNotDistinct').replace(':value', '4'))
    })
  })

  describe('min', () => {
    it('min with array length greater than argument the argument value should return true', () => {
      expect(validate('propArrayNotDistinct', obj, 'min', '4', [], msgObj)).toBe(true)
    })

    it('min with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'min', '4', [], msgObj)).toBe(true)
    })

    it('min with array length less than argument the argument value should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'min', '10', [], msgObj)).toBe(false)
    })

    it('min with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', 'twelve', [], msgObj)).toThrow(Error)
    })

    it('min with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', '', [], msgObj)).toThrow(Error)
    })

    it('min with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'min', '5,6', [], msgObj)).toThrow(Error)
    })

    it('min failing validation with custom message should have the message in the final message array with all tokens replaced with real values', () => {
      msgObj.property = definedMessages.array.min
      errorMessages.splice(0, errorMessages.length)

      validate('propArrayStringFilled', obj, 'min', '10', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propArrayStringFilled').replace(':value', '10'))
    })
  })

  describe('size', () => {
    it('size with array length greater than argument the argument value should return false', () => {
      expect(validate('propArrayNotDistinct', obj, 'size', '4', [], msgObj)).toBe(false)
    })

    it('size with array length equal to argument the argument value should return true', () => {
      expect(validate('propArrayStringFilled', obj, 'size', '4', [], msgObj)).toBe(true)
    })

    it('size with array length less than argument the argument value should return false', () => {
      expect(validate('propArrayStringFilled', obj, 'size', '10', [], msgObj)).toBe(false)
    })

    it('size with array and a non-number argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', 'twelve', [], msgObj)).toThrow(Error)
    })

    it('size with array and a no argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', '', [], msgObj)).toThrow(Error)
    })

    it('size with array and more than one argument should throw an error', () => {
      expect(() => validate('propArrayNumberFilled', obj, 'size', '2,5,4', [], msgObj)).toThrow(Error)
    })
  })
})
