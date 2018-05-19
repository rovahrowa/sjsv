const types = require('./types');
const Util = require('./utils');

/**
 * Main validation class
 * options in META_IGNORE_OPTIONS are alway set to false
 * @param schema schema object
 */
class Main {

    constructor(schema) {
        if (!schema || !schema.properties) throw new RangeError('schema must be defined');
        else this.schema = schema;
        this.errors = [];
    }


    validateFD() {
        let data = this.data;
        if (!this.schema) throw new RangeError('schema must be defined');
        for (let item in data) {
            if (this.schema.properties[item]) {
                let validType = Util.checkType(data[item], this.schema.properties[item].type);
                if (!validType) {
                    this.errors = `field ${item} must be of type ${this.schema.properties[item].type}`;
                    return `field ${item} must be of type ${this.schema.properties[item].type}`;
                }

                if (this.schema.properties[item].dataType && this.schema.properties[item].type === 'string') {
                    let valid = types(this.schema.properties[item].dataType, data[item], item, this.errors);

                    if (valid.error) {
                        this.errors.push(valid.error);
                        return this.errors[0];
                    }
                }
            }

        }

        return this.errors[0] || true;
    }

    getErrors() {
        return this.errors[0] || 'No errors';
    }

    validateFS() {
        let data = this.data;
        let allowed = this.schema.allowed;

        if (!this.schema) throw new RangeError('schema must be defined');

        for (let item in data) {
            if (allowed.indexOf(item)<0) {
                this.errors.push(`field ${item} is not needed`);
                return this.errors[0];
            }
        }

        for (let item in this.schema.properties) {
            if (!data[item]) {
                this.errors.push(`field ${item} is required`);
                return this.errors[0];
            }
            if (!this.schema.properties[item]) {
                this.errors.push(`field ${item} is not needed`);
                return this.errors[0];
            }
            if (this.schema.properties[item]) {
                if (!Util.checkType(data[item], this.schema.properties[item].type)) {
                    this.errors = `field ${item} must be of type ${this.schema.properties[item].type}`;
                    return `field ${item} must be of type ${this.schema.properties[item].type}`;
                }

                if (this.schema.properties[item].dataType && this.schema.properties[item].type === 'string') {
                    let valid = types(this.schema.properties[item].dataType, data[item], item, this.errors);

                    if (valid.error) {
                        this.errors.push(valid.error);
                        return this.errors[0];
                    }
                }
            }

        }

        return this.errors[0] || true;
    }


    vaildate(data) {

        this.data = data;

        if (!this.schema) throw new RangeError('schema must be defined');
        if (!data) throw new RangeError('data must be defined');

        if (this.schema.allowed) return this.validateFS();
        else return this.validateFD();

    }


}

module.exports = Main;