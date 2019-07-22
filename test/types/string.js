const assert = require('assert');
const validator = require('../../lib/types/string');

describe('string', function () {
    let errorMessages;
    const values = [
        'testString', 'testing2019', '@2019testing', 'Testing String', '_test-String_', '@2019testing', 'testing@mail.com',
        'testing string', 'test    string   \n  inside', 'multi\nline\n\n string    for  test', '192.369.125.1',
        '250.147.25.89', '::1', 'FE80:0000:0000:0000:0202:B3FF:FE1E:8329', 'GE0:FF:0000:0000:0202:B3GHF:AE1E:8329',
        'Africa/Nairobi', 'Africa/Mombasa', 'Africa', 'https://10.20.2.24:4446/', 'https://laravel.com/docs/5.7/validation#available-validation-rules',
        'https://www.google.com/search?rlz=1C1GCEU_enKE819KE819&ei=fSI8XOz_A_XTgwefiLjIAQ&q=validation+library&oq=validation+library&gs_l=psy-ab.3..0j0i20i263j0l8.16721.44328..47458...4.0..0.238.4409.0j11j11......0....1..gws-wiz.......0i71j35i39j0i131j0i67j0i22i30.v9bLxskWkGQ',
        'google.com', 'bae1c6bd-98d3-4549-95e6-e1c749e8c8fb', 'e3d09dc0-17c2-11e9-ab14-d663bd873d93', '587'
    ];

    describe('alpha', function () {
        errorMessages = [];

        it('Should return true for ' + values[0], function () {
            assert.strictEqual(validator('alpha_key', { alpha_key: values[0] }, 'alpha', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1], function () {
            assert.strictEqual(validator('alpha_key', { alpha_key: values[1] }, 'alpha', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[2], function () {
            assert.strictEqual(validator('alpha_key', { alpha_key: values[2] }, 'alpha', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[3], function () {
            assert.strictEqual(validator('alpha_key', { alpha_key: values[3] }, 'alpha', '', errorMessages, ''), false);
        });
    });

    describe('alpha_dash', function () {
        errorMessages = [];

        it('Should return true for ' + values[4], function () {
            assert.strictEqual(validator('alpha_dash_key', { alpha_dash_key: values[4] }, 'alpha_dash', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[0], function () {
            assert.strictEqual(validator('alpha_dash_key', { alpha_dash_key: values[0] }, 'alpha_dash', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1], function () {
            assert.strictEqual(validator('alpha_dash_key', { alpha_dash_key: values[1] }, 'alpha_dash', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[2], function () {
            assert.strictEqual(validator('alpha_dash_key', { alpha_dash_key: values[2] }, 'alpha_dash', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[3], function () {
            assert.strictEqual(validator('alpha_dash_key', { alpha_dash_key: values[3] }, 'alpha_dash', '', errorMessages, ''), false);
        });
    });

    describe('alpha_num', function () {
        errorMessages = [];

        it('Should return true for ' + values[0], function () {
            assert.strictEqual(validator('alpha_num', { alpha_num: values[0] }, 'alpha_num', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[1], function () {
            assert.strictEqual(validator('alpha_num', { alpha_num: values[1] }, 'alpha_num', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[3], function () {
            assert.strictEqual(validator('alpha_num', { alpha_num: values[3] }, 'alpha_num', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[2], function () {
            assert.strictEqual(validator('alpha_num', { alpha_num: values[2] }, 'alpha_num', '', errorMessages, ''), false);
        });
    });

    describe('between', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' with length ' + values[0].length + ' and arguments 7,13', function () {
            assert.strictEqual(validator('between_key', { between_key: values[0] }, 'between', '7,13', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1] + ' with length ' + values[1].length + ' and arguments 5,9', function () {
            assert.strictEqual(validator('between_key', { between_key: values[1] }, 'between', '5,9', errorMessages, ''), false);
        });
    });

    describe('clean', function () {
        errorMessages = [];

        it('should return ' + values[0].toLowerCase() + ' from ' + values[0] + ' for lower clean case', function () {
            let tempObj = { clean_key: values[0] };
            let tempFinalObj = { clean_key: values[0].toLowerCase() };

            validator('clean_key', tempObj, 'clean', 'case.lower', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[6].toUpperCase() + ' from ' + values[6] + ' for upper clean case', function () {
            let tempObj = { clean_key: values[6] };
            let tempFinalObj = { clean_key: values[6].toUpperCase() };

            validator('clean_key', tempObj, 'clean', 'case.upper', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[3] + ' from ' + values[7] + ' for title clean case', function () {
            let tempObj = { clean_key: values[7] };
            let tempFinalObj = { clean_key: values[3] };

            validator('clean_key', tempObj, 'clean', 'case.title', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should throw an error for random clean case', function () {
            assert.throws(() => validator('clean_key', { }, 'clean', 'case.random', errorMessages, ''));
        });

        it('should return ' + values[0] + ' without appended spaces for end clean spaces', function () {
            let tempObj = { clean_key: values[0].padEnd(values[0].length + 8) };
            let tempFinalObj = { clean_key: values[0] };

            validator('clean_key', tempObj, 'clean', 'spaces.end', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[1] + ' without prepended spaces for start clean spaces', function () {
            let tempObj = { clean_key: values[1].padStart(values[1].length + 6) };
            let tempFinalObj = { clean_key: values[1] };

            validator('clean_key', tempObj, 'clean', 'spaces.begin', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[3] + ' without spaces on both ends for both clean spaces', function () {
            let tempObj = { clean_key: values[3].padStart(values[3].length + 8).padEnd(values[3].length + 8 + 7) };
            let tempFinalObj = { clean_key: values[3] };

            validator('clean_key', tempObj, 'clean', 'spaces.both', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[8].replace(/\r?\n|\r/g, ' ') + ' with multiple spaces replaced with single spaces for between_single clean spaces (' + values[8].replace(/[\r\n\s\t]+/g, ' ') + ')', function () {
            let tempObj = { clean_key: values[8] };
            let tempFinalObj = { clean_key: values[8].replace(/[\r\n\s\t]+/g, ' ') };

            validator('clean_key', tempObj, 'clean', 'spaces.between_single', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[8].replace(/\r?\n|\r/g, '') + ' with multiple spaces replaced with no spaces for between_none clean spaces (' + values[8].replace(/[\r\n\s\t]+/g, '') + ')', function () {
            let tempObj = { clean_key: values[8] };
            let tempFinalObj = { clean_key: values[8].replace(/[\r\n\s\t]+/g, '') };

            validator('clean_key', tempObj, 'clean', 'spaces.between_none', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[8].replace(/\r?\n|\r/g, '') + ' (padded with spaces) with multiple spaces replaced with single spaces and trimmed for between_none clean spaces (' + values[8].replace(/[\r\n\s\t]+/g, '') + ')', function () {
            let tempObj = { clean_key: values[8].padEnd(values[8].length + 4).padStart(values[8].length + 7) };
            let tempFinalObj = { clean_key: values[8].replace(/[\r\n\s\t]+/g, '') };

            validator('clean_key', tempObj, 'clean', 'spaces.between_none.both', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should return ' + values[8].replace(/\r?\n|\r/g, '') + ' (padded with spaces) with multiple spaces replaced with single spaces and trimmed for between_none clean spaces (' + values[8].replace(/[\r\n\s\t]+/g, '').toUpperCase() + ')', function () {
            let tempObj = { clean_key: values[8].padEnd(values[8].length + 4).padStart(values[8].length + 7) };
            let tempFinalObj = { clean_key: values[8].replace(/[\r\n\s\t]+/g, '').toUpperCase() };

            validator('clean_key', tempObj, 'clean', 'spaces.between_none.both,case.upper', errorMessages, '');

            assert.deepStrictEqual(tempObj, tempFinalObj);
        });

        it('should throw error when spaces has more than 2 sub-arguments', function () {
            assert.throws(() => validator('clean_key', { }, 'clean', 'spaces.between_none.begin.both', errorMessages, ''));
        });

        it('should throw error when case has more than 1 sub-arguments', function () {
            assert.throws(() => validator('clean_key', { }, 'clean', 'case.lower.title', errorMessages, ''));
        });

        it('should throw error when case has invalid sub-arguments', function () {
            assert.throws(() => validator('clean_key', { }, 'clean', 'case.random', errorMessages, ''));
        });

        it('should throw error when space has invalid sub-arguments', function () {
            assert.throws(() => validator('clean_key', { }, 'clean', 'spaces.lower', errorMessages, ''));
        });
    });

    describe('confirmed', function () {
        errorMessages = [];

        it('Should return true for ' + values[2] + ' with confirmation of itself', function () {
            assert.strictEqual(validator('confirmed_key', { confirmed_key: values[2], confirmed_key_confirmation: values[2] }, 'confirmed', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1] + ' with confirmation of ' + values[2], function () {
            assert.strictEqual(validator('confirmed_key', { confirmed_key: values[1], confirmed_key_confirmation: values[2] }, 'confirmed', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[5] + ' without confirmation', function () {
            assert.strictEqual(validator('confirmed_key', { confirmed_key: values[5] }, 'confirmed', '', errorMessages, ''), false);
        });
    });

    describe('different', function () {
        errorMessages = [];

        it('Should return true for ' + values[2] + ' and different_field ' + values[0], function () {
            assert.strictEqual(validator('different_key', { different_key: values[2], different_field: values[0] }, 'different', 'different_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1] + ' and different_field of itself', function () {
            assert.strictEqual(validator('different_key', { different_key: values[1], different_field: values[1] }, 'different', 'different_field', errorMessages, ''), false);
        });

        it('Should return true for ' + values[5] + ' without different_field', function () {
            assert.strictEqual(validator('different_key', { different_key: values[5] }, 'different', 'different_field', errorMessages, ''), true);
        });
    });

    describe('email', function () {
        errorMessages = [];

        it('Should return true for ' + values[6], function () {
            assert.strictEqual(validator('email_key', { email_key: values[6] }, 'email', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[5], function () {
            assert.strictEqual(validator('email_key', { email_key: values[5] }, 'email', '', errorMessages, ''), false);
        });
    });

    describe('gt', function () {
        errorMessages = [];

        it('Should return true for ' + values[1] + ' with gt_field ' + values[2], function () {
            assert.strictEqual(validator('gt_key', { gt_key: values[1], gt_field: values[2] }, 'gt', 'gt_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[3] + ' with gt_field ' + values[1], function () {
            assert.strictEqual(validator('gt_key', { gt_key: values[3], gt_field: values[1] }, 'gt', 'gt_field', errorMessages, ''), false);
        });
    });

    describe('gte', function () {
        errorMessages = [];

        it('Should return true for ' + values[1] + ' with gte_field ' + values[2], function () {
            assert.strictEqual(validator('gte_key', { gte_key: values[1], gte_field: values[2] }, 'gte', 'gte_field', errorMessages, ''), true);
        });

        it('Should return true for ' + values[1] + ' with gte_field of itself', function () {
            assert.strictEqual(validator('gte_key', { gte_key: values[1], gte_field: values[1] }, 'gte', 'gte_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[3] + ' with gte_field ' + values[1], function () {
            assert.strictEqual(validator('gte_key', { gte_key: values[3], gte_field: values[1] }, 'gte', 'gte_field', errorMessages, ''), false);
        });
    });

    describe('in', function () {
        errorMessages = [];

        let tempValue = 'testingTempValue';

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

        let tempValue = 'randomTestString';

        it('should return true for ' + values[1] + ' with array form of ' + values.slice(0, 8).join() + ' and argument in_array_field.*', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values.slice(0, 8) }, 'in_array', 'in_array_field.*', errorMessages, ''), true);
        });

        it('should return true for ' + values[1] + ' with array form of ' + values.slice(0, 8).join() + ' and argument in_array_field', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values.slice(0, 8) }, 'in_array', 'in_array_field', errorMessages, ''), true);
        });

        it('should return false for ' + tempValue + ' with array form of ' + values.slice(0, 8).join() + ' and argument in_array_field', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values.slice(0, 8) }, 'in_array', 'in_array_field', errorMessages, ''), true);
        });

        it('should return true for ' + values[1] + ' with stringified array form of ' + values.slice(0, 8).join() + ' and argument in_array_field.*', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: JSON.stringify(values.slice(0, 8)) }, 'in_array', 'in_array_field.*', errorMessages, ''), true);
        });

        it('should return true for ' + values[1] + ' with objectified array form of item and ' + values.slice(0, 8).join() + ' and argument in_array_field.*.item', function () {
            assert.strictEqual(validator('in_array_key', { in_array_key: values[1], in_array_field: values.slice(0, 8).map(item => { return  { item: item } }) }, 'in_array', 'in_array_field.*.item', errorMessages, ''), true);
        });

        it('should throw error for ' + values[1] + ' with objectified array form of item and ' + values.slice(0, 8).join() + ' and argument in_array_field.*', function () {
            assert.throws(() => validator('in_array_key', { in_array_key: values[1], in_array_field: values.slice(0, 8).map(item => { return  { item: item } }) }, 'in_array', 'in_array_field.*', errorMessages, ''));
        });

        it('should throw error for ' + values[1] + ' with array form of item and ' + values.slice(0, 8).join() + ' and argument in_array_field.*.item', function () {
            assert.throws(() => validator('in_array_key', { in_array_key: values[1], in_array_field: values.slice(0, 8) }, 'in_array', 'in_array_field.*.item', errorMessages, ''));
        });

        it('should throw error for ' + values[1] + ' with itself as the field in string and argument in_array_field.*', function () {
            assert.throws(() => validator('in_array_key', { in_array_key: values[1], in_array_field: values[1] }, 'in_array', 'in_array_field.*', errorMessages, ''));
        });
    });

    describe('ip_address', function () {
        errorMessages = [];

        it('should return true for ' + values[11], function () {
            assert.strictEqual(validator('ip_key', { ip_key: values[11] }, 'ip_address', '', errorMessages, ''), true);
        });

        it('should return true for ' + values[12], function () {
            assert.strictEqual(validator('ip_key', { ip_key: values[12] }, 'ip_address', '', errorMessages, ''), true);
        });

        it('should return false for ' + values[10], function () {
            assert.strictEqual(validator('ip_key', { ip_key: values[10] }, 'ip_address', '', errorMessages, ''), false);
        });

        it('should return false for ' + values[14], function () {
            assert.strictEqual(validator('ip_key', { ip_key: values[14] }, 'ip_address', '', errorMessages, ''), false);
        });
    });

    describe('ipv4', function () {
        errorMessages = [];

        it('should return true for ' + values[11], function () {
            assert.strictEqual(validator('ipv4_key', { ipv4_key: values[11] }, 'ipv4', '', errorMessages, ''), true);
        });

        it('should return false for ' + values[10], function () {
            assert.strictEqual(validator('ipv4_key', { ipv4_key: values[10] }, 'ipv4', '', errorMessages, ''), false);
        });
    });

    describe('ipv6', function () {
        errorMessages = [];

        it('should return true for ' + values[12], function () {
            assert.strictEqual(validator('ipv6_key', { ipv6_key: values[12] }, 'ipv6', '', errorMessages, ''), true);
        });

        it('should return true for ' + values[13], function () {
            assert.strictEqual(validator('ipv6_key', { ipv6_key: values[13] }, 'ipv6', '', errorMessages, ''), true);
        });

        it('should return false for ' + values[14], function () {
            assert.strictEqual(validator('ipv6_key', { ipv6_key: values[14] }, 'ipv6', '', errorMessages, ''), false);
        });
    });

    describe('json', function () {
        errorMessages = [];

        it('should return false for ' + values[14], function () {
            assert.strictEqual(validator('json_key', { json_key: values[14] }, 'json', '', errorMessages, ''), false);
        });

        it('should return true for array form of ' + values.slice(0,8).join(), function () {
            assert.strictEqual(validator('json_key', { json_key: values.slice(0,8) }, 'json', '', errorMessages, ''), true);
        });

        it('should return true for stringified array form of ' + values.slice(0,8).join(), function () {
            assert.strictEqual(validator('json_key', { json_key: JSON.stringify(values.slice(0,8)) }, 'json', '', errorMessages, ''), true);
        });

        it('should return true for stringified object array form of ' + values.slice(0,8).join(), function () {
            assert.strictEqual(validator('json_key', { json_key: JSON.stringify(values.slice(0,8).map(item => { return { item: item } })) }, 'json', '', errorMessages, ''), true);
        });

        it('should return true for object array form of ' + values.slice(0,8).join(), function () {
            assert.strictEqual(validator('json_key', { json_key: values.slice(0,8).map(item => { return { item: item } }) }, 'json', '', errorMessages, ''), true);
        });
    });

    describe('lt', function () {
        errorMessages = [];

        it('Should return false for ' + values[1] + ' with lt_field ' + values[2], function () {
            assert.strictEqual(validator('lt_key', { lt_key: values[1], lt_field: values[2] }, 'lt', 'lt_field', errorMessages, ''), false);
        });

        it('Should return true for ' + values[3] + ' with gt_field ' + values[1], function () {
            assert.strictEqual(validator('lt_key', { lt_key: values[3], lt_field: values[1] }, 'lt', 'lt_field', errorMessages, ''), true);
        });
    });

    describe('lte', function () {
        errorMessages = [];

        it('Should return false for ' + values[1] + ' with lte_field ' + values[2], function () {
            assert.strictEqual(validator('lte_key', { lte_key: values[1], lte_field: values[2] }, 'lte', 'lte_field', errorMessages, ''), false);
        });

        it('Should return true for ' + values[1] + ' with lte_field of itself', function () {
            assert.strictEqual(validator('lte_key', { lte_key: values[1], lte_field: values[1] }, 'lte', 'lte_field', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1] + ' with lte_field ' + values[3], function () {
            assert.strictEqual(validator('lte_key', { lte_key: values[1], lte_field: values[3] }, 'lte', 'lte_field', errorMessages, ''), false);
        });
    });

    describe('max', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' of length ' + values[0].length, function () {
            assert.strictEqual(validator('max_key', { max_key: values[0] }, 'max', '10', errorMessages, ''), true);
        });

        it('Should return true for ' + values[4] + ' of length ' + values[4].length, function () {
            assert.strictEqual(validator('max_key', { max_key: values[4] }, 'max', '15', errorMessages, ''), true);
        });

        it('Should return false for ' + values[6] + ' of length ' + values[6].length, function () {
            assert.strictEqual(validator('max_key', { max_key: values[6] }, 'max', '12', errorMessages, ''), false);
        });
    });

    describe('min', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' of length ' + values[0].length, function () {
            assert.strictEqual(validator('min_key', { min_key: values[1] }, 'min', '10', errorMessages, ''), true);
        });

        it('Should return true for ' + values[4] + ' of length ' + values[4].length, function () {
            assert.strictEqual(validator('min_key', { min_key: values[4] }, 'min', '10', errorMessages, ''), true);
        });

        it('Should return false for ' + values[6] + ' of length ' + values[6].length, function () {
            assert.strictEqual(validator('min_key', { min_key: values[6] }, 'min', '20', errorMessages, ''), false);
        });
    });

    describe('not_in', function () {
        errorMessages = [];

        let tempValue = 'testingTempValue';

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

    describe('not_regex', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' with regex ^[0-9]+$', function () {
            assert.strictEqual(validator('not_regex_key', { not_regex_key: values[0] }, 'not_regex', '^[0-9]+$', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2] + ' with regex ^[a-zA-Z0-9@]+$', function () {
            assert.strictEqual(validator('not_regex_key', { not_regex_key: values[2] }, 'not_regex', '^[a-zA-Z0-9@]+$', errorMessages, ''), false);
        });
    });

    describe('numeric', function () {
        errorMessages = [];

        it('Should return true for ' + values[24], function () {
            assert.strictEqual(validator('numeric_key', { numeric_key: values[24] }, 'numeric', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[2], function () {
            assert.strictEqual(validator('numeric_key', { numeric_key: values[2] }, 'numeric', '', errorMessages, ''), false);
        });
    });

    describe('present', function () {
        errorMessages = [];

        it('Should return true for ' + values[0], function () {
            assert.strictEqual(validator('present_key', { present_key: values[0] }, 'present', '', errorMessages, ''), true);
        });

        it('Should return true for empty strings', function () {
            assert.strictEqual(validator('present_key', { present_key: '' }, 'present', '', errorMessages, ''), true);
        });

        it('Should return false for undefined value', function () {
            assert.strictEqual(validator('present_key', { present_key: String(undefined) }, 'present', '', errorMessages, ''), false);
        });
    });

    describe('regex', function () {
        errorMessages = [];

        it('Should return false for ' + values[1] + ' with regex ^[0-9]+$', function () {
            assert.strictEqual(validator('regex_key', { regex_key: values[1] }, 'regex', '^[0-9]+$', errorMessages, ''), false);
        });

        it('Should return true for ' + values[2] + ' with regex ^[a-zA-Z0-9@]+$', function () {
            assert.strictEqual(validator('regex_key', { regex_key: values[2] }, 'regex', '^[a-zA-Z0-9@]+$', errorMessages, ''), true);
        });
    });

    describe('same', function () {
        errorMessages = [];

        it('Should return true for fields with same value ' + values[0], function () {
            assert.strictEqual(validator('same_key', { same_key: values[0], same_field: values[0] }, 'same', 'same_field', errorMessages, ''), true);
        });

        it('Should return false for value ' + values[0] + ' and value ' + values[1], function () {
            assert.strictEqual(validator('same_key', { same_key: values[0], same_field: values[1] }, 'same', 'same_field', errorMessages, ''), false);
        });
    });

    describe('size', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' with length ' + values[0].length + ' with value of its length', function () {
            assert.strictEqual(validator('size_key', { size_key: values[0] }, 'size', String(values[0].length), errorMessages, ''), true);
        });

        it('Should return false for ' + values[0] + ' with length ' + values[0].length + ' with value 20', function () {
            assert.strictEqual(validator('size_key', { size_key: values[0] }, 'size', '20', errorMessages, ''), false);
        });
    });

    describe('starts_with', function () {
        errorMessages = [];

        it('Should return true for ' + values[0] + ' with value ' + values[0].substr(0, 4), function () {
            assert.strictEqual(validator('starts_with_key', { starts_with_key: values[0] }, 'starts_with', values[0].substr(0, 4), errorMessages, ''), true);
        });

        it('Should return false for ' + values[0] + ' with value random', function () {
            assert.strictEqual(validator('starts_with_key', { starts_with_key: values[0] }, 'starts_with', 'random', errorMessages, ''), false);
        });
    });

    describe('timezone', function () {
        errorMessages = [];

        it('Should return true for ' + values[15], function () {
            assert.strictEqual(validator('timezone_key', { timezone_key: values[15] }, 'timezone', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[16], function () {
            assert.strictEqual(validator('timezone_key', { timezone_key: values[16] }, 'timezone', '', errorMessages, ''), false);
        });

        it('Should return false for ' + values[17], function () {
            assert.strictEqual(validator('timezone_key', { timezone_key: values[17] }, 'timezone', '', errorMessages, ''), false);
        });
    });

    describe('url', function () {
        errorMessages = [];

        it('Should return true for ' + values[18], function () {
            assert.strictEqual(validator('url_key', { url_key: values[18] }, 'url', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[19], function () {
            assert.strictEqual(validator('url_key', { url_key: values[19] }, 'url', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[20], function () {
            assert.strictEqual(validator('url_key', { url_key: values[20] }, 'url', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[21], function () {
            assert.strictEqual(validator('url_key', { url_key: values[21] }, 'url', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[11], function () {
            assert.strictEqual(validator('url_key', { url_key: values[11] }, 'url', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[1], function () {
            assert.strictEqual(validator('url_key', { url_key: values[1] }, 'url', '', errorMessages, ''), false);
        });
    });

    describe('uuid', function () {
        errorMessages = [];

        it('Should return true for ' + values[22], function () {
            assert.strictEqual(validator('uuid_key', { uuid_key: values[22] }, 'uuid', '', errorMessages, ''), true);
        });

        it('Should return true for ' + values[23], function () {
            assert.strictEqual(validator('uuid_key', { uuid_key: values[23] }, 'uuid', '', errorMessages, ''), true);
        });

        it('Should return false for ' + values[11], function () {
            assert.strictEqual(validator('uuid_key', { uuid_key: values[11] }, 'uuid', '', errorMessages, ''), false);
        });
    });

});