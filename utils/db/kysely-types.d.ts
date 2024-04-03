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
    usageCount: number;
}


export interface DB {
    event: Event;
    reminderUsage: ReminderUsage;
}