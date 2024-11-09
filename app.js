const { isId, findById } = require("./helpers.js");
const {
    addTask,
    updateTask,
    deleteTask,
    list,
    markInProgress,
    markDone,
    showHelp,
} = require("./functions.js");
const colors = require("./colors.js");

let argv = process.argv.slice(2);
let command = argv[0];
let args = argv.slice(1);

function main() {
    let index = findById(args[0]),
        isFirstArgAndId = isId(args[0]);

    switch (command) {
        case "add-task":
            if (!args[0]) {
                console.error(
                    `${colors.red}Task title is required!${colors.default}`
                );
                return;
            }
            addTask(args[0], args[1]);
            break;
        case "update-task":
            if (!args[0] || !isFirstArgAndId) {
                console.error(
                    `${colors.red}Task id is invalid or not provided!${colors.default}`
                );
                break;
            }

            if (index === -1) {
                console.error(`${colors.red}Task not found!${colors.default}`);
                break;
            }

            if (!args[1]) {
                console.error(
                    `${colors.red}New task title is required!${colors.default}`
                );
                break;
            }

            updateTask(index, args[1], args[2]);
            break;
        case "delete-task":
            if (!args[0] || !isFirstArgAndId) {
                console.error(
                    `${colors.red}Task id is invalid or not provided!${colors.default}`
                );
                return;
            }

            if (index === -1) {
                console.error(`${colors.red}Task not found!${colors.default}`);
                return;
            }

            deleteTask(index);
            break;
        case "list":
            if (args[0]) list(args[0]);
            else list();
            break;
        case "mark-done":
            if (!args[0] || !isFirstArgAndId) {
                console.error(
                    `${colors.red}Task id is invalid or not provided!${colors.default}`
                );
                return;
            }

            if (index === -1) {
                console.error(`${colors.red} Task not found!${colors.default}`);
                return;
            }

            markDone(index);
            break;
        case "mark-in-progress":
            if (!args[0] || !isFirstArgAndId) {
                console.error(
                    `${colors.red} Task id is invalid or not provided!${colors.default}`
                );
                return;
            }

            if (index === -1) {
                console.error(`${colors.red}Task not found!${colors.default}`);
                return;
            }

            markInProgress(index);
            break;
        case "help":
            showHelp();
            break;
        default:
            console.error(
                `${colors.red}Invalid command, try ${colors.cyan}\`help\`${colors.red} to get list of the available commands.${colors.default}`
            );
            break;
    }
    return 0;
}

main();
