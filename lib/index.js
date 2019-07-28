const moment = require('moment-timezone');
const generalValidation = require('./types/general');
const stringValidation = require('./types/string');
const numberValidation = require('./types/number');
const dateValidation = require('./types/date');
const arrayValidation = require('./types/array');
const booleanValidation = require('./types/boolean');
const defaultMessages = require('./messages');

// Main function validate
function validate(object, schema, extraArgs, messages) {

    // Check if object is correct type
    if (object.constructor !== {}.constructor || (typeof window !== 'undefined' && !(object instanceof FormData))) {
        throw new Error('object must be either a JSON or a FormData object');
    }

    // Check if schema is correct type
    if (schema.constructor !== {}.constructor) {
        throw new Error('schema parameter must be a valid JSON object');
    }

    // Check if extraArgs is correct type
    if (extraArgs && extraArgs.constructor !== {}.constructor) {
        throw new Error('extraArgs parameter must be a valid JSON object');
    }

    // Check if messages is correct type
    if (messages && messages.constructor !== {}.constructor) {
        throw new Error('messages parameter must be a valid JSON object');
    }

    let newObject = {};
    let errorMessages = [];
    let customMessages = messages || {};
    let customArgs = extraArgs || {};

    // If object is form data, convert it into json
    if (typeof window !== 'undefined' && object instanceof FormData) {
        for (let pair of object) {
            newObject[pair[0]] = pair[1];
        }
    } else {
        newObject = Object.assign({}, object);
    }

    let rules;

    // Loop through the schema and start validation
    for (let key in schema) {
        if (schema.hasOwnProperty(key)) {

            // Schema property values must be strings
            if (typeof schema[key] !== 'string') {
                throw new Error('Schema format is invalid');
            }

            // Split the rules so that they will arrays of arrays with sub arrays being of the arguments
            // while main arrays being the rules themselves
            rules = schema[key].split('|').map(rule => rule.split(':'));

            if (rules.length >= 2) {
                let startingIndex;

                // Validate schema rules
                if (rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all))$/)) {
                    if (!rules[1][0].match(/^(string|number|date|array|boolean)$/)) {
                        throw new Error('Schema rules format is invalid');
                    }

                    // Validate against the required* rules
                    validateField(newObject, key, 'general', customMessages, errorMessages, rules[0], null);

                    // Validate against the type rules
                    validateField(newObject, key, rules[1][0], customMessages, errorMessages, null, null);

                    // Set the starting index for the actual validation rules after the type rules
                    startingIndex = 2;
                } else if (!rules[0][0].match(/^(string|number|date|array|boolean)$/)) {
                    throw new Error('Schema rules format is invalid');
                } else {
                    if (newObject[key]) {
                        // Validate against the type rules
                        validateField(newObject, key, rules[0][0], customMessages, errorMessages, null, null);
                    }

                    // Set the starting index for the actual validation rules after the type rules
                    startingIndex = 1;
                }

                // Continue if starting index is 2 and rules are more than 2 (if there are 2 rules and starting index is 2 means validation
                // is already completed for required* and type rules) or there are no validation errors so far and that the property exists
                if ((startingIndex === 2 && rules.length > 2) || (!errorMessages.length && newObject[key])) {
                    const rulesLength = rules.length;

                    // Loop through starting from the index which has the validation rule apart from required* and type rules
                    for (let i = startingIndex; i < rulesLength; i++) {
                        if (startingIndex === 2 || (startingIndex === 1 && newObject[key])) {
                            validateField(newObject, key, rules[startingIndex - 1][0], customMessages, errorMessages, rules[i], customArgs[key + '.' + rules[i][0]]);
                        }
                    }
                }
            } else {

                // Validate schema rules
                if (!rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all)|string|number|date|array|boolean)$/)) {
                    throw new Error('Schema rules format is invalid');
                }

                if (rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all))$/)) {

                    // Validate against the required* rules
                    validateField(newObject, key, 'general', customMessages, errorMessages, rules[0], null);
                } else {

                    // Validates against the type rules
                    validateField(newObject, key, rules[0][0], customMessages, errorMessages, null, null);
                }
            }
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
function validateField(object, property, type, messages, errorMessages, rule, extraArgs) {

    // If the value does not exists and rule not set (meaning checking type) then quit
    if (!rule && !object[property]) {
        return;
    }

    switch (type) {
        case 'array':
            if (!rule) {
                if (typeof object[property] === 'string') {
                    try {
                        object[property] = JSON.parse(object[property]);
                    } catch (e) {
                        errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                    }
                } else if (!(object[property] instanceof Array)) {
                    errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                }
            } else {
                arrayValidation(property, object, rule[0], rule[1], errorMessages, retrieveRawMessage(messages, property, type, rule[0]), extraArgs);
            }

            break;

        case 'boolean':
            if (!rule) {
                if (typeof object[property] === 'string') {
                    if (!object[property].match(/^yes|no|true|false|on|off|1|0$/)) {
                        errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                    } else {
                        object[property] = !!object[property].match(/^yes|true|on|1$/);
                    }
                } else if (typeof object[property] === 'number') {
                    if (object[property] !== 1 && object[property] !== 0) {
                        errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                    } else {
                        object[property] = object[property] === 1;
                    }
                } else {
                    if (object[property] !== true && object[property] !== false) {
                        errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                    }
                }
            } else {
                booleanValidation(property, object, rule[0], rule[1], errorMessages, retrieveRawMessage(messages, property, type, rule[0]));
            }

            break;

        case 'date':
            if (!rule && !moment(object[property]).isValid()) {
                errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
            } else {
                dateValidation(property, object, rule[0], rule[1], errorMessages, retrieveRawMessage(messages, property, type, rule[0]), extraArgs)
            }

            break;

        case 'number':
            if (!rule) {
                if (isNaN(Number(object[property]))) {
                    errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                } else {
                    object[property] = Number(object[property]);
                }
            } else {
                numberValidation(property, object, rule[0], rule[1], errorMessages, retrieveRawMessage(messages, property, type, rule[0]), extraArgs);
            }

            break;

        case 'string':
            if (!rule) {
                object[property] = String(object[property]);
            } else {
                stringValidation(property, object, rule[0], rule[1], errorMessages, retrieveRawMessage(messages, property, type, rule[0]), extraArgs)
            }

            break;

        case 'general':
            generalValidation(property, object, rule[0], rule[1], errorMessages, retrieveRawMessage(messages, property, type, rule[0]), extraArgs);

            break;

        default:

            throw new Error('Error while categorising rules');
    }
}

function retrieveRawMessage(messages, property, type, rule) {
    if (messages[rule]) {
        return messages[rule];
    }

    if (messages[property + '.' + rule]) {
        return messages[property + '.' + rule];
    }

    return defaultMessages[type][rule] || '';
}

if (typeof window !== 'undefined') {
    window.completeValidation = validate;
} else {
    module.exports.validate = validate;
}

// TODO: recheck validation for those not required but failed other tests
