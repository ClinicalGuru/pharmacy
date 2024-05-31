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

export const getTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();

    return `${year}-${month}-${day}`;
};