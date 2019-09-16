const validator = require('../../lib/types/general')
const obj = require('../object')

describe('general', () => {
  describe('required', () => {
    const requiredErrorMessages = []

    test('required with zero(0) value should return true', () => {
      expect(validator('propNumberZero', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    test('required with any number should return true', () => {
      expect(validator('propNumberRandom', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    test('required with a string with content should return true', () => {
      expect(validator('propStringRandom', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    test('required with empty string should return false', () => {
      expect(validator('propStringEmpty', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    test('required with empty array should return false', () => {
      expect(validator('propArrayEmpty', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    test('required with string array should return true', () => {
      expect(validator('propArrayStringFilled', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    test('required with undefined should return false', () => {
      expect(validator('propUndefined', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    test('required with number array should return true', () => {
      expect(validator('propArrayNumberFilled', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    test('required with array with mixed value types should return true', () => {
      expect(validator('propArrayMixFilled', obj, 'required', '', requiredErrorMessages, '')).toBe(true)
    })

    test('required with null value should return false', () => {
      expect(validator('propNull', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    test('required with property not defined should return false', () => {
      expect(validator('notDefined', obj, 'required', '', requiredErrorMessages, '')).toBe(false)
    })

    test('required should throw an error if argument supplied', () => {
      expect(() => validator('notDefined', obj, 'required', 'test', requiredErrorMessages, '')).toThrow(Error)
    })
  })

  describe('required_if', () => {
    const requiredIfErrorMessages = []

    test('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_if with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_if with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(false)
    })

    test('required_if with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero', requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_if with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(true)
    })

    test('required_if with empty string value and a field whose value is present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(false)
    })

    test('required_if with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(true)
    })

    test('required_if with empty string value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '')).toBe(true)
    })

    test('required_if with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), requiredIfErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_if with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredIfErrorMessages, '', obj.propArrayStringFilled)).toBe(false)
    })

    test('required_if with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_if', 'propBooleanTrue', requiredIfErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    test('required_if with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_if', 'propBooleanTrue', requiredIfErrorMessages, '', obj.propArrayStringFilled)).toBe(false)
    })

    test('required_if with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', '', requiredIfErrorMessages, '')).toThrow(Error)
    })

    test('required_if with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_if', 'propArrayEmpty', requiredIfErrorMessages, '')).toThrow(Error)
    })
  })

  describe('required_unless', () => {
    const requiredUnlessErrorMessages = []

    test('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_unless with valid value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_unless with empty string value and a field whose value is present in the values field, values supplied as sub-args array with the same type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(true)
    })

    test('required_unless with empty string value and a field whose value is not present in the values field, values supplied as sub-args array with the same type as field value should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero', requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(false)
    })

    test('required_unless with valid value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(true)
    })

    test('required_unless with empty string value and a field whose value is present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(true)
    })

    test('required_unless with valid value and a field whose value is not present in the values field, values supplied as arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(true)
    })

    test('required_unless with empty string value and a field whose value is not present in the values field, values supplied as arguments should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberZero,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '')).toBe(false)
    })

    test('required_unless with empty string and a field whose value is present in the values field supplied as sub-args but not in the values field supplied as argument should return false', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayStringFilled.join(','), requiredUnlessErrorMessages, '', obj.propArrayNumberFilled)).toBe(false)
    })

    test('required_unless with empty string and a field whose value is present in the values field supplied as arguments but not in the values field supplied as sub-args should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propNumberRandom,' + obj.propArrayNumberFilled.join(','), requiredUnlessErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    test('required_unless with valid value and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringRandom', obj, 'required_unless', 'propBooleanTrue', requiredUnlessErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    test('required_unless with empty string and a field whose value is present in the values field, values supplied as sub-args array with the different type as field value should return true', () => {
      expect(validator('propStringEmpty', obj, 'required_unless', 'propBooleanTrue', requiredUnlessErrorMessages, '', obj.propArrayStringFilled)).toBe(true)
    })

    test('required_unless with no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', '', requiredUnlessErrorMessages, '')).toThrow(Error)
    })

    test('required_unless with field but no arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'required_unless', 'propArrayEmpty', requiredUnlessErrorMessages, '')).toThrow(Error)
    })
  })
})

// TODO: finish test for general.js

// describe('general', function () {
//
//
//     describe('required_unless', function () {
//         errorMessages = [];
//
//         const tempValue = 846;
//
//         it('Should return true when required_unless_field is ' + tempValue + ' and args field in stringified form of ' + values.join(), function () {
//             assert.strictEqual(validator('required_unless_key', { required_unless_key: values[1], required_unless_field: tempValue }, 'required_unless', 'required_unless_field,' + values.join(), errorMessages, ''), true);
//         });
//
//         it('Should return true when required_unless_field is ' + tempValue + ' and args field in array form of ' + values.join(), function () {
//             assert.strictEqual(validator('required_unless_key', { required_unless_key: values[1], required_unless_field: tempValue }, 'required_unless', 'required_unless_field', errorMessages, '', values), true);
//         });
//
//         it('Should return true when required_unless_field is ' + values[2] + ' and args field in array form of ' + values.join() + ' and required_unless_key not provided', function () {
//             assert.strictEqual(validator('required_unless_key', { required_unless_field: values[2] }, 'required_unless', 'required_unless_field', errorMessages, '', values), true);
//         });
//
//         it('Should return false when required_unless_field is ' + tempValue + ' and args field in array form of ' + values.join() + ' and required_unless_key not provided', function () {
//             assert.strictEqual(validator('required_unless_key', { required_unless_field: tempValue }, 'required_unless', 'required_unless_field', errorMessages, '', values), false);
//         });
//     });
//
//     describe('required_with', function () {
//         errorMessages = [];
//
//         it('Should return true when required_with_field_1, required_with_field_2 are provided as values and args and required_with_key provided', function () {
//             assert.strictEqual(validator('required_with_key', { required_with_key: values[1], required_with_field_1: values[2], required_with_field_2: values[0] }, 'required_with', 'required_with_field_1,required_with_field_2', errorMessages, ''), true);
//         });
//
//         it('Should return false when required_with_field_1, required_with_field_2 are provided as values and args and required_with_key not provided', function () {
//             assert.strictEqual(validator('required_with_key', { required_with_field_1: values[3], required_with_field_2: values[1] }, 'required_with', 'required_with_field_1,required_with_field_2', errorMessages, ''), false);
//         });
//     });
//
//     describe('required_with_all', function () {
//         errorMessages = [];
//
//         it('Should return true when required_with_all_field_1, required_with_all_field_2 are provided as values and args and required_with_all_key provided', function () {
//             assert.strictEqual(validator('required_with_all_key', { required_with_all_key: values[1], required_with_all_field_1: values[0], required_with_all_field_2: values[2] }, 'required_with_all', 'required_with_all_field_1,required_with_all_field_2', errorMessages, ''), true);
//         });
//
//         it('Should return true when required_with_field_1, required_with_field_2 are provided as args but one of them provided with value and required_with_all_key not provided', function () {
//             assert.strictEqual(validator('required_with_all_key', { required_with_all_field_2: values[3] }, 'required_with_all', 'required_with_all_field_1,required_with_all_field_2', errorMessages, ''), true);
//         });
//
//         it('Should return false when required_with_field_1, required_with_field_2 are provided as args and with values and required_with_all_key not provided', function () {
//             assert.strictEqual(validator('required_with_all_key', { required_with_all_field_1: values[1], required_with_all_field_2: values[3] }, 'required_with_all', 'required_with_all_field_1,required_with_all_field_2', errorMessages, ''), false);
//         });
//     });
//
//     describe('required_without', function () {
//         errorMessages = [];
//
//         it('Should return true when required_without_field_1, required_without_field_2 are provided as args only and required_without_key provided', function () {
//             assert.strictEqual(validator('required_without_key', { required_without_key: values[1] }, 'required_without', 'required_without_field_1,required_without_field_2', errorMessages, ''), true);
//         });
//
//         it('Should return false when required_without_field_1, required_without_field_2 are provided as args but only one provided with value and required_without_key not provided', function () {
//             assert.strictEqual(validator('required_without_key', { required_without_field_1: values[3] }, 'required_without', 'required_without_field_1,required_without_field_2', errorMessages, ''), false);
//         });
//     });
//
//     describe('required_without_all', function () {
//         errorMessages = [];
//
//         it('Should return true when required_without_all_field_1, required_without_all_field_2 are provided as args but not values and required_without_all_key provided', function () {
//             assert.strictEqual(validator('required_without_all_key', { required_without_all_key: values[1] }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), true);
//         });
//
//         it('Should return false when required_without_field_1, required_without_field_2 are provided as args and not with values and required_without_all_key not provided', function () {
//             assert.strictEqual(validator('required_without_all_key', { }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), false);
//         });
//
//         it('Should return true when required_without_field_1, required_without_field_2 are provided as args and with values and required_without_all_key not provided', function () {
//             assert.strictEqual(validator('required_without_all_key', { required_without_all_field_1: values[1], required_without_all_field_2: values[3] }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), true);
//         });
//
//         it('Should return true when required_without_field_1, required_without_field_2 are provided as args and with values and required_without_all_key provided', function () {
//             assert.strictEqual(validator('required_without_all_key', { required_without_all_key: values[1], required_without_all_field_1: values[2], required_without_all_field_2: values[3] }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), true);
//         });
//     });
// });
