export const DEFAULT_PRIORITY = 'medium';

export class Task {
    constructor(title, priority = DEFAULT_PRIORITY) {
        this.title = title;
        this.priority = priority;
        this.isCompleted = false;
    }

    markCompleted() {
        this.isCompleted = true;
        console.log(`Task "${this.title}" Done!.`);
    }
}