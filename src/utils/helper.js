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

export const filterData = (data, criteria) => {
    return data.filter(item => {
        return Object.keys(criteria).every(key => {
            // If the criteria value is empty string, skip the check
            if (criteria[key] === '') return true;
            // Ensure the item has the key and the value matches the criteria
            return item[key] === criteria[key];
        });
    });
};

export const hasAllRequiredKeysInList = (data, requiredKeys) => {
    return data.every(item => 
      requiredKeys.every(key => item.hasOwnProperty(key))
    );
  };