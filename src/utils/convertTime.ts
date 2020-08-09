
function convertHoursToMinutes(time: string) {
    if(!time)
        return null
    const [hours, minutes] = time.split(':').map(Number);
    return (hours * 60) + minutes;
}

export default convertHoursToMinutes;