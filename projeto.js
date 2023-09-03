const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tasks = [];

function displayTasks() {
  if (tasks.length === 0) {
    console.log("Nenhuma tarefa na lista.");
  } else {
    console.log("Tarefas Pendentes:");
    tasks.forEach((task, index) => {
      const status = task.completed ? "[Concluída]" : "[Pendente]";
      console.log(`${index + 1}. ${status} ${task.description}`);
    });
  }
}

function addTask(description) {
  const task = {
    description: description,
    completed: false
  };
  tasks.push(task);
  console.log(`Tarefa "${description}" adicionada.`);
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
    const removedTask = tasks.splice(index, 1);
    console.log(`Tarefa "${removedTask[0].description}" removida.`);
  } else {
    console.log("Índice de tarefa inválido.");
  }
}

function processCommand(command) {
  const parts = command.split(' ');
  const action = parts[0].toLowerCase();
  const description = parts.slice(1).join(' ');

  switch (action) {
    case 'add':
      addTask(description);
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

console.log("Bem-vindo à Lista de Tarefas!");

rl.on('line', (input) => {
  processCommand(input);
});

rl.on('close', () => {
  console.log("Obrigado por usar a Lista de Tarefas. Até logo!");
});



//referemcias cite de pesquisa "https://developer.mozilla.org/pt-BR/docs/Web/JavaScript"
//refencia cite de pesquisa "https://www.w3schools.com"