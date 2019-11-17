function validate (property, object, rule, args, messages, rawMessage) {
  if (args) {
    throw new Error(rule + ' doesn\'t require any arguments')
  }

  switch (rule) {
    case 'accepted': {
      if (object[property] !== true) {
        messages.push(rawMessage.replace(':field', property))

        return false
      }

      return true
    }

    case 'not_accepted': {
      if (object[property] !== false) {
        messages.push(rawMessage.replace(':field', property))

        return false
      }

      return true
    }

    default: {
      throw new Error('Unsupported \'' + rule + '\' validation rule on boolean rules')
    }
  }
}

module.exports = validate
