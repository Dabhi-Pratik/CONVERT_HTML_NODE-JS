import express from "express"
import path from "path"
import { fileURLToPath } from "url";

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs")

let tasks = [
    {
        id: 1,
        title: "Setup Express Server",
        description: "Create a basic Express server and configure middleware"
    },
    {
        id: 2,
        title: "Create Task Model",
        description: "Design a task schema using MongoDB and Mongoose"
    },
    {
        id: 3,
        title: "Build Add Task API",
        description: "Create an API endpoint to add a new task"
    },
    {
        id: 4,
        title: "Build Get Tasks API",
        description: "Create an API endpoint to fetch all tasks"
    },
    {
        id: 5,
        title: "Build Delete Task API",
        description: "Create an API endpoint to delete a task by id"
    },
    {
        id: 6,
        title: "Add Update Task API",
        description: "Allow users to update task title or description"
    },
    {
        id: 7,
        title: "Add Status Field",
        description: "Include a status field to mark tasks as pending or completed"
    },
    {
        id: 8,
        title: "Add Timestamp",
        description: "Store createdAt and updatedAt for each task"
    },
    {
        id: 9,
        title: "Implement Middleware",
        description: "Create middleware for request logging"
    },
    {
        id: 10,
        title: "Deploy Backend",
        description: "Deploy the Node.js API to a cloud service"
    }
];

app.get("/", (req, res) => {
    res.render("index", { tasks })
})

// add pages
app.get("/add", (req, res) => {
    res.render("add")
})

//task created
app.post("/add", (req, res) => {
    const newTask = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description
    };
    tasks.push(newTask)
    res.redirect("/")
})

//edit task

app.get("/edit/:id", (req, res) => {
    const task = tasks.find(t => t.id == req.params.id)

    res.render("edit", { task })
})

//update task
app.post("/update/:id", (req, res) => {
    tasks = tasks.map(task =>
        task.id == req.params.id
            ? {
                ...task,
                title: req.body.title,
                description: req.body.description
            }
            : task
    );

    res.redirect("/");
});

// delete task
app.get("/delete/:id",(req,res)=>{
    tasks = tasks.filter(t => t.id != req.params.id)
    res.redirect("/")
})

const port = 5000

app.listen(port,()=>{
    console.log("server running on ",port)
})