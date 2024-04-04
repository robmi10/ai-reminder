export interface Event {
    eventId?: number;
    userId: number;
    email: string;
    desc: string;
    phone?: string;
    status: boolean;
    reminder: string;
    start: string;
    createdAt: end;
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