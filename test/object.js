const moment = require('moment-timezone')
const { v4, v1 } = require('uuid')

const now = moment()
const timezones = moment.tz.names()

module.exports = {
  propNumberZero: 0,
  propNumberRandom: 275,
  propNumberRandomOther: 30,
  propNumberRandomClone: 275,
  propNumberFloat: 32.45,
  propStringEmpty: '',
  propStringRandom: 'yes',
  propStringRandomClone: 'yes',
  propStringRandomOther1: 'one_time',
  propStringRandomOther2: 'one-time_only',
  propStringRandomOther3: 'one-time',
  propStringRandomOther4: '123time',
  propStringRandomOther5: '123_time',
  propStringRandomOther6: '123-time',
  propStringRandomOther7: '123-time_only',
  propStringRandomOther8: '123',
  propStringRandomOther9: 'only one',
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
  propStringArrayNotDistinct: JSON.stringify([
    25, 14, 25, 36, 87, 36
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
  invalidMoment: moment(new Date('yes')),
  propObjectArray: [
    {
      name: 'abdalla',
      age: 25
    },
    {
      name: 'nassir',
      age: 36
    },
    {
      name: 'kadir',
      age: 12
    },
    {
      name: 'abubakar',
      age: 30
    }
  ],
  propStringObjectArray: JSON.stringify([
    {
      name: 'abdalla',
      age: 25
    },
    {
      name: 'nassir',
      age: 36
    },
    {
      name: 'kadir',
      age: 12
    },
    {
      name: 'abubakar',
      age: 30
    }
  ]),
  stringWithMatchingConfirm: 'SomeT3xt',
  stringWithMatchingConfirm_confirmation: 'SomeT3xt',
  stringWithoutMatchingConfirm: 'pl3ntySh@ring',
  stringWithoutMatchingConfirm_confirmation: 'sh@ringPlenty',
  stringValidCardNumber: '4242424242424242',
  stringInvalidCardNumber: '0123456789654321',
  timezoneRandom: timezones[Math.floor(Math.random() * timezones.length + 1)],
  uuidV1: v1(),
  uuidV4: v4()
}
