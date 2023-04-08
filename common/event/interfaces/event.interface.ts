export default class EventInterface<T = unknown>{
    dateTimeOccurred: string | Date;
    eventData: T;

    constructor(eventData: T, date?: Date | string) {
        this.dateTimeOccurred = date ?? new Date().toISOString();
        this.eventData = eventData;
    }
}