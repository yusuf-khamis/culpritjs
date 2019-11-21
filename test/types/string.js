const validator = require('../../lib/types/string')
const obj = require('../object')
const definedMessages = require('../../lib/messages')

describe('string', () => {
  const msgObj = {
    property: '',
    arg: ''
  }

  const errorMessages = []

  it('string_test should throw an error because it is not a valid validation rule for string', () => {
    expect(() => validator('propStringRandom', obj, 'string_test', '', [], msgObj)).toThrow(Error)
  })

  describe('alpha', () => {
    it('alpha with alpha characters should return true', () => {
      expect(validator('propStringRandom', obj, 'alpha', '', [], msgObj)).toBe(true)
    })

    it('alpha with non-alpha characters should return false', () => {
      expect(validator('propStringMixArray', obj, 'alpha', '', [], msgObj)).toBe(false)
    })

    it('alpha with alpha characters but with arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'alpha', 'true', [], msgObj)).toThrow(Error)
    })

    it('alpha failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.alpha
      errorMessages.splice(0, errorMessages.length)

      validator('propStringMixArray', obj, 'alpha', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringMixArray'))
    })
  })

  describe('alpha_dash', () => {
    it('alpha_dash with alpha characters only should return true', () => {
      expect(validator('propStringRandom', obj, 'alpha_dash', '', [], msgObj)).toBe(true)
    })

    it('alpha_dash with alpha characters and underscore should return true', () => {
      expect(validator('propStringRandomOther1', obj, 'alpha_dash', '', [], msgObj)).toBe(true)
    })

    it('alpha_dash with alpha characters and hyphen should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'alpha_dash', '', [], msgObj)).toBe(true)
    })

    it('alpha_dash with alpha characters and hyphen and underscore should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'alpha_dash', '', [], msgObj)).toBe(true)
    })

    it('alpha_dash with non-alpha_dash characters should return false', () => {
      expect(validator('propValidEmail', obj, 'alpha_dash', '', [], msgObj)).toBe(false)
    })

    it('alpha_dash with valid alpha_dash string value but with arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'alpha_dash', 'true', [], msgObj)).toThrow(Error)
    })

    it('alpha_dash failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.alpha_dash
      errorMessages.splice(0, errorMessages.length)

      validator('propValidEmail', obj, 'alpha_dash', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propValidEmail'))
    })
  })

  describe('alpha_num', () => {
    it('alpha_num with alpha characters should return true', () => {
      expect(validator('propStringRandom', obj, 'alpha_num', '', [], msgObj)).toBe(true)
    })

    it('alpha_num with alpha numeric characters should return true', () => {
      expect(validator('propStringRandomOther4', obj, 'alpha_num', '', [], msgObj)).toBe(true)
    })

    it('alpha_num with numeric characters should return true', () => {
      expect(validator('propStringRandomOther8', obj, 'alpha_num', '', [], msgObj)).toBe(true)
    })

    it('alpha_num with non-alpha numeric characters should return false', () => {
      expect(validator('propStringMixArray', obj, 'alpha_num', '', [], msgObj)).toBe(false)
    })

    it('alpha_num with valid alpha numeric characters but with arguments should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'alpha_num', 'true', [], msgObj)).toThrow(Error)
    })

    it('alpha_num failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.alpha_num
      errorMessages.splice(0, errorMessages.length)

      validator('propStringMixArray', obj, 'alpha_num', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringMixArray'))
    })
  })

  describe('between', () => {
    it('between with string length between the range in arguments should return true', () => {
      expect(validator('propStringRandom', obj, 'between', '2,5', [], msgObj)).toBe(true)
    })

    it('between with string length as min number of the range should return true', () => {
      expect(validator('propStringRandom', obj, 'between', '3,5', [], msgObj)).toBe(true)
    })

    it('between with string length as max number of the range should return true', () => {
      expect(validator('propStringRandom', obj, 'between', '1,3', [], msgObj)).toBe(true)
    })

    it('between with string length outside the range provided should return false', () => {
      expect(validator('propStringRandom', obj, 'between', '5,13', [], msgObj)).toBe(false)
    })

    it('between with string length between the range but with the first bigger than the second should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '5,2', [], msgObj)).toThrow(Error)
    })

    it('between with string length between the range but with the first bigger than the second should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '5,2', [], msgObj)).toThrow(Error)
    })

    it('between with valid string but with one argument passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '52', [], msgObj)).toThrow(Error)
    })

    it('between with valid string but with more than two arguments passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '52,60,125', [], msgObj)).toThrow(Error)
    })

    it('between with valid string but with no arguments passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '', [], msgObj)).toThrow(Error)
    })

    it('between with valid string but with non-number arguments passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', 'yes,no', [], msgObj)).toThrow(Error)
    })

    it('between with valid string but with first non-number argument passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', 'yes,76', [], msgObj)).toThrow(Error)
    })

    it('between with valid string but with second non-number argument passed should throw an error', () => {
      expect(() => validator('propStringRandom', obj, 'between', '94,no', [], msgObj)).toThrow(Error)
    })

    it('between failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.between
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandom', obj, 'between', '5,13', errorMessages, msgObj)

      expect(errorMessages).toContain(
        msgObj.property
          .replace(':field', 'propStringRandom')
          .replace(':min', '5')
          .replace(':max', '13')
      )
    })
  })

  describe('clean', () => {
    it('clean with only spaces argument and end sub-argument should return the value with no trailing spaces', () => {
      const finalString = obj.propStringRandomOther11.replace(/\s+$/, '')

      validator('propStringRandomOther11', obj, 'clean', 'spaces.end', [], msgObj)

      expect(obj.propStringRandomOther11).toBe(finalString)
    })

    it('clean with only spaces argument and begin sub-argument should return the value with no preceding spaces', () => {
      const finalString = obj.propStringRandomOther11.replace(/^\s+/, '')

      validator('propStringRandomOther12', obj, 'clean', 'spaces.begin', [], msgObj)

      expect(obj.propStringRandomOther11).toBe(finalString)
    })

    it('clean with only spaces argument and both sub-argument should return the value trimmed', () => {
      const finalString = obj.propStringRandomOther11.trim()

      validator('propStringRandomOther12', obj, 'clean', 'spaces.both', [], msgObj)

      expect(obj.propStringRandomOther11).toBe(finalString)
    })

    it('clean with only spaces argument and between_single sub-argument should return the value with multiple inside spaces reduced to single spaces', () => {
      const finalString = obj.propStringRandomOther14.match(/^\s*/)[0] + obj.propStringRandomOther14.trim().replace(/\s{2,}/g, ' ') + obj.propStringRandomOther14.match(/\s*$/)[0]

      validator('propStringRandomOther14', obj, 'clean', 'spaces.between_single', [], msgObj)

      expect(obj.propStringRandomOther14).toBe(finalString)
    })

    it('clean with only spaces argument and between_none sub-argument should return the value with inside spaces removed', () => {
      const finalString = obj.propStringRandomOther14.match(/^\s*/)[0] + obj.propStringRandomOther14.trim().replace(/\s+/g, '') + obj.propStringRandomOther14.match(/\s*$/)[0]

      validator('propStringRandomOther14', obj, 'clean', 'spaces.between_none', [], msgObj)

      expect(obj.propStringRandomOther14).toBe(finalString)
    })

    it('clean with only spaces argument and between_none and begin sub-arguments should return the value with inside and preceding spaces removed', () => {
      const finalString = obj.propStringRandomOther14.trim().replace(/\s+/g, '') + obj.propStringRandomOther14.match(/\s*$/)[0]

      validator('propStringRandomOther14', obj, 'clean', 'spaces.between_none.begin', [], msgObj)

      expect(obj.propStringRandomOther14).toBe(finalString)
    })

    it('clean with only spaces argument and between_none and end sub-arguments should return the value with inside and trailing spaces removed', () => {
      const finalString = obj.propStringRandomOther14.match(/^\s*/)[0] + obj.propStringRandomOther14.trim().replace(/\s+/g, '')

      validator('propStringRandomOther14', obj, 'clean', 'spaces.between_none.end', [], msgObj)

      expect(obj.propStringRandomOther14).toBe(finalString)
    })

    it('clean with only spaces argument and between_single and end sub-arguments should return the value with multiple inside spaces reduced to single spaces and trailing spaces removed', () => {
      const finalString = obj.propStringRandomOther14.match(/^\s*/)[0] + obj.propStringRandomOther14.trim().replace(/\s+/g, '')

      validator('propStringRandomOther14', obj, 'clean', 'spaces.end.between_single', [], msgObj)

      expect(obj.propStringRandomOther14).toBe(finalString)
    })

    it('clean with only spaces argument and between_single and begin sub-arguments should return the value with multiple inside spaces reduced to single spaces and preceding spaces removed', () => {
      const finalString = obj.propStringRandomOther14.trim().replace(/\s+/g, '') + obj.propStringRandomOther14.match(/\s*$/)[0]

      validator('propStringRandomOther14', obj, 'clean', 'spaces.end.between_single', [], msgObj)

      expect(obj.propStringRandomOther14).toBe(finalString)
    })

    it('clean with spaces argument and three sub-arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther12', obj, 'clean', 'spaces.end.begin.between_single', [], msgObj)).toThrow(Error)
    })

    it('clean with spaces argument and both between_single and between_none should throw an error', () => {
      expect(() => validator('propStringRandomOther12', obj, 'clean', 'spaces.end.begin.between_single', [], msgObj)).toThrow(Error)
    })

    it('clean with only case argument and lower sub-argument should return the value in lower case', () => {
      const finalString = obj.propStringRandomOther15.toLowerCase()

      validator('propStringRandomOther15', obj, 'clean', 'case.lower', [], msgObj)

      expect(obj.propStringRandomOther15).toBe(finalString)
    })

    it('clean with only case argument and upper sub-argument should return the value in upper case', () => {
      const finalString = obj.propStringRandomOther10.toUpperCase()

      validator('propStringRandomOther10', obj, 'clean', 'case.upper', [], msgObj)

      expect(obj.propStringRandomOther10).toBe(finalString)
    })

    it('clean with only case argument and title sub-argument should return the value in title case', () => {
      const finalString = obj.propStringRandomOther15.match(/\w+/g).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

      validator('propStringRandomOther15', obj, 'clean', 'case.title', [], msgObj)

      expect(obj.propStringRandomOther15).toBe(finalString)
    })

    it('clean with only case argument and no sub-arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther15', obj, 'clean', 'case', [], msgObj)).toThrow(Error)
    })

    it('clean with only case argument and multiple arguments sub-arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther15', obj, 'clean.upper.lower', 'case', [], msgObj)).toThrow(Error)
    })

    it('clean with only rem argument to remove all the `a`s in a text should return a value without any `a` in it', () => {
      const finalString = obj.propStringRandomOther15.replace(/a/g, '')

      validator('propStringRandomOther15', obj, 'clean', 'rem.a', [], msgObj)

      expect(obj.propStringRandomOther15).toBe(finalString)
    })

    it('clean with only rem argument but without sub-arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther15', obj, 'clean', 'rem', [], msgObj)).toThrow(Error)
    })
  })

  describe('confirmed', () => {
    it('confirmed with property with matching confirmation field should return true', () => {
      expect(validator('stringWithMatchingConfirm', obj, 'confirmed', '', [], msgObj)).toBe(true)
    })

    it('confirmed with property with matching custom confirmation field should return true', () => {
      expect(validator('propStringRandom', obj, 'confirmed', 'propStringRandomClone', [], msgObj)).toBe(true)
    })

    it('confirmed with property without matching confirmation field should return false', () => {
      expect(validator('stringWithoutMatchingConfirm', obj, 'confirmed', '', [], msgObj)).toBe(false)
    })

    it('confirmed with property without matching custom confirmation field should return false', () => {
      expect(validator('stringWithoutMatchingConfirm', obj, 'confirmed', 'propStringRandomClone', [], msgObj)).toBe(false)
    })

    it('confirmed with property with matching confirmation field that does not exist should return false', () => {
      expect(validator('propStringFalse', obj, 'confirmed', '', [], msgObj)).toBe(false)
    })

    it('confirmed with property with matching custom confirmation field that does not exist should return false', () => {
      expect(validator('propStringFalse', obj, 'confirmed', 'notExists', [], msgObj)).toBe(false)
    })

    it('confirmed with property with matching confirmation field but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringFalse', obj, 'confirmed', 'confirmed,confirmed', [], msgObj)).toThrow(Error)
    })

    it('confirmed failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.confirmed
      errorMessages.splice(0, errorMessages.length)

      validator('propStringFalse', obj, 'confirmed', 'notExists', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringFalse').replace(':confirmation', 'notExists'))
    })
  })

  describe('card', () => {
    it('card with valid card number should return true', () => {
      expect(validator('stringValidCardNumber', obj, 'card', '', [], msgObj)).toBe(true)
    })

    it('card with invalid card number should return false', () => {
      expect(validator('stringInvalidCardNumber', obj, 'card', '', [], msgObj)).toBe(false)
    })

    it('card with random value should return false', () => {
      expect(validator('propStringRandomClone', obj, 'card', '', [], msgObj)).toBe(false)
    })

    it('card with valid card number but with arguments should throw an error', () => {
      expect(() => validator('stringValidCardNumber', obj, 'card', 'propStringRandomClone', [], msgObj)).toThrow(Error)
    })

    it('card failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.card
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomClone', obj, 'card', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomClone'))
    })
  })

  describe('different', () => {
    it('different with value equal to the value of argument field should return false', () => {
      expect(validator('propStringRandom', obj, 'different', 'propStringRandomClone', [], msgObj)).toBe(false)
    })

    it('different with value not equal to the value of argument field should return true', () => {
      expect(validator('propValidEmail', obj, 'different', 'propStringRandomClone', [], msgObj)).toBe(true)
    })

    it('different with valid value but with field in argument that does not exists should return true', () => {
      expect(validator('propValidEmail', obj, 'different', 'propNotExists', [], msgObj)).toBe(true)
    })

    it('different with valid value but with field in argument with value null should return true', () => {
      expect(validator('propValidEmail', obj, 'different', 'propNull', [], msgObj)).toBe(true)
    })

    it('different with valid value but with no arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'different', '', [], msgObj)).toThrow(Error)
    })

    it('different with valid value but with multiple arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'different', 'propNull,propStringRandomClone', [], msgObj)).toThrow(Error)
    })

    it('different failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.different
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandom', obj, 'different', 'propStringRandomClone', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandom').replace(':another', 'propStringRandomClone'))
    })
  })

  describe('email', () => {
    it('email with valid email should return true', () => {
      expect(validator('propValidEmail', obj, 'email', '', [], msgObj)).toBe(true)
    })

    it('email with invalid email should return false', () => {
      expect(validator('propStringTrue', obj, 'email', '', [], msgObj)).toBe(false)
    })

    it('email with valid email but with arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'email', 'true', [], msgObj)).toThrow(Error)
    })

    it('email failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.email
      errorMessages.splice(0, errorMessages.length)

      validator('propStringTrue', obj, 'email', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringTrue'))
    })
  })

  describe('ends_with', () => {
    it('ends_with with string that ends with one of the values in arguments should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayStringFilled.join(','), [], msgObj)).toBe(true)
    })

    it('ends_with with string that does not end with one of the values in arguments should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayMixFilled.join(','), [], msgObj)).toBe(false)
    })

    it('ends_with with string that ends with one of the values in extra args as json object should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('ends_with with string that does not end with one of the values in extra args as json object should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj, obj.propArrayMixFilled)).toBe(false)
    })

    it('ends_with with string that ends with one of the values in extra args as json string should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj, obj.propStringStringArray)).toBe(true)
    })

    it('ends_with with string that does not end with one of the values in extra args as json string should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj, obj.propStringMixArray)).toBe(false)
    })

    it('ends_with with string that ends with values in arguments but not in extra args should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayStringFilled.join(','), [], msgObj, obj.propStringMixArray)).toBe(true)
    })

    it('ends_with with string that ends with values in extra args but not in arguments should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayMixFilled.join(','), [], msgObj, obj.propArrayStringFilled)).toBe(false)
    })

    it('ends_with with valid string but no arguments or extra args should throw an error', () => {
      expect(() => validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj)).toThrow(Error)
    })

    it('ends_with with valid string but no arguments and invalid extra args (not an array) should throw an error', () => {
      expect(() => validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj, obj.propValidEmail)).toThrow(Error)
    })

    it('ends_with with valid string but no arguments and non string and non json object/array should throw an error', () => {
      expect(() => validator('propStringRandomOther9', obj, 'ends_with', '', [], msgObj, obj.currentMoment)).toThrow(Error)
    })

    it('ends_with failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.ends_with
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther9', obj, 'ends_with', obj.propArrayMixFilled.join(','), errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther9').replace(':value', obj.propArrayMixFilled.join(',')))
    })
  })

  describe('filled', () => {
    it('filled with string that is not empty should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'filled', '', [], msgObj)).toBe(true)
    })

    it('filled with string that is empty should return false', () => {
      expect(validator('propStringEmpty', obj, 'filled', '', [], msgObj)).toBe(false)
    })

    it('filled with string that is not empty but with arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'filled', 'filled', [], msgObj)).toThrow(Error)
    })

    it('filled failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.filled
      errorMessages.splice(0, errorMessages.length)

      validator('propStringEmpty', obj, 'filled', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringEmpty'))
    })
  })

  describe('gt', () => {
    it('gt with string that has length greater than the string in argument field should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'gt', 'propStringRandom', [], msgObj)).toBe(true)
    })

    it('gt with string that has length equal to the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gt', 'propStringRandom', [], msgObj)).toBe(false)
    })

    it('gt with string that has length less than the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gt', 'propStringRandomOther2', [], msgObj)).toBe(false)
    })

    it('gt with valid string but with null argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gt', 'propNull', [], msgObj)).toBe(false)
    })

    it('gt with valid string but with undefined argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gt', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('gt with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gt', '', [], msgObj)).toThrow(Error)
    })

    it('gt with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gt', 'propStringRandomOther2,propStringRandom', [], msgObj)).toThrow(Error)
    })

    it('gt failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.gt
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomClone', obj, 'gt', 'propStringRandom', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomClone').replace(':another', 'propStringRandom'))
    })
  })

  describe('gte', () => {
    it('gte with string that has length greater than the string in argument field should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'gte', 'propStringRandom', [], msgObj)).toBe(true)
    })

    it('gte with string that has length equal to the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'gte', 'propStringRandom', [], msgObj)).toBe(true)
    })

    it('gte with string that has length less than the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gte', 'propStringRandomOther2', [], msgObj)).toBe(false)
    })

    it('gte with valid string but with null argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gte', 'propNull', [], msgObj)).toBe(false)
    })

    it('gte with valid string but with undefined argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'gte', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('gte with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gte', '', [], msgObj)).toThrow(Error)
    })

    it('gte with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'gte', 'propStringRandomOther2,propStringRandom', [], msgObj)).toThrow(Error)
    })

    it('gte failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.gte
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomClone', obj, 'gte', 'propStringRandomOther2', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomClone').replace(':another', 'propStringRandomOther2'))
    })
  })

  describe('in', () => {
    it('in with string value that exists in the list provided as arguments should return true', () => {
      expect(validator('propStringTrue', obj, 'in', obj.propArrayStringFilled.join(','), [], msgObj)).toBe(true)
    })

    it('in with string value that exists in the list provided as sub-args without arguments should return true', () => {
      expect(validator('propStringTrue', obj, 'in', '', [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('in with string value that exists in the list provided as sub-args but not in the list provided as arguments should return false', () => {
      expect(validator('propStringFalse', obj, 'in', obj.propArrayMixFilled.join(','), [], msgObj, obj.propArrayStringFilled)).toBe(false)
    })

    it('in with string value that does not exists in the list provided as sub-args but exists in the list provided as arguments should return true', () => {
      expect(validator('propStringTrue', obj, 'in', obj.propArrayStringFilled.join(','), [], msgObj, obj.propArrayMixFilled)).toBe(true)
    })

    it('in with string value that does not exists in the list provided as sub-args with arguments not provided should return false', () => {
      expect(validator('propStringTrue', obj, 'in', '', [], msgObj, obj.propArrayMixFilled)).toBe(false)
    })

    it('in with string value that does not exists in the list provided as arguments with sub-args not provided should return false', () => {
      expect(validator('propStringFalse', obj, 'in', obj.propArrayMixFilled.join(','), [], msgObj)).toBe(false)
    })

    it('in with valid string value but without any arguments or sub-args should throw an error', () => {
      expect(() => validator('propStringTrue', obj, 'in', '', [], msgObj)).toThrow(Error)
    })

    it('in with valid string value but without any arguments and a non-string array sub-args should throw an error', () => {
      expect(() => validator('propStringTrue', obj, 'in', '', [], msgObj, obj.futureDate)).toThrow(Error)
    })

    it('in failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.in
      errorMessages.splice(0, errorMessages.length)

      validator('propStringTrue', obj, 'in', '', errorMessages, msgObj, obj.propArrayMixFilled)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringTrue').replace(':value', obj.propArrayMixFilled.join(',')))
    })
  })

  describe('in_array', () => {
    it('in_array with string that exists in the flat string array field provided in argument should return true', () => {
      expect(validator('propStringRandom', obj, 'in_array', 'propArrayStringFilled.*', [], msgObj)).toBe(true)
    })

    it('in_array with string that exists in the flat string array field provided in argument as boolean should return false', () => {
      expect(validator('propNumberRandom', obj, 'in_array', 'propArrayMixFilled.*', [], msgObj)).toBe(false)
    })

    it('in_array with string that exists in the flat string string array field provided in argument should return true', () => {
      expect(validator('propStringRandom', obj, 'in_array', 'propStringStringArray.*', [], msgObj)).toBe(true)
    })

    it('in_array with string that does not exists in the flat mix array field provided in argument should return false', () => {
      expect(validator('propStringRandomOther8', obj, 'in_array', 'propArrayMixFilled.*', [], msgObj)).toBe(false)
    })

    it('in_array with string that does not exists in the flat string mix array field provided in argument should return false', () => {
      expect(validator('propStringRandomOther8', obj, 'in_array', 'propStringMixArray.*', [], msgObj)).toBe(false)
    })

    it('in_array with string that exists in the object array field provided in argument should return true', () => {
      expect(validator('propStringRandomOther10', obj, 'in_array', 'propObjectArray.*.name', [], msgObj)).toBe(true)
    })

    it('in_array with string that exists in the string object array field provided in argument should return true', () => {
      expect(validator('propStringRandomOther10', obj, 'in_array', 'propStringObjectArray.*.name', [], msgObj)).toBe(true)
    })

    it('in_array with string that does not exists in the object array field provided in argument should return false', () => {
      expect(validator('propValidEmail', obj, 'in_array', 'propStringObjectArray.*.name', [], msgObj)).toBe(false)
    })

    it('in_array with string that does not exists in the string object array field provided in argument should return false', () => {
      expect(validator('propValidEmail', obj, 'in_array', 'propStringObjectArray.*.name', [], msgObj)).toBe(false)
    })

    it('in_array with valid string but with argument not of type array should return false', () => {
      expect(validator('propValidEmail', obj, 'in_array', 'currentMoment.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid string but with argument not of type array but of type string should return false', () => {
      expect(validator('propStringRandomOther2', obj, 'in_array', 'propValidEmail.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid string but with no arguments provided should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'in_array', '', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid string but with multiple arguments provided should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'in_array', 'propObjectArray.*.age,propStringNumberArray.*', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid string but with more than 3 parts of arguments provided should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'in_array', 'propObjectArray.*.age.name', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid string but with single part of arguments provided should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'in_array', 'propObjectArray', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid string but with 3 parts of arguments but middle part not being * provided should throw an error', () => {
      expect(() => validator('propStringRandomOther2', obj, 'in_array', 'propObjectArray.age.define', [], msgObj)).toThrow(Error)
    })

    it('in_array with valid string but with valid flat string array but with three parts of arguments provided should return false', () => {
      expect(validator('propStringRandom', obj, 'in_array', 'propArrayStringFilled.*.age', [], msgObj)).toBe(false)
    })

    it('in_array with valid string but with valid object string number array but with two parts of arguments provided should return false', () => {
      expect(validator('propStringRandomOther10', obj, 'in_array', 'propObjectArray.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid string but with null argument field should return false', () => {
      expect(validator('propStringRandomOther10', obj, 'in_array', 'propNull.*', [], msgObj)).toBe(false)
    })

    it('in_array with valid string but with undefined argument field should return false', () => {
      expect(validator('propStringRandomOther10', obj, 'in_array', 'propUndefined.*', [], msgObj)).toBe(false)
    })

    it('in_array failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.in_array
      errorMessages.splice(0, errorMessages.length)

      validator('propValidEmail', obj, 'in_array', 'propStringObjectArray.*.name', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propValidEmail').replace(':another', 'propStringObjectArray'))
    })
  })

  describe('ip_address', () => {
    it('ip_address with valid ipv4 should return true', () => {
      expect(validator('ipv4', obj, 'ip_address', '', [], msgObj)).toBe(true)
    })

    it('ip_address with valid ipv6 should return true', () => {
      expect(validator('ipv6', obj, 'ip_address', '', [], msgObj)).toBe(true)
    })

    it('ip_address with invalid ipv4 should return true', () => {
      expect(validator('ipv4_invalid', obj, 'ip_address', '', [], msgObj)).toBe(false)
    })

    it('ip_address with invalid ipv6 should return false', () => {
      expect(validator('ipv6_invalid', obj, 'ip_address', '', [], msgObj)).toBe(false)
    })

    it('ip_address with valid ipv4 but with arguments should throw an error', () => {
      expect(() => validator('ipv4', obj, 'ip_address', 'ipv6', [], msgObj)).toThrow(Error)
    })

    it('ip_address failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.ip_address
      errorMessages.splice(0, errorMessages.length)

      validator('ipv6_invalid', obj, 'ip_address', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'ipv6_invalid'))
    })
  })

  describe('ipv4', () => {
    it('ipv4 with valid ipv4 should return true', () => {
      expect(validator('ipv4', obj, 'ipv4', '', [], msgObj)).toBe(true)
    })

    it('ipv4 with invalid ipv4 should return true', () => {
      expect(validator('ipv4_invalid', obj, 'ipv4', '', [], msgObj)).toBe(false)
    })

    it('ipv4 with valid ipv4 but with arguments should throw an error', () => {
      expect(() => validator('ipv4', obj, 'ipv4', 'args', [], msgObj)).toThrow(Error)
    })

    it('ipv4 failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.ipv4
      errorMessages.splice(0, errorMessages.length)

      validator('ipv4_invalid', obj, 'ipv4', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'ipv4_invalid'))
    })
  })

  describe('ipv6', () => {
    it('ipv6 with valid ipv6 should return true', () => {
      expect(validator('ipv6', obj, 'ipv6', '', [], msgObj)).toBe(true)
    })

    it('ipv6 with invalid ipv6 should return false', () => {
      expect(validator('ipv6_invalid', obj, 'ipv6', '', [], msgObj)).toBe(false)
    })

    it('ipv6 with valid ipv6 but with arguments should throw an error', () => {
      expect(() => validator('ipv6', obj, 'ipv6', 'args', [], msgObj)).toThrow(Error)
    })

    it('ipv6 failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.ipv6
      errorMessages.splice(0, errorMessages.length)

      validator('ipv6_invalid', obj, 'ip_address', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'ipv6_invalid'))
    })
  })

  describe('json', () => {
    it('json with valid json should return true', () => {
      expect(validator('propJsonObject', obj, 'json', '', [], msgObj)).toBe(true)
    })

    it('json with valid json array should return true', () => {
      expect(validator('propObjectArray', obj, 'json', '', [], msgObj)).toBe(true)
    })

    it('json with valid json string should return true', () => {
      expect(validator('propStringJsonObject', obj, 'json', '', [], msgObj)).toBe(true)
    })

    it('json with valid json array string should return true', () => {
      expect(validator('propStringObjectArray', obj, 'json', '', [], msgObj)).toBe(true)
    })

    it('json with invalid json object should return false', () => {
      expect(validator('propValidEmail', obj, 'json', '', [], msgObj)).toBe(false)
    })

    it('json with valid json object but with arguments should throw an error', () => {
      expect(() => validator('propStringJsonObject', obj, 'json', 'propObjectArray', [], msgObj)).toThrow(Error)
    })

    it('json failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.json
      errorMessages.splice(0, errorMessages.length)

      validator('propValidEmail', obj, 'json', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propValidEmail'))
    })
  })

  describe('lt', () => {
    it('lt with string that has length greater than the string in argument field should return false', () => {
      expect(validator('propStringRandomOther2', obj, 'lt', 'propStringRandom', [], msgObj)).toBe(false)
    })

    it('lt with string that has length equal to the string in argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'lt', 'propStringRandom', [], msgObj)).toBe(false)
    })

    it('lt with string that has length less than the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'lt', 'propStringRandomOther2', [], msgObj)).toBe(true)
    })

    it('lt with valid string but with null argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'lt', 'propNull', [], msgObj)).toBe(false)
    })

    it('lt with valid string but with undefined argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'lt', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('lt with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lt', '', [], msgObj)).toThrow(Error)
    })

    it('lt with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lt', 'propStringRandomOther2,propStringRandom', [], msgObj)).toThrow(Error)
    })
  })

  describe('lte', () => {
    it('lte with string that has length greater than the string in argument field should return false', () => {
      expect(validator('propStringRandomOther2', obj, 'lte', 'propStringRandom', [], msgObj)).toBe(false)
    })

    it('lte with string that has length equal to the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'lte', 'propStringRandom', [], msgObj)).toBe(true)
    })

    it('lte with string that has length less than the string in argument field should return true', () => {
      expect(validator('propStringRandomClone', obj, 'lte', 'propStringRandomOther2', [], msgObj)).toBe(true)
    })

    it('lte with valid string but with null argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'lte', 'propNull', [], msgObj)).toBe(false)
    })

    it('lte with valid string but with undefined argument field should return false', () => {
      expect(validator('propStringRandomClone', obj, 'lte', 'propUndefined', [], msgObj)).toBe(false)
    })

    it('lte with valid string but without arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lte', '', [], msgObj)).toThrow(Error)
    })

    it('lte with valid string but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomClone', obj, 'lte', 'propStringRandomOther2,propStringRandom', [], msgObj)).toThrow(Error)
    })
  })

  describe('max', () => {
    it('max with string length less than the number provided in the argument should return true', () => {
      expect(validator('propValidEmail', obj, 'max', '120', [], msgObj)).toBe(true)
    })

    it('max with string length equal to the number provided in the argument should return true', () => {
      expect(validator('propValidEmail', obj, 'max', String(obj.propValidEmail.length), [], msgObj)).toBe(true)
    })

    it('max with string length less than the number provided in the argument should return false', () => {
      expect(validator('propValidEmail', obj, 'max', '5', [], msgObj)).toBe(false)
    })

    it('max with valid string value and non-number arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'max', obj.propValidEmail, [], msgObj)).toThrow(Error)
    })

    it('max with valid string and no arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'max', '', [], msgObj)).toThrow(Error)
    })

    it('max with valid string value and multiple arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'max', '25,48', [], msgObj)).toThrow(Error)
    })
  })

  describe('min', () => {
    it('min with string length less than the number provided in the argument should return false', () => {
      expect(validator('propValidEmail', obj, 'min', '120', [], msgObj)).toBe(false)
    })

    it('min with string length equal to the number provided in the argument should return true', () => {
      expect(validator('propValidEmail', obj, 'min', String(obj.propValidEmail.length), [], msgObj)).toBe(true)
    })

    it('min with string length less than the number provided in the argument should return true', () => {
      expect(validator('propValidEmail', obj, 'min', '5', [], msgObj)).toBe(true)
    })

    it('min with valid string value and non-number arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'min', obj.propValidEmail, [], msgObj)).toThrow(Error)
    })

    it('min with valid string and no arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'min', '', [], msgObj)).toThrow(Error)
    })

    it('min with valid string value and multiple arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'min', '25,48', [], msgObj)).toThrow(Error)
    })
  })

  describe('not_in', () => {
    it('not_in with string value that exists in the list provided as arguments should return false', () => {
      expect(validator('propStringTrue', obj, 'not_in', obj.propArrayStringFilled.join(','), [], msgObj)).toBe(false)
    })

    it('not_in with string value that exists in the list provided as sub-args without arguments should return false', () => {
      expect(validator('propStringTrue', obj, 'not_in', '', [], msgObj, obj.propArrayStringFilled)).toBe(false)
    })

    it('not_in with string value that exists in the list provided as sub-args but not in the list provided as arguments should return true', () => {
      expect(validator('propStringFalse', obj, 'not_in', obj.propArrayMixFilled.join(','), [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('not_in with string value that does not exists in the list provided as sub-args but exists in the list provided as arguments should return false', () => {
      expect(validator('propStringTrue', obj, 'not_in', obj.propArrayStringFilled.join(','), [], msgObj, obj.propArrayMixFilled)).toBe(false)
    })

    it('not_in with string value that does not exists in the list provided as sub-args with arguments not provided should return true', () => {
      expect(validator('propStringTrue', obj, 'not_in', '', [], msgObj, obj.propArrayMixFilled)).toBe(true)
    })

    it('not_in with string value that does not exists in the list provided as arguments with sub-args not provided should return true', () => {
      expect(validator('propStringFalse', obj, 'not_in', obj.propArrayMixFilled.join(','), [], msgObj)).toBe(true)
    })

    it('not_in with valid string value but without any arguments or sub-args should throw an error', () => {
      expect(() => validator('propStringTrue', obj, 'not_in', '', [], msgObj)).toThrow(Error)
    })

    it('not_in with valid string value but without any arguments and a non-string array sub-args should throw an error', () => {
      expect(() => validator('propStringTrue', obj, 'not_in', '', [], msgObj, obj.futureDate)).toThrow(Error)
    })

    it('not_in failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.not_in
      errorMessages.splice(0, errorMessages.length)

      validator('propStringTrue', obj, 'not_in', obj.propArrayStringFilled.join(','), errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringTrue').replace(':value', obj.propArrayStringFilled.join(',')))
    })
  })

  describe('not_regex', () => {
    it('not_regex with string value that matches the regex in the argument should return false', () => {
      expect(validator('propStringRandomOther3', obj, 'not_regex', obj.propStringRegex, [], msgObj)).toBe(false)
    })

    it('not_regex with string value that matches the regex in the sub args should return false', () => {
      expect(validator('propStringRandomOther3', obj, 'not_regex', '', [], msgObj, obj.propRegex)).toBe(false)
    })

    it('not_regex with string value that matches the string regex in the sub args should return false', () => {
      expect(validator('propStringRandomOther3', obj, 'not_regex', '', [], msgObj, obj.propStringRegex)).toBe(false)
    })

    it('not_regex with string value that does not match the regex in the argument should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'not_regex', obj.propStringRegex, [], msgObj)).toBe(true)
    })

    it('not_regex with string value that does not match the regex in the sub args should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'not_regex', '', [], msgObj, obj.propRegex)).toBe(true)
    })

    it('not_regex with string value that does not match the string regex in the sub args should return true', () => {
      expect(validator('propStringRandomOther9', obj, 'not_regex', '', [], msgObj, obj.propStringRegex)).toBe(true)
    })

    it('not_regex with string value that matches the string regex in the sub args but does not match the regex in the arguments should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'not_regex', obj.propStringRegex2, [], msgObj, obj.propStringRegex)).toBe(true)
    })

    it('not_regex with string value that does not match the string regex in the sub args but matches the regex in the arguments should return false', () => {
      expect(validator('propStringRandomOther3', obj, 'not_regex', obj.propStringRegex, [], msgObj, obj.propStringRegex2)).toBe(false)
    })

    it('not_regex with valid string value but with two arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther3', obj, 'not_regex', '[a-zA-Z]+,[.0-9]+', [], msgObj)).toThrow(Error)
    })

    it('not_regex with valid string value but with no arguments and no sub args should throw an error', () => {
      expect(() => validator('propStringRandomOther3', obj, 'not_regex', '', [], msgObj)).toThrow(Error)
    })

    it('not_regex with valid string value and no arguments but invalid sub args object should throw an error', () => {
      expect(() => validator('propStringRandomOther3', obj, 'not_regex', '', [], msgObj, obj.futureMoment)).toThrow(Error)
    })

    it('not_regex failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.not_regex
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther3', obj, 'not_regex', '', errorMessages, msgObj, obj.propStringRegex)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther3').replace(':value', RegExp(obj.propStringRegex).toString()))
    })
  })

  describe('numeric', () => {
    it('numeric with a numeric string should return true', () => {
      expect(validator('propStringRandomOther8', obj, 'numeric', '', [], msgObj)).toBe(true)
    })

    it('numeric with a non-numeric string should return false', () => {
      expect(validator('propStringRandomOther7', obj, 'numeric', '', [], msgObj)).toBe(false)
    })

    it('numeric with a numeric string but with arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther8', obj, 'numeric', 'true', [], msgObj)).toThrow(Error)
    })

    it('numeric failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.numeric
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther7', obj, 'numeric', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther7'))
    })
  })

  describe('present', () => {
    it('present with a string value with content should return true', () => {
      expect(validator('propStringRandomOther2', obj, 'present', '', [], msgObj)).toBe(true)
    })

    it('present with empty string should return true', () => {
      expect(validator('propStringEmpty', obj, 'present', '', [], msgObj)).toBe(true)
    })

    it('present with null value should return false', () => {
      expect(validator('propNull', obj, 'present', '', [], msgObj)).toBe(false)
    })

    it('present with undefined value should return false', () => {
      expect(validator('propUndefined', obj, 'present', '', [], msgObj)).toBe(false)
    })

    it('present with empty string but with arguments should throw an error', () => {
      expect(() => validator('propStringEmpty', obj, 'present', 'false', [], msgObj)).toThrow(Error)
    })

    it('present failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.present
      errorMessages.splice(0, errorMessages.length)

      validator('propUndefined', obj, 'present', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propUndefined'))
    })
  })

  describe('regex', () => {
    it('regex with string value that matches the regex in the argument should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'regex', obj.propStringRegex, [], msgObj)).toBe(true)
    })

    it('regex with string value that matches the regex in the sub args should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'regex', '', [], msgObj, obj.propRegex)).toBe(true)
    })

    it('regex with string value that matches the string regex in the sub args should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'regex', '', [], msgObj, obj.propStringRegex)).toBe(true)
    })

    it('regex with string value that does not match the regex in the argument should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'regex', obj.propStringRegex, [], msgObj)).toBe(false)
    })

    it('regex with string value that does not match the regex in the sub args should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'regex', '', [], msgObj, obj.propRegex)).toBe(false)
    })

    it('regex with string value that does not match the string regex in the sub args should return false', () => {
      expect(validator('propStringRandomOther9', obj, 'regex', '', [], msgObj, obj.propStringRegex)).toBe(false)
    })

    it('regex with string value that matches the string regex in the sub args but does not match the regex in the arguments should return false', () => {
      expect(validator('propStringRandomOther3', obj, 'regex', obj.propStringRegex2, [], msgObj, obj.propStringRegex)).toBe(false)
    })

    it('regex with string value that does not match the string regex in the sub args but matches the regex in the arguments should return true', () => {
      expect(validator('propStringRandomOther3', obj, 'regex', obj.propStringRegex, [], msgObj, obj.propStringRegex2)).toBe(true)
    })

    it('regex with valid string value but with two arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther3', obj, 'regex', '[a-zA-Z]+,[.0-9]+', [], msgObj)).toThrow(Error)
    })

    it('regex with valid string value but with no arguments and no sub args should throw an error', () => {
      expect(() => validator('propStringRandomOther3', obj, 'regex', '', [], msgObj)).toThrow(Error)
    })

    it('regex with valid string value and no arguments but invalid sub args object should throw an error', () => {
      expect(() => validator('propStringRandomOther3', obj, 'regex', '', [], msgObj, obj.pastMoment)).toThrow(Error)
    })

    it('regex failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.regex
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther9', obj, 'regex', '', errorMessages, msgObj, obj.propRegex)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther9').replace(':value', obj.propRegex.toString()))
    })
  })

  describe('same', () => {
    it('same with string value that is equal to the argument field should return true', () => {
      expect(validator('propStringRandom', obj, 'same', 'propStringRandom', [], msgObj)).toBe(true)
    })

    it('same with string value that is not equal to the argument field should return false', () => {
      expect(validator('propStringRandom', obj, 'same', 'propStringTrue', [], msgObj)).toBe(false)
    })

    it('same with string value and with null argument field value should return false', () => {
      expect(validator('propStringRandom', obj, 'same', 'propNull', [], msgObj)).toBe(false)
    })

    it('same with valid string value but with field argument that does not exist should return false', () => {
      expect(validator('propStringRandom', obj, 'same', 'propNotExists', [], msgObj)).toBe(false)
    })

    it('same with valid string value but with multiple arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther8', obj, 'same', 'propStringTrue,propStringRandomOther4', [], msgObj)).toThrow(Error)
    })

    it('same with valid string value but with no arguments should throw an error', () => {
      expect(() => validator('propStringRandomOther9', obj, 'same', '', [], msgObj)).toThrow(Error)
    })

    it('same failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.same
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandom', obj, 'same', 'propNull', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandom').replace(':another', 'propNull'))
    })
  })

  describe('size', () => {
    it('size with string length less than the number provided in the argument should return false', () => {
      expect(validator('propValidEmail', obj, 'size', '120', [], msgObj)).toBe(false)
    })

    it('size with string length equal to the number provided in the argument should return true', () => {
      expect(validator('propValidEmail', obj, 'size', String(obj.propValidEmail.length), [], msgObj)).toBe(true)
    })

    it('size with string length less than the number provided in the argument should return false', () => {
      expect(validator('propValidEmail', obj, 'size', '5', [], msgObj)).toBe(false)
    })

    it('size with valid string value and non-number arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'size', obj.propValidEmail, [], msgObj)).toThrow(Error)
    })

    it('size with valid string and no arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'size', '', [], msgObj)).toThrow(Error)
    })

    it('size with valid string value and multiple arguments should throw an error', () => {
      expect(() => validator('propValidEmail', obj, 'size', '25,48', [], msgObj)).toThrow(Error)
    })

    it('size failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.size
      errorMessages.splice(0, errorMessages.length)

      validator('propValidEmail', obj, 'size', '5', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propValidEmail').replace(':value', '5'))
    })
  })

  describe('starts_with', () => {
    it('starts_with with string that starts with one of the values in arguments should return true', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', obj.propArrayStringFilled.join(','), [], msgObj)).toBe(true)
    })

    it('starts_with with string that does not start with one of the values in arguments should return false', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', obj.propArrayMixFilled.join(','), [], msgObj)).toBe(false)
    })

    it('starts_with with string that starts with one of the values in extra args as json object should return true', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj, obj.propArrayStringFilled)).toBe(true)
    })

    it('starts_with with string that does not start with one of the values in extra args as json object should return false', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj, obj.propArrayMixFilled)).toBe(false)
    })

    it('starts_with with string that starts with one of the values in extra args as json string should return true', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj, obj.propStringStringArray)).toBe(true)
    })

    it('starts_with with string that does not start with one of the values in extra args as json string should return false', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj, obj.propStringMixArray)).toBe(false)
    })

    it('starts_with with string that starts with values in arguments but not in extra args should return true', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', obj.propArrayStringFilled.join(','), [], msgObj, obj.propStringMixArray)).toBe(true)
    })

    it('starts_with with string that starts with values in extra args but not in arguments should return false', () => {
      expect(validator('propStringRandomOther1', obj, 'starts_with', obj.propArrayMixFilled.join(','), [], msgObj, obj.propArrayStringFilled)).toBe(false)
    })

    it('starts_with with valid string but no arguments or extra args should throw an error', () => {
      expect(() => validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj)).toThrow(Error)
    })

    it('starts_with with valid string but no arguments and invalid extra args (not an array) should throw an error', () => {
      expect(() => validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj, obj.propValidEmail)).toThrow(Error)
    })

    it('starts_with with valid string but no arguments and a non string and non json object/array should throw an error', () => {
      expect(() => validator('propStringRandomOther1', obj, 'starts_with', '', [], msgObj, obj.currentMoment)).toThrow(Error)
    })

    it('starts_with failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.starts_with
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther1', obj, 'starts_with', obj.propArrayMixFilled.join(','), errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther1').replace(':value', obj.propArrayMixFilled.join(',')))
    })
  })

  describe('timezone', () => {
    it('timezone with valid timezone should return true', () => {
      expect(validator('timezoneRandom', obj, 'timezone', '', [], msgObj)).toBe(true)
    })

    it('timezone with invalid timezone should return false', () => {
      expect(validator('propStringRandomOther6', obj, 'timezone', '', [], msgObj)).toBe(false)
    })

    it('timezone with valid timezone but with arguments should throw an error', () => {
      expect(() => validator('uuidV4', obj, 'timezone', 'true', [], msgObj)).toThrow(Error)
    })

    it('timezone failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.timezone
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther6', obj, 'timezone', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther6'))
    })
  })

  describe('url', () => {
    it('url with valid url should return true', () => {
      expect(validator('url', obj, 'url', '', [], msgObj)).toBe(true)
    })

    it('url with invalid url should return false', () => {
      expect(validator('uuidV1', obj, 'url', '', [], msgObj)).toBe(false)
    })

    it('url with valid url but with arguments should throw an error', () => {
      expect(() => validator('url', obj, 'url', 'url', [], msgObj)).toThrow(Error)
    })

    it('url failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.url
      errorMessages.splice(0, errorMessages.length)

      validator('uuidV1', obj, 'url', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'uuidV1'))
    })
  })

  describe('uuid', () => {
    it('uuid with valid uuid v1 should return true', () => {
      expect(validator('uuidV1', obj, 'uuid', '', [], msgObj)).toBe(true)
    })

    it('uuid with valid uuid v4 should return true', () => {
      expect(validator('uuidV4', obj, 'uuid', '', [], msgObj)).toBe(true)
    })

    it('uuid with invalid uuid should return false', () => {
      expect(validator('propStringRandomOther6', obj, 'uuid', '', [], msgObj)).toBe(false)
    })

    it('uuid with valid uuid but with arguments should throw an error', () => {
      expect(() => validator('uuidV4', obj, 'uuid', 'true', [], msgObj)).toThrow(Error)
    })

    it('uuid failing validation with custom message should result in the message contained in the resulting error messages', () => {
      msgObj.property = definedMessages.string.uuid
      errorMessages.splice(0, errorMessages.length)

      validator('propStringRandomOther6', obj, 'uuid', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringRandomOther6'))
    })
  })
})
