const regex = require('./regexDef');

module.exports = function (type, data, field, errors) {

    switch (type) {
        case 'a':
        case 'n':
        case 'b':
        case 'an':
        case 'ans':
        case 'ns':
        case 's':
        case 'p':
        case 'anp':
            for (let i = 0; i < data.length; i++)
                if (!data[i].match(regex[type].wheel)) {

                    errors.push(`${field} can not contain only  ${regex[type].name}`);
                    return {
                        error: `${field} can not contain only  ${regex[type].name}`
                    };
                }

            return true;

        case 'x+n':
        {
            let state = false;
            if (data[0].match(/[c,d]/i)) {
                for (let i = 2; i < data.length; i++) {
                    if (data[i].length === 1 && data[i].match(regex[type].wheel))
                        state = true;
                    else {
                        errors.push(`${field} can not contain only  ${regex[type].name}`);
                        return {
                            error: `${field} can not contain only  ${regex[type].name}`
                        };
                    }

                }
            } else {
                errors.push(`${field} can not contain only  ${regex[type].name}`);
                return {
                    error: `${field} can not contain only  ${regex[type].name}`
                };
            }


            return true;
        }

        case 'z':
            return true;

        default:
            errors.push(`${field} can not contain only  ${regex[type].name}`);
            return {
                error: `${field} can not contain only  ${regex[type].name}`
            };
    }
};