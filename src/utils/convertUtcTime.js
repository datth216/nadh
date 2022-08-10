function convertUtcTime(utcDate) {
    const date = new Date(utcDate);
    const getDay = date.getDate();
    let getMonth = date.getMonth() + 1;

    if (getMonth < 10) getMonth = `0${date.getMonth() + 1}`

    const getYear = date.getFullYear();

    return `${getDay}/${getMonth}/${getYear}`;
}

function getYear(date) {
    const utcTime = new Date(date);
    const getYear = utcTime.getFullYear();
    console.log(getYear);
    return getYear;
}

export { convertUtcTime, getYear }