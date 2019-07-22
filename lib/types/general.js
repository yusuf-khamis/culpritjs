function validate(property, object, rule, args, messages, rawMessage, subArgs = null) {
    switch (rule) {
        case 'required':
            if (object[property]) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'required_if':
            if (!args || (args.split(',').length < 2 && !subArgs)) {
                throw new Error('required_if should have at least two arguments or one argument and array of values provided');
            }

            const tempRequiredIfArgsSplit = args.split(',');

            let requiredIfValues, requiredIfField = tempRequiredIfArgsSplit[0];

            if (tempRequiredIfArgsSplit.length > 1) {
                requiredIfValues = tempRequiredIfArgsSplit.slice(1);
            } else if (subArgs instanceof Array) {
                requiredIfValues = subArgs;
            } else {
                throw new Error('required_if requires one or more values');
            }

            if (requiredIfValues.find(value => value.length === 0)) {
                throw new Error('required_if should have not have empty arguments');
            }

            const requiredIfFound = requiredIfValues.find(item => String(item) === String(object[requiredIfField]));

            if (!requiredIfFound || (requiredIfFound && object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', requiredIfField).replace(':value', requiredIfValues.join(',')));

            return false;

        case 'required_unless':
            if (!args || (args.split(',').length < 2 && !subArgs)) {
                throw new Error('required_unless should have at least two arguments or one argument and array of values provided');
            }

            const tempRequiredUnlessArgsSplit = args.split(',');

            let requiredUnlessValues, requiredUnlessField = tempRequiredUnlessArgsSplit[0];

            if (tempRequiredUnlessArgsSplit.length > 1) {
                requiredUnlessValues = tempRequiredUnlessArgsSplit.slice(1);
            } else if (subArgs instanceof Array) {
                requiredUnlessValues = subArgs;
            } else {
                throw new Error('required_unless requires one or more values');
            }

            if (requiredUnlessValues.find(value => value.length === 0)) {
                throw new Error('required_unless should have not have empty arguments');
            }

            const requiredUnlessFound = requiredUnlessValues.find(item => String(item) === String(object[requiredUnlessField]));

            if (requiredUnlessFound || (!requiredUnlessFound && object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', requiredUnlessField).replace(':value', requiredUnlessValues.join(',')));

            return false;

        case 'required_with':
            if (!args) {
                throw new Error('required_with should have at least one argument');
            }

            const requiredWithValues = args.split(',');

            if (requiredWithValues.find(value => value.length === 0)) {
                throw new Error('required_with should have not have empty arguments');
            }

            const requiredWithFound = requiredWithValues.find(field => object[field]);

            if (!requiredWithFound || (requiredWithFound && object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'required_with_all':
            if (!args) {
                throw new Error('required_with_all should have at least one argument');
            }

            const requiredWithAllValues = args.split(',');

            if (requiredWithAllValues.find(value => value.length === 0)) {
                throw new Error('required_with_all should not have have empty arguments');
            }

            const requiredWithAllFound = requiredWithAllValues.find(field => !object[field]);

            if (requiredWithAllFound || (!requiredWithAllFound && object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'required_without':
            if (!args) {
                throw new Error('required_without should have at least one argument');
            }

            const requiredWithoutValues = args.split(',');

            if (requiredWithoutValues.find(value => value.length === 0)) {
                throw new Error('required_without should have not have empty arguments');
            }

            const requiredWithoutFound = requiredWithoutValues.find(field => !object[field]);

            if (!requiredWithoutFound || (requiredWithoutFound && object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        case 'required_without_all':
            if (!args) {
                throw new Error('required_without_all should have at least one argument');
            }

            const requiredWithoutAllValues = args.split(',');

            if (requiredWithoutAllValues.find(value => value.length === 0)) {
                throw new Error('required_without_all should have not have empty arguments');
            }

            const requiredWithoutAllFound = requiredWithoutAllValues.find(field => object[field]);

            if (requiredWithoutAllFound || (!requiredWithoutAllFound && object[property])) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property).replace(':another', args));

            return false;

        default:

            throw new Error('Unsupported \'' + rule + '\' validation rule');
    }
}

module.exports = validate;