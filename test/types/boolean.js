const validator = require('../../lib/types/boolean')
const obj = require('../object')

describe('boolean', () => {
  it('boolean_test should throw an error since its not one of supported validation rule of a boolean', () => {
    expect(() => validator('propBooleanFalse', obj, 'boolean_test', '', [], '')).toThrow(Error)
  })

  describe('accepted', () => {
    const acceptedErrorMessages = []

    it('accepted for boolean true value should return true', () => {
      expect(validator('propBooleanTrue', obj, 'accepted', '', acceptedErrorMessages, '')).toBe(true)
    })

    it('accepted for boolean false value should return false', () => {
      expect(validator('propBooleanFalse', obj, 'accepted', '', acceptedErrorMessages, '')).toBe(false)
    })

    it('accepted for string true value should return false', () => {
      expect(validator('propStringTrue', obj, 'accepted', '', acceptedErrorMessages, '')).toBe(false)
    })

    it('accepted should throw an error for arguments passed', () => {
      expect(() => validator('propBooleanTrue', obj, 'accepted', 'test', acceptedErrorMessages, '')).toThrow(Error)
    })
  })

  describe('not_accepted', () => {
    const notAcceptedErrorMessages = []

    it('not_accepted for boolean true value should return false', () => {
      expect(validator('propBooleanTrue', obj, 'not_accepted', '', notAcceptedErrorMessages, '')).toBe(false)
    })

    it('not_accepted for boolean false value should return true', () => {
      expect(validator('propBooleanFalse', obj, 'not_accepted', '', notAcceptedErrorMessages, '')).toBe(true)
    })

    it('not_accepted for string false value should return false', () => {
      expect(validator('propStringFalse', obj, 'not_accepted', '', notAcceptedErrorMessages, '')).toBe(false)
    })

    it('not_accepted should throw an error for arguments passed', () => {
      expect(() => validator('propBooleanFalse', obj, 'not_accepted', 'test', notAcceptedErrorMessages, '')).toThrow(Error)
    })
  })
})
