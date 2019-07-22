function validate(property, object, rule, args, messages, rawMessage) {
    if (args) {
        throw  new Error('boolean ' + rule + ' doesn\'t require any arguments');
    }

    switch (rule) {
        case 'accepted':
            if (object[property]) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        case 'not_accepted':
            if (!object[property]) {
                return true;
            }

            messages.push(rawMessage.replace(':field', property));

            return false;

        default:

            throw new Error('Unsupported \'' + rule + '\' validation rule on boolean rules');
    }
}

module.exports = validate;