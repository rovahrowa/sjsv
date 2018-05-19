module.exports = function (type, data, field, errors) {
    const regex = {
        'a': /[A-Z]/i,
        'n': /[0-9]/i,
        'b': /[0-9ABCDEF]/i,
        'p': /[*#]/i,
        'an': /[0-9a-z]/i,
        'ans': /[0-9a-z-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/i,
        'ns': /[0-9-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/i,
        's': /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/i,
        'anp': /[0-9a-z*#\x20]/i,
        'x+n': /[0-9]/i,
    };

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
                if (!data[i].match(regex[type])) {

                    errors.push(`${field} can not contain character  ${data[i]}`);
                    return {
                        error: 'field ' + field + ': provided data is not of type \'' + type + '\''
                    };
                }

            return true;

        case 'x+n':
        {
            let state = false;
            if (data[0].match(/[c,d]/i)) {
                for (let i = 2; i < data.length; i++) {
                    if (data[i].length === 1 && data[i].match(regex[type]))
                        state = true;
                    else {
                        errors.push(`${field} can not contain ${data[i]}`);
                        return {
                            error: 'field ' + field + ': provided data is not of type \'' + type + '\''
                        };
                    }

                }
            } else {
                errors.push(`${field}  includes invalid characters`);
                return {
                    error: 'field ' + field + ': provided data is not of type \'' + type + '\''
                };
            }


            return true;
        }

        case 'z':
            return true;

        default:
            errors.push(`${field} includes invalid characters`);
            return {
                error: 'type ' + type + ' is not implemented on field ' + field
            };
    }
};