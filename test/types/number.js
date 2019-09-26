const validator = require('../../lib/types/number')
const obj = require('../object')

describe('number', function () {
  it('number_test should throw an error since it is not a valid validation rule of number', () => {
    expect(() => validator('propNumberRandom', obj, 'number_test', '', [], '')).toThrow(Error)
  })

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

    it('between with more than two arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '275,320,500', [], '')).toThrow(Error)
    })

    it('between with no arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '', [], '')).toThrow(Error)
    })

    it('between with non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', 'yes,false', [], '')).toThrow(Error)
    })

    it('between with first non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', 'five,20', [], '')).toThrow(Error)
    })

    it('between with second non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '5,six', [], '')).toThrow(Error)
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
    it('gt with number value greater than the argument field value should return true', () => {
      expect(validator('propNumberRandom', obj, 'gt', 'propNumberRandomOther', [], '')).toBe(true)
    })

    it('gt with number value less than the argument field value should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'gt', 'propNumberRandom', [], '')).toBe(false)
    })

    it('gt with number value equal to the argument should return false', () => {
      expect(validator('propNumberRandomClone', obj, 'gt', 'propNumberRandom', [], '')).toBe(false)
    })

    it('gt with valid number value greater than zero but with argument of field which is null should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'gt', 'propNull', [], '')).toBe(true)
    })

    it('gt with valid number value less than one but with argument of field which is boolean true should return false', () => {
      expect(validator('propNumberZero', obj, 'gt', 'propBooleanTrue', [], '')).toBe(false)
    })

    it('gt with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gt', '', [], '')).toThrow(Error)
    })

    it('gt with valid number value but with multiple number arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gt', 'propNumberZero,propNumberRandom', [], '')).toThrow(Error)
    })

    it('gt with valid number value but with argument of field which does not exists should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gt', 'propNotExists', [], '')).toThrow(Error)
    })

    it('gt with valid number value but with argument of field which is undefined should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gt', 'propUndefined', [], '')).toThrow(Error)
    })
  })

  describe('gte', () => {
    it('gte with number value greater than the argument field value should return true', () => {
      expect(validator('propNumberRandom', obj, 'gte', 'propNumberRandomOther', [], '')).toBe(true)
    })

    it('gte with number value less than the argument field value should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'gte', 'propNumberRandom', [], '')).toBe(false)
    })

    it('gte with number value equal to the argument should return true', () => {
      expect(validator('propNumberRandomClone', obj, 'gte', 'propNumberRandom', [], '')).toBe(true)
    })

    it('gte with valid number value greater than zero but with argument of field which is null should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'gte', 'propNull', [], '')).toBe(true)
    })

    it('gte with valid number value of zero but with argument of field which is boolean false should return true', () => {
      expect(validator('propNumberZero', obj, 'gte', 'propBooleanFalse', [], '')).toBe(true)
    })

    it('gte with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gte', '', [], '')).toThrow(Error)
    })

    it('gte with valid number value but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gte', 'propNumberZero,propNumberRandom', [], '')).toThrow(Error)
    })

    it('gte with valid number value but with argument of field which does not exists should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gte', 'propNotExists', [], '')).toThrow(Error)
    })

    it('gte with valid number value but with argument of field which is undefined should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gte', 'propUndefined', [], '')).toThrow(Error)
    })
  })

  describe('in', () => {
    it('in with number value that exists in the list provided as arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNumberFilled.join(','), [], '')).toBe(true)
    })

    it('in with number value that exists in the list provided as sub-args without arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'in', '', [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('in with number value that exists in the list provided as sub-args but not in the list provided as arguments with both provided without arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNotDistinct.join(','), [], '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('in with number value that does not exists in the list provided as sub-args but exists in the list provided as arguments with both provided without arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNumberFilled.join(','), [], '', obj.propArrayNotDistinct)).toBe(true)
    })

    it('in with number value that does not exists in the list provided as sub-args with arguments not provided should return false', () => {
      expect(validator('propNumberRandom', obj, 'in', '', [], '', obj.propArrayNotDistinct)).toBe(false)
    })

    it('in with number value that does not exists in the list provided as arguments with sub-args not provided should return false', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNotDistinct.join(','), [], '')).toBe(false)
    })

    it('in with valid number value but without any arguments or sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in', '', [], '')).toThrow(Error)
    })

    it('in with valid number value but without any arguments and a non-number sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in', '', [], '', obj.futureDate)).toThrow(Error)
    })
  })

  describe('in_array', () => {
    it('in_array with number value that exists in the flat number array field provided in argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propArrayNumberFilled.*', [], '')).toBe(true)
    })

    it('in_array with number value that exists in the flat number string array field provided in argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringNumberArray.*', [], '')).toBe(true)
    })

    it('in_array with number value that does not exists in the flat number array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propArrayNotDistinct.*', [], '')).toBe(false)
    })

    it('in_array with number value that does not exists in the flat number string array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringArrayNotDistinct.*', [], '')).toBe(false)
    })

    it('in_array with number value that exists in the object array field provided in argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'in_array', 'propObjectArray.*.age', [], '')).toBe(true)
    })

    it('in_array with number value that exists in the string object array field provided in argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'in_array', 'propObjectArray.*.age', [], '')).toBe(true)
    })

    it('in_array with number value that does not exists in the object array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringObjectArray.*.age', [], '')).toBe(false)
    })

    it('in_array with number value that does not exists in the string object array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringObjectArray.*.age', [], '')).toBe(false)
    })

    it('in_array with valid number value but with argument first part not of type array should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'currentMoment.*', [], '')).toThrow(Error)
    })

    it('in_array with valid number value but with argument first part not of type array but of type string should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propValidEmail.*', [], '')).toThrow(Error)
    })

    it('in_array with valid number value with valid array argument field but only one part of the arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propStringObjectArray', [], '')).toThrow(Error)
    })

    it('in_array with valid number value but with no arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', '', [], '')).toThrow(Error)
    })

    it('in_array with valid number value but with multiple arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propObjectArray.*.age,propStringNumberArray.*', [], '')).toThrow(Error)
    })

    it('in_array with valid number value but with valid flat string number array but with three parts of arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propStringNumberArray.*.age', [], '')).toThrow(Error)
    })

    it('in_array with valid number value but with valid object string number array but with two parts of arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propObjectArray.*', [], '')).toThrow(Error)
    })
  })

  describe('integer', () => {
    it('integer with number value of valid integer value should return true', () => {
      expect(validator('propNumberRandom', obj, 'integer', '', [], '')).toBe(true)
    })

    it('integer with number value of invalid integer value should return false', () => {
      expect(validator('propNumberFloat', obj, 'integer', '', [], '')).toBe(false)
    })

    it('integer with number value of valid integer value but with arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'integer', 'propNumberFloat', [], '')).toThrow(Error)
    })
  })

  describe('lt', () => {
    it('lt with number value greater than the argument field value should return false', () => {
      expect(validator('propNumberRandom', obj, 'lt', 'propNumberRandomOther', [], '')).toBe(false)
    })

    it('lt with number value less than the argument field value should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'lt', 'propNumberRandom', [], '')).toBe(true)
    })

    it('lt with number value equal to the argument should return false', () => {
      expect(validator('propNumberRandomClone', obj, 'lt', 'propNumberRandom', [], '')).toBe(false)
    })

    it('lt with valid number value greater than zero but with argument of field which is null should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'lt', 'propNull', [], '')).toBe(false)
    })

    it('lt with valid number value less than one but with argument of field which is boolean true should return false', () => {
      expect(validator('propNumberZero', obj, 'lt', 'propBooleanTrue', [], '')).toBe(true)
    })

    it('lt with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lt', '', [], '')).toThrow(Error)
    })

    it('lt with valid number value but with multiple number arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lt', 'propNumberZero,propNumberRandom', [], '')).toThrow(Error)
    })

    it('lt with valid number value but with argument of field which does not exists should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lt', 'propNotExists', [], '')).toThrow(Error)
    })

    it('lt with valid number value but with argument of field which is undefined should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lt', 'propUndefined', [], '')).toThrow(Error)
    })
  })

  describe('lte', () => {
    it('lte with number value greater than the argument field value should return false', () => {
      expect(validator('propNumberRandom', obj, 'lte', 'propNumberRandomOther', [], '')).toBe(false)
    })

    it('lte with number value less than the argument field value should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'lte', 'propNumberRandom', [], '')).toBe(true)
    })

    it('lte with number value equal to the argument should return true', () => {
      expect(validator('propNumberRandomClone', obj, 'lte', 'propNumberRandom', [], '')).toBe(true)
    })

    it('lte with valid number value greater than zero but with argument of field which is null should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'lte', 'propNull', [], '')).toBe(false)
    })

    it('lte with valid number value of zero but with argument of field which is boolean false should return true', () => {
      expect(validator('propNumberZero', obj, 'lte', 'propBooleanFalse', [], '')).toBe(true)
    })

    it('lte with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lte', '', [], '')).toThrow(Error)
    })

    it('lte with valid number value but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lte', 'propNumberZero,propNumberRandom', [], '')).toThrow(Error)
    })

    it('lte with valid number value but with argument of field which does not exists should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lte', 'propNotExists', [], '')).toThrow(Error)
    })

    it('lte with valid number value but with argument of field which is undefined should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lte', 'propUndefined', [], '')).toThrow(Error)
    })
  })

  describe('max', () => {
    it('max with number value less than the number provided in the argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'max', '1256', [], '')).toBe(true)
    })

    it('max with number value greater than the number provided in the argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'max', '100', [], '')).toBe(false)
    })

    it('max with number value equal to the number provided in the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'max', String(obj.propNumberRandom), [], '')).toBe(true)
    })

    it('max with valid number value and non-number arguments should throw an error', () => {
      expect(() => validator('propNumberRandomOther', obj, 'max', obj.propValidEmail, [], '')).toThrow(Error)
    })

    it('max with valid number value and no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'max', '', [], '')).toThrow(Error)
    })

    it('max with valid number value and multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'max', '25,48', [], '')).toThrow(Error)
    })
  })

  describe('min', () => {
    it('min with number value less than the number provided in the argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'min', '1256', [], '')).toBe(false)
    })

    it('min with number value greater than the number provided in the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'min', '100', [], '')).toBe(true)
    })

    it('min with number value equal to the number provided in the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'min', String(obj.propNumberRandom), [], '')).toBe(true)
    })

    it('min with valid number value and non-number arguments should throw an error', () => {
      expect(() => validator('propNumberRandomOther', obj, 'min', obj.propValidEmail, [], '')).toThrow(Error)
    })

    it('min with valid number value and no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'min', '', [], '')).toThrow(Error)
    })

    it('min with valid number value and multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'min', '25,48', [], '')).toThrow(Error)
    })
  })

  describe('not_in', () => {
    it('not_in with number value that exists in the list provided as arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNumberFilled.join(','), [], '')).toBe(false)
    })

    it('not_in with number value that exists in the list provided as sub-args without arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'not_in', '', [], '', obj.propArrayNumberFilled)).toBe(false)
    })

    it('not_in with number value that exists in the list provided as sub-args but not in the list provided as arguments with both provided without arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNotDistinct.join(','), [], '', obj.propArrayNumberFilled)).toBe(true)
    })

    it('not_in with number value that does not exists in the list provided as sub-args but exists in the list provided as arguments with both provided without arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNumberFilled.join(','), [], '', obj.propArrayNotDistinct)).toBe(false)
    })

    it('not_in with number value that does not exists in the list provided as sub-args with arguments not provided should return true', () => {
      expect(validator('propNumberRandom', obj, 'not_in', '', [], '', obj.propArrayNotDistinct)).toBe(true)
    })

    it('not_in with number value that does not exists in the list provided as arguments with sub-args not provided should return true', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNotDistinct.join(','), [], '')).toBe(true)
    })

    it('not_in with valid number value but without any arguments or sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'not_in', '', [], '')).toThrow(Error)
    })

    it('not_in with valid number value but without any arguments and a non-number sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'not_in', '', [], '', obj.futureDate)).toThrow(Error)
    })
  })

  describe('same', () => {
    it('same with number value that is equal to the number value of the argument field should return true', () => {
      expect(validator('propNumberRandom', obj, 'same', 'propNumberRandomClone', [], '')).toBe(true)
    })

    it('same with number value that is not equal to the number value of the argument field should return false', () => {
      expect(validator('propNumberRandom', obj, 'same', 'propNumberZero', [], '')).toBe(false)
    })

    it('same with number value and with null argument field value should return false', () => {
      expect(validator('propNumberRandom', obj, 'same', 'propNull', [], '')).toBe(false)
    })

    it('same with valid number value but with field argument that does not exist should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'same', 'propNotExists', [], '')).toThrow(Error)
    })

    it('same with valid number value but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'same', 'propNumberZero,propNumberRandomClone', [], '')).toThrow(Error)
    })

    it('same with valid number value but with no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'same', '', [], '')).toThrow(Error)
    })
  })

  describe('size', () => {
    it('size with number value that is equal to the number value of the argument should return true', () => {
      expect(validator('propNumberZero', obj, 'size', '0', [], '')).toBe(true)
    })

    it('size with number value that is not equal to the number value of the argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'size', '0', [], '')).toBe(false)
    })

    it('size with valid number but with non-number argument value should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'size', 'true', [], '')).toThrow(Error)
    })

    it('size with valid number but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'size', '8,6', [], '')).toThrow(Error)
    })

    it('size with valid number but with no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'size', '', [], '')).toThrow(Error)
    })
  })
})
