const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;
const USERDB_FILE = "./userdb.json";
const EVENTDB_FILE = "./eventdb.json";

// Middleware
app.use(bodyParser.json());

// Generic read function
function readDB(filePath) {
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// Generic write function
function writeDB(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Specific helpers
const readUserDB = () => readDB(USERDB_FILE);
const writeUserDB = (data) => writeDB(USERDB_FILE, data);

const readEventDB = () => readDB(EVENTDB_FILE);
const writeEventDB = (data) => writeDB(EVENTDB_FILE, data);

// POST /register
app.post("/api/user/register", (req, res) => {
    const { userName, password} = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "userName and password are required" });
    }

    const db = readUserDB();

    if (db.find(user => user.userName === userName)) {
        return res.status(409).json({ message: "Username already taken" });
    }

    const newUser = {
        publicId: uuidv4(),
        userName,
        password,
        latitude:  "47,5",
        longitude:  "19,08",
        workStartTime:  "09:00:00",
        workEndTime:  "21:00:00",
        country:  "Hungary"
    };

    db.push(newUser);
    writeUserDB(db);

    res.status(201).json({ message: "User registered successfully", publicId: newUser.publicId });
});

// !! login functionality currently not used in frontend !!
// POST /login
app.post("/api/user/login", (req, res) => {
    const { userName, password } = req.body;

    if (!userName || !password) {
        return res.status(400).json({ message: "userName and password are required" });
    }

    const db = readUserDB();

    const user = db.find(u => u.userName === userName && u.password === password);

    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ publicId: user.publicId });
});

// GET /user/:publicId
app.get("/api/user/:publicId", (req, res) => {
    const { publicId } = req.params;
    const db = readUserDB();

    const user = db.find(u => u.publicId === publicId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    user.password = undefined; // Do not expose password
    res.json(user);
});

// PUT /user/:publicId
app.put("/api/user/:publicId", (req, res) => {
    const { publicId } = req.params;
    const { userName, password, latitude, longitude, workStartTime, workEndTime, country } = req.body;

    const db = readUserDB();
    
    const userIndex = db.findIndex(u => u.publicId === publicId && u.userName === userName && u.password === password);
    
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }

    // Helper: keep original if empty/null/undefined
    const keepOriginal = (newValue, oldValue) =>
        newValue !== "" && newValue != null ? newValue : oldValue;

    // Update the user while keeping original values when needed
    db[userIndex] = {
        ...db[userIndex],
        latitude: keepOriginal(latitude, db[userIndex].latitude),
        longitude: keepOriginal(longitude, db[userIndex].longitude),
        workStartTime: keepOriginal(workStartTime, db[userIndex].workStartTime),
        workEndTime: keepOriginal(workEndTime, db[userIndex].workEndTime),
        country: keepOriginal(country, db[userIndex].country)
    };

    writeUserDB(db);

    res.json(db[userIndex]);
}); 

app.post("/api/day/:publicId", (req, res) => {
    const { publicId } = req.params;
    const { date } = req.query;
    const { name } = req.body;

    if (!publicId || !date || !name) {
        return res.status(400).json({
            message: "publicId (param), date (query), and name (body) are required"
        });
    }

    const days = readEventDB();

    // Find existing day for this user & date
    let day = days.find(d => d.userId === publicId && d.date === date);

    // If not found, create a new one
    if (!day) {
        day = { userId: publicId, date, actions: [] };
        days.push(day);
    }

    // Avoid adding empty action names
    const trimmedName = name.trim();
    if (!trimmedName) {
        return res.status(400).json({ message: "Action name cannot be empty" });
    }

    day.actions.push({
        id: Date.now().toString(), 
        name: trimmedName,
        complete: false
    });

    writeEventDB(days);

    return res.status(201).json({
        message: "Action added successfully",
        day
    });
});


app.get("/api/day/:publicId", (req, res) => {
    const { publicId } = req.params;
    const { start, end } = req.query;

    if (!publicId || !start || !end) {
        return res.status(400).json({
            message: "publicId (param), start, and end (query) are required"
        });
    }

    const days = readEventDB();

    const filteredDays = days.filter(day => {
        return (
            day.userId === publicId &&
            day.date >= start &&
            day.date <= end
        );
    });

    return res.json(filteredDays);
});

app.delete("/api/day/:publicId/:dayId/:actionId", (req, res) => {
    const { publicId, dayId: date, actionId } = req.params;

    if (!publicId || !date || !actionId) {
        return res.status(400).json({
            message: "publicId, dayId, and actionId are required"
        });
    }

    const days = readEventDB();

    const day = days.find(d => d.userId === publicId && d.date === date);
    if (!day) {
        return res.status(404).json({ message: "Day not found" });
    }

    const actionIndex = day.actions.findIndex(a => a.id === actionId);
    if (actionIndex === -1) {
        return res.status(404).json({ message: "Action not found" });
    }

    day.actions.splice(actionIndex, 1);

    writeEventDB(days);
    console.log("days after deletion", days);
    
    res.json({ message: "Action deleted successfully", day });
});

app.put("/api/day/:publicId/:date/:actionId", (req, res) => {
    const { publicId, date, actionId } = req.params;
    const {  complete } = req.body;

    if (!publicId || !date || !actionId) {
        return res.status(400).json({
            message: "publicId, date, and actionId are required"
        });
    }

    const days = readEventDB();

    // Find the correct day
    const day = days.find(d => d.userId === publicId && d.date === date);
    if (!day) {
        return res.status(404).json({ message: "Day not found" });
    }

    // Find the correct action
    const action = day.actions.find(a => a.id === actionId);
    if (!action) {
        return res.status(404).json({ message: "Action not found" });
    }

    // Update fields
    action.complete = complete;

    writeEventDB(days);

    res.json({ message: "Action updated successfully", day });
});



app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
