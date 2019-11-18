const validator = require('../../lib/types/boolean')
const obj = require('../object')

describe('boolean', () => {
  const msgObj = {
    property: '',
    arg: ''
  }

  const errorMessages = []

  it('boolean_test should throw an error since its not one of supported validation rule of a boolean', () => {
    expect(() => validator('propBooleanFalse', obj, 'boolean_test', '', [], msgObj)).toThrow(Error)
  })

  describe('accepted', () => {
    it('accepted for boolean true value should return true', () => {
      expect(validator('propBooleanTrue', obj, 'accepted', '', [], msgObj)).toBe(true)
    })

    it('accepted for boolean false value should return false', () => {
      expect(validator('propBooleanFalse', obj, 'accepted', '', [], msgObj)).toBe(false)
    })

    it('accepted for string true value should return false', () => {
      expect(validator('propStringTrue', obj, 'accepted', '', [], msgObj)).toBe(false)
    })

    it('accepted should throw an error for arguments passed', () => {
      expect(() => validator('propBooleanTrue', obj, 'accepted', 'test', [], msgObj)).toThrow(Error)
    })

    it('accepted failed validation with empty message string should have the empty string in the error messages', () => {
      msgObj.property = ''
      errorMessages.splice(0, errorMessages.length)

      validator('propStringTrue', obj, 'accepted', '', errorMessages, msgObj)

      expect(errorMessages).toContain('')
    })

    it('accepted failed validation with custom message string should have the custom message with tokens replaced with real values in the error messages', () => {
      msgObj.property = ':field must be a valid boolean truthy value'
      errorMessages.splice(0, errorMessages.length)

      validator('propStringTrue', obj, 'accepted', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringTrue'))
    })
  })

  describe('not_accepted', () => {
    it('not_accepted for boolean true value should return false', () => {
      expect(validator('propBooleanTrue', obj, 'not_accepted', '', [], msgObj)).toBe(false)
    })

    it('not_accepted for boolean false value should return true', () => {
      expect(validator('propBooleanFalse', obj, 'not_accepted', '', [], msgObj)).toBe(true)
    })

    it('not_accepted for string false value should return false', () => {
      expect(validator('propStringFalse', obj, 'not_accepted', '', [], msgObj)).toBe(false)
    })

    it('not_accepted should throw an error for arguments passed', () => {
      expect(() => validator('propBooleanFalse', obj, 'not_accepted', 'test', [], msgObj)).toThrow(Error)
    })

    it('not_accepted failed validation with empty message string should have the empty string in the error messages', () => {
      msgObj.property = ''
      errorMessages.splice(0, errorMessages.length)

      validator('propStringFalse', obj, 'not_accepted', '', errorMessages, msgObj)

      expect(errorMessages).toContain('')
    })

    it('not_accepted failed validation with custom message string should have the custom message with tokens replaced with real values in the error messages', () => {
      msgObj.property = ':field must be a valid boolean falsy value'
      errorMessages.splice(0, errorMessages.length)

      validator('propStringFalse', obj, 'not_accepted', '', errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'propStringFalse'))
    })
  })
})
