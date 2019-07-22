const moment = require('moment-timezone');
const generalValidation = require('./types/general');
const stringValidation = require('./types/string');
const numberValidation = require('./types/number');
const dateValidation = require('./types/date');
const arrayValidation = require('./types/array');
const booleanValidation = require('./types/boolean');
const defaultMessages = require('./messages');

function validate(object, schema, extraArgs, messages) {
    if (schema.constructor !== {}.constructor ||
        (messages && !(messages instanceof Array)) ||
        (extraArgs && extraArgs.constructor !== {}.constructor) ||
        (typeof window !== 'undefined' && object instanceof FormData) ||
        object.constructor !== {}.constructor) {

        throw new Error('Invalid arguments provided, expected values of types Object or FormData, Object, Array or null, Object or null');
    }

    let newObject = {};
    let errorMessages = [];
    let customMessages = messages || {};
    let customArgs = extraArgs || {};

    if (schema.constructor !== {}.constructor) {
        throw new Error('Schema parameter must be a valid JSON object');
    }

    if (typeof window !== 'undefined' && object instanceof FormData) {
        for (let pair of object) {
            newObject[pair[0]] = pair[1];
        }
    } else {
        newObject = Object.assign({}, object);
    }

    let rules;

    for (let key in schema) {
        if (schema.hasOwnProperty(key)) {
            if (typeof schema[key] !== 'string') {
                throw new Error('Schema format is invalid');
            }

            rules = schema[key].split('|').map(rule => rule.split(':'));

            if (rules.length >= 2 && rules[0].indexOf('required') > -1 && !rules[1][0].match(/^(string|number|date|array)$/)) {
                throw new Error('Schema rules format is invalid');
            }

            if (rules.length >= 2) {
                let startingIndex;

                if (rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all))$/)) {
                    if (!rules[1][0].match(/^(string|number|date|array|boolean)$/)) {
                        throw new Error('Schema rules format is invalid');
                    }

                    validateField(newObject, key, 'general', customMessages, errorMessages, rules[0]);
                    validateField(newObject, key, rules[1][0], customMessages, errorMessages, null, customArgs[key]);

                    startingIndex = 2;
                } else if (!rules[0][0].match(/^(string|number|date|array|boolean)$/)) {
                    throw new Error('Schema rules format is invalid');
                } else {
                    if (newObject[key]) {
                        validateField(newObject, key, rules[0][0], customMessages, errorMessages, null, customArgs[key]);
                    }

                    startingIndex = 1;
                }

                if (!errorMessages.length && newObject[key]) {
                    const rulesLength = rules.length;

                    for (let i = startingIndex; i < rulesLength; i++) {
                        if (startingIndex === 2 || (startingIndex === 1 && newObject[key])) {
                            validateField(newObject, key, rules[startingIndex - 1][0], customMessages, errorMessages, rules[i], customArgs[key + '.' + rules[i][0]]);
                        }
                    }
                }
            } else {
                if (!rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all)|string|number|date|array|boolean)$/)) {
                    throw new Error('Schema rules format is invalid');
                }

                if (rules[0][0].match(/^(required|required_(if|unless|with|with_all|without|without_all))$/)) {
                    validateField(newObject, key, 'general', customMessages, errorMessages, rules[0]);
                } else {
                    validateField(newObject, key, rules[0][0], customMessages, errorMessages, null);
                }
            }
        }
    }

    return {
        value: newObject,
        errors: errorMessages.length ? errorMessages : null
    }
}

function validateField(object, property, type, messages, errorMessages, rules, extraArgs) {
    if (!rules && !object[property]) {
        return;
    }

    switch (type) {
        case 'array':
            if (!rules) {
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
                arrayValidation(property, object, rules[0], rules[1], errorMessages, retrieveRawMessage(messages, property, type, rules[0]), extraArgs);
            }

            break;

        case 'boolean':
            if (!rules) {
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
                booleanValidation(property, object, rules[0], rules[1], errorMessages, retrieveRawMessage(messages, property, type, rules[0]));
            }

            break;

        case 'date':
            if (!rules && !moment(object[property]).isValid()) {
                errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
            } else {
                dateValidation(property, object, rules[0], rules[1], errorMessages, retrieveRawMessage(messages, property, type, rules[0]), extraArgs)
            }

            break;

        case 'number':
            if (!rules) {
                if (isNaN(Number(object[property]))) {
                    errorMessages.push(retrieveRawMessage(messages, property, type, type).replace(':field', property));
                } else {
                    object[property] = Number(object[property]);
                }
            } else {
                numberValidation(property, object, rules[0], rules[1], errorMessages, retrieveRawMessage(messages, property, type, rules[0]), extraArgs);
            }

            break;

        case 'string':
            if (!rules) {
                object[property] = String(object[property]);
            } else {
                stringValidation(property, object, rules[0], rules[1], errorMessages, retrieveRawMessage(messages, property, type, rules[0]), extraArgs)
            }

            break;

        case 'general':
            generalValidation(property, object, rules[0], rules[1], errorMessages, retrieveRawMessage(messages, property, type, rules[0]), extraArgs);

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
