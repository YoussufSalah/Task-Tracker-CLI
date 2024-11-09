const fs = require("fs");
let tasks = [];

try {
    if (fs.existsSync("tasks.json")) {
        let file = fs.readFileSync("tasks.json", "utf8");
        tasks = file.trim() ? JSON.parse(file) : [];
    }
} catch (error) {
    console.error("Error reading tasks file:", error);
}

module.exports = tasks;
