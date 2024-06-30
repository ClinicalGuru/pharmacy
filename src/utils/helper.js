export const getUndefinded = (data) => {
    let undefindedValues = [];
    for (const key in data) {
        if (data[key] === undefined || data[key] === 'undefined' || data[key] === '') undefindedValues.push(key)
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


const parseDate = (dateString) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // Month is 0-indexed
};

export const filterInventoryByExpiry = (inventory) => {
    const currentDate = new Date();
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(currentDate.getMonth() + 3);

    return inventory.filter((inv) => {
        const expiryDate = parseDate(inv.expiry);
        return expiryDate > currentDate && expiryDate <= threeMonthsFromNow;
    });
};

export const isLessThanTwentyPercent = (givenQuantity, totalQuantity) => {
    const twentyPercent = totalQuantity * 0.2;
    return Number(givenQuantity) <= twentyPercent;
}

export const filterItemsOlderThanSixMonths = (medicine) => {
    const { stockEnteredDate, unitsInStock, deadStockQuantityCheck } = medicine;
    const salePercentage = ((deadStockQuantityCheck - unitsInStock) / deadStockQuantityCheck) * 100;
    const currentDate = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(currentDate.getMonth() - 6);
    return stockEnteredDate < sixMonthsAgo.valueOf() && ( 1 <= salePercentage && salePercentage <= 20);
}