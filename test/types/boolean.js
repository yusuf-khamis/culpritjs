const assert = require('assert');
const validator = require('../../lib/types/boolean');
const messages = require('../../lib/messages');

describe('boolean', function () {
    const value1 = false;
    const value2 = true;
    
    let errorMessages = [];

    describe('accepted', function () {
        errorMessages = [];
        
        it('should return false for ' + value1, function () {
            assert.strictEqual(validator('bool_key', { bool_key: value1 }, 'accepted', '', errorMessages, messages.boolean.accepted), false);
        });

        it('should return true for ' + value2, function () {
            assert.strictEqual(validator('bool_key', { bool_key: value2 }, 'accepted', '', errorMessages, messages.boolean.accepted), true);
        });
    });

    describe('not_accepted', function () {
        errorMessages = [];

        it('should return true for ' + value1, function () {
            assert.strictEqual(validator('bool', { bool: value1 }, 'not_accepted', '', errorMessages, messages.boolean.accepted), true);
        });

        it('should return false for ' + value2, function () {
            assert.strictEqual(validator('bool', { bool: value2 }, 'not_accepted', '', errorMessages, messages.boolean.accepted), false);
        });
    });

});