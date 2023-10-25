const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

class Tarefa {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }
}

class TarefaRepetitiva extends Tarefa {
  constructor(description, frequency, startDate) {
    super(description);
    this.frequency = frequency;
    this.startDate = startDate;
  }
}

class TarefaPrioritária extends Tarefa {
  constructor(description, priority, deadline) {
    super(description);
    this.priority = priority;
    this.deadline = deadline;
  }
}

class TarefaComEtiqueta extends Tarefa {
  constructor(description, tags) {
    super(description);
    this.tags = tags;
  }
}

function addTask(description, type, details) {
  let task;
  switch (type) {
    case 'repetitiva':
      task = new TarefaRepetitiva(description, details.frequency, details.startDate);
      break;
    case 'prioritária':
      task = new TarefaPrioritária(description, details.priority, details.deadline);
      break;
    case 'etiqueta':
      task = new TarefaComEtiqueta(description, details.tags);
      break;
    default:
      task = new Tarefa(description);
  }
  tasks.push(task);
  console.log(`Tarefa "${description}" adicionada.`);
}

function processCommand(command) {
  const parts = command.split(' ');
  const action = parts[0].toLowerCase();
  const description = parts.slice(1).join(' ');

  switch (action) {
    case 'add':
      const taskDetails = parseTaskDetails(description);
      addTask(taskDetails.description, taskDetails.type, taskDetails.details);
      break;
    case 'complete':
      markTaskAsCompleted(parseInt(description) - 1);
      break;
    case 'remove':
      removeTask(parseInt(description) - 1);
      break;
    case 'list':
      displayTasks();
      break;
    case 'exit':
      rl.close();
      break;
    default:
      console.log("Comando inválido. Use 'add', 'complete', 'remove', 'list' ou 'exit'.");
  }
}

function parseTaskDetails(description) {
  const parts = description.split(' ');
  const type = parts.shift();
  const details = {};

  switch (type) {
    case 'repetitiva':
      details.frequency = parts[0];
      details.startDate = parts[1];
      break;
    case 'prioritária':
      details.priority = parts[0];
      details.deadline = parts[1];
      break;
    case 'etiqueta':
      details.tags = parts;
      break;
  }

  return { description: parts.join(' '), type, details };
}

function markTaskAsCompleted(index) {
  if (index >= 0 && index < tasks.length) {
    tasks[index].completed = true;
    console.log(`Tarefa "${tasks[index].description}" marcada como concluída.`);
  } else {
    console.log("Índice de tarefa inválido.");
  }
}

function removeTask(index) {
  if (index >= 0 && index < tasks.length) {
    const removedTask = tasks.splice(index, 1)[0];
    console.log(`Tarefa "${removedTask.description}" removida.`);
  } else {
    console.log("Índice de tarefa inválido.");
  }
}

function displayTasks() {
  console.log("Tarefas:");
  tasks.forEach((task, index) => {
    const status = task.completed ? "Concluída" : "Pendente";
    console.log(`${index + 1}. ${task.description} (${status})`);
  });
}

rl.on('line', (input) => {
  processCommand(input);
});