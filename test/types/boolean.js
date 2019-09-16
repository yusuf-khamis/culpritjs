const validator = require('../../lib/types/boolean')
const obj = require('../object')

describe('boolean', () => {
  describe('accepted', () => {
    const acceptedErrorMessages = []

    test('accepted for boolean true value should return true', () => {
      expect(validator('propBooleanTrue', obj, 'accepted', '', acceptedErrorMessages, '')).toBe(true)
    })

    test('accepted for boolean false value should return false', () => {
      expect(validator('propBooleanFalse', obj, 'accepted', '', acceptedErrorMessages, '')).toBe(false)
    })

    test('accepted for string true value should return false', () => {
      expect(validator('propStringTrue', obj, 'accepted', '', acceptedErrorMessages, '')).toBe(false)
    })

    test('not_accepted for boolean true value should return false', () => {
      expect(validator('propBooleanTrue', obj, 'not_accepted', '', acceptedErrorMessages, '')).toBe(false)
    })

    test('not_accepted for boolean false value should return true', () => {
      expect(validator('propBooleanFalse', obj, 'not_accepted', '', acceptedErrorMessages, '')).toBe(true)
    })

    test('not_accepted for string false value should return false', () => {
      expect(validator('propStringFalse', obj, 'not_accepted', '', acceptedErrorMessages, '')).toBe(false)
    })

    test('accepted should throw an error for arguments passed', () => {
      expect(() => validator('propBooleanTrue', obj, 'accepted', 'test', acceptedErrorMessages, '')).toThrow(Error)
    })

    test('not_accepted should throw an error for arguments passed', () => {
      expect(() => validator('propBooleanFalse', obj, 'not_accepted', 'test', acceptedErrorMessages, '')).toThrow(Error)
    })

    test('test should throw an error since its not one of supported validation rule of a boolean', () => {
      expect(() => validator('propBooleanFalse', obj, 'test', '', acceptedErrorMessages, '')).toThrow(Error)
    })
  })
})
