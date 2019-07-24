function validate(property, object, rule, args, messages, rawMessage, subArgs = null) {
    object[property] = Number(object[property]);

    switch (rule) {
        case 'between':
            if (!args || args.split(',').length !== 2) {
                throw new Error('between requires two arguments');
            }

            const betweenValues = args.split(',');

            if (isNaN(Number(betweenValues[0])) || isNaN(Number(betweenValues[1]))) {
                throw new Error('between arguments should be numbers');
            }

            if (isNaN(Number(betweenValues[0])) > isNaN(Number(betweenValues[1]))) {
                throw new Error('between first argument should be less than the second argument');
            }

            if (object[property] >= Number(betweenValues[0]) && object[property] <= Number(betweenValues[1])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':min', betweenValues[0]).replace(':max', betweenValues[1]));

            return false;

        case 'different':
            if (!args || args.split(',').length > 1) {
                throw new Error('different requires one argument');
            }

            if (object[property] !== Number(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'digits':
            if (!args || args.split(',').length > 1) {
                throw new Error('digits requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('digits argument should be a number');
            }

            if (String(object[property]).match(RegExp('^\d{' + args + '}$'))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'digits_between':
            if (!args || args.split(',').length !== 2) {
                throw new Error('digits_between requires two arguments');
            }

            const digitsBetweenValues = args.split(',');

            if (isNaN(Number(digitsBetweenValues[0])) || isNaN(Number(digitsBetweenValues[1]))) {
                throw new Error('digits_between arguments should be a numbers');
            }

            if (String(object[property]).match(RegExp('^\\d{' + digitsBetweenValues[0] +',' + digitsBetweenValues[1] + '}$'))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':min', digitsBetweenValues[0]).replace(':max', digitsBetweenValues[1]));

            return false;

        case 'gt':
            if (!args || args.split(',').length > 1) {
                throw new Error('gt requires one argument');
            }

            if (isNaN(Number(object[args]))) {
                throw new Error('gt field argument should be a number');
            }

            if (object[property] > Number(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'gte':
            if (!args || args.split(',').length > 1) {
                throw new Error('gte requires one argument');
            }

            if (isNaN(Number(object[args]))) {
                throw new Error('gte field argument should be a number');
            }

            if (object[property] >= Number(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'in':
            if (!args && subArgs === null) {
                throw new Error('in requires at least one argument');
            }

            let inValues;

            if (args) {
                inValues = args.split(',');
            } else if (subArgs instanceof Array) {
                inValues = subArgs;
            } else {
                throw new Error('in requires valid array arguments');
            }

            if (inValues.find(value => Number(value) === object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'in_array':
            if (!args || args.split(',').length > 1) {
                throw new Error('in_array requires one argument');
            }

            const inArrayKeys = args.split('.').filter(key => key.trim().length > 0);

            if (typeof object[inArrayKeys[0]] === 'string') {
                try {
                    object[inArrayKeys[0]] = JSON.parse(object[inArrayKeys[0]]);
                } catch (e) {
                    throw new Error('in_array argument field must be an array');
                }
            }

            if (object[inArrayKeys[0]] instanceof Array) {
                if (inArrayKeys.length < 1 || inArrayKeys.length > 3 || (inArrayKeys.length >= 2 && inArrayKeys[1] !== '*')) {
                    throw new Error('in_array field argument must be of format \'field\', \'field.*\' or \'field.*.inner\'');
                }

                const tempInArrayObj = object[inArrayKeys[0]].find(item => {
                    if (inArrayKeys.length === 3 && item.constructor !== {}.constructor) {
                        throw new Error('in_array field argument must be an array of objects if three sub arguments are provided');
                    }

                    if (inArrayKeys.length < 3 && (typeof item !== 'string' && typeof item !== 'number')) {
                        throw new Error('in_array field argument must be an array of strings or numbers if less than three sub arguments are provided');
                    }

                    if (inArrayKeys.length === 3) {
                        return Number(item[inArrayKeys[2]]) === object[property];
                    }

                    return Number(item) === object[property];
                });

                if (tempInArrayObj) {
                    return true;
                }

                messages.push(rawMessage.replace(':field', property).replace(':another', args));

                return false;
            } else {
                throw new Error('in_array argument field must be an array');
            }

        case 'integer':
            if (Number.isInteger(object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'lt':
            if (!args || args.split(',').length > 1) {
                throw new Error('lt requires one argument');
            }

            if (isNaN(Number(object[args]))) {
                throw new Error('lt field argument should be a number');
            }

            if (object[property] < Number(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'lte':
            if (!args || args.split(',').length > 1) {
                throw new Error('lte requires one argument');
            }

            if (isNaN(Number(object[args]))) {
                throw new Error('lte field argument should be a number');
            }

            if (object[property] <= Number(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'max':
            if (!args || args.split(',').length > 1) {
                throw new Error('max requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('max argument should be a number');
            }

            if (object[property] <= Number(args)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'min':
            if (!args || args.split(',').length > 1) {
                throw new Error('min requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('min argument should be a number');
            }

            if (object[property] >= Number(args)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'not_in':
            if (!args && subArgs === null) {
                throw new Error('not_in requires at least one argument');
            }

            let notInValues;

            if (args) {
                notInValues = args.split(',');
            } else if (subArgs instanceof Array) {
                notInValues = subArgs;
            } else {
                throw new Error('in requires valid array arguments');
            }

            if (!notInValues.find(value => Number(value) === Number(object[property]))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'same':
            if (!args || args.split(',').length !== 1) {
                throw new Error('same requires one argument');
            }

            if (object[property] === Number(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'size':
            if (!args || args.split(',').length !== 1) {
                throw new Error('size requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('size argument should be a number');
            }

            if (object[property] === Number(args)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        default:

            throw new Error('Unsupported \'' + rule + '\' validation rule on number rules');
    }
}

module.exports = validate;
