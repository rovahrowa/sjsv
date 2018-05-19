module.exports =  {
    'a': {
        wheel: /[A-Z]/i,
        name: 'Letters a-z'
    },
    'n': {
        wheel: /[0-9]/i,
        name: 'Numbers 0-9'
    },
    'b': {
        wheel: /[0-9ABCDEF]/i,
        name: 'Hexa characters '
    },
    'p': {
        wheel: /[*#]/i,
        name: 'Characters '
    },
    'an': {
        wheel: /[0-9a-z]/i,
        name: 'Numbers or Letters'
    },
    'ans': {
        wheel: /[0-9a-z-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]/i,
        name: 'Numbers, Letters and Characters'
    }
};