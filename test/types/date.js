const validator = require('../../lib/types/date')
const obj = require('../object')

describe('date', () => {
  it('date_test should throw an error since its not a valid rule for date', () => {
    expect(() => validator(obj.propBooleanFalse, 'date_test', '', [], '')).toThrow(Error)
  })

  describe('after', () => {
    it('after with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'after', '', [], '', obj.currentMoment)).toBe(false)
    })

    it('after with date value in the future with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('futureDate', obj, 'after', '', [], '', obj.currentDateSlash)).toBe(true)
    })

    it('after with moment value of now with sub-args date of now should return false', () => {
      expect(validator('currentMoment', obj, 'after', '', [], '', obj.currentDate)).toBe(false)
    })

    it('after with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'after', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(false)
    })

    it('after with date string value with separator "slash" of now with arguments of date past using separator "slash" should return true', () => {
      expect(validator('currentDateSlash', obj, 'after', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(true)
    })

    it('after with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'after', obj.pastDateSpace, [], '')).toThrow(Error)
    })

    it('after with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return false', () => {
      expect(validator('currentDateSlash', obj, 'after', obj.futureMoment.format('MM/DD/YYYY'), [], '', obj.pastMoment)).toBe(false)
    })

    it('after with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], '')).toThrow(Error)
    })

    it('after with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', 'date', [], '')).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], '', obj.propStringRandom)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], '', obj.invalidMoment)).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('after with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after', '', [], '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('after_or_equal', () => {
    it('after_or_equal with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'after_or_equal', '', [], '', obj.currentMoment)).toBe(false)
    })

    it('after_or_equal with date value in the future with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('futureDate', obj, 'after_or_equal', '', [], '', obj.currentDateSlash)).toBe(true)
    })

    it('after_or_equal with moment value of now with sub-args date of now should return true', () => {
      expect(validator('currentMoment', obj, 'after_or_equal', '', [], '', obj.currentDate)).toBe(true)
    })

    it('after_or_equal with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'after_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(false)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date past using separator "slash" should return true', () => {
      expect(validator('currentDateSlash', obj, 'after_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(true)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'after_or_equal', obj.pastDateSpace, [], '')).toThrow(Error)
    })

    it('after_or_equal with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return false', () => {
      expect(validator('currentDateSlash', obj, 'after_or_equal', obj.futureMoment.format('MM/DD/YYYY'), [], '', obj.pastMoment)).toBe(false)
    })

    it('after_or_equal with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], '')).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', 'date', [], '')).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], '', obj.propStringRandom)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], '', obj.invalidMoment)).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('after_or_equal with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'after_or_equal', '', [], '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('before', () => {
    it('before with date value in the past with sub-args moment of now should return true', () => {
      expect(validator('pastDate', obj, 'before', '', [], '', obj.currentMoment)).toBe(true)
    })

    it('before with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'before', '', [], '', obj.currentDateSlash)).toBe(false)
    })

    it('before with moment value of now with sub-args date of now should return false', () => {
      expect(validator('currentMoment', obj, 'before', '', [], '', obj.currentDate)).toBe(false)
    })

    it('before with date string value with separator "dash" of now with arguments of date using separator "slash" future should return false', () => {
      expect(validator('currentDateDash', obj, 'before', obj.futureMoment.format('MM/DD/YYYY'), [], '')).toBe(false)
    })

    it('before with date string value with separator "slash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateSlash', obj, 'before', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(false)
    })

    it('before with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'before', obj.pastDateSpace, [], '')).toThrow(Error)
    })

    it('before with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return true', () => {
      expect(validator('currentDateSlash', obj, 'before', obj.futureMoment.format('MM/DD/YYYY'), [], '', obj.pastMoment)).toBe(true)
    })

    it('before with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], '')).toThrow(Error)
    })

    it('before with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', 'date', [], '')).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], '', obj.propStringRandom)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], '', obj.invalidMoment)).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('before with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before', '', [], '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('before_or_equal', () => {
    it('before_or_equal with date value in the past with sub-args moment of now should return true', () => {
      expect(validator('pastDate', obj, 'before_or_equal', '', [], '', obj.currentMoment)).toBe(true)
    })

    it('before_or_equal with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'before_or_equal', '', [], '', obj.currentDateSlash)).toBe(false)
    })

    it('before_or_equal with moment value of now with sub-args date of now should return true', () => {
      expect(validator('currentMoment', obj, 'before_or_equal', '', [], '', obj.currentDate)).toBe(true)
    })

    it('before_or_equal with date string value with separator "dash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateDash', obj, 'before_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(false)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date past using separator "slash" should return false', () => {
      expect(validator('currentDateSlash', obj, 'before_or_equal', obj.pastMoment.format('MM/DD/YYYY'), [], '')).toBe(false)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'before_or_equal', obj.pastDateSpace, [], '')).toThrow(Error)
    })

    it('before_or_equal with date string value with separator "slash" of now with arguments of date future using separator "slash" and sub-args of moment past should return true', () => {
      expect(validator('currentDateSlash', obj, 'before_or_equal', obj.futureMoment.format('MM/DD/YYYY'), [], '', obj.pastMoment)).toBe(true)
    })

    it('before_or_equal with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], '')).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', 'date', [], '')).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], '', obj.propStringRandom)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], '', obj.invalidMoment)).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('before_or_equal with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'before_or_equal', '', [], '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('equals', () => {
    it('equals with date value in the past with sub-args moment of now should return false', () => {
      expect(validator('pastDate', obj, 'equals', '', [], '', obj.currentMoment)).toBe(false)
    })

    it('equals with date value in the future with sub-args date string using "/" separator of now should return false', () => {
      expect(validator('futureDate', obj, 'equals', '', [], '', obj.currentDateSlash)).toBe(false)
    })

    it('equals with moment value of now with sub-args date string using "/" separator of now should return true', () => {
      expect(validator('currentMoment', obj, 'equals', '', [], '', obj.currentDateSlash)).toBe(true)
    })

    it('equals with moment value of now with arguments date string using "/" separator of now should return true', () => {
      expect(validator('currentMoment', obj, 'equals', obj.currentDateSlash, [], '')).toBe(true)
    })

    it('equals with date string value with separator "dash" of now with arguments of date using separator "slash" of now should return false', () => {
      expect(validator('currentDateDash', obj, 'equals', obj.currentDateSlash, [], '')).toBe(false)
    })

    it('equals with date string value with separator "slash" of now with arguments of date past using separator "space" should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'equals', obj.pastDateSpace, [], '')).toThrow(Error)
    })

    it('equals with date value of now but with no arguments and sub-args should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], '')).toThrow(Error)
    })

    it('equals with date value of now but with invalid arguments provided should throw an error', () => {
      expect(() => validator('currentDate', 'equals', 'date', [], '')).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], '', obj.propStringRandom)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args moment provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], '', obj.invalidMoment)).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args date provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], '', obj.invalidMoment.toDate())).toThrow(Error)
    })

    it('equals with date value of now but with invalid sub-args of invalid type provided should throw an error', () => {
      expect(() => validator('currentDate', obj, 'equals', '', [], '', obj.propNumberRandom)).toThrow(Error)
    })
  })

  describe('format', () => {
    it('format with date string format matching argument should return true', () => {
      expect(validator('currentDateSlash', obj, 'format', 'MM/DD/YYYY', [], '')).toBe(true)
    })

    it('format with date string format that does not match argument should return false', () => {
      expect(validator('currentDateSpace', obj, 'format', 'MM/DD/YYYY', [], '')).toBe(false)
    })

    it('format with date string format and an invalid argument string should return false', () => {
      expect(validator('currentDateSpace', obj, 'format', obj.propValidEmail, [], '')).toBe(false)
    })

    it('format without arguments nor sub-args should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'format', '', [], '')).toThrow(Error)
    })

    it('format without arguments but sub-args should throw an error', () => {
      expect(() => validator('currentDateSlash', obj, 'format', '', [], '', 'MM/DD/YYYY')).toThrow(Error)
    })

    it('format with value passed as not string should throw an error', () => {
      expect(() => validator('currentDate', obj, 'format', 'MM/DD/YYYY', [], '', 'MM/DD/YYYY')).toThrow(Error)
    })
  })
})
