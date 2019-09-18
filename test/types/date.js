const validator = require('../../lib/types/date')
const obj = require('../object')

describe('date', () => {
  it('date_test should throw an error since its not a valid rule for date', () => {
    expect(() => validator('propBooleanFalse', obj, 'date_test', '', [], '')).toThrow(Error)
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

    it('after with date string value with separator "dash" of now with arguments of date past should return false', () => {
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

    it('after_or_equal with date string value with separator "dash" of now with arguments of date past should return false', () => {
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
  })

  describe('before', () => {
    //
  })

  describe('before_or_equal', () => {
    //
  })

  describe('equals', () => {
    //
  })

  describe('format', () => {
    //
  })
})
