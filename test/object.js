const moment = require('moment-timezone')

const now = moment()

module.exports = {
  propNumberZero: 0,
  propNumberRandom: 275,
  propNumberRandomClone: 275,
  propStringEmpty: '',
  propStringRandom: 'yes',
  propUndefined: undefined,
  propNaN: NaN,
  propNull: null,
  propBooleanFalse: false,
  propBooleanTrue: true,
  propStringTrue: 'true',
  propStringFalse: 'false',
  propArrayEmpty: [],
  propArrayStringFilled: [
    'yes', 'one', 'random', 'true'
  ],
  propArrayNumberFilled: [
    1, 258, 463, 718, 275
  ],
  propArrayNotDistinct: [
    25, 14, 25, 36, 87, 36
  ],
  propArrayMixFilled: [
    'zero', 456, true, 'random'
  ],
  propStringMixArray: JSON.stringify([
    'zero', 456, true, 'random'
  ]),
  propStringStringArray: JSON.stringify([
    'yes', 'one', 'random', 'true'
  ]),
  propStringNumberArray: JSON.stringify([
    1, 258, 463, 718, 275
  ]),
  propValidEmail: 'mail@example.com',
  currentDate: now.toDate(),
  currentMoment: now,
  futureDate: moment().add(2, 'months').toDate(),
  futureMoment: moment().add(3, 'weeks'),
  pastDate: moment().subtract(4, 'days').toDate(),
  pastMoment: moment().subtract(1, 'year'),
  currentDateDash: now.format('MM-DD-YYYY'),
  currentDateSlash: now.format('MM/DD/YYYY'),
  currentDateSpace: now.format('MM DD YYYY'),
  pastDateSpace: moment().subtract(5, 'days').format('MM DD YYYY'),
  futureDateSpace: moment().add(1, 'month').format('MM DD YYYY'),
  invalidMoment: moment(new Date('yes'))
}
