const types = require('./types');
const Util = require('./utils');

class Main {

    constructor(schema) {
        if (!schema || !schema.properties) throw new RangeError('schema must be defined');
        else this.schema = schema;
        this.errors = [];
    }

    validateFD(data) {
        if (!this.schema) throw new RangeError('schema must be defined');
        for (let item in data) {
            if (this.schema.properties[item]) {
                if (!Util.checkType(data[item], this.schema.properties[item].type)) {
                    this.errors = `field ${item} must be of type ${this.schema.properties[item].type}`;
                    return `field ${item} must be of type ${this.schema.properties[item].type}`;
                }

                if (this.schema.properties[item].dataType && this.schema.properties[item].type === 'string') {
                    let valid = types(this.schema.properties[item].dataType, data[item], item, this.errors);
                    if (valid.error) return this.errors[0];
                }
            }

        }

        return this.errors[0] || true;
    }

    getErrors() {
        return this.errors[0] || 'No errors';
    }

    validateFS(data) {
        if (!this.schema) throw new RangeError('schema must be defined');
        for (let item in this.schema) {
            if (this.schema.properties[item])
                console.log(data[item]);
        }

        return this.errors[0] || true;
    }


    vaildate(data) {

        if (!this.schema) throw new RangeError('schema must be defined');
        if (!data) throw new RangeError('data must be defined');

        if (this.schema.allowed) return this.validateFS(data);
        else return this.validateFD(data);

    }


}

module.exports = Main;