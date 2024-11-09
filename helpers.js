const fs = require("fs");
const tasks = require("./tasks.js");
const colors = require("./colors.js");

function writeData() {
    try {
        fs.writeFileSync("tasks.json", JSON.stringify(tasks), "utf-8");
    } catch (error) {
        console.error(
            `${colors.red}Couldn't save data due to an error: ${error}${colors.default}`
        );
    }
}

function printTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        let creationDate = new Date(tasks[i].createdAt * 1000).toLocaleString();
        let updateDate = new Date(tasks[i].updatedAt * 1000).toLocaleString();
        let msg = `${colors.magenta}Task ID: ${tasks[i].id}.\nTask title: ${
            tasks[i].title
        }.\nTask description: ${
            tasks[i].description || "no description"
        }.\nTask status: ${
            tasks[i].status
        }.\nTask creation date: ${creationDate}.\nTask latest update date: ${updateDate}.`;
        console.log(
            `${colors.blue}<=== Task: ${i + 1} ===>\n${msg}\n${
                colors.blue
            }-----${colors.default}`
        );
    }
}

function mark(index, markType) {
    tasks[index].status = markType;
    console.log(
        `${colors.green}Marked as ${colors.yellow}${markType.toUpperCase()} ${
            colors.green
        }successfully ${colors.cyan}(id: ${tasks[index].id})${colors.default}`
    );
    writeData();
}

function isId(s) {
    if (!s) return false;
    return s.substring(0, 5) === "TASK_" && s.length === 9;
}

function findById(id) {
    for (let i = 0; i < tasks.length; i++) if (tasks[i].id == id) return i;
    return -1;
}

module.exports = { writeData, printTasks, mark, isId, findById };
