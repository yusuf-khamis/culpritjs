// const validator = require('..')

// require('./types/string')
require('./types/array')
require('./types/boolean')
require('./types/date')
require('./types/general')
require('./types/number')

// TODO: next release (test for general library)
//
// describe('general library', function () {
//     const schema1 = {
//         first_name: 'required|string|max:50|regex:^[a-zA-Z]+$',
//         other_name: 'string|min:5',
//         age: 'required_with:other_name|number'
//     };
//
//     it('expecting errors', function () {
//         const testObject = {
//             first_name: 'yusuf',
//             age: 25
//         };
//
//         assert.deepStrictEqual(validator(testObject, schema1), {
//             object: testObject,
//             error
//         })
//     });
// });
