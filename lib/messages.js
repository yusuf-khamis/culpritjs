module.exports = {
    general: {
        required: ':field must be provided',
        required_if: ':field is required if :another is equal to any of [:value]',
        required_unless: ':field is required unless :another is equal to any of :value',
        required_with: ':field is required if any of [:another] fields are present with values',
        required_with_all: ':field is required if all [:another] fields are present with values',
        required_without: ':field is required if any of [:another] fields are not present with values',
        required_without_all: ':field is required if all [:another] fields are not present with values'
    },
    boolean: {
        accepted: ':field must be a \'yes\', \'true\', \'1\' or  \'on\'',
        not_accepted: ':field must be a \'no\', \'false\', \'0\' or  \'off\'',
        boolean: ':field must be a valid boolean (\'yes\', \'no\', \'true\', \'false\', \'1\', \'0\', \'off\' or  \'on\')',
    },
    string: {
        alpha: ':field must only contain alpha characters',
        alpha_dash: ':field must only contain alpha (letters) characters, underscores(_) and a dash (-)',
        alpha_num: ':field must only contain alphanumeric (letters and numbers) characters',
        between: ':field length must be between :min and :max',
        confirmed: ':field must match :confirmation',
        card: ':field must be a valid payment card number',
        different: ':field must not be :another',
        email: ':field must be a valid email',
        filled: ':field must not be empty when present',
        gt: ':field value must come after :another in value',
        gte: ':field value must either be equal to or come after :another',
        in: ':field value must be one of :value',
        in_array: ':field must be exists in :another values',
        ip: ':field must be a valid ip address',
        json: ':field must be a valid json',
        lt: ':field value must come before :another in value',
        lte: ':field value  must either be equal to or come before :another',
        max: ':field value must have a maximum length of :value',
        min: ':field value must have a minimum length of :value',
        not_in: ':field value must not be one of :value',
        not_regex: ':field value must not match regex pattern :value',
        numeric: ':field must be numeric',
        present: ':field must be present even with an empty value',
        regex: ':field must match regex pattern :value',
        same: ':field must be equal to :another field',
        size: ':field value must have a length of :value',
        starts_with: ':field value must start with either of :value',
        string: ':field must be a valid string',
        timezone: ':field must be a valid timezone identifier',
        url: ':field must be a valid url',
        uuid: ':field must be a valid uuid/guid string'
    },
    number: {
        between: ':field must be between :min and :max',
        different: ':field must not be :value',
        digits: ':field must have :value number of digits',
        digits_between: ':field must have between :min and :max number of digits',
        gt: ':field must be greater than :value',
        gte: ':field must be equal to or greater than :value',
        in: ':field must be among :value',
        in_array: ':field is not in :another values',
        integer: ':field must be an integer',
        lt: ':field must be less than :value',
        lte: ':field must be less than or equal to :value',
        max: ':field must have a maximum value of :value',
        min: ':field must have a minimum value of :value',
        not_in: ':field must not be among :value',
        number: ':field must be a number',
        same: ':field must be equal to :value',
        size: ':field must be equal to :value'
    },
    date: {
        after: ':field must be after :value',
        after_or_equal: ':field must be on or after :value',
        before: ':field must be before :value',
        before_or_equal: ':field must be on or before :value',
        date: ':field must be a date',
        date_equals: ':field must be equal to :value',
        date_format: ':field must be of the format :value'
    },
    array: {
        array: ':field must be a valid array',
        between: ':field items must be between :min and :max in size',
        distinct: ':field must not have duplicate items',
        gt: ':field items must be greater than :value in size',
        gte: ':field items must be greater than or equal to :value in size',
        lt: ':field items must be less than :value in size',
        lte: ':field items must be less than or equal to :value in size',
        max: ':field items must have a maximum of :value in size',
        min: ':field items must have a minimum of :value in size',
        size: ':field items must be :value in size'
    }
};
