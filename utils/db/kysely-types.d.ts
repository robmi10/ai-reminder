export interface Event {
    eventId?: number;
    userId: number;
    email: string;
    desc?: string;
    phone?: string;
    status: boolean;
    reminder: Date;
    start: start;
    createdAt: end;
}

export interface DB {
    event: Event;
}