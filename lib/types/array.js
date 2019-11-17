function validate (property, object, rule, args, messages, rawMessage) {
  switch (rule) {
    case 'between': {
      if (!args || args.split(',').length !== 2) {
        throw new Error('between in array requires two arguments')
      }

      const betweenValues = args.split(',')

      if (isNaN(Number(betweenValues[0])) || isNaN(Number(betweenValues[1]))) {
        throw new Error('between arguments should be numbers')
      }

      if (Number(betweenValues[0]) > Number(betweenValues[1])) {
        throw new Error('between first argument should be less than the second argument')
      }

      if (object[property].length < Number(betweenValues[0]) || object[property].length > Number(betweenValues[1])) {
        messages.push(rawMessage.replace(':field', property).replace(':min', betweenValues[0]).replace(':max', betweenValues[1]))

        return false
      }

      return true
    }

    case 'distinct': {
      if (args) {
        throw new Error('array distinct doesn\'t require any arguments')
      }

      if ((new Set(object[property])).size !== object[property].length) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'gt': {
      if (!isNaN(Number(args))) {
        throw new Error('gt requires a non-number argument')
      }

      if (args.split(',').length > 1) {
        throw new Error('gt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      if (typeof object[args] === 'string') {
        try {
          object[args] = JSON.parse(object[args])
        } catch (e) {
          throw new Error('gt field argument should be an array')
        }
      }

      if (!Array.isArray(object[args])) {
        throw new Error('gt field argument should be an array')
      }

      if (object[property].length <= object[args].length) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'gte': {
      if (!isNaN(Number(args))) {
        throw new Error('gt requires a non-number argument')
      }

      if (args.split(',').length > 1) {
        throw new Error('gt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      if (typeof object[args] === 'string') {
        try {
          object[args] = JSON.parse(object[args])
        } catch (e) {
          throw new Error('gt field argument should be an array')
        }
      }

      if (!Array.isArray(object[args])) {
        throw new Error('gt field argument should be an array')
      }

      if (object[property].length < object[args].length) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'lt': {
      if (!isNaN(Number(args))) {
        throw new Error('gt requires a non-number argument')
      }

      if (args.split(',').length > 1) {
        throw new Error('gt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      if (typeof object[args] === 'string') {
        try {
          object[args] = JSON.parse(object[args])
        } catch (e) {
          throw new Error('gt field argument should be an array')
        }
      }

      if (!Array.isArray(object[args])) {
        throw new Error('gt field argument should be an array')
      }

      if (object[property].length < object[args].length) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'lte': {
      if (!isNaN(Number(args))) {
        throw new Error('gt requires a non-number argument')
      }

      if (args.split(',').length > 1) {
        throw new Error('gt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      if (typeof object[args] === 'string') {
        try {
          object[args] = JSON.parse(object[args])
        } catch (e) {
          throw new Error('gt field argument should be an array')
        }
      }

      if (!Array.isArray(object[args])) {
        throw new Error('gt field argument should be an array')
      }

      if (object[property].length > object[args].length) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'max': {
      if (!args || args.split(',').length > 1) {
        throw new Error('max requires one argument')
      }

      if (isNaN(Number(args))) {
        throw new Error('max argument should be a number')
      }

      if (object[property].length > Number(args)) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'min': {
      if (!args || args.split(',').length > 1) {
        throw new Error('min requires one argument')
      }

      if (isNaN(Number(args))) {
        throw new Error('min argument should be a number')
      }

      if (object[property].length >= Number(args)) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'size': {
      if (!args || args.split(',').length !== 1) {
        throw new Error('size requires one argument')
      }

      if (isNaN(Number(args))) {
        throw new Error('size argument should be a number')
      }

      if (object[property].length === Number(args)) {
        messages.push(rawMessage.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    default: {
      throw new Error('Unsupported \'' + rule + '\' validation rule on array rules')
    }
  }
}

module.exports = validate
