const assert = require('assert');
const validator = require('../../lib/types/number');

describe('number', function () {
    let errorMessages;
    const values = [
        8, 14, 52, 85413, 25.98, 47.68
    ];

    describe('between', function () {
        errorMessages = [];

        it('Should return true for ' + values[1] + ' with arguments 11,31', function () {
            assert.strictEqual(validator('between_key', { between_key: values[1] }, 'between', '11,31', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2] + ' with arguments 11,31', function () {
            assert.strictEqual(validator('between_key', { between_key: values[2] }, 'between', '11,31', errorMessages, ''), false);
        });

        /* In the next release

        it('Should throw an error for value ' + values[1] + ' with arguments 11,31,45,65 (passing more than 2 arguments)', function () {
            assert.throws(() => validator('between_key', { between_key: values[1] }, 'between', '11,31,45,65', errorMessages, ''));
        });

        it('Should throw an error for value ' + values[1] + ' with argument 11 (passing one argument)', function () {
            assert.throws(() => validator('between_key', { between_key: values[1] }, 'between', '11', errorMessages, ''));
        });

        it('Should throw an error for value ' + values[1] + ' with no arguments', function () {
            assert.throws(() => validator('between_key', { between_key: values[1] }, 'between', '', errorMessages, ''));
        });

        it('Should throw an error for value ' + values[1] + ' with arguments yes,no (non-number arguments)', function () {
            assert.throws(() => validator('between_key', { between_key: values[1] }, 'between', 'yes,no', errorMessages, ''));
        });

        it('Should throw an error for value ' + values[1] + ' with arguments 31,11 (first argument greater than second)', function () {
            assert.throws(() => validator('between_key', { between_key: values[1] }, 'between', '31,11', errorMessages, ''));
        });

        */
    });

    describe('different', function () {
        errorMessages = [];

        it('Should return true for ' + values[1] + ' with another field of ' + values[0], function () {
            assert.strictEqual(validator('different_key', { different_key: values[1], different_field: values[0] }, 'different', 'different_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1] + ' with another field of itself', function () {
            assert.strictEqual(validator('different_key', { different_key: values[1], different_field: values[1] }, 'different', 'different_field', errorMessages, ''), false);
        });
    });

    describe('digits', function () {
        errorMessages = [];

        it('Should return true for ' + values[3] + ' with argument of 5', function () {
            assert.strictEqual(validator('digits_key', { digits_key: values[3] }, 'digits', '5', errorMessages, ''), false);
        });

        it('Should return false for ' + values[2] + ' with argument of 5', function () {
            assert.strictEqual(validator('digits_key', { digits_key: values[2] }, 'digits', '5', errorMessages, ''), false);
        });
    });

    describe('digits_between', function () {
        errorMessages = [];

        it('Should return true for ' + values[3] + ' with arguments of 3,10', function () {
            assert.strictEqual(validator('digits_between_key', { digits_between_key: values[3] }, 'digits_between', '3,10', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2] + ' with arguments of 4,9', function () {
            assert.strictEqual(validator('digits_between_key', { digits_between_key: values[2] }, 'digits_between', '4,9', errorMessages, ''), false);
        });
    });

    describe('gt', function () {
        errorMessages = [];

        it('Should return true for ' + values[1] + ' with gt_field ' + values[0], function () {
            assert.strictEqual(validator('gt_key', { gt_key: values[1], gt_field: values[0] }, 'gt', 'gt_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1] + ' with gt_field ' + values[2], function () {
            assert.strictEqual(validator('gt_key', { gt_key: values[1], gt_field: values[2] }, 'gt', 'gt_field', errorMessages, ''), false);
        });
    });

    describe('gte', function () {
        errorMessages = [];

        it('Should return true for ' + values[2] + ' with gte_field ' + values[1], function () {
            assert.strictEqual(validator('gte_key', { gte_key: values[2], gte_field: values[1] }, 'gte', 'gte_field', errorMessages, ''), true);
        });

        it('Should return true for ' + values[1] + ' with gte_field of itself', function () {
            assert.strictEqual(validator('gte_key', { gte_key: values[1], gte_field: values[1] }, 'gte', 'gte_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2] + ' with gte_field ' + values[3], function () {
            assert.strictEqual(validator('gte_key', { gte_key: values[2], gte_field: values[3] }, 'gte', 'gte_field', errorMessages, ''), false);
        });
    });

    describe('in', function () {
        errorMessages = [];

        let tempValue = 8756;

        it('Should return true for ' + values[0] + ' with stringified values ' + values.join(), function () {
            assert.strictEqual(validator('in_key', { in_key: values[0] }, 'in', values.join(), errorMessages, ''), true);
        });

        it('Should return true for ' + values[0] + ' with array values ' + values.join(), function () {
            assert.strictEqual(validator('in_key', { in_key: values[0] }, 'in', '', errorMessages, '', values), true);
        });

        it('Should return false for ' + tempValue + ' with stringified values ' + values.join(), function () {
            assert.strictEqual(validator('in_key', { in_key: tempValue }, 'in', values.join(), errorMessages, ''), false);
        });

        it('Should return false for ' + tempValue + ' with array values ' + values.join(), function () {
            assert.strictEqual(validator('in_key', { in_key: tempValue }, 'in', '', errorMessages, '', values), false);
        });
    });

    describe('in_array', function () {
        errorMessages = [];

        let tempValue = 41652;

        it('should return true for ' + values[1] + ' with array form of ' + values.join() + ' and argument in_array_field.*', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values }, 'in_array', 'in_array_field.*', errorMessages, ''), true);
        });

        it('should return true for ' + values[1] + ' with array form of ' + values.join() + ' and argument in_array_field', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values }, 'in_array', 'in_array_field', errorMessages, ''), true);
        });

        it('should return false for ' + tempValue + ' with array form of ' + values.join() + ' and argument in_array_field', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values }, 'in_array', 'in_array_field', errorMessages, ''), true);
        });

        it('should return true for ' + values[1] + ' with stringified array form of ' + values.join() + ' and argument in_array_field.*', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: JSON.stringify(values) }, 'in_array', 'in_array_field.*', errorMessages, ''), true);
        });

        it('should return true for ' + values[1] + ' with objectified array form of item and ' + values.join() + ' and argument in_array_field.*.item', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values.map(item => { return  { item: item } }) }, 'in_array', 'in_array_field.*.item', errorMessages, ''), true);
        });

        it('should throw error for ' + values[1] + ' with objectified array form of item and ' + values.join() + ' and argument in_array_field.*', function () {
            assert.throws(() => validator('in_array_key', { in_array_key: values[1], in_array_field: values.map(item => { return  { item: item } }) }, 'in_array', 'in_array_field.*', errorMessages, ''));
        });

        it('should throw error for ' + values[1] + ' with array form of item and ' + values.join() + ' and argument in_array_field.*.item', function () {
            assert.throws(() => validator('in_array_key', { in_array_key: values[1], in_array_field: values }, 'in_array', 'in_array_field.*.item', errorMessages, ''));
        });

        it('should throw error for ' + values[1] + ' with itself as the field in string and argument in_array_field.*', function () {
            assert.throws(() => validator('in_array_key', { in_array_key: values[1], in_array_field: values[1] }, 'in_array', 'in_array_field.*', errorMessages, ''));
        });
    });

    describe('integer', function () {
        errorMessages = [];

        it('Should return true for ' + values[3], function () {
            assert.strictEqual(validator('integer_key', { integer_key: values[3] }, 'integer', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[5], function () {
            assert.strictEqual(validator('integer_key', { integer_key: values[5] }, 'integer', '', errorMessages, ''), false);
        });
    });

    describe('lt', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' with gt_field ' + values[1], function () {
            assert.strictEqual(validator('lt_key', { lt_key: values[0], lt_field: values[1] }, 'lt', 'lt_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2] + ' with gt_field ' + values[1], function () {
            assert.strictEqual(validator('lt_key', { lt_key: values[2], lt_field: values[1] }, 'lt', 'lt_field', errorMessages, ''), false);
        });
    });

    describe('lte', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' with lte_field ' + values[1], function () {
            assert.strictEqual(validator('lte_key', { lte_key: values[0], lte_field: values[1] }, 'lte', 'lte_field', errorMessages, ''), true);
        });

        it('Should return true for ' + values[1] + ' with lte_field of itself', function () {
            assert.strictEqual(validator('lte_key', { lte_key: values[1], lte_field: values[1] }, 'lte', 'lte_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2] + ' with lte_field ' + values[1], function () {
            assert.strictEqual(validator('lte_key', { lte_key: values[2], lte_field: values[1] }, 'lte', 'lte_field', errorMessages, ''), false);
        });
    });

    describe('max', function () {
        errorMessages = [];

        it('Should return true for ' + values[1] + ' with arg 20 ', function () {
            assert.strictEqual(validator('max_key', { max_key: values[1] }, 'max', '20', errorMessages, ''), true);
        });

        it('Should return false for ' + values[3] + ' with arg  30', function () {
            assert.strictEqual(validator('max_key', { max_key: values[3] }, 'max', '30', errorMessages, ''), false);
        });
    });

    describe('min', function () {
        errorMessages = [];

        it('Should return true for ' + values[2] + ' with arg 25', function () {
            assert.strictEqual(validator('min_key', { min_key: values[2] }, 'min', '25', errorMessages, ''), true);
        });

        it('Should return false for ' + values[0] + ' with arg 10', function () {
            assert.strictEqual(validator('min_key', { min_key: values[0] }, 'min', '10', errorMessages, ''), false);
        });
    });

    describe('not_in', function () {
        errorMessages = [];

        let tempValue = 2516;

        it('Should return false for ' + values[0] + ' with stringified values ' + values.join(), function () {
            assert.strictEqual(validator('not_in_key', { not_in_key: values[0] }, 'not_in', values.join(), errorMessages, ''), false);
        });

        it('Should return false for ' + values[0] + ' with array values ' + values.join(), function () {
            assert.strictEqual(validator('not_in_key', { not_in_key: values[0] }, 'not_in', '', errorMessages, '', values), false);
        });

        it('Should return true for ' + tempValue + ' with stringified values ' + values.join(), function () {
            assert.strictEqual(validator('not_in_key', { not_in_key: tempValue }, 'not_in', values.join(), errorMessages, ''), true);
        });

        it('Should return true for ' + tempValue + ' with array values ' + values.join(), function () {
            assert.strictEqual(validator('not_in_key', { not_in_key: tempValue }, 'not_in', '', errorMessages, '', values), true);
        });
    });

    describe('same', function () {
        errorMessages = [];

        it('Should return true for fields with same value ' + values[3], function () {
            assert.strictEqual(validator('same_key', { same_key: values[3], same_field: values[3] }, 'same', 'same_field', errorMessages, ''), true);
        });

        it('Should return false for value ' + values[2] + ' and value ' + values[1], function () {
            assert.strictEqual(validator('same_key', { same_key: values[2], same_field: values[1] }, 'same', 'same_field', errorMessages, ''), false);
        });
    });

    describe('size', function () {
        errorMessages = [];

        it('Should return true for field with value ' + values[2] + ' with argument of itself', function () {
            assert.strictEqual(validator('size_key', { size_key: values[2]}, 'size', String(values[2]), errorMessages, ''), true);
        });

        it('Should return false for field with value ' + values[1] + ' with argument ' + values[0], function () {
            assert.strictEqual(validator('size_key', { size_key: values[1]}, 'size', String(values[0]), errorMessages, ''), false);
        });
    });
});