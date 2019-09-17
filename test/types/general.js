const validator = require('../../lib/types/general')
const obj = require('../object')

describe('general', () => {
  it('general_test should throw an error because its not a valid rule of general', () => {
    expect(() => validator('propBooleanFalse', obj, 'general_test', '', [], '')).toThrow(Error)
  })

  describe('required', () => {
    const requiredErrorMessages = []

    it('required with zero(0) value should return true', () => {
      expect(validator('propNumberZero', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with any number should return true', () => {
      expect(validator('propNumberRandom', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with a string with content should return true', () => {
      expect(validator('propStringRandom', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with empty string should return false', () => {
      expect(validator('propStringEmpty', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    it('required with empty array should return false', () => {
      expect(validator('propArrayEmpty', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    it('required with string array should return true', () => {
      expect(validator('propArrayStringFilled', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with undefined should return false', () => {
      expect(validator('propUndefined', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    it('required with number array should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with array with mixed value types should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with null value should return false', () => {
      expect(validator('propNull', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    it('required with property not defined should return false', () => {
      expect(validator('notDefined', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    it('required with false boolean value should return true', () => {
      expect(validator('propBooleanFalse', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required with true boolean value should return true', () => {
      expect(validator('propBooleanTrue', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    it('required should throw an error if argument supplied', () => {
      expect(() => validator('notDefined', obj, 'required', 'test', requiredErrorMessages, '')).toThrow(Error)
    })
  })

  describe('required_if', () => {
    const requiredIfErrorMessages = []

    it('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_if with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(true)
    })

    it('required_if with empty string value and a field whose value is present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(false)
    })

    it('required_if with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(true)
    })

    it('required_if with empty string value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '', obj.propArrayStringFilled)).toBe(false)
    })

    it('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propBooleanTrue', requiredIfErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propBooleanTrue', requiredIfErrorMessages, '', obj.propArrayStringFilled)).toBe(false)
    })

    it('required_if with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', '', requiredIfErrorMessages, '')).toThrow(Error)
    })

    it('required_if with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', requiredIfErrorMessages, '')).toThrow(Error)
    })

    it('required_if with a field in arguments and empty array in sub-args should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', requiredIfErrorMessages, '', [])).toThrow(Error)
    })
  })

  describe('required_unless', () => {
    const requiredUnlessErrorMessages = []

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(true)
    })

    it('required_unless with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is not present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(false)
    })

    it('required_unless with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_unless with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propBooleanTrue', requiredUnlessErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propBooleanTrue', requiredUnlessErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', '', requiredUnlessErrorMessages, '')).toThrow(Error)
    })

    it('required_unless with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', requiredUnlessErrorMessages, '')).toThrow(Error)
    })

    it('required_unless with a field in arguments and empty array in sub-args should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', requiredUnlessErrorMessages, '', [])).toThrow(Error)
    })
  })

  describe('required_with', () => {
    const requiredWithErrorMessages = []

    it('required_with with empty string and fields with partial truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithErrorMessages, '')).toBe(false)
    })

    it('required_with with empty string and fields with all truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', requiredWithErrorMessages, '')).toBe(false)
    })

    it('required_with with empty string and fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', requiredWithErrorMessages, '')).toBe(true)
    })

    it('required_with with valid value and fields with partial truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithErrorMessages, '')).toBe(true)
    })

    it('required_with with valid value and fields with all truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', requiredWithErrorMessages, '')).toBe(true)
    })

    it('required_with with valid value and fields with falsy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', requiredWithErrorMessages, '')).toBe(true)
    })

    it('required_with with empty string and fields with falsy values and sub-args array of fields with truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', requiredWithErrorMessages, '', ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(true)
    })

    it('required_with with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with', '', requiredWithErrorMessages, '')).toThrow(Error)
    })

    it('required_with with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with', 'propNumberRandom,,propStringEmpty', requiredWithErrorMessages, '')).toThrow(Error)
    })
  })

  describe('required_with_all', () => {
    const requiredWithAllErrorMessages = []

    it('required_with_all with empty string and fields with all truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', requiredWithAllErrorMessages, '')).toBe(false)
    })

    it('required_with_all with empty string and fields with some truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithAllErrorMessages, '')).toBe(true)
    })

    it('required_with_all with empty string and fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', requiredWithAllErrorMessages, '')).toBe(true)
    })

    it('required_with_all with valid value and fields with all truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', requiredWithAllErrorMessages, '')).toBe(true)
    })

    it('required_with_all with valid value and fields with some truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithAllErrorMessages, '')).toBe(true)
    })

    it('required_with_all with valid value and fields with falsy values should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', requiredWithAllErrorMessages, '')).toBe(true)
    })

    it('required_with_all with empty string and fields with falsy values and sub-args array of fields with truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', requiredWithAllErrorMessages, '', ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(true)
    })

    it('required_with_all with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with_all', '', requiredWithAllErrorMessages, '')).toThrow(Error)
    })

    it('required_with_all with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with_all', 'propNumberRandom,,propStringEmpty', requiredWithAllErrorMessages, '')).toThrow(Error)
    })
  })

  describe('required_without', () => {
    const requiredWithoutErrorMessages = []

    it('required_without with empty string and fields with partial truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithoutErrorMessages, '')).toBe(false)
    })

    it('required_without with empty string and fields with all truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', requiredWithoutErrorMessages, '')).toBe(true)
    })

    it('required_without with empty string and fields with all falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', requiredWithoutErrorMessages, '')).toBe(false)
    })

    it('required_without with valid value and fields with partial truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithoutErrorMessages, '')).toBe(true)
    })

    it('required_without with valid value and fields with all truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringRandom', requiredWithoutErrorMessages, '')).toBe(true)
    })

    it('required_without with valid value and all fields with falsy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', requiredWithoutErrorMessages, '')).toBe(true)
    })

    it('required_without with empty string and fields with truthy values and sub-args array of fields with falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberZero,propStringRandom,propValidEmail', requiredWithoutErrorMessages, '', ['propNull', 'propUndefined', 'propStringEmpty'])).toBe(false)
    })

    it('required_without with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without', '', requiredWithoutErrorMessages, '')).toThrow(Error)
    })

    it('required_without with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without', 'propNumberRandom,,propStringEmpty', requiredWithoutErrorMessages, '')).toThrow(Error)
    })
  })

  describe('required_without_all', () => {
    const requiredWithoutAllErrorMessages = []

    it('required_without_all with empty string and fields with all truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringFalse', requiredWithoutAllErrorMessages, '')).toBe(true)
    })

    it('required_without_all with empty string and fields with some truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithoutAllErrorMessages, '')).toBe(true)
    })

    it('required_without_all with empty string and fields with falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', requiredWithoutAllErrorMessages, '')).toBe(false)
    })

    it('required_without_all with valid value and fields with all truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringFalse', requiredWithoutAllErrorMessages, '')).toBe(true)
    })

    it('required_without_all with valid value and fields with some truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', requiredWithoutAllErrorMessages, '')).toBe(true)
    })

    it('required_without_all with valid value and fields with falsy values should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', requiredWithoutAllErrorMessages, '')).toBe(true)
    })

    it('required_without_all with empty string and fields with falsy values and sub-args array of fields with truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', requiredWithoutAllErrorMessages, '', ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(false)
    })

    it('required_without_all with empty string and fields with truthy values and sub-args array of fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propValidEmail,propNumberRandom,propStringRandom', requiredWithoutAllErrorMessages, '', ['propUndefined', 'propStringEmpty', 'propNull'])).toBe(true)
    })

    it('required_without_all with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without_all', '', requiredWithoutAllErrorMessages, '')).toThrow(Error)
    })

    it('required_without_all with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without_all', 'propNumberRandom,,propStringEmpty', requiredWithoutAllErrorMessages, '')).toThrow(Error)
    })
  })
})

// TODO: finish test for general.js
