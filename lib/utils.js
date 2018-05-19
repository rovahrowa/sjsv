module.exports = {
    checkType: (data, type) => {
        if (type === 'array') return data.constructor === Array;
        if (type === 'object') return data.constructor === Object;
        return typeof data === type;
    }
};