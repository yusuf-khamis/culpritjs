function validate (property, object, rule, args, messages, msgObj, subArgs = null) {
  object[property] = Number(object[property])

  switch (rule) {
    case 'between': {
      if (!args || args.split(',').length !== 2) {
        throw new Error('between requires two arguments')
      }

      const betweenValues = args.split(',')

      if (isNaN(Number(betweenValues[0])) || isNaN(Number(betweenValues[1]))) {
        throw new Error('between arguments should be numbers')
      }

      if (Number(betweenValues[0]) > Number(betweenValues[1])) {
        throw new Error('between first argument should be less than the second argument')
      }

      if (object[property] < Number(betweenValues[0]) || object[property] > Number(betweenValues[1])) {
        messages.push(msgObj.property.replace(':field', property).replace(':min', betweenValues[0]).replace(':max', betweenValues[1]))

        return false
      }

      return true
    }

    case 'different': {
      if (!args || args.split(',').length > 1) {
        throw new Error('different requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (isNaN(Number(object[args]))) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (object[property] === Number(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'digits': {
      if (!args || args.split(',').length > 1) {
        throw new Error('digits requires one argument')
      }

      if (isNaN(Number(args))) {
        throw new Error('digits argument should be a number')
      }

      if (!String(object[property]).match(RegExp('^[0-9]{' + args + '}$'))) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'digits_between': {
      if (!args || args.split(',').length !== 2) {
        throw new Error('digits_between requires two arguments')
      }

      const digitsBetweenValues = args.split(',')

      if (isNaN(Number(digitsBetweenValues[0])) || isNaN(Number(digitsBetweenValues[1]))) {
        throw new Error('digits_between arguments should be a numbers')
      }

      if (!String(object[property]).match(RegExp('^\\d{' + digitsBetweenValues[0] + ',' + digitsBetweenValues[1] + '}$'))) {
        messages.push(msgObj.property.replace(':field', property).replace(':min', digitsBetweenValues[0]).replace(':max', digitsBetweenValues[1]))

        return false
      }

      return true
    }

    case 'gt': {
      if (!args || args.split(',').length > 1) {
        throw new Error('gt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (isNaN(Number(object[args]))) {
        messages.push(msgObj.arg.replace(':field', property).replace(':value', args))

        return false
      }

      if (object[property] <= Number(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'gte': {
      if (!args || args.split(',').length > 1) {
        throw new Error('gte requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (isNaN(Number(object[args]))) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (object[property] < Number(object[args])) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      return true
    }

    case 'in': {
      if (!args && subArgs === null) {
        throw new Error('in requires at least one argument')
      }

      let inValues

      if (args) {
        inValues = args.split(',')
      } else if (Array.isArray(subArgs)) {
        inValues = subArgs
      } else {
        throw new Error('in requires valid array arguments')
      }

      if (!inValues.find(value => Number(value) === object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'in_array': {
      if (!args || args.split(',').length > 1) {
        throw new Error('in_array requires one argument')
      }

      const inArrayKeys = args.split('.').filter(key => key.trim().length > 0)

      if (object[inArrayKeys[0]] === undefined || object[inArrayKeys[0]] === null) {
        messages.push(msgObj.arg.replace(':field', inArrayKeys))

        return false
      }

      if (typeof object[inArrayKeys[0]] === 'string') {
        try {
          object[inArrayKeys[0]] = JSON.parse(object[inArrayKeys[0]])
        } catch (e) {
          messages.push(msgObj.arg.replace(':field', inArrayKeys))

          return false
        }
      }

      if (Array.isArray(object[inArrayKeys[0]])) {
        if (inArrayKeys.length < 2 || inArrayKeys.length > 3 || (inArrayKeys.length >= 2 && inArrayKeys[1] !== '*')) {
          throw new Error('in_array field argument must be of format \'field\', \'field.*\' or \'field.*.inner\'')
        }

        for (const item of object[inArrayKeys[0]]) {
          if (inArrayKeys.length === 3 && item.constructor !== {}.constructor) {
            messages.push(msgObj.arg.replace(':field', inArrayKeys))

            return false
          }

          if (inArrayKeys.length < 3 && item.constructor === {}.constructor) {
            messages.push(msgObj.arg.replace(':field', inArrayKeys))

            return false
          }

          if (inArrayKeys.length === 3 && Number(item[inArrayKeys[2]]) === object[property]) {
            return true
          }

          if (inArrayKeys.length === 2 && Number(item) === object[property]) {
            return true
          }
        }

        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      } else {
        messages.push(msgObj.arg.replace(':field', inArrayKeys))

        return false
      }
    }

    case 'integer': {
      if (args) {
        throw new Error('integer does not support any arguments')
      }

      if (!Number.isInteger(object[property])) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'lt': {
      if (!args || args.split(',').length > 1) {
        throw new Error('lt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (isNaN(Number(object[args]))) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (object[property] >= Number(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'lte': {
      if (!args || args.split(',').length > 1) {
        throw new Error('lte requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (isNaN(Number(object[args]))) {
        messages.push(msgObj.arg.replace(':field', property))

        return false
      }

      if (object[property] <= Number(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

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

      if (object[property] > Number(args)) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

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

      if (object[property] < Number(args)) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'not_in': {
      if (!args && subArgs === null) {
        throw new Error('not_in requires at least one argument')
      }

      let notInValues

      if (args) {
        notInValues = args.split(',')
      } else if (subArgs instanceof Array) {
        notInValues = subArgs
      } else {
        throw new Error('in requires valid array arguments')
      }

      if (notInValues.find(value => Number(value) === Number(object[property]))) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'same': {
      if (!args || args.split(',').length !== 1) {
        throw new Error('same requires one argument')
      }

      if (object[property] !== Number(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

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

      if (object[property] !== Number(args)) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    default: {
      throw new Error('Unsupported \'' + rule + '\' validation rule on number rules')
    }
  }
}

module.exports = validate
