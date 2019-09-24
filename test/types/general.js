const validator = require('../../lib/types/general')
const obj = require('../object')

describe('general', () => {
  it('general_test should throw an error because its not a valid rule of general', () => {
    expect(() => validator('propBooleanFalse', obj, 'general_test', '', [], '')).toThrow(Error)
  })

  describe('required', () => {
    it('required with zero(0) value should return true', () => {
      expect(validator('propNumberZero', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with any number should return true', () => {
      expect(validator('propNumberRandom', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with a string with content should return true', () => {
      expect(validator('propStringRandom', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with empty string should return false', () => {
      expect(validator('propStringEmpty', obj, 'required', '', [], '')).toBe(false)
    })

    it('required with empty array should return false', () => {
      expect(validator('propArrayEmpty', obj, 'required', '', [], '')).toBe(false)
    })

    it('required with string array should return true', () => {
      expect(validator('propArrayStringFilled', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with undefined should return false', () => {
      expect(validator('propUndefined', obj, 'required', '', [], '')).toBe(false)
    })

    it('required with number array should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with array with mixed value types should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with null value should return false', () => {
      expect(validator('propNull', obj, 'required', '', [], '')).toBe(false)
    })

    it('required with property not defined should return false', () => {
      expect(validator('notDefined', obj, 'required', '', [], '')).toBe(false)
    })

    it('required with false boolean value should return true', () => {
      expect(validator('propBooleanFalse', obj, 'required', '', [], '')).toBe(true)
    })

    it('required with true boolean value should return true', () => {
      expect(validator('propBooleanTrue', obj, 'required', '', [], '')).toBe(true)
    })

    it('required should throw an error if argument supplied', () => {
      expect(() => validator('notDefined', obj, 'required', 'test', [], '')).toThrow(Error)
    })
  })

  describe('required_if', () => {
    it('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom', [], '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_if with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('required_if with empty string value and a field whose value is present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(false)
    })

    it('required_if with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('required_if with empty string value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], '', obj.propArrayStringFilled)).toBe(false)
    })

    it('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propBooleanTrue', [], '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_if with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propBooleanTrue', [], '', obj.propArrayStringFilled)).toBe(false)
    })

    it('required_if with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', '', [], '')).toThrow(Error)
    })

    it('required_if with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', [], '')).toThrow(Error)
    })

    it('required_if with a field in arguments and empty array in sub-args should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', [], '', [])).toThrow(Error)
    })
  })

  describe('required_unless', () => {
    it('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero', [], '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('required_unless with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('required_unless with empty string value and a field whose value is not present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), [], '')).toBe(false)
    })

    it('required_unless with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), [], '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('required_unless with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), [], '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propBooleanTrue', [], '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propBooleanTrue', [], '', obj.propArrayStringFilled)).toBe(true)
    })

    it('required_unless with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', '', [], '')).toThrow(Error)
    })

    it('required_unless with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', [], '')).toThrow(Error)
    })

    it('required_unless with a field in arguments and empty array in sub-args should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', [], '', [])).toThrow(Error)
    })
  })

  describe('required_with', () => {
    it('required_with with empty string and fields with partial truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(false)
    })

    it('required_with with empty string and fields with all truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', [], '')).toBe(false)
    })

    it('required_with with empty string and fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with with valid value and fields with partial truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with with valid value and fields with all truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', [], '')).toBe(true)
    })

    it('required_with with valid value and fields with falsy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with with empty string and fields with falsy values and sub-args array of fields with truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with', 'propNull,propUndefined,propStringEmpty', [], '', ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(true)
    })

    it('required_with with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with', '', [], '')).toThrow(Error)
    })

    it('required_with with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with', 'propNumberRandom,,propStringEmpty', [], '')).toThrow(Error)
    })
  })

  describe('required_with_all', () => {
    it('required_with_all with empty string and fields with all truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], '')).toBe(false)
    })

    it('required_with_all with empty string and fields with some truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with_all with empty string and fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with_all with valid value and fields with all truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], '')).toBe(true)
    })

    it('required_with_all with valid value and fields with some truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_with_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with_all with valid value and fields with falsy values should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(true)
    })

    it('required_with_all with empty string and fields with falsy values and sub-args array of fields with truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_with_all', 'propNull,propUndefined,propStringEmpty', [], '', ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(true)
    })

    it('required_with_all with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with_all', '', [], '')).toThrow(Error)
    })

    it('required_with_all with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_with_all', 'propNumberRandom,,propStringEmpty', [], '')).toThrow(Error)
    })
  })

  describe('required_without', () => {
    it('required_without with empty string and fields with partial truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(false)
    })

    it('required_without with empty string and fields with all truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propArrayStringFilled', [], '')).toBe(true)
    })

    it('required_without with empty string and fields with all falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(false)
    })

    it('required_without with valid value and fields with partial truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(true)
    })

    it('required_without with valid value and fields with all truthy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNumberRandom,propBooleanTrue,propStringRandom', [], '')).toBe(true)
    })

    it('required_without with valid value and all fields with falsy values should return true', () => {
      expect(validator('propStringRandom', obj, 'required_without', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(true)
    })

    it('required_without with empty string and fields with truthy values and sub-args array of fields with falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without', 'propNumberZero,propStringRandom,propValidEmail', [], '', ['propNull', 'propUndefined', 'propStringEmpty'])).toBe(false)
    })

    it('required_without with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without', '', [], '')).toThrow(Error)
    })

    it('required_without with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without', 'propNumberRandom,,propStringEmpty', [], '')).toThrow(Error)
    })
  })

  describe('required_without_all', () => {
    it('required_without_all with empty string and fields with all truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], '')).toBe(true)
    })

    it('required_without_all with empty string and fields with some truthy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(true)
    })

    it('required_without_all with empty string and fields with falsy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(false)
    })

    it('required_without_all with valid value and fields with all truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringFalse', [], '')).toBe(true)
    })

    it('required_without_all with valid value and fields with some truthy values should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required_without_all', 'propNumberRandom,propBooleanTrue,propStringEmpty', [], '')).toBe(true)
    })

    it('required_without_all with valid value and fields with falsy values should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', [], '')).toBe(true)
    })

    it('required_without_all with empty string and fields with falsy values and sub-args array of fields with truthy values should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propNull,propUndefined,propStringEmpty', [], '', ['propStringRandom', 'propNumberRandom', 'propValidEmail'])).toBe(false)
    })

    it('required_without_all with empty string and fields with truthy values and sub-args array of fields with falsy values should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_without_all', 'propValidEmail,propNumberRandom,propStringRandom', [], '', ['propUndefined', 'propStringEmpty', 'propNull'])).toBe(true)
    })

    it('required_without_all with no arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without_all', '', [], '')).toThrow(Error)
    })

    it('required_without_all with one empty argument should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'required_without_all', 'propNumberRandom,,propStringEmpty', [], '')).toThrow(Error)
    })
  })
})
