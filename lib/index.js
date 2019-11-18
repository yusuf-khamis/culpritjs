const moment = require('moment-timezone')
const generalValidation = require('./types/general')
const stringValidation = require('./types/string')
const numberValidation = require('./types/number')
const dateValidation = require('./types/date')
const arrayValidation = require('./types/array')
const booleanValidation = require('./types/boolean')
const defaultMessages = require('./messages')

// Main function validate
function validate (object, schema, extraArgs, messages) {
  // Check if object is correct type
  if (object.constructor !== {}.constructor || (typeof window !== 'undefined' && !(object instanceof window.FormData))) {
    throw new Error('object must be either a JSON or a FormData object')
  }
  // Check if schema is correct type
  if (schema.constructor !== {}.constructor) {
    throw new Error('schema parameter must be a valid JSON object')
  }

  // Check if extraArgs is correct type
  if (extraArgs && extraArgs.constructor !== {}.constructor) {
    throw new Error('extraArgs parameter must be a valid JSON object')
  }

  // Check if messages is correct type
  if (messages && messages.constructor !== {}.constructor) {
    throw new Error('messages parameter must be a valid JSON object')
  }

  let customMessages = {}
  let customArgs = {}

  // Use custom arguments if they are provided
  if (extraArgs) {
    customArgs = Object.assign({ }, extraArgs)
  }

  // Use custom messages if they are provided
  if (customMessages) {
    customMessages = Object.assign({ }, messages)
  }

  // Declare our new object and messages array to use for returning feedback
  let newObject = {}
  const errorMessages = []

  // If object is form data, convert it into json
  if (typeof window !== 'undefined' && object instanceof window.FormData) {
    for (const pair of object) {
      newObject[pair[0]] = pair[1]
    }
  } else {
    // Otherwise make a copy of it
    newObject = Object.assign({}, object)
  }

  let rules

  // Loop through the schema and start validation
  for (const key in schema) {
    if (Object.prototype.hasOwnProperty.call(schema, key)) {
      // Schema property values must be strings
      if (typeof schema[key] !== 'string') {
        throw new Error('Schema format is invalid')
      }

      // Validate schema for the first and/or the second item
      if (!schema[key].match(/^((required|required_(if|unless|with|with_all|without|without_all))\|)?(string|number|array|boolean|date)/)) {
        throw new Error('Schema format is invalid')
      }

      // Split the rules so that they will be arrays of arrays with sub arrays being of the arguments
      // while main arrays being the rules themselves
      rules = schema[key].split('|').map(function(rule) { return rule.split(':') })

      // Where we will slice our array to begin the type specific validation
      let sliceIndex = 1

      const prepareMessagesObject = function (propType, propRule) {
        let ruleErrorMessages = {
          property: defaultMessages[propType][propRule],
          arg: defaultMessages[propType].arg
        };

        if (typeof customMessages[key + '.' + propRule] === 'string') {
          ruleErrorMessages.property = customMessages[key + '.' + propRule]
        }

        if (typeof customMessages[key + '.' + propRule + '.' + 'property'] === 'string') {
          ruleErrorMessages.property = customMessages[key + '.' + propRule + '.' + 'property']
        }

        if (typeof customMessages[key + '.' + propRule + '.' + 'arg'] === 'string') {
          ruleErrorMessages.arg = customMessages[key + '.' + propRule + '.' + 'arg']
        }
        
        return ruleErrorMessages;
      }

      // Validate the first general/type rules
      if (rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all))$/)) {
        sliceIndex = 2
        
        const msgObj = prepareMessagesObject('general', rules[0][0])

        validateField(newObject, key, 'general', msgObj, errorMessages, rules[0], null)

        // Validation failed so no need to continue, just proceed to the next property to be validated
        if (errorMessages.length > 1) {
          continue
        }
      }

      // Get the type to be validated against
      const propType = rules[sliceIndex - 1][0]

      // If the property exists, validate it against its type
      if (propType !== undefined && propType !== null) {
        const msgObj = prepareMessagesObject(propType, propType)
        
        validateField(newObject, key, propType, msgObj, errorMessages, null, null)

        // Validation failed so no need to continue, just proceed to the next property to be validated
        if (errorMessages.length > 1) {
          continue
        }
      }

      // Loop through the validation rules of the specific property
      rules.slice(sliceIndex).forEach(function (rule) {
        const msgObj = prepareMessagesObject(propType, rule[0])

        validateField(newObject, key, rule[0], msgObj, errorMessages, rule, customArgs[key + '.' + rule[0]])
      });
    }
  }

  return {
    value: newObject,
    errors: errorMessages.length ? errorMessages : null
  }
}

// Function that validates against the rules
// Receives the main object passed, the specific property key of the object being validated, the data type of the property,
// the custom messages specified by user, default error messages of the library, the specific validation rule to be used
// and the extra arguments for this specific property
function validateField (object, property, type, msgObj, errorMessages, rule, extraArgs) {
  // Validate against type
  switch (type) {
    case 'array':
      if (!rule) {
        if (typeof object[property] === 'string') {
          try {
            object[property] = JSON.parse(object[property])
          } catch (e) {
            errorMessages.push(msgObj.property.replace(':field', property))
          }
        } else if (!Array.isArray(object[property])) {
          errorMessages.push(msgObj.property.replace(':field', property))
        }
      } else {
        arrayValidation(property, object, rule[0], rule[1], errorMessages, msgObj, extraArgs)
      }

      break

    case 'boolean':
      if (!rule) {
        if (typeof object[property] === 'string') {
          if (!object[property].match(/^yes|no|true|false|on|off|1|0$/)) {
            errorMessages.push(msgObj.property.replace(':field', property))
          } else {
            object[property] = !!object[property].match(/^yes|true|on|1$/)
          }
        } else if (typeof object[property] === 'number') {
          if (object[property] !== 1 && object[property] !== 0) {
            errorMessages.push(msgObj.property.replace(':field', property))
          } else {
            object[property] = object[property] === 1
          }
        } else {
          if (object[property] !== true && object[property] !== false) {
            errorMessages.push(msgObj.property.replace(':field', property))
          }
        }
      } else {
        booleanValidation(property, object, rule[0], rule[1], errorMessages, msgObj)
      }

      break

    case 'date':
      if (!rule && !moment(object[property]).isValid()) {
        errorMessages.push(msgObj.property.replace(':field', property))
      } else {
        dateValidation(property, object, rule[0], rule[1], errorMessages, msgObj, extraArgs)
      }

      break

    case 'number':
      if (!rule) {
        if (isNaN(Number(object[property]))) {
          errorMessages.push(msgObj.property.replace(':field', property))
        } else {
          object[property] = Number(object[property])
        }
      } else {
        numberValidation(property, object, rule[0], rule[1], errorMessages, msgObj, extraArgs)
      }

      break

    case 'string':
      if (!rule) {
        object[property] = String(object[property])
      } else {
        stringValidation(property, object, rule[0], rule[1], errorMessages, msgObj, extraArgs)
      }

      break

    case 'general':
      generalValidation(property, object, rule[0], rule[1], errorMessages, msgObj, extraArgs)

      break

    default:

      throw new Error('Error while categorising rules')
  }
}

if (typeof window !== 'undefined') {
  window.culpritjs = validate
} else {
  module.exports.validate = validate
}
