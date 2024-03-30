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

export interface DB {
    event: Event;
}