import moment from "moment-timezone";

export function convertLocalTimeToUTCSimple(localTime: any) {
    const [hours, minutes] = localTime.split(":").map(Number);
    const now = new Date();
    const todayLocal = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);

    // Calculate UTC time by subtracting the timezone offset
    const utcHours = todayLocal.getUTCHours();
    const utcMinutes = todayLocal.getUTCMinutes();

    // Format back into a "HH:mm" string
    const utcTimeStr = [utcHours.toString().padStart(2, '0'), utcMinutes.toString().padStart(2, '0')].join(':');

    return utcTimeStr;
}

export function formatReminderStart(reminderStart: any, timeZone: any) {
    return moment(reminderStart).tz(timeZone).format('YYYY-MM-DD HH:mm');
}

export function convertLocalTimeToUTC(date: any, time: any, timeZone: any) {
    const localTime = moment.tz(`${date} ${time}`, "YYYY-MM-DD HH:mm", timeZone);
    const utcTime = localTime.utc().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return utcTime;
}

// Function to decide whether to convert directly or use timezone
export function determineCorrectUTC(date: any, time: any, timeZone: any) {
    const currentDate = moment.utc().format('YYYY-MM-DD'); // Current UTC date
    const inputDate = moment(date).format('YYYY-MM-DD'); // Input date standardized
    if (currentDate === inputDate) {
        // If the date of the task is today, convert directly to UTC
        return moment.utc(`${date}T${time}:00`).toISOString();
    } else {
        // If the date is in the future, use the timezone conversion
        return convertLocalTimeToUTC(date, time, timeZone);
    }
}