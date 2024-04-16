export const getUndefinded = (data) => {
    let undefindedValues = [];
    for (const key in data) {
        if (data[key] === undefined || data[key] === 'undefined') undefindedValues.push(key)
    }
    return undefindedValues;
}