const validator = require('../../lib/types/date')
const obj = require('../object')

describe('date', () => {
  it('date_test should throw an error since its not a valid rule for date', () => {
    expect(() => validator(obj.propBooleanFalse, 'date_test', '', [], '')).toThrow(Error)
  })

  describe('after', () => {
    const afterErrorMessages = []

    it('after with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'after', '', afterErrorMessages, '', obj.currentMoment)).toBe(false)
    })

    it('after with date value in the future with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('futureDate', obj, 'after', '', afterErrorMessages, '', obj.currentDateSlash)).toBe(true)
    })

    it('after with moment value of now with sub-args date of now should return false', () => {
      expect(validator('currentMoment', obj, 'after', '', afterErrorMessages, '', obj.currentDate)).toBe(false)
    })

    it('after with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'after', obj.pastMoment.format('MM/DD/YYYY'), afterErrorMessages, '')).toBe(false)
    })

    it('after with date string value with separator "slash" of now with arguments of date past using separator "slash" should return true', () => {
      expect(validator('currentDateSlash', obj, 'after', obj.pastMoment.format('MM/DD/YYYY'), afterErrorMessages, '')).toBe(true)
    })

    it('after with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'after', obj.pastDateSpace, afterErrorMessages, '')).toThrow(Error)
    })

    it('after with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return false', () => {
      expect(validator('currentDateSlash', obj, 'after', obj.futureMoment.format('MM/DD/YYYY'), afterErrorMessages, '', obj.pastMoment)).toBe(false)
    })

    it('after with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', afterErrorMessages, '')).toThrow(Error)
    })

    it('after with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', 'date', afterErrorMessages, '')).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', afterErrorMessages, '', obj.propStringRandom)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', afterErrorMessages, '', obj.invalidMoment)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', afterErrorMessages, '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', afterErrorMessages, '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('after_or_equal', () => {
    const afterEqualErrorMessages = []

    it('after_or_equal with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.currentMoment)).toBe(false)
    })

    it('after_or_equal with date value in the future with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('futureDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.currentDateSlash)).toBe(true)
    })

    it('after_or_equal with moment value of now with sub-args date of now should return true', () => {
      expect(validator('currentMoment', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.currentDate)).toBe(true)
    })

    it('after_or_equal with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'after_or_equal', obj.pastMoment.format('MM/DD/YYYY'), afterEqualErrorMessages, '')).toBe(false)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date past using separator "slash" should return true', () => {
      expect(validator('currentDateSlash', obj, 'after_or_equal', obj.pastMoment.format('MM/DD/YYYY'), afterEqualErrorMessages, '')).toBe(true)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'after_or_equal', obj.pastDateSpace, afterEqualErrorMessages, '')).toThrow(Error)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return false', () => {
      expect(validator('currentDateSlash', obj, 'after_or_equal', obj.futureMoment.format('MM/DD/YYYY'), afterEqualErrorMessages, '', obj.pastMoment)).toBe(false)
    })

    it('after_or_equal with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '')).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', 'date', afterEqualErrorMessages, '')).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.propStringRandom)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.invalidMoment)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', afterEqualErrorMessages, '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('before', () => {
    const beforeErrorMessages = []

    it('before with date value in the past with sub-args moment of now should return true', () => {
      expect(validator('pastDate', obj, 'before', '', beforeErrorMessages, '', obj.currentMoment)).toBe(true)
    })

    it('before with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'before', '', beforeErrorMessages, '', obj.currentDateSlash)).toBe(false)
    })

    it('before with moment value of now with sub-args date of now should return false', () => {
      expect(validator('currentMoment', obj, 'before', '', beforeErrorMessages, '', obj.currentDate)).toBe(false)
    })

    it('before with date string value with separator "dash" of now with arguments of date using separator "slash" future should return false', () => {
      expect(validator('currentDateDash', obj, 'before', obj.futureMoment.format('MM/DD/YYYY'), beforeErrorMessages, '')).toBe(false)
    })

    it('before with date string value with separator "slash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateSlash', obj, 'before', obj.pastMoment.format('MM/DD/YYYY'), beforeErrorMessages, '')).toBe(false)
    })

    it('before with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'before', obj.pastDateSpace, beforeErrorMessages, '')).toThrow(Error)
    })

    it('before with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return true', () => {
      expect(validator('currentDateSlash', obj, 'before', obj.futureMoment.format('MM/DD/YYYY'), beforeErrorMessages, '', obj.pastMoment)).toBe(true)
    })

    it('before with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', beforeErrorMessages, '')).toThrow(Error)
    })

    it('before with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', 'date', beforeErrorMessages, '')).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', beforeErrorMessages, '', obj.propStringRandom)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', beforeErrorMessages, '', obj.invalidMoment)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', beforeErrorMessages, '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', beforeErrorMessages, '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('before_or_equal', () => {
    const beforeEqualErrorMessages = []

    it('before_or_equal with date value in the past with sub-args moment of now should return true', () => {
      expect(validator('pastDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.currentMoment)).toBe(true)
    })

    it('before_or_equal with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.currentDateSlash)).toBe(false)
    })

    it('before_or_equal with moment value of now with sub-args date of now should return true', () => {
      expect(validator('currentMoment', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.currentDate)).toBe(true)
    })

    it('before_or_equal with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'before_or_equal', obj.pastMoment.format('MM/DD/YYYY'), beforeEqualErrorMessages, '')).toBe(false)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateSlash', obj, 'before_or_equal', obj.pastMoment.format('MM/DD/YYYY'), beforeEqualErrorMessages, '')).toBe(false)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'before_or_equal', obj.pastDateSpace, beforeEqualErrorMessages, '')).toThrow(Error)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return true', () => {
      expect(validator('currentDateSlash', obj, 'before_or_equal', obj.futureMoment.format('MM/DD/YYYY'), beforeEqualErrorMessages, '', obj.pastMoment)).toBe(true)
    })

    it('before_or_equal with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '')).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', 'date', beforeEqualErrorMessages, '')).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.propStringRandom)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.invalidMoment)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', beforeEqualErrorMessages, '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('equals', () => {
    const equalsErrorMessages = []

    it('equals with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'equals', '', equalsErrorMessages, '', obj.currentMoment)).toBe(false)
    })

    it('equals with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'equals', '', equalsErrorMessages, '', obj.currentDateSlash)).toBe(false)
    })

    it('equals with moment value of now with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('currentMoment', obj, 'equals', '', equalsErrorMessages, '', obj.currentDateSlash)).toBe(true)
    })

    it('equals with moment value of now with arguments date string using "/" separator of now should return true', () => {
      expect(validator('currentMoment', obj, 'equals', obj.currentDateSlash, equalsErrorMessages, '')).toBe(true)
    })

    it('equals with date string value with separator "dash" of now with arguments of date using separator "slash" of now should return false', () => {
      expect(validator('currentDateDash', obj, 'equals', obj.currentDateSlash, equalsErrorMessages, '')).toBe(false)
    })

    it('equals with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'equals', obj.pastDateSpace, equalsErrorMessages, '')).toThrow(Error)
    })

    it('equals with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', equalsErrorMessages, '')).toThrow(Error)
    })

    it('equals with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', 'equals', 'date', equalsErrorMessages, '')).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', equalsErrorMessages, '', obj.propStringRandom)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', equalsErrorMessages, '', obj.invalidMoment)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', equalsErrorMessages, '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', equalsErrorMessages, '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('format', () => {
    const formatErrorMessages = []

    it('format with date string format matching argument should return true', () => {
      expect(validator('currentDateSlash', obj, 'format', 'MM/DD/YYYY', formatErrorMessages, '')).toBe(true)
    })

    it('format with date string format that does not match argument should return false', () => {
      expect(validator('currentDateSpace', obj, 'format', 'MM/DD/YYYY', formatErrorMessages, '')).toBe(false)
    })

    it('format with date string format and an invalid argument string should return false', () => {
      expect(validator('currentDateSpace', obj, 'format', obj.propValidEmail, formatErrorMessages, '')).toBe(false)
    })

    it('format without arguments nor sub-args should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'format', '', formatErrorMessages, '')).toThrow(Error)
    })

    it('format without arguments but sub-args should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'format', '', formatErrorMessages, '', 'MM/DD/YYYY')).toThrow(Error)
    })

    it('format with value passed as not string should throw an error', () => {
      expect(() => validator('currentDate', obj, 'format', 'MM/DD/YYYY', formatErrorMessages, '', 'MM/DD/YYYY')).toThrow(Error)
    })
  })
})
