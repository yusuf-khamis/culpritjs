const assert = require('assert');
const validator = require('../../lib/types/general');
const messages = require('../../lib/messages');

describe('general', function () {
    let values = [
        25, 'test', '123', 123, 'name', 'another', 852, 13
    ];
    let errorMessages = [];

    describe('required', function () {
        errorMessages = [];

        it('Should return true when required_key is provided', function () {
            assert.strictEqual(validator('required_key', { required_key: values[0] }, 'required', '', errorMessages, ''), true);
        });

        it('Should return false when required_key is not provided', function () {
            assert.strictEqual(validator('required_key', { }, 'required', '', errorMessages, ''), false);
        });
    });

    describe('required_if', function () {
        errorMessages = [];

        const tempValue = 74;

        it('Should return true when required_if_field is ' + values[3] + ' and args field in stringified form of ' + values.join(), function () {
            assert.strictEqual(validator('required_if_key', { required_if_key: tempValue, required_if_field: values[3] }, 'required_if', 'required_if_field,' + values.join(), errorMessages, ''), true);
        });

        it('Should return true when required_if_field is ' + values[3] + ' and args field in array form of ' + values.join(), function () {
            assert.strictEqual(validator('required_if_key', { required_if_key: tempValue, required_if_field: values[3] }, 'required_if', 'required_if_field', errorMessages, '', values), true);
        });

        it('Should return true when required_if_field is ' + values[7] + ' but arg field is ' + values[6] + ' and required_if_key not provided', function () {
            assert.strictEqual(validator('required_if_key', { required_if_field: values[7] }, 'required_if', 'required_if_field,' + values[6], errorMessages, ''), true);
        });

        it('Should return false when required_if_key is not provided and required_if_field is ' + values[6] + ' and field args array form of ' + values.join(), function () {
            assert.strictEqual(validator('required_if_key', { required_if_field: values[6] }, 'required_if', 'required_if_field', errorMessages, '', values), false);
        });
    });

    describe('required_unless', function () {
        errorMessages = [];

        const tempValue = 846;

        it('Should return true when required_unless_field is ' + tempValue + ' and args field in stringified form of ' + values.join(), function () {
            assert.strictEqual(validator('required_unless_key', { required_unless_key: values[1], required_unless_field: tempValue }, 'required_unless', 'required_unless_field,' + values.join(), errorMessages, ''), true);
        });

        it('Should return true when required_unless_field is ' + tempValue + ' and args field in array form of ' + values.join(), function () {
            assert.strictEqual(validator('required_unless_key', { required_unless_key: values[1], required_unless_field: tempValue }, 'required_unless', 'required_unless_field', errorMessages, '', values), true);
        });

        it('Should return true when required_unless_field is ' + values[2] + ' and args field in array form of ' + values.join() + ' and required_unless_key not provided', function () {
            assert.strictEqual(validator('required_unless_key', { required_unless_field: values[2] }, 'required_unless', 'required_unless_field', errorMessages, '', values), true);
        });

        it('Should return false when required_unless_field is ' + tempValue + ' and args field in array form of ' + values.join() + ' and required_unless_key not provided', function () {
            assert.strictEqual(validator('required_unless_key', { required_unless_field: tempValue }, 'required_unless', 'required_unless_field', errorMessages, '', values), false);
        });
    });

    describe('required_with', function () {
        errorMessages = [];

        it('Should return true when required_with_field_1, required_with_field_2 are provided as values and args and required_with_key provided', function () {
            assert.strictEqual(validator('required_with_key', { required_with_key: values[1], required_with_field_1: values[2], required_with_field_2: values[0] }, 'required_with', 'required_with_field_1,required_with_field_2', errorMessages, ''), true);
        });

        it('Should return false when required_with_field_1, required_with_field_2 are provided as values and args and required_with_key not provided', function () {
            assert.strictEqual(validator('required_with_key', { required_with_field_1: values[3], required_with_field_2: values[1] }, 'required_with', 'required_with_field_1,required_with_field_2', errorMessages, ''), false);
        });
    });

    describe('required_with_all', function () {
        errorMessages = [];

        it('Should return true when required_with_all_field_1, required_with_all_field_2 are provided as values and args and required_with_all_key provided', function () {
            assert.strictEqual(validator('required_with_all_key', { required_with_all_key: values[1], required_with_all_field_1: values[0], required_with_all_field_2: values[2] }, 'required_with_all', 'required_with_all_field_1,required_with_all_field_2', errorMessages, ''), true);
        });

        it('Should return true when required_with_field_1, required_with_field_2 are provided as args but one of them provided with value and required_with_all_key not provided', function () {
            assert.strictEqual(validator('required_with_all_key', { required_with_all_field_2: values[3] }, 'required_with_all', 'required_with_all_field_1,required_with_all_field_2', errorMessages, ''), true);
        });

        it('Should return false when required_with_field_1, required_with_field_2 are provided as args and with values and required_with_all_key not provided', function () {
            assert.strictEqual(validator('required_with_all_key', { required_with_all_field_1: values[1], required_with_all_field_2: values[3] }, 'required_with_all', 'required_with_all_field_1,required_with_all_field_2', errorMessages, ''), false);
        });
    });

    describe('required_without', function () {
        errorMessages = [];

        it('Should return true when required_without_field_1, required_without_field_2 are provided as args only and required_without_key provided', function () {
            assert.strictEqual(validator('required_without_key', { required_without_key: values[1] }, 'required_without', 'required_without_field_1,required_without_field_2', errorMessages, ''), true);
        });

        it('Should return false when required_without_field_1, required_without_field_2 are provided as args but only one provided with value and required_without_key not provided', function () {
            assert.strictEqual(validator('required_without_key', { required_without_field_1: values[3] }, 'required_without', 'required_without_field_1,required_without_field_2', errorMessages, ''), false);
        });
    });

    describe('required_without_all', function () {
        errorMessages = [];

        it('Should return true when required_without_all_field_1, required_without_all_field_2 are provided as args but not values and required_without_all_key provided', function () {
            assert.strictEqual(validator('required_without_all_key', { required_without_all_key: values[1] }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), true);
        });

        it('Should return false when required_without_field_1, required_without_field_2 are provided as args and not with values and required_without_all_key not provided', function () {
            assert.strictEqual(validator('required_without_all_key', { }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), false);
        });

        it('Should return true when required_without_field_1, required_without_field_2 are provided as args and with values and required_without_all_key not provided', function () {
            assert.strictEqual(validator('required_without_all_key', { required_without_all_field_1: values[1], required_without_all_field_2: values[3] }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), true);
        });

        it('Should return true when required_without_field_1, required_without_field_2 are provided as args and with values and required_without_all_key provided', function () {
            assert.strictEqual(validator('required_without_all_key', { required_without_all_key: values[1], required_without_all_field_1: values[2], required_without_all_field_2: values[3] }, 'required_without_all', 'required_without_all_field_1,required_without_all_field_2', errorMessages, ''), true);
        });
    });
});