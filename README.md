# Task Manager CLI App

## How to use

-   Usage: `node app.js <command-name> [arguments]`
-   After running the installation command run `node app.js help` to show list of the available commands

## Example

```bash
# Show list of commands:
node app.js help

# Add task:
node app.js add-task "Task title" "Task description (Optional)"

# Update task:
node app.js update-task TASK_0001 "New task title" "New task description (Optional)"

# Delete task:
node app.js delete-task TASK_0001

# Mark task as done:
node app.js mark-done TASK_0001

# Mark task as in-progress:
node app.js marg-in-progress TASK_0001

# List tasks:
node app.js list
node app.js list todo          # Only todo tasks
node app.js list in-progress   # Only in-progress tasks
node app.js list done          # Only done tasks
```

Project from: [Roadmap.sh Task Tracker](https://roadmap.sh/projects/task-tracker)
