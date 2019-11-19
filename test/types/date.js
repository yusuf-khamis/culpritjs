const validator = require('../../lib/types/date')
const obj = require('../object')
const definedMessages = require('../../lib/messages')
const moment = require('moment-timezone')

describe('date', () => {
  const dateFormat = 'MM/DD/YYYY'

  const msgObj = {
    property: '',
    arg: ''
  }

  const errorMessages = []

  it('date_test should throw an error since its not a valid rule for date', () => {
    expect(() => validator('pastDate', obj.propBooleanFalse, 'date_test', '', [], msgObj)).toThrow(Error)
  })

  describe('after', () => {
    it('after with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'after', '', [], msgObj, obj.currentMoment)).toBe(false)
    })

    it('after with date value in the future with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('futureDate', obj, 'after', '', [], msgObj, obj.currentDateSlash)).toBe(true)
    })

    it('after with moment value of now with sub-args date of now should return false', () => {
      expect(validator('currentMoment', obj, 'after', '', [], msgObj, obj.currentDate)).toBe(false)
    })

    it('after with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'after', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(false)
    })

    it('after with date string value with separator "slash" of now with arguments of date past using separator "slash" should return true', () => {
      expect(validator('currentDateSlash', obj, 'after', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(true)
    })

    it('after with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'after', obj.pastDateSpace, [], msgObj)).toThrow(Error)
    })

    it('after with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return false', () => {
      expect(validator('currentDateSlash', obj, 'after', obj.futureMoment.format('MM/DD/YYYY'), [], msgObj, obj.pastMoment)).toBe(false)
    })

    it('after with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], msgObj)).toThrow(Error)
    })

    it('after with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', 'date', [], msgObj)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], msgObj, obj.propStringRandom)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], msgObj, obj.invalidMoment)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], msgObj, obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], msgObj, obj.propNumberRandom)).toThrow(Error)
    })

    it('after failing validation with custom messages should result in the message contained in the final error messages array', () => {
      msgObj.property = definedMessages.date.after
      errorMessages.splice(0, errorMessages.length)

      validator('pastDate', obj, 'after', '', errorMessages, msgObj, obj.currentMoment)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'pastDate').replace(':value', obj.currentMoment.toString()))
    })
  })

  describe('after_or_equal', () => {
    it('after_or_equal with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'after_or_equal', '', [], msgObj, obj.currentMoment)).toBe(false)
    })

    it('after_or_equal with date value in the future with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('futureDate', obj, 'after_or_equal', '', [], msgObj, obj.currentDateSlash)).toBe(true)
    })

    it('after_or_equal with moment value of now with sub-args date of now should return true', () => {
      expect(validator('currentMoment', obj, 'after_or_equal', '', [], msgObj, obj.currentDate)).toBe(true)
    })

    it('after_or_equal with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'after_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(false)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date past using separator "slash" should return true', () => {
      expect(validator('currentDateSlash', obj, 'after_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(true)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'after_or_equal', obj.pastDateSpace, [], msgObj)).toThrow(Error)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return false', () => {
      expect(validator('currentDateSlash', obj, 'after_or_equal', obj.futureMoment.format('MM/DD/YYYY'), [], msgObj, obj.pastMoment)).toBe(false)
    })

    it('after_or_equal with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], msgObj)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', 'date', [], msgObj)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], msgObj, obj.propStringRandom)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], msgObj, obj.invalidMoment)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], msgObj, obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], msgObj, obj.propNumberRandom)).toThrow(Error)
    })

    it('after_or_equal failing validation with custom messages should result in the message contained in the final error messages array', () => {
      msgObj.property = definedMessages.date.after_or_equal
      errorMessages.splice(0, errorMessages.length)

      validator('pastDate', obj, 'after_or_equal', '', errorMessages, msgObj, obj.currentMoment)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'pastDate').replace(':value', obj.currentMoment.toString()))
    })
  })

  describe('before', () => {
    it('before with date value in the past with sub-args moment of now should return true', () => {
      expect(validator('pastDate', obj, 'before', '', [], msgObj, obj.currentMoment)).toBe(true)
    })

    it('before with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'before', '', [], msgObj, obj.currentDateSlash)).toBe(false)
    })

    it('before with moment value of now with sub-args date of now should return false', () => {
      expect(validator('currentMoment', obj, 'before', '', [], msgObj, obj.currentDate)).toBe(false)
    })

    it('before with date string value with separator "dash" of now with arguments of date using separator "slash" future should return false', () => {
      expect(validator('currentDateDash', obj, 'before', obj.futureMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(false)
    })

    it('before with date string value with separator "slash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateSlash', obj, 'before', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(false)
    })

    it('before with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'before', obj.pastDateSpace, [], msgObj)).toThrow(Error)
    })

    it('before with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return true', () => {
      expect(validator('currentDateSlash', obj, 'before', obj.futureMoment.format('MM/DD/YYYY'), [], msgObj, obj.pastMoment)).toBe(true)
    })

    it('before with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], msgObj)).toThrow(Error)
    })

    it('before with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', 'date', [], msgObj)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], msgObj, obj.propStringRandom)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], msgObj, obj.invalidMoment)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], msgObj, obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], msgObj, obj.propNumberRandom)).toThrow(Error)
    })

    it('before failing validation with custom messages should result in the message contained in the final error messages array', () => {
      msgObj.property = definedMessages.date.before
      errorMessages.splice(0, errorMessages.length)

      validator('futureDate', obj, 'before', '', errorMessages, msgObj, obj.currentDateSlash)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'futureDate').replace(':value', moment(obj.currentDateSlash, dateFormat).toString()))
    })
  })

  describe('before_or_equal', () => {
    it('before_or_equal with date value in the past with sub-args moment of now should return true', () => {
      expect(validator('pastDate', obj, 'before_or_equal', '', [], msgObj, obj.currentMoment)).toBe(true)
    })

    it('before_or_equal with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'before_or_equal', '', [], msgObj, obj.currentDateSlash)).toBe(false)
    })

    it('before_or_equal with moment value of now with sub-args date of now should return true', () => {
      expect(validator('currentMoment', obj, 'before_or_equal', '', [], msgObj, obj.currentDate)).toBe(true)
    })

    it('before_or_equal with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'before_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(false)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateSlash', obj, 'before_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], msgObj)).toBe(false)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'before_or_equal', obj.pastDateSpace, [], msgObj)).toThrow(Error)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return true', () => {
      expect(validator('currentDateSlash', obj, 'before_or_equal', obj.futureMoment.format('MM/DD/YYYY'), [], msgObj, obj.pastMoment)).toBe(true)
    })

    it('before_or_equal with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], msgObj)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', 'date', [], msgObj)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], msgObj, obj.propStringRandom)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], msgObj, obj.invalidMoment)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], msgObj, obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], msgObj, obj.propNumberRandom)).toThrow(Error)
    })

    it('before_or_equal failing validation with custom messages should result in the message contained in the final error messages array', () => {
      msgObj.property = definedMessages.date.before_or_equal
      errorMessages.splice(0, errorMessages.length)

      validator('futureDate', obj, 'before_or_equal', '', errorMessages, msgObj, obj.currentDateSlash)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'futureDate').replace(':value', moment(obj.currentDateSlash, dateFormat).toString()))
    })
  })

  describe('equals', () => {
    it('equals with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'equals', '', [], msgObj, obj.currentMoment)).toBe(false)
    })

    it('equals with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'equals', '', [], msgObj, obj.currentDateSlash)).toBe(false)
    })

    it('equals with moment value of now with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('currentMoment', obj, 'equals', '', [], msgObj, obj.currentDateSlash)).toBe(true)
    })

    it('equals with moment value of now with arguments date string using "/" separator of now should return true', () => {
      expect(validator('currentMoment', obj, 'equals', obj.currentDateSlash, [], msgObj)).toBe(true)
    })

    it('equals with date string value with separator "dash" of now with arguments of date using separator "slash" of now should return false', () => {
      expect(validator('currentDateDash', obj, 'equals', obj.currentDateSlash, [], msgObj)).toBe(false)
    })

    it('equals with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'equals', obj.pastDateSpace, [], msgObj)).toThrow(Error)
    })

    it('equals with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], msgObj)).toThrow(Error)
    })

    it('equals with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', 'equals', 'date', '', [], msgObj)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], msgObj, obj.propStringRandom)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], msgObj, obj.invalidMoment)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], msgObj, obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], msgObj, obj.propNumberRandom)).toThrow(Error)
    })

    it('equals failing validation with custom messages should result in the message contained in the final error messages array', () => {
      msgObj.property = definedMessages.date.date_equals
      errorMessages.splice(0, errorMessages.length)

      validator('futureDate', obj, 'equals', '', errorMessages, msgObj, obj.currentDateSlash)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'futureDate').replace(':value', moment(obj.currentDateSlash, dateFormat).toString()))
    })
  })

  describe('format', () => {
    it('format with date string format matching argument should return true', () => {
      expect(validator('currentDateSlash', obj, 'format', 'MM/DD/YYYY', [], msgObj)).toBe(true)
    })

    it('format with date string format that does not match argument should return false', () => {
      expect(validator('currentDateSpace', obj, 'format', 'MM/DD/YYYY', [], msgObj)).toBe(false)
    })

    it('format with date string format and an invalid argument string should return false', () => {
      expect(validator('currentDateSpace', obj, 'format', obj.propValidEmail, [], msgObj)).toBe(false)
    })

    it('format without arguments nor sub-args should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'format', '', [], msgObj)).toThrow(Error)
    })

    it('format without arguments but sub-args should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'format', '', [], msgObj, 'MM/DD/YYYY')).toThrow(Error)
    })

    it('format with value passed as not string should return false', () => {
      expect(validator('currentDate', obj, 'format', 'MM/DD/YYYY', [], msgObj, 'MM/DD/YYYY')).toBe(false)
    })

    it('format failing validation with custom messages should result in the message contained in the final error messages array', () => {
      msgObj.property = definedMessages.date.date_equals
      errorMessages.splice(0, errorMessages.length)

      validator('currentDateDash', obj, 'equals', obj.currentDateSlash, errorMessages, msgObj)

      expect(errorMessages).toContain(msgObj.property.replace(':field', 'currentDateDash').replace(':value', obj.currentDateSlash))
    })
  })
})
