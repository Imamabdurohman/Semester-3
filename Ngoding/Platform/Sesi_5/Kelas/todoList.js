import { Task, DEFAULT_PRIORITY } from `./task.js`;

const task1 = new Task('Belajar JavaScript');
const task2 = new Task('Membayar Tagihan', 'high');

console.log(`Default Priority: ${DEFAULT_PRIORITY}`);
console.log(`Task 1: ${task1.title}, Prioritas: (${task1.priority}), Done: (${task1.priority})`);
console.log(`Task 2: ${task2.title}, Prioritas: (${task2.priority}, Done: (${task2.priority})`);

task1.markCompleted();