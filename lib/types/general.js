function validate (property, object, rule, args, messages, msgObj, subArgs = null) {
  switch (rule) {
    case 'required': {
      if (args) {
        throw new Error('required doesn\'t require any arguments')
      }

      if (!required(object[property])) {
        messages.push(msgObj.property.replace(':field', property))

        return false
      }

      return true
    }

    case 'required_if': {
      if (!args || (args.split(',').length < 2 && !subArgs)) {
        throw new Error('required_if should have at least two arguments or one argument and array of values provided')
      }

      const tempRequiredIfArgsSplit = args.split(',')

      let requiredIfValues

      const requiredIfField = tempRequiredIfArgsSplit[0]

      if (tempRequiredIfArgsSplit.length > 1) {
        requiredIfValues = tempRequiredIfArgsSplit.slice(1)
      } else if (subArgs instanceof Array && subArgs.length > 0) {
        requiredIfValues = subArgs
      } else {
        throw new Error('required_if requires one or more values')
      }

      const requiredIfFound = requiredIfValues.find(item => String(item) === String(object[requiredIfField]))

      if (requiredIfFound !== undefined && !required(object[property])) {
        messages.push(msgObj.property
          .replace(':field', property)
          .replace(':another', requiredIfField)
          .replace(':value', requiredIfValues.join(','))
        )

        return false
      }

      return true
    }

    case 'required_unless': {
      if (!args || (args.split(',').length < 2 && !(subArgs instanceof Array))) {
        throw new Error('required_unless should have at least two arguments or one argument and array of values provided')
      }

      const tempRequiredUnlessArgsSplit = args.split(',')

      let requiredUnlessValues

      const requiredUnlessField = tempRequiredUnlessArgsSplit[0]

      if (tempRequiredUnlessArgsSplit.length > 1) {
        requiredUnlessValues = tempRequiredUnlessArgsSplit.slice(1)
      } else if (subArgs instanceof Array && subArgs.length > 0) {
        requiredUnlessValues = subArgs
      } else {
        throw new Error('required_unless requires one or more values')
      }

      const requiredUnlessFound = requiredUnlessValues.find(item => String(item) === String(object[requiredUnlessField]))

      if (requiredUnlessFound === undefined && !required(object[property])) {
        messages.push(msgObj.property
          .replace(':field', property)
          .replace(':another', requiredUnlessField)
          .replace(':value', requiredUnlessValues.join(','))
        )

        return false
      }

      return true
    }

    case 'required_with': {
      if (!args) {
        throw new Error('required_with should have at least one argument')
      }

      const requiredWithValues = args.split(',')

      if (requiredWithValues.find(value => value.length === 0) !== undefined) {
        throw new Error('required_with should not have empty arguments')
      }

      const requiredWithFound = requiredWithValues.find(field => required(object[field]))

      if (requiredWithFound !== undefined && !required(object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'required_with_all': {
      if (!args) {
        throw new Error('required_with_all should have at least one argument')
      }

      const requiredWithAllValues = args.split(',')

      if (requiredWithAllValues.find(value => value.length === 0) !== undefined) {
        throw new Error('required_with_all should not have have empty arguments')
      }

      const requiredWithAllFound = requiredWithAllValues.find(field => !object[field])

      if (requiredWithAllFound === undefined && !required(object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'required_without': {
      if (!args) {
        throw new Error('required_without should have at least one argument')
      }

      const requiredWithoutValues = args.split(',')

      if (requiredWithoutValues.find(value => value.length === 0) !== undefined) {
        throw new Error('required_without should have not have empty arguments')
      }

      const requiredWithoutFound = requiredWithoutValues.find(field => !object[field])

      if (requiredWithoutFound !== undefined && !required(object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    case 'required_without_all': {
      if (!args) {
        throw new Error('required_without_all should have at least one argument')
      }

      const requiredWithoutAllValues = args.split(',')

      if (requiredWithoutAllValues.find(value => value.length === 0) !== undefined) {
        throw new Error('required_without_all should have not have empty arguments')
      }

      const requiredWithoutAllFound = requiredWithoutAllValues.find(field => object[field])

      if (requiredWithoutAllFound === undefined && !required(object[property])) {
        messages.push(msgObj.property.replace(':field', property).replace(':another', args))

        return false
      }

      return true
    }

    default: {
      throw new Error('Unsupported \'' + rule + '\' validation rule')
    }
  }
}

function required (value) {
  return (!Array.isArray(value) && value !== null && value !== undefined && value !== '') || (Array.isArray(value) && value.length !== 0)
}

module.exports = validate
