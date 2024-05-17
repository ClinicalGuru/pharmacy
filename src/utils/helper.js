export const getUndefinded = (data) => {
    let undefindedValues = [];
    for (const key in data) {
        if (data[key] === undefined || data[key] === 'undefined') undefindedValues.push(key)
    }
    return undefindedValues;
}

export const monthsBetween = (date1, date2) => {
    // Ensure date1 is the earlier date
    if (date1 > date2) {
        [date1, date2] = [date2, date1];
    }

    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();
    const totalMonths = yearDiff * 12 + monthDiff;

    return totalMonths;
}