const { mark, writeData, printTasks } = require("./helpers.js");
const tasks = require("./tasks.js");
const colors = require("./colors.js");

// @usage task-cli add-task <task-title> [task-description]
function addTask(taskTitle, taskDescription = "") {
    let n = tasks.length;
    let taskId = `TASK_${n < 1000 ? "0" : ""}${n < 100 ? "0" : ""}${
        n < 10 ? "0" : ""
    }${n + 1}`;
    let task = {
        id: taskId,
        title: taskTitle,
        description: taskDescription,
        status: "todo",
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
    };
    if (!tasks) tasks = [task];
    else tasks.push(task);
    writeData();
    console.log(
        `${colors.green}Task added successfully! ${colors.cyan}(id: ${taskId})${colors.default}`
    );
    return;
}

// @usage task-cli update-task <task-id> <new-task-title> [new-task-description]
function updateTask(index, newTaskTitle, newTaskDescription = "") {
    tasks[index].updatedAt = Math.floor(Date.now() / 1000);
    tasks[index].title = newTaskTitle;
    if (newTaskDescription) tasks[index].description = newTaskDescription;

    writeData();
    console.log(
        `${colors.green}Task updated successfully! ${colors.cyan}(id: ${tasks[index].id})${colors.default}`
    );

    return;
}

// @usage task-cli delete-task <task-id>
function deleteTask(index) {
    let task = tasks[index];
    tasks.splice(index, 1);
    writeData();
    console.log(
        `${colors.green}Task deleted successfully! ${colors.cyan}(id: ${task.id})${colors.default}`
    );
    return;
}

// @usage task-cli list [list-type]
function list(type = "") {
    if (!type) {
        console.log(
            `${colors.yellow}Here's a list of ${colors.cyan}ALL ${colors.yellow}tasks:${colors.default}`
        );
        printTasks(tasks);
    } else if (["todo", "in-progress", "done"].includes(type)) {
        console.log(
            `${colors.yellow}Here's a list of ${
                colors.cyan
            }${type.toUpperCase()} ${colors.yellow}tasks:${colors.default}`
        );
        printTasks(tasks.filter((task) => task.status === type));
    } else {
        console.error(
            `${colors.red}There is no task status called ${type}${colors.default}`
        );
    }
}

// @usage task-cli mark-in-progress <task-id>
function markInProgress(index) {
    mark(index, "in-progress");
}

// @usage task-cli mark-done <task-id>
function markDone(index) {
    mark(index, "done");
}

// @usage task-cli help
function showHelp() {
    console.log(`${colors.yellow}<=== List of commands ===>
    ${colors.default}- ${colors.cyan}add-task ${colors.blue}<task-title> ${colors.magenta}[task-description]                          ${colors.default}=> Adds a new task
    ${colors.default}- ${colors.cyan}update-task ${colors.blue}<task-id> <new-task-title> ${colors.magenta}[new-task-description]     ${colors.default}=> Updates a task by its id
    ${colors.default}- ${colors.cyan}delete-task ${colors.blue}<task-id>                                             ${colors.default}=> Delete a task by its id
    ${colors.default}- ${colors.cyan}list ${colors.magenta}[status]                                                     ${colors.default}=> List all tasks or tasks with specific status
    ${colors.default}- ${colors.cyan}mark-done ${colors.blue}<task-id>                                               ${colors.default}=> Marks a task as done by its id
    ${colors.default}- ${colors.cyan}mark-in-progress ${colors.blue}<task-id>                                        ${colors.default}=> Marks a task as in-progress by its id
${colors.yellow}<=== Notes ===>
    ${colors.default}- ${colors.cyan}Any argument between ${colors.blue}<> ${colors.cyan}is ${colors.blue}mandatory${colors.cyan}.${colors.default}
    ${colors.default}- ${colors.cyan}Any argument between ${colors.magenta}[] ${colors.cyan}is ${colors.magenta}optional${colors.cyan}.${colors.default}`);
}

module.exports = {
    addTask,
    updateTask,
    deleteTask,
    list,
    markInProgress,
    markDone,
    showHelp,
};
