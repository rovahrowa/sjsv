import test from 'ava';
import Main from '../lib/main.js';

/*
Test Case Undefined or Null Schema
*/

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

test('Test success Validate Schema', t => {

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
    t.is(validator.getErrors(data), 'No Errors');
});

test('Test Invalid Data Type', t => {

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
        age: '30',
        address: 'asdsadsad'
    };

    let validator = new Main(schema);

    t.is(validator.vaildate(data), 'field age must be of type number');
    t.is(validator.getErrors(data), 'field age must be of type number');
});

test('Test Invalid Type', t => {

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
        name: 'Danstan56',
        age: 30,
        address: 'asdsadsad'
    };

    let validator = new Main(schema);

    t.is(validator.vaildate(data), 'name can not contain only  Letters a-z');
});

test('Test Invalid Data Type on string field', t => {

    let schema = {
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


test('Test required field, Age is missing in the data, should return error age is required', t => {

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


test('Test unwanted field, Age is missing in the data, should return error age is required', t => {

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
        username: 'dsfsfsdf',
        age: 59,
        address: 'ssdsddsd'
    };

    let validator = new Main(schema);

    t.is(validator.vaildate(data), 'field address is not needed');
});