const validator = require('../../lib/types/number')
const obj = require('../object')
const definedMessages = require('../../lib/messages')

describe('number', function () {
  const msgObj = {
    property: '',
    arg: ''
  }

  const errorMessages = []

  it('number_test should throw an error since it is not a valid validation rule of number', () => {
    expect(() => validator('propNumberRandom', obj, 'number_test', '', [], msgObj)).toThrow(Error)
  })

  describe('between', () => {
    it('between with number value between the number values in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'between', '240,310', [], msgObj)).toBe(true)
    })

    it('between with number value equal to the min number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'between', '275,310', [], msgObj)).toBe(true)
    })

    it('between with number value equal to the max number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'between', '120,275', [], msgObj)).toBe(true)
    })

    it('between with number value not between the number values in the arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'between', '120,250', [], msgObj)).toBe(false)
    })

    it('between with number value NaN and valid arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'between', '120,250', [], msgObj)).toBe(false)
    })

    it('between with number value between the number values in the arguments but with first one bigger than the second one should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '320,250', [], msgObj)).toThrow(Error)
    })

    it('between with one argument passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '275', [], msgObj)).toThrow(Error)
    })

    it('between with more than two arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '275,320,500', [], msgObj)).toThrow(Error)
    })

    it('between with no arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '', [], msgObj)).toThrow(Error)
    })

    it('between with non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', 'yes,false', [], msgObj)).toThrow(Error)
    })

    it('between with first non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', 'five,20', [], msgObj)).toThrow(Error)
    })

    it('between with second non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'between', '5,six', [], msgObj)).toThrow(Error)
    })
  })

  describe('different', () => {
    it('different with number value not equal to the  number value of the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNumberZero', [], msgObj)).toBe(true)
    })

    it('different with number value equal to the  number value of the argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNumberRandomClone', [], msgObj)).toBe(false)
    })

    it('different with number value but with argument of field that does not exists should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNotExist', [], msgObj)).toBe(true)
    })

    it('different with number value NaN and argument of field with valid number value should return true', () => {
      expect(validator('propNaN', obj, 'different', 'propNumberRandomClone', [], msgObj)).toBe(true)
    })

    it('different with valid number value and argument of field NaN number value should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNaN', [], msgObj)).toBe(true)
    })

    it('different with valid number value and argument of field null value should return true', () => {
      expect(validator('propNumberRandom', obj, 'different', 'propNull', [], msgObj)).toBe(true)
    })

    it('different with NaN number value and argument of field NaN number value should return false', () => {
      expect(validator('propNaN', obj, 'different', 'propNaN', [], msgObj)).toBe(false)
    })

    it('different with null value and argument of field with valid number value should return true', () => {
      expect(validator('propNull', obj, 'different', 'propNumberRandom', [], msgObj)).toBe(true)
    })

    it('different with number value but with more than argument should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'different', 'propNumberRandomClone,propNumberZero', [], msgObj)).toThrow(Error)
    })

    it('different with number value but with no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'different', '', [], msgObj)).toThrow(Error)
    })
  })

  describe('digits', () => {
    it('digits with number with digits specified by argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits', '3', [], msgObj)).toBe(true)
    })

    it('digits with number with digits greater than specified by argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits', '2', [], msgObj)).toBe(false)
    })

    it('digits with number with digits less than specified by argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits', '5', [], msgObj)).toBe(false)
    })

    it('digits with valid number and no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits', '', [], msgObj)).toThrow(Error)
    })

    it('digits with valid number and more than one arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits', '2,5,6', [], msgObj)).toThrow(Error)
    })

    it('digits with valid number and a non-number argument should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits', 'yes', [], msgObj)).toThrow(Error)
    })
  })

  describe('digits_between', () => {
    it('digits_between with number value between the number values in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '2,5', [], msgObj)).toBe(true)
    })

    it('digits_between with number value equal to the min number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '3,5', [], msgObj)).toBe(true)
    })

    it('digits_between with number value equal to the max number in the arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '1,3', [], msgObj)).toBe(true)
    })

    it('digits_between with number value not between the number values in the arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '10,25', [], msgObj)).toBe(false)
    })

    it('digits_between with number value NaN and valid arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'digits_between', '120,250', [], msgObj)).toBe(false)
    })

    it('digits_between with number value between the number values in the arguments but with first one bigger than the second one should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', '320,250', [], msgObj)).toThrow(Error)
    })

    it('digits_between with one argument passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', '275', [], msgObj)).toThrow(Error)
    })

    it('digits_between with no arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', '', [], msgObj)).toThrow(Error)
    })

    it('digits_between with non-number arguments passed should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'digits_between', 'yes,false', [], msgObj)).toThrow(Error)
    })
  })

  describe('gt', () => {
    it('gt with number value greater than the argument field value should return true', () => {
      expect(validator('propNumberRandom', obj, 'gt', 'propNumberRandomOther', [], msgObj)).toBe(true)
    })

    it('gt with number value less than the argument field value should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'gt', 'propNumberRandom', [], msgObj)).toBe(false)
    })

    it('gt with number value equal to the argument should return false', () => {
      expect(validator('propNumberRandomClone', obj, 'gt', 'propNumberRandom', [], msgObj)).toBe(false)
    })

    it('gt with valid number value greater than zero but with argument of field which is null should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'gt', 'propNull', [], msgObj)).toBe(false)
    })

    it('gt with valid number value less than one but with argument of field which is boolean true should return false', () => {
      expect(validator('propNumberZero', obj, 'gt', 'propBooleanTrue', [], msgObj)).toBe(false)
    })

    it('gt with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gt', '', [], msgObj)).toThrow(Error)
    })

    it('gt with valid number value but with multiple number arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gt', 'propNumberZero,propNumberRandom', [], msgObj)).toThrow(Error)
    })

    it('gt with valid number value but with argument of field which does not exists should return false', () => {
      expect(validator('propNumberZero', obj, 'gt', 'propNotExists', [], msgObj)).toBe(false)
    })

    it('gt with valid number value but with argument of field which is null should return false', () => {
      expect(validator('propNumberZero', obj, 'gt', 'propNull', [], msgObj)).toBe(false)
    })

    it('gt with valid number value but with argument of field which is undefined should return false', () => {
      expect(validator('propNumberZero', obj, 'gt', 'propUndefined', [], msgObj)).toBe(false)
    })
  })

  describe('gte', () => {
    it('gte with number value greater than the argument field value should return true', () => {
      expect(validator('propNumberRandom', obj, 'gte', 'propNumberRandomOther', [], msgObj)).toBe(true)
    })

    it('gte with number value less than the argument field value should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'gte', 'propNumberRandom', [], msgObj)).toBe(false)
    })

    it('gte with number value equal to the argument should return true', () => {
      expect(validator('propNumberRandomClone', obj, 'gte', 'propNumberRandom', [], msgObj)).toBe(true)
    })

    it('gte with valid number value greater than zero but with argument of field which is null should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'gte', 'propNull', [], msgObj)).toBe(false)
    })

    it('gte with valid number value of zero but with argument of field which is boolean false should return true', () => {
      expect(validator('propNumberZero', obj, 'gte', 'propBooleanFalse', [], msgObj)).toBe(true)
    })

    it('gte with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gte', '', [], msgObj)).toThrow(Error)
    })

    it('gte with valid number value but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'gte', 'propNumberZero,propNumberRandom', [], msgObj)).toThrow(Error)
    })

    it('gte with valid number value but with argument of field which does not exists should return false', () => {
      expect(validator('propNumberZero', obj, 'gte', 'propNotExists', [], msgObj)).toBe(false)
    })

    it('gte with valid number value but with argument of field which is undefined should return false', () => {
      expect(validator('propNumberZero', obj, 'gte', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('gte with valid number value but with argument of field which is null should return false', () => {
      expect(validator('propNumberZero', obj, 'gte', 'propNull', [], msgObj)).toBe(false)
    })
  })

  describe('in', () => {
    it('in with number value that exists in the list provided as arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(true)
    })

    it('in with number value that exists in the list provided as sub-args without arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'in', '', [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('in with number value that exists in the list provided as sub-args but not in the list provided as arguments with both provided without arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNotDistinct.join(','), [], msgObj, obj.propArrayNumberFilled)).toBe(false)
    })

    it('in with number value that does not exists in the list provided as sub-args but exists in the list provided as arguments with both provided without arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNumberFilled.join(','), [], msgObj, obj.propArrayNotDistinct)).toBe(true)
    })

    it('in with number value that does not exists in the list provided as sub-args with arguments not provided should return false', () => {
      expect(validator('propNumberRandom', obj, 'in', '', [], msgObj, obj.propArrayNotDistinct)).toBe(false)
    })

    it('in with number value that does not exists in the list provided as arguments with sub-args not provided should return false', () => {
      expect(validator('propNumberRandom', obj, 'in', obj.propArrayNotDistinct.join(','), [], msgObj)).toBe(false)
    })

    it('in with valid number value but without any arguments or sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in', '', [], msgObj)).toThrow(Error)
    })

    it('in with valid number value but without any arguments and a non-number sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in', '', [], msgObj, obj.futureDate)).toThrow(Error)
    })
  })

  describe('in_array', () => {
    it('in_array with number value that exists in the flat number array field provided in argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propArrayNumberFilled.*', [], msgObj)).toBe(true)
    })

    it('in_array with number value that exists in the flat number string array field provided in argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringNumberArray.*', [], msgObj)).toBe(true)
    })

    it('in_array with number value that does not exists in the flat number array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propArrayNotDistinct.*', [], msgObj)).toBe(false)
    })

    it('in_array with number value that does not exists in the flat number string array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringArrayNotDistinct.*', [], msgObj)).toBe(false)
    })

    it('in_array with number value that exists in the object array field provided in argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'in_array', 'propObjectArray.*.age', [], msgObj)).toBe(true)
    })

    it('in_array with number value that exists in the string object array field provided in argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'in_array', 'propStringObjectArray.*.age', [], msgObj)).toBe(true)
    })

    it('in_array with number value that does not exists in the object array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringObjectArray.*.age', [], msgObj)).toBe(false)
    })

    it('in_array with number value that does not exists in the string object array field provided in argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringObjectArray.*.age', [], msgObj)).toBe(false)
    })

    it('in_array with valid number value but with argument not of type array should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'currentMoment.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid number value but with argument not of type array but of type string should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propValidEmail.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid number value with valid array argument field but only one part of the arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propStringObjectArray', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid number value but with no arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', '', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid number value and with valid object with three part arguments but middle one not * should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propObjectArray.detail.age', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid number value and with valid object with more than three part arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propObjectArray.*.name.age', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid number value but with multiple arguments provided should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'in_array', 'propObjectArray.*.age,propStringNumberArray.*', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid number value but with valid flat string number array but with three parts of arguments provided should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propStringNumberArray.*.age', [], msgObj)).toBe(false)
    })

    it('in_array with valid number value but with valid object string number array but with two parts of arguments provided should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propObjectArray.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid number value but argument field of null should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propNull.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid number value but argument field of undefined should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propUndefined.*', [], msgObj)).toBe(false)
    })

    it('in_array with failing validation but with custom message should have that message in the final messages list', () => {
      msgObj.property = definedMessages.number.in_array
      errorMessages.splice(0, errorMessages.length)

      validator('propNumberRandom', obj, 'in_array', 'propArrayNotDistinct.*', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propNumberRandom').replace(':another', 'propArrayNotDistinct'))
    })
  })

  describe('integer', () => {
    it('integer with number value of valid integer value should return true', () => {
      expect(validator('propNumberRandom', obj, 'integer', '', [], msgObj)).toBe(true)
    })

    it('integer with number value of invalid integer value should return false', () => {
      expect(validator('propNumberFloat', obj, 'integer', '', [], msgObj)).toBe(false)
    })

    it('integer with number value of valid integer value but with arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'integer', 'propNumberFloat', [], msgObj)).toThrow(Error)
    })
  })

  describe('lt', () => {
    it('lt with number value greater than the argument field value should return false', () => {
      expect(validator('propNumberRandom', obj, 'lt', 'propNumberRandomOther', [], msgObj)).toBe(false)
    })

    it('lt with number value less than the argument field value should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'lt', 'propNumberRandom', [], msgObj)).toBe(true)
    })

    it('lt with number value equal to the argument should return false', () => {
      expect(validator('propNumberRandomClone', obj, 'lt', 'propNumberRandom', [], msgObj)).toBe(false)
    })

    it('lt with valid number value greater than zero but with argument of field which is null should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'lt', 'propNull', [], msgObj)).toBe(false)
    })

    it('lt with valid number value less than one but with argument of field which is boolean true should return false', () => {
      expect(validator('propNumberZero', obj, 'lt', 'propBooleanTrue', [], msgObj)).toBe(true)
    })

    it('lt with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lt', '', [], msgObj)).toThrow(Error)
    })

    it('lt with valid number value but with multiple number arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lt', 'propNumberZero,propNumberRandom', [], msgObj)).toThrow(Error)
    })

    it('lt with valid number value but with argument of field which does not exists should return false', () => {
      expect(validator('propNumberZero', obj, 'lt', 'propNotExists', [], msgObj)).toBe(false)
    })

    it('lt with valid number value but with argument of field which is undefined should return false', () => {
      expect(validator('propNumberZero', obj, 'lt', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('lt with valid number value but with argument of field which is null should return false', () => {
      expect(validator('propNumberZero', obj, 'lt', 'propNull', [], msgObj)).toBe(false)
    })
  })

  describe.only('lte', () => {
    it('lte with number value greater than the argument field value should return false', () => {
      expect(validator('propNumberRandom', obj, 'lte', 'propNumberRandomOther', [], msgObj)).toBe(false)
    })

    it('lte with number value less than the argument field value should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'lte', 'propNumberRandom', [], msgObj)).toBe(true)
    })

    it('lte with number value equal to the argument should return true', () => {
      expect(validator('propNumberRandomClone', obj, 'lte', 'propNumberRandom', [], msgObj)).toBe(true)
    })

    it('lte with valid number value greater than zero but with argument of field which is null should return false', () => {
      expect(validator('propNumberRandomOther', obj, 'lte', 'propNull', [], msgObj)).toBe(false)
    })

    it('lte with valid number value of zero but with argument of field which is boolean false should return false', () => {
      expect(validator('propNumberZero', obj, 'lte', 'propBooleanFalse', [], msgObj)).toBe(false)
    })

    it('lte with valid number value but without arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lte', '', [], msgObj)).toThrow(Error)
    })

    it('lte with valid number value but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberZero', obj, 'lte', 'propNumberZero,propNumberRandom', [], msgObj)).toThrow(Error)
    })

    it('lte with valid number value but with argument of field which does not exists should return false', () => {
      expect(validator('propNumberZero', obj, 'lte', 'propNotExists', [], msgObj)).toBe(false)
    })

    it('lte with valid number value but with argument of field which is undefined should return false', () => {
      expect(validator('propNumberZero', obj, 'lte', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('lte with valid number value but with argument of field which is null should return false', () => {
      expect(validator('propNumberZero', obj, 'lte', 'propNull', [], msgObj)).toBe(false)
    })
  })

  describe('max', () => {
    it('max with number value less than the number provided in the argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'max', '1256', [], msgObj)).toBe(true)
    })

    it('max with number value greater than the number provided in the argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'max', '100', [], msgObj)).toBe(false)
    })

    it('max with number value equal to the number provided in the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'max', String(obj.propNumberRandom), [], msgObj)).toBe(true)
    })

    it('max with valid number value and non-number arguments should throw an error', () => {
      expect(() => validator('propNumberRandomOther', obj, 'max', obj.propValidEmail, [], msgObj)).toThrow(Error)
    })

    it('max with valid number value and no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'max', '', [], msgObj)).toThrow(Error)
    })

    it('max with valid number value and multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'max', '25,48', [], msgObj)).toThrow(Error)
    })
  })

  describe('min', () => {
    it('min with number value less than the number provided in the argument should return true', () => {
      expect(validator('propNumberRandomOther', obj, 'min', '1256', [], msgObj)).toBe(false)
    })

    it('min with number value greater than the number provided in the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'min', '100', [], msgObj)).toBe(true)
    })

    it('min with number value equal to the number provided in the argument should return true', () => {
      expect(validator('propNumberRandom', obj, 'min', String(obj.propNumberRandom), [], msgObj)).toBe(true)
    })

    it('min with valid number value and non-number arguments should throw an error', () => {
      expect(() => validator('propNumberRandomOther', obj, 'min', obj.propValidEmail, [], msgObj)).toThrow(Error)
    })

    it('min with valid number value and no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'min', '', [], msgObj)).toThrow(Error)
    })

    it('min with valid number value and multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'min', '25,48', [], msgObj)).toThrow(Error)
    })
  })

  describe('not_in', () => {
    it('not_in with number value that exists in the list provided as arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNumberFilled.join(','), [], msgObj)).toBe(false)
    })

    it('not_in with number value that exists in the list provided as sub-args without arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'not_in', '', [], msgObj, obj.propArrayNumberFilled)).toBe(false)
    })

    it('not_in with number value that exists in the list provided as sub-args but not in the list provided as arguments with both provided without arguments should return true', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNotDistinct.join(','), [], msgObj, obj.propArrayNumberFilled)).toBe(true)
    })

    it('not_in with number value that does not exists in the list provided as sub-args but exists in the list provided as arguments with both provided without arguments should return false', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNumberFilled.join(','), [], msgObj, obj.propArrayNotDistinct)).toBe(false)
    })

    it('not_in with number value that does not exists in the list provided as sub-args with arguments not provided should return true', () => {
      expect(validator('propNumberRandom', obj, 'not_in', '', [], msgObj, obj.propArrayNotDistinct)).toBe(true)
    })

    it('not_in with number value that does not exists in the list provided as arguments with sub-args not provided should return true', () => {
      expect(validator('propNumberRandom', obj, 'not_in', obj.propArrayNotDistinct.join(','), [], msgObj)).toBe(true)
    })

    it('not_in with valid number value but without any arguments or sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'not_in', '', [], msgObj)).toThrow(Error)
    })

    it('not_in with valid number value but without any arguments and a non-number sub-args should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'not_in', '', [], msgObj, obj.futureDate)).toThrow(Error)
    })
  })

  describe('same', () => {
    it('same with number value that is equal to the number value of the argument field should return true', () => {
      expect(validator('propNumberRandom', obj, 'same', 'propNumberRandomClone', [], msgObj)).toBe(true)
    })

    it('same with number value that is not equal to the number value of the argument field should return false', () => {
      expect(validator('propNumberRandom', obj, 'same', 'propNumberZero', [], msgObj)).toBe(false)
    })

    it('same with number value and with null argument field value should return false', () => {
      expect(validator('propNumberRandom', obj, 'same', 'propNull', [], msgObj)).toBe(false)
    })

    it('same with valid number value but with field argument that does not exist should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'same', 'propNotExists', [], msgObj)).toThrow(Error)
    })

    it('same with valid number value but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'same', 'propNumberZero,propNumberRandomClone', [], msgObj)).toThrow(Error)
    })

    it('same with valid number value but with no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'same', '', [], msgObj)).toThrow(Error)
    })
  })

  describe('size', () => {
    it('size with number value that is equal to the number value of the argument should return true', () => {
      expect(validator('propNumberZero', obj, 'size', '0', [], msgObj)).toBe(true)
    })

    it('size with number value that is not equal to the number value of the argument should return false', () => {
      expect(validator('propNumberRandom', obj, 'size', '0', [], msgObj)).toBe(false)
    })

    it('size with valid number but with non-number argument value should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'size', 'true', [], msgObj)).toThrow(Error)
    })

    it('size with valid number but with multiple arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'size', '8,6', [], msgObj)).toThrow(Error)
    })

    it('size with valid number but with no arguments should throw an error', () => {
      expect(() => validator('propNumberRandom', obj, 'size', '', [], msgObj)).toThrow(Error)
    })
  })
})
