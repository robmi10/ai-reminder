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
