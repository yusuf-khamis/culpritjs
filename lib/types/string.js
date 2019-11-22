const moment = require('moment-timezone')

function validate (property, object, rule, args, messages, msgObj, subArgs = null) {
  switch (rule) {
    case 'alpha': {
      if (args) {
        throw new Error('string alpha doesn\'t require any arguments')
      }

      if (!(object[property].match(/^[a-z]+$/i))) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'alpha_dash': {
      if (args) {
        throw new Error('string alpha_dash doesn\'t require any arguments')
      }

      if (!object[property].match(/^[-_a-z]+$/i)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'alpha_num': {
      if (args) {
        throw new Error('string alpha_num doesn\'t require any arguments')
      }

      if (!(object[property].match(/^[a-z0-9]+$/i))) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'alpha_num_dash': {
      if (args) {
        throw new Error('string alpha_dash doesn\'t require any arguments')
      }

      if (!(object[property].match(/^[-_a-z0-9]+$/i))) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'between': {
      if (!args || args.split(',').length !== 2) {
        throw new Error('between requires two arguments')
      }

      const betweenValues = args.split(',')

      if (isNaN(Number(betweenValues[0])) || isNaN(Number(betweenValues[1]))) {
        throw new Error('between arguments should be numbers')
      }

      if (Number(betweenValues[0]) >= Number(betweenValues[1])) {
        throw new Error('between first argument should be less than the second argument')
      }

      if (object[property].length < Number(betweenValues[0]) || object[property].length > Number(betweenValues[1])) {
        messages.push(msgObj.property.replace(':field', property).replace(':min', betweenValues[0]).replace(':max', betweenValues[1]))

        return false
      }

      return true
    }

    case 'clean': {
      if (!args) {
        throw new Error('clean requires at least one argument')
      }

      if (args.split(',').find(arg => !arg.startsWith('spaces') && !arg.startsWith('case') && !arg.startsWith('rem'))) {
        throw new Error('clean arguments should only be \'case\', \'spaces\' or \'rem\'')
      }

      const cleanArgs = args.split(',')

      for (const index in cleanArgs) {
        if (cleanArgs[index].startsWith('spaces')) {
          const spacesArgs = cleanArgs[index].split('.')

          if (spacesArgs.length > 3) {
            throw new Error('clean \'spaces\' argument should have at most 2 sub arguments')
          }

          if (spacesArgs.find(item => item === 'between_single') && spacesArgs.find(item => item === 'between_none')) {
            throw new Error('clean \'spaces\' argument should have only one of \'between_none\' and \'between_none\'')
          }

          spacesArgs.slice(1).forEach(arg => {
            switch (arg) {
              case 'end':
                object[property] = object[property].replace(/\s+$/, '')

                break

              case 'begin':
                object[property] = object[property].replace(/^\s+/, '')

                break

              case 'between_single':
                object[property] = object[property].match(/^\s*/)[0] + object[property].trim().replace(/\s+/g, ' ') + object[property].match(/\s*$/)[0]

                break

              case 'between_none':
                object[property] = object[property].match(/^\s*/)[0] + object[property].trim().replace(/\s+/g, '') + object[property].match(/\s*$/)[0]

                break

              case 'both':
                object[property] = object[property].trim()

                break

              default:
                throw new Error('clean \'spaces\' argument should be either \'begin\', \'end\', \'both\', \'between_single\' or \'between_none\'')
            }
          })
        }

        if (cleanArgs[index].startsWith('case')) {
          const caseArgs = cleanArgs[index].split('.')

          if (caseArgs.length > 2) {
            throw new Error('clean \'case\' argument should have at most one sub argument')
          }

          switch (caseArgs[1]) {
            case 'lower':
              object[property] = object[property].toLowerCase()

              break

            case 'upper':
              object[property] = object[property].toUpperCase()

              break

            case 'title':
              object[property] = object[property].match(/\w+/g).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')

              break

            default:
              throw new Error('clean \'case\' argument should be either of \'lower\', \'upper\' or \'title\'')
          }
        }

        if (cleanArgs[index].startsWith('rem')) {
          if (cleanArgs[index].substr(4).length === 0) {
            throw new Error('clean \'rem\' requires one sub-argument')
          }

          object[property] = object[property].replace(RegExp(cleanArgs[index].substr(4), 'g'), '')
        }
      }

      break
    }

    case 'confirmed': {
      let confirmationKey = property + '_confirmation'

      if (args && args.split(',').length !== 1) {
        throw new Error('confirmed should have at most one argument')
      }

      if (args) {
        confirmationKey = args
      }

      if (object[property] !== object[confirmationKey]) {
        messages.push(msgObj.property.replace(':field', property).replace(':confirmation', confirmationKey))

        return false
      }

      return true
    }

    case 'card': {
      if (args) {
        throw new Error('string payment_card doesn\'t require any arguments')
      }

      if (String(object[property]).match(/^\d{12,19}$/)) {
        const card = String(object[property]).split('')
        const cardFinal = Array(card.length)
        let isAlt = false
        let sum = 0

        cardFinal[card.length - 1] = Number(card[card.length - 1])

        for (let i = card.length - 2; i >= 0; i--) {
          if (isAlt) {
            cardFinal[i] = Number(card[i])
          } else {
            let temp = Number(card[i]) * 2

            if (temp > 9) {
              temp -= 9
            }

            cardFinal[i] = temp
          }

          sum += cardFinal[i]

          isAlt = !isAlt
        }

        if ((sum * 9) % 10 === cardFinal[cardFinal.length - 1]) {
          return true
        }
      }

      messages.push(msgObj.property.replace(':field', property))

      return false
    }

    case 'different': {
      if (!args || args.split(',').length > 1) {
        throw new Error('different requires one argument')
      }

      if (object[property] === String(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'email': {
      if (args) {
        throw new Error('string email doesn\'t require any arguments')
      }

      if (!object[property].match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'ends_with': {
      if (!args && subArgs === null) {
        throw new Error('ends_with requires at least argument')
      }

      let endsWithValues

      if (args) {
        endsWithValues = args.split(',')
      } else if (typeof subArgs === 'string') {
        try {
          endsWithValues = JSON.parse(subArgs)
        } catch (e) {
          throw new Error('ends_with sub-args needs to be a valid json array')
        }
      } else if (Array.isArray(subArgs)) {
        endsWithValues = subArgs
      } else {
        throw new Error('ends_with arguments or sub args provided must be of valid json array')
      }

      if (!endsWithValues.find(value => object[property].endsWith(value))) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'filled': {
      if (args) {
        throw new Error('string filled doesn\'t require any arguments')
      }

      if (object[property] === undefined || object[property] === null || object[property] === '') {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'gt': {
      if (!args || args.split(',').length > 1) {
        throw new Error('gt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':arg', args))

        return false
      }

      if (object[property].length <= String(object[args]).length) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'gte': {
      if (!args || args.split(',').length > 1) {
        throw new Error('gte requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':arg', args))

        return false
      }

      if (object[property].length < String(object[args]).length) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

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
      } else if (subArgs instanceof Array) {
        inValues = subArgs
      } else {
        throw new Error('in requires valid array arguments')
      }

      if (!inValues.find(value => value === object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', inValues.join(',')))

        return false
      }

      return true
    }

    case 'in_array': {
      if (!args || args.split(',').length > 1) {
        throw new Error('in_array requires one argument')
      }

      const inArrayKeys = args.split('.').filter(key => key.trim().length > 0)

      if (inArrayKeys.length < 2 || inArrayKeys.length > 3 || (inArrayKeys.length >= 2 && inArrayKeys[1] !== '*')) {
        throw new Error('in_array field argument must be of format \'field\', \'field.*\' or \'field.*.inner\'')
      }

      if (object[inArrayKeys[0]] === undefined || object[inArrayKeys[0]] === null) {
        messages.push(msgObj.arg.replace(':field', inArrayKeys[0]))

        return false
      }

      if (typeof object[inArrayKeys[0]] === 'string') {
        try {
          object[inArrayKeys[0]] = JSON.parse(object[inArrayKeys[0]])
        } catch (e) {
          messages.push(msgObj.arg.replace(':field', inArrayKeys[0]))

          return false
        }
      }

      if (Array.isArray(object[inArrayKeys[0]])) {
        for (const item of object[inArrayKeys[0]]) {
          if (inArrayKeys.length === 3 && item.constructor !== {}.constructor) {
            messages.push(msgObj.arg.replace(':field', inArrayKeys[0]))

            return false
          }

          if (inArrayKeys.length < 3 && item.constructor === {}.constructor) {
            messages.push(msgObj.arg.replace(':field', inArrayKeys[0]))

            return false
          }

          if (inArrayKeys.length === 3 && String(item[inArrayKeys[2]]) === object[property]) {
            return true
          }

          if (inArrayKeys.length === 2 && String(item) === object[property]) {
            return true
          }
        }

        messages.push(msgObj.property.replace(':field', property).replace(':another', inArrayKeys[0]))

        return false
      } else {
        messages.push(msgObj.arg.replace(':field', inArrayKeys[0]))

        return false
      }
    }

    case 'ip_address': {
      if (args) {
        throw new Error('string ip_address doesn\'t require any arguments')
      }

      if (!object[property].match(/^((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))$/)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'ipv4': {
      if (args) {
        throw new Error('string ipv6 doesn\'t require any arguments')
      }

      if (!object[property].match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'ipv6': {
      if (args) {
        throw new Error('string ipv6 doesn\'t require any arguments')
      }

      if (!object[property].match(/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'json': {
      if (args) {
        throw new Error('string json doesn\'t require any arguments')
      }

      try {
        if (typeof object[property] === 'string') {
          object[property] = JSON.parse(object[property])
        }

        return true
      } catch (e) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }
    }

    case 'lt': {
      if (!args || args.split(',').length > 1) {
        throw new Error('lt requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':arg', args))

        return false
      }

      if (object[property].length >= String(object[args]).length) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'lte': {
      if (!args || args.split(',').length > 1) {
        throw new Error('lte requires one argument')
      }

      if (object[args] === undefined || object[args] === null) {
        messages.push(msgObj.arg.replace(':arg', args))

        return false
      }

      if (object[property].length > String(object[args]).length) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'max': {
      if (!args || args.split(',').length > 1) {
        throw new Error('max requires one argument')
      }

      if (isNaN(Number(args))) {
        throw new Error('max requires one number argument')
      }

      if (object[property].length > Number(args)) {
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
        throw new Error('min requires one number argument')
      }

      if (object[property].length < Number(args)) {
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
      } else if (Array.isArray(subArgs)) {
        notInValues = subArgs
      } else {
        throw new Error('not_in requires valid array arguments')
      }

      if (notInValues.find(value => value === object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'not_regex': {
      if ((args && args.split(',').length !== 1) || (!args && subArgs === null)) {
        throw new Error('not_regex requires one argument')
      }

      let notRegexRegExp

      if (args) {
        notRegexRegExp = RegExp(args)
      } else if (subArgs instanceof RegExp) {
        notRegexRegExp = subArgs
      } else if (typeof subArgs === 'string') {
        notRegexRegExp = RegExp(subArgs)
      } else {
        throw new Error('not_regex requires one valid argument')
      }

      if (object[property].match(notRegexRegExp)) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', notRegexRegExp.toString()))

        return false
      }

      return true
    }

    case 'numeric': {
      if (args) {
        throw new Error('string numeric doesn\'t require any arguments')
      }

      if (isNaN(Number(object[property]))) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'present': {
      if (args) {
        throw new Error('string present doesn\'t require any arguments')
      }

      if (object[property] === null || object[property] === undefined) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'regex': {
      if ((args && args.split(',').length !== 1) || (!args && subArgs === null)) {
        throw new Error('regex requires one argument')
      }

      let regexRegExp

      if (args) {
        regexRegExp = RegExp(args)
      } else if (subArgs instanceof RegExp) {
        regexRegExp = subArgs
      } else if (typeof subArgs === 'string') {
        regexRegExp = RegExp(subArgs)
      } else {
        throw new Error('not_regex requires one valid argument')
      }

      if (!object[property].match(regexRegExp)) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', regexRegExp.toString()))

        return false
      }

      return true
    }

    case 'same': {
      if (!args || args.split(',').length !== 1) {
        throw new Error('same requires one argument')
      }

      if (object[args] === null || object[args] === undefined) {
        messages.push(msgObj.arg.replace(':arg', args))

        return false
      }

      if (object[property] !== String(object[args])) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'size': {
      if (!args || args.split(',').length !== 1) {
        throw new Error('size requires one argument')
      }

      if (isNaN(Number(args))) {
        throw new Error('size requires one number argument')
      }

      if (object[property].length !== Number(args)) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'starts_with': {
      if (!args && subArgs === null) {
        throw new Error('starts_with requires at least argument')
      }

      let startsWithValues

      if (args) {
        startsWithValues = args.split(',')
      } else if (typeof subArgs === 'string') {
        try {
          startsWithValues = JSON.parse(subArgs)
        } catch (e) {
          throw new Error('starts_with sub-args needs to be a valid json array')
        }
      } else if (Array.isArray(subArgs)) {
        startsWithValues = subArgs
      } else {
        throw new Error('starts_with arguments or sub args provided must be of valid json array')
      }

      if (!startsWithValues.find(value => object[property].startsWith(value))) {
        messages.push(msgObj.property.replace(':field', property).replace(':value', args))

        return false
      }

      return true
    }

    case 'timezone': {
      if (args) {
        throw new Error('string timezone doesn\'t require any arguments')
      }

      if (!moment.tz.names().find(item => item.toLowerCase() === object[property].toLowerCase())) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'url': {
      if (args) {
        throw new Error('string url doesn\'t require any arguments')
      }

      if (!object[property].match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'uuid': {
      if (args) {
        throw new Error('string uuid doesn\'t require any arguments')
      }

      if (!object[property].match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    default: {
      throw new Error('Unsupported \'' + rule + '\' validation rule on string rules')
    }
  }
}

module.exports = validate
