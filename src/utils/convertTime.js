
function convertHoursToMinutes(time) {
    if(!time)
        return null
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
}

module.exports = convertHoursToMinutes;