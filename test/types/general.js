const validator = require('../../lib/types/general')
const obj = require('../object')
const definedMessages = require('../../lib/messages')

describe('general', () => {
  const msgObj = {
    property: '',
    arg: ''
  }

  const errorMessages = []

  it('general_test should throw an error because its not a valid rule of general', () => {
    expect(() => validator('propBooleanFalse', obj, 'general_test', '', [], msgObj)).toThrow(Error)
  })

  describe('required', () => {
    it('required with zero(0) value should return true', () => {
      expect(validator('propNumberZero', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with any number should return true', () => {
      expect(validator('propNumberRandom', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with a string with content should return true', () => {
      expect(validator('propStringRandom', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with empty string should return false', () => {
      expect(validator('propStringEmpty', obj, 'required', '', [], msgObj)).toBe(false)
    })

    it('required with empty array should return false', () => {
      expect(validator('propArrayEmpty', obj, 'required', '', [], msgObj)).toBe(false)
    })

    it('required with string array should return true', () => {
      expect(validator('propArrayStringFilled', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with undefined should return false', () => {
      expect(validator('propUndefined', obj, 'required', '', [], msgObj)).toBe(false)
    })

    it('required with number array should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with array with mixed value types should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with null value should return false', () => {
      expect(validator('propNull', obj, 'required', '', [], msgObj)).toBe(false)
    })

    it('required with property not defined should return false', () => {
      expect(validator('notDefined', obj, 'required', '', [], msgObj)).toBe(false)
    })

    it('required with false boolean value should return true', () => {
      expect(validator('propBooleanFalse', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required with true boolean value should return true', () => {
      expect(validator('propBooleanTrue', obj, 'required', '', [], msgObj)).toBe(true)
    })

    it('required should throw an error if argument supplied', () => {
      expect(() => validator('notDefined', obj, 'required', 'test', [], msgObj)).toThrow(Error)
    })

    it('required failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringEmpty'))
    })
  })

  describe('required_if', () => {
    it('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom', [], msgObj, obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_if with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('required_if with empty string value and a field whose value is present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(false)
    })

    it('required_if with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('required_if with empty string value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], msgObj, obj.propArrayStringFilled)).toBe(false)
    })

    it('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propBooleanTrue', [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propBooleanTrue', [], msgObj, obj.propArrayStringFilled)).toBe(false)
    })

    it('required_if with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', '', [], msgObj)).toThrow(Error)
    })

    it('required_if with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', [], msgObj)).toThrow(Error)
    })

    it('required_if with a field in arguments and empty array in sub-args should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', [], msgObj, [])).toThrow(Error)
    })

    it('required_if failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required_if
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required_if', 'propNumberRandom', errorMessages, msgObj, obj.propArrayNumberFilled)

      expect(errorMessages).toContain(
        msgObj.property
          .replace(':field', 'propStringEmpty')
          .replace(':another', 'propNumberRandom')
          .replace(':value', obj.propArrayNumberFilled.join(','))
      )
    })
  })

  describe('required_unless', () => {
    it('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero', [], msgObj, obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is not present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(false)
    })

    it('required_unless with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), [], msgObj, obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_unless with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propBooleanTrue', [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propBooleanTrue', [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', '', [], msgObj)).toThrow(Error)
    })

    it('required_unless with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', [], msgObj)).toThrow(Error)
    })

    it('required_unless with a field in arguments and empty array in sub-args should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', [], msgObj, [])).toThrow(Error)
    })

    it('required_unless failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required_if
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), errorMessages, msgObj)

      expect(errorMessages).toContain(
        msgObj.property
          .replace(':field', 'propStringEmpty')
          .replace(':another', 'propNumberZero')
          .replace(':value', obj.propArrayNumberFilled.join(','))
      )
    })
  })

  describe('required_with', () => {
    it('required_with with empty string and fields with partial truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(false)
    })

    it('required_with with empty string and fields with all truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', [], msgObj)).toBe(false)
    })

    it('required_with with empty string and fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with with valid value and fields with partial truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with with valid value and fields with all truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', [], msgObj)).toBe(true)
    })

    it('required_with with valid value and fields with falsy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with with empty string and fields with falsy values and sub-args array of fields with truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', [], msgObj, ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(true)
    })

    it('required_with with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with', '', [], msgObj)).toThrow(Error)
    })

    it('required_with with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with', 'propNumberRandom,,propStringEmpty', [], msgObj)).toThrow(Error)
    })

    it('required_with failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required_with
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', errorMessages, msgObj)

      expect(errorMessages).toContain(
        msgObj.property
          .replace(':field', 'propStringEmpty')
          .replace(':another', 'propNumberRandom,propBooleanTrue,propArrayStringFilled')
      )
    })
  })

  describe('required_with_all', () => {
    it('required_with_all with empty string and fields with all truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], msgObj)).toBe(false)
    })

    it('required_with_all with empty string and fields with some truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with_all with empty string and fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with_all with valid value and fields with all truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], msgObj)).toBe(true)
    })

    it('required_with_all with valid value and fields with some truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with_all with valid value and fields with falsy values should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_with_all with empty string and fields with falsy values and sub-args array of fields with truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', [], msgObj, ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(true)
    })

    it('required_with_all with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with_all', '', [], msgObj)).toThrow(Error)
    })

    it('required_with_all with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with_all', 'propNumberRandom,,propStringEmpty', [], msgObj)).toThrow(Error)
    })

    it('required_with_all failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required_with_all
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', errorMessages, msgObj)

      expect(errorMessages).toContain(
        msgObj.property
          .replace(':field', 'propStringEmpty')
          .replace(':another', 'propNumberRandom,propBooleanTrue,propStringFalse')
      )
    })
  })

  describe('required_without', () => {
    it('required_without with empty string and fields with partial truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(false)
    })

    it('required_without with empty string and fields with all truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', [], msgObj)).toBe(true)
    })

    it('required_without with empty string and fields with all falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(false)
    })

    it('required_without with valid value and fields with partial truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_without with valid value and fields with all truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringRandom', [], msgObj)).toBe(true)
    })

    it('required_without with valid value and all fields with falsy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_without with empty string and fields with truthy values and sub-args array of fields with falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberZero,propStringRandom,propValidEmail', [], msgObj, ['propNull', 'propUndefined', 'propStringEmpty'])).toBe(false)
    })

    it('required_without with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without', '', [], msgObj)).toThrow(Error)
    })

    it('required_without with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without', 'propNumberRandom,,propStringEmpty', [], msgObj)).toThrow(Error)
    })

    it('required_without failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required_without
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', errorMessages, msgObj)

      expect(errorMessages).toContain(
        msgObj.property
          .replace(':field', 'propStringEmpty')
          .replace(':another', 'propNull,propUndefined,propStringEmpty')
      )
    })
  })

  describe('required_without_all', () => {
    it('required_without_all with empty string and fields with all truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], msgObj)).toBe(true)
    })

    it('required_without_all with empty string and fields with some truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_without_all with empty string and fields with falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(false)
    })

    it('required_without_all with valid value and fields with all truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], msgObj)).toBe(true)
    })

    it('required_without_all with valid value and fields with some truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_without_all with valid value and fields with falsy values should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', [], msgObj)).toBe(true)
    })

    it('required_without_all with empty string and fields with falsy values and sub-args array of fields with truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', [], msgObj, ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(false)
    })

    it('required_without_all with empty string and fields with truthy values and sub-args array of fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propValidEmail,propNumberRandom,propStringRandom', [], msgObj, ['propUndefined', 'propStringEmpty', 'propNull'])).toBe(true)
    })

    it('required_without_all with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without_all', '', [], msgObj)).toThrow(Error)
    })

    it('required_without_all with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without_all', 'propNumberRandom,,propStringEmpty', [], msgObj)).toThrow(Error)
    })

    it('required_without_all failing validation with custom message should result in error messages list containing the message with all tokens replaced with valid values', () => {
      msgObj.property = definedMessages.general.required_without_all
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property
        .replace(':field', 'propStringEmpty')
        .replace(':another', 'propNull,propUndefined,propStringEmpty')
      )
    })
  })
})
