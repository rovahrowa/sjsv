import test from 'ava';
import Main from '../lib/main.js';

/*
Test Case Undefined or Null Schema
*/
const fn = () => {
    throw new Main();
};
test('Throw RangeError when schema is undefined or null', t => {
    const error = t.throws(() => {
        new Main();
    }, RangeError);

    t.is(error.message, 'schema must be defined');
});

test('Does not throw RangeError when schema is defined', t => {

    let schema = {
        properties: {}
    };

    t.deepEqual(new Main(schema).schema, schema);
});

test('Test success Compile Schema', t => {

    let schema = {
        properties: {
            name: {
                type: 'string',
                dataType: 'a',
            },
            username: {
                type: 'string',
                dataType: 'a',
            },
            age: {
                type: 'number'
            }
        }
    };

    let data = {
        name: 'Danstan',
        age: 30,
        address: 'asdsadsad'
    };

    let validator = new Main(schema);

    t.is(validator.vaildate(data), true);
});


test('Test Invalid Data Type on string field', t => {

    let schema = {
        strict: true,
        properties: {
            name: {
                type: 'string',
                dataType: 'n',
            },
            username: {
                type: 'string',
                dataType: 'a',
            },
            age: {
                type: 'number'
            }
        }
    };

    let data = {
        name: 'Danstan',
        age: 30
    };

    let validator = new Main(schema);

    t.is(validator.vaildate(data), 'name can not contain only  Numbers 0-9');
});


test('Test Required filed', t => {

    let schema = {
        allowed: ['name','age','username'],
        properties: {
            name: {
                type: 'string',
                dataType: 'a',
            },
            username: {
                type: 'string',
                dataType: 'a',
            },
            age: {
                type: 'number'
            }
        }
    };

    let data = {
        name: 'Danstan',
        username: 'dsfsfsdf'
    };

    let validator = new Main(schema);

    t.is(validator.vaildate(data), 'field age is required');
});