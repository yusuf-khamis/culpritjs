const assert = require('assert');
const validate = require('../../lib/types/array');

describe('array', function () {
    const arrayVar1 = ['item1', 'item2', 'item3', 'item4', 'item5'];
    const arrayVar2 = [11, 58, 36, 36, 42, 32, 98, 70, 24];

    let errorMessages;

    describe('between', function () {
        errorMessages = [];

        it('should return true for array of size ' + arrayVar1.length + ' with args 4,7', function () {
            assert.strictEqual(validate('array', { array: arrayVar1 }, 'between', '4,7', errorMessages, ''), true);
        });

        it('should return false for array of size ' + arrayVar2.length + ' with args 4,7', function () {
            assert.strictEqual(validate('array', { array: arrayVar2 }, 'between', '4,7', errorMessages, ''), false);
        });
    });

    describe('distinct', function () {
        errorMessages = [];

        it('should return true for array ' + arrayVar1.join(), function () {
            assert.strictEqual(validate('array', { array: arrayVar1 }, 'distinct', '', errorMessages, ''), true);
        });

        it('should return false for array ' + arrayVar2.join(), function () {
            assert.strictEqual(validate('array', { array: arrayVar2 }, 'distinct', '', errorMessages, ''), false);
        });
    });

    describe('gt', function () {
        errorMessages = [];

        it('should return false for array of size ' + arrayVar1.length + ' with array arg of size ' + arrayVar2.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1, array2: arrayVar2 }, 'gt', 'array2', errorMessages, ''), false);
        });

        it('should return true for array of size ' + arrayVar2.length + ' with stringified array arg of size ' + arrayVar1.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar2, array2: JSON.stringify(arrayVar1) }, 'gt', 'array2', errorMessages, ''), true);
        });
    });

    describe('gte', function () {
        errorMessages = [];

        it('should return false for array of size ' + arrayVar1.length + ' with array arg of size ' + arrayVar2.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1, array2: arrayVar2 }, 'gte', 'array2', errorMessages, ''), false);
        });

        it('should return true for array of size ' + arrayVar1.length + ' with stringified array arg of size ' + arrayVar1.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1, array2: JSON.stringify(arrayVar1) }, 'gte', 'array2', errorMessages, ''), true);
        });
    });

    describe('lt', function () {
        errorMessages = [];

        it('should return true for array of size ' + arrayVar1.length + ' with array arg of size ' + arrayVar2.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1, array2: arrayVar2 }, 'lt', 'array2', errorMessages, ''), true);
        });

        it('should return false for array of size ' + arrayVar2.length + ' with stringified array arg of size ' + arrayVar1.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar2, array2: JSON.stringify(arrayVar1) }, 'lt', 'array2', errorMessages, ''), false);
        });
    });

    describe('lte', function () {
        errorMessages = [];

        it('should return true for array of size ' + arrayVar1.length + ' with array arg of size ' + arrayVar2.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1, array2: arrayVar2 }, 'lte', 'array2', errorMessages, ''), true);
        });

        it('should return true for array of size ' + arrayVar2.length + ' with stringified array arg of size ' + arrayVar2.length, function () {
            assert.strictEqual(validate('array1', { array1: arrayVar2, array2: JSON.stringify(arrayVar2) }, 'lte', 'array2', errorMessages, ''), true);
        });
    });

    describe('max', function () {
        errorMessages = [];

        it('should return true for array of size ' + arrayVar1.length + ' with arg of 5', function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1 }, 'max', '5', errorMessages, ''), true);
        });

        it('should return false for array of size ' + arrayVar2.length + ' with arg of 5', function () {
            assert.strictEqual(validate('array1', { array1: arrayVar2 }, 'max', '5', errorMessages, ''), false);
        });
    });

    describe('min', function () {
        errorMessages = [];

        it('should return false for array of size ' + arrayVar1.length + ' with arg of 6', function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1 }, 'min', '6', errorMessages, ''), false);
        });

        it('should return true for array of size ' + arrayVar2.length + ' with arg of 6', function () {
            assert.strictEqual(validate('array1', { array1: arrayVar2 }, 'min', '6', errorMessages, ''), true);
        });
    });

    describe('size', function () {
        errorMessages = [];

        it('should return true for array of size ' + arrayVar1.length + ' with arg of 5', function () {
            assert.strictEqual(validate('array1', { array1: arrayVar1 }, 'size', '5', errorMessages, ''), true);
        });

        it('should return false for array of size ' + arrayVar2.length + ' with arg of 10', function () {
            assert.strictEqual(validate('array1', { array1: arrayVar2 }, 'size', '10', errorMessages, ''), false);
        });
    });

});