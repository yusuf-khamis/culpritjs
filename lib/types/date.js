const moment = require('moment-timezone');

function validate(property, object, rule, args, messages, rawMessage, momentDate = null) {
    switch (rule) {
        case 'after':
            if (!args || !momentDate) {
                throw new Error('after should have at least one argument');
            }

            if (moment(object[property]).isSameOrAfter(getMomentArg(args, momentDate, rule))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'after_or_equal':
            if (!args || !momentDate) {
                throw new Error('after_or_equal should have at least one argument');
            }

            if (moment(object[property]).isSameOrAfter(getMomentArg(args, momentDate, rule))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'before':
            if (!args || !momentDate) {
                throw new Error('before should have at least one argument');
            }

            if (moment(object[property]).isBefore(getMomentArg(args, momentDate, rule))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'before_or_equal':
            if (!args || !momentDate) {
                throw new Error('before_or_equal should have at least one argument');
            }

            if (moment(object[property]).isSameOrBefore(getMomentArg(args, momentDate, rule))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'date_equals':
            if (!args || !momentDate) {
                throw new Error('date_equals should have at least one argument');
            }

            if (moment(object[property]).isSame(getMomentArg(args, momentDate, rule))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'date_format':
            if (!args) {
                throw new Error('date_format should have at least one argument');
            }

            if (moment(object[property], args).format(args) === object[property]) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        default:

            throw new Error('Unsupported \'' + rule + '\' validation rule on date rules');
    }
}

function getMomentArg(arg, momentDate, rule) {
    let dateArg;

    if (arg) {
        dateArg = moment(arg);
    } else {
        dateArg = moment(momentDate);
    }

    if (!dateArg.isValid()) {
        throw new Error('Invalid date argument in rule \'' + rule + '\'');
    }

    return dateArg;
}

module.exports = validate;
