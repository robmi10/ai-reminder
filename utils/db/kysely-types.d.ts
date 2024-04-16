export interface Event {
    eventId?: number;
    userId: number;
    email: string;
    desc: string;
    phone?: string;
    reminder: string;
    start: string;
    status?: boolean;
    createdAt: end;
    timeZone: string;
}

export interface ReminderUsage {
    id?: number;
    userId: number;
    date: string;
}


export interface DB {
    event: Event;
    reminder_usage: ReminderUsage;
}