const moment = require('moment-timezone')
const dateRegex = /^(0?[0-9]|1[0-2])([/])(0?[0-9]|[0-2][0-9]|3[1-2])([/])(\d{4})$/

function validate (property, object, rule, args, messages, rawMessage, momentDate = null) {
  switch (rule) {
    case 'after': {
      if (!args && !momentDate) {
        throw new Error('after should have at least one argument')
      }

      if (!validateArgs(rule, args, momentDate, object[property])) {
        return false
      }

      if (convertToMoment(object[property]).isAfter(getMoment(args, momentDate, rule))) {
        return true
      }

      messages.push(rawMessage.replace(':field', property).replace(':value', args))

      return false
    }

    case 'after_or_equal': {
      if (!args && !momentDate) {
        throw new Error('after_or_equal should have at least one argument')
      }

      if (!validateArgs(rule, args, momentDate, object[property])) {
        return false
      }

      if (convertToMoment(object[property]).isSameOrAfter(getMoment(args, momentDate, rule))) {
        return true
      }

      messages.push(rawMessage.replace(':field', property).replace(':value', args))

      return false
    }

    case 'before': {
      if (!args && !momentDate) {
        throw new Error('before should have at least one argument')
      }

      if (!validateArgs(rule, args, momentDate, object[property])) {
        return false
      }

      if (convertToMoment(object[property]).isBefore(getMoment(args, momentDate, rule))) {
        return true
      }

      messages.push(rawMessage.replace(':field', property).replace(':value', args))

      return false
    }

    case 'before_or_equal': {
      if (!args && !momentDate) {
        throw new Error('before_or_equal should have at least one argument')
      }

      if (!validateArgs(rule, args, momentDate, object[property])) {
        return false
      }

      if (convertToMoment(object[property]).isSameOrBefore(getMoment(args, momentDate, rule))) {
        return true
      }

      messages.push(rawMessage.replace(':field', property).replace(':value', args))

      return false
    }

    case 'equals': {
      if (!args && !momentDate) {
        throw new Error('date_equals should have at least one argument')
      }

      if (!validateArgs(rule, args, momentDate, object[property])) {
        return false
      }

      if (convertToMoment(object[property]).diff(getMoment(args, momentDate, rule), 'days') === 0) {
        return true
      }

      messages.push(rawMessage.replace(':field', property).replace(':value', args))

      return false
    }

    case 'format': {
      if (!args) {
        throw new Error('date_format should have at least one argument')
      }

      if (typeof object[property] !== 'string') {
        throw new Error('date_format value should be a string')
      }

      if (moment(object[property], args).format(args) === object[property]) {
        return true
      }

      messages.push(rawMessage.replace(':field', property).replace(':value', args))

      return false
    }

    default: {
      throw new Error('Unsupported \'' + rule + '\' validation rule on date rules')
    }
  }
}

function getMoment (arg, momentDate, rule) {
  let dateArg

  if (arg) {
    dateArg = convertToMoment(arg)
  } else {
    dateArg = convertToMoment(momentDate)
  }

  return dateArg
}

function convertToMoment (value) {
  if (typeof value === 'string') {
    return moment(value, 'MM/DD/YYYY')
  }

  return moment(value)
}

function validateArgs (rule, args, momentDate, value) {
  if (args && !args.match(dateRegex)) {
    throw new Error(rule + ' argument should have valid date format')
  }

  if (!args) {
    if (momentDate instanceof moment && !momentDate.isValid()) {
      throw new Error(rule + ' sub-arg value is unrecognized')
    }

    if (momentDate instanceof Date && isNaN(momentDate.getTime())) {
      throw new Error(rule + ' sub-arg value is unrecognized')
    }

    if (typeof momentDate === 'string' && !momentDate.match(dateRegex)) {
      throw new Error(rule + ' sub-args should have valid date format')
    }

    if (typeof momentDate !== 'string' && !(momentDate instanceof moment) && !(momentDate instanceof Date)) {
      throw new Error(rule + ' sub-arg value is unrecognized')
    }
  }

  return !(typeof value === 'string' && !value.match(dateRegex))
}

module.exports = validate
