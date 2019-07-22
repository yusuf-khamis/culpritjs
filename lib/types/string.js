const moment = require('moment-timezone');

function validate(property, object, rule, args, messages, rawMessage, subArgs = null) {
    switch (rule) {
        case 'alpha':
            if (args) {
                throw  new Error('string alpha doesn\'t require any arguments');
            }

            if ((object[property].match(/^[a-z]+$/i))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'alpha_dash':
            if (args) {
                throw  new Error('string alpha_dash doesn\'t require any arguments');
            }

            if (!!(object[property].match(/^[-_a-z]+$/i))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'alpha_num':
            if (args) {
                throw  new Error('string alpha_num doesn\'t require any arguments');
            }

            if ((object[property].match(/^[a-z0-9]+$/i))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'between':
            if (!args || args.split(',').length !== 2) {
                throw new Error('between requires two arguments');
            }

            const betweenValues = args.split(',');

            if (isNaN(Number(betweenValues[0])) || isNaN(Number(betweenValues[1]))) {
                throw new Error('between arguments should be numbers');
            }

            if (Number(betweenValues[0]) >= Number(betweenValues[1])) {
                throw new Error('between first argument should be less than the second argument');
            }

            if (object[property].match(RegExp('^(.){' + betweenValues[0] + ',' + betweenValues[1] + '}$'))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':min', betweenValues[0]).replace(':max', betweenValues[1]));

            return false;

        case 'clean':
            if (!args) {
                throw new Error('clean requires at least one argument');
            }

            if (args.split(',').find(arg => !arg.startsWith('spaces') && !arg.startsWith('case') && !arg.startsWith('rem'))) {
                throw new Error('clean arguments should only be \'case\', \'spaces\' or \'rem\'');
            }

            const cleanArgs = args.split(',');

            for(let index in cleanArgs) {
                if (cleanArgs[index].startsWith('spaces')) {
                    const spacesArgs = cleanArgs[index].split('.');

                    if (spacesArgs.length > 3) {
                        throw new Error('clean \'spaces\' argument should have at most 2 sub arguments');
                    }

                    spacesArgs.splice(1).forEach(arg => {
                        switch (arg) {
                            case 'end':
                                object[property] = object[property].replace(/\s+$/, '');

                                break;

                            case 'begin':
                                object[property] = object[property].replace(/^\s+/, '');

                                break;

                            case 'between_single':
                                object[property] = object[property].match(/^\s*/)[0] + object[property].trim().replace(/[\s\t\r\n]+/g, ' ') + object[property].match(/\s*$/)[0];

                                break;

                            case 'between_none':
                                object[property] = object[property].match(/^\s*/)[0] + object[property].trim().replace(/\s+/g, '') + object[property].match(/\s*$/)[0];

                                break;

                            case 'both':
                                object[property] = object[property].trim();

                                break;

                            default:

                                throw new Error('clean \'spaces\' argument should be either \'begin\', \'end\', \'both\', \'between_single\' or \'between_none\'');
                        }
                    });

                } else if (cleanArgs[index].startsWith('case')) {
                    const caseArgs = cleanArgs[index].split('.');

                    if (caseArgs.length > 2) {
                        throw new Error('clean \'case\' argument should have at most one sub argument');
                    }

                    switch (caseArgs[1]) {
                        case 'lower':
                            object[property] = object[property].toLowerCase();

                            break;

                        case 'upper':
                            object[property] = object[property].toUpperCase();

                            break;

                        case 'title':
                            object[property] = object[property].match(/\w+/g).map(word => word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

                            break;

                        default:

                            throw new Error('clean \'case\' argument should be either of \'lower\', \'upper\' or \'title\'');

                    }
                } else if (cleanArgs[index].startsWith('rem')) {
                    try {
                        object[property] = object[property].replace(RegExp(cleanArgs[index].substr(4), 'g'), '');
                    } catch (e) {
                        throw new Error('clean \'rem\' argument should be a valid regex argument');
                    }
                }
            }

            return true;

        case 'confirmed':
            let confirmationKey = property + '_confirmation';

            if (args) {
                confirmationKey = args;
            }

            if (object[property] === object[confirmationKey]) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':confirmation', property + '_confirmation'));

            return false;

        case 'card':
            if (args) {
                throw  new Error('string payment_card doesn\'t require any arguments');
            }

            if (String(object[property]).match(/^\d{12,19}$/)) {
                const card = String(object[property]).split('');
                let cardFinal = Array(card.length), isAlt = false, sum = 0;

                cardFinal[card.length - 1] = Number(card[card.length - 1]);

                for (let i = card.length - 2; i >= 0; i--) {
                    if (isAlt) {
                        cardFinal[i] = Number(card[i]);
                    } else {
                        let temp = Number(card[i]) * 2;

                        if (temp > 9) {
                            temp -= 9;
                        }

                        cardFinal[i] = temp;
                    }

                    sum += cardFinal[i];

                    isAlt = !isAlt;
                }

                if ((sum * 9) % 10 === cardFinal[cardFinal.length - 1]) {

                    return true;
                }
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'different':
            if (!args || args.split(',').length > 1) {
                throw new Error('different requires one argument');
            }

            if (object[property] !== String(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'email':
            if (args) {
                throw  new Error('string email doesn\'t require any arguments');
            }

            if (object[property].match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'filled':
            if (args) {
                throw  new Error('string filled doesn\'t require any arguments');
            }

            if (object[property] !== undefined && object[property]) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'gt':
            if (!isNaN(Number(args))) {
                throw new Error('gt requires a non-number argument');
            }

            if (args.split(',').length > 1) {
                throw new Error('gt requires one argument');
            }

            if (!object[args]) {
                throw new Error('gt field argument should not be empty');
            }

            if (object[property].localeCompare(object[args]) === 1) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'gte':
            if (!isNaN(Number(args))) {
                throw new Error('gte requires a non-number argument');
            }

            if (!args || args.split(',').length > 1) {
                throw new Error('gte requires one argument');
            }

            if (!object[args]) {
                throw new Error('gte field argument should not be empty');
            }

            if (object[property].localeCompare(object[args]) >= 0) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

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

            if (inValues.find(value => value === object[property])) {
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
                        return item[inArrayKeys[2]] === object[property];
                    }

                    return item === object[property];
                });

                if (tempInArrayObj) {
                    return true;
                }

                messages.push(rawMessage.replace(':field', property).replace(':another', args));

                return false;
            } else {
                throw new Error('in_array argument field must be an array');
            }

        case 'ip_address':
            if (args) {
                throw  new Error('string ip_address doesn\'t require any arguments');
            }

            if (object[property].match(/^((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))$/)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'ipv4':
            if (args) {
                throw  new Error('string ipv6 doesn\'t require any arguments');
            }

            if (object[property].match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'ipv6':
            if (args) {
                throw  new Error('string ipv6 doesn\'t require any arguments');
            }

            if (object[property].match(/^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'json':
            if (args) {
                throw  new Error('string json doesn\'t require any arguments');
            }

            try {
                if (typeof object[property] === 'string') {
                    object[property] = JSON.parse(object[property]);
                }

                if (object[property].constructor !== {}.constructor && !(object[property] instanceof Array)) {
                    throw new Error();
                }

                return true;
            } catch (e) {
                messages.push(rawMessage.replace(':field', property));

                return false;
            }

        case 'lt':
            if (!isNaN(Number(args))) {
                throw new Error('lt requires a non-number argument');
            }

            if (args.split(',').length > 1) {
                throw new Error('lt requires one argument');
            }

            if (!object[args]) {
                throw new Error('lt field argument should not be empty');
            }

            if (object[property].localeCompare(object[args]) === -1) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'lte':
            if (!isNaN(Number(args))) {
                throw new Error('lte requires a non-number argument');
            }

            if (!args || args.split(',').length > 1) {
                throw new Error('lte requires one argument');
            }

            if (!object[args]) {
                throw new Error('lte field argument should not be empty');
            }

            if (object[property].localeCompare(object[args]) <= 0) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'max':
            if (!args || args.split(',').length > 1) {
                throw new Error('max requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('max requires one number argument');
            }

            if (object[property].length <= Number(args)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'min':
            if (!args || args.split(',').length > 1) {
                throw new Error('min requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('min requires one number argument');
            }

            if (object[property].length >= Number(args)) {
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
                throw new Error('not_in requires valid array arguments');
            }

            if (!notInValues.find(value => value === object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'not_regex':
            if (!args && subArgs === null) {
                throw new Error('not_regex requires one argument');
            }

            let notRegexRegExp;

            if (args) {
                notRegexRegExp = RegExp(args);
            } else if (subArgs instanceof RegExp) {
                notRegexRegExp = subArgs;
            } else if (typeof subArgs === 'string') {
                notRegexRegExp = RegExp(subArgs)
            } else {
                throw new Error('not_regex requires one valid argument');
            }

            if (!object[property].match(notRegexRegExp)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'numeric':
            if (args) {
                throw new Error('string numeric doesn\'t require any arguments');
            }

            if (!isNaN(Number(object[property]))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'present':
            if (args) {
                throw  new Error('string present doesn\'t require any arguments');
            }

            if (object[property].length >= 0 && object[property] !== 'undefined') {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'regex':
            if (!args || args.split(',').length !== 1) {
                throw new Error('regex requires one argument');
            }

            let regexRegExp;

            if (args) {
                regexRegExp = RegExp(args);
            } else if (subArgs instanceof RegExp) {
                regexRegExp = subArgs;
            } else if (typeof subArgs === 'string') {
                regexRegExp = RegExp(subArgs)
            } else {
                throw new Error('not_regex requires one valid argument');
            }

            if (object[property].match(regexRegExp)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'same':
            if (!args || args.split(',').length !== 1) {
                throw new Error('same requires one argument');
            }

            if (object[property] === String(object[args])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'size':
            if (!args || args.split(',').length !== 1) {
                throw new Error('size requires one argument');
            }

            if (isNaN(Number(args))) {
                throw new Error('size requires one number argument');
            }

            if (object[property].length === Number(args)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'starts_with':
            if (!args || args.split(',').length !== 1) {
                throw new Error('starts_with requires one argument');
            }

            const startsWithValues = args.split(',');

            if (startsWithValues.find(value => object[property].startsWith(value))) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':value', args));

            return false;

        case 'timezone':
            if (args) {
                throw  new Error('string timezone doesn\'t require any arguments');
            }

            if (moment.tz.names().find(item => item === object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'url':
            if (args) {
                throw  new Error('string url doesn\'t require any arguments');
            }

            if (object[property].match(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'uuid':
            if (args) {
                throw  new Error('string uuid doesn\'t require any arguments');
            }

            if (object[property].match(/^[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/)) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        default:

            throw new Error('Unsupported \'' + rule + '\' validation rule on string rules');

    }
}

module.exports = validate;
