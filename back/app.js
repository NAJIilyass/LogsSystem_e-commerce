const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Hardcoded file path
const filePath = "logs.json"; // Updated to reflect JSON format

// Endpoint to append event data to the file
app.post("/log-event", (req, res) => {
    const { event } = req.body;

    if (!event || !event.id || !event.type || !event.timestamp) {
        return res.status(400).send("Invalid event data.");
    }

    // Create a new log entry
    const logEntry = {
        type: event.type,
        product_id: event.id,
        timestamp: event.timestamp,
        details: event.details,
    };

    // Read the existing file
    fs.readFile(filePath, "utf8", (readErr, data) => {
        let logs = [];
        if (!readErr && data) {
            try {
                logs = JSON.parse(data); // Parse existing logs
            } catch (parseErr) {
                console.error("Error parsing existing logs:", parseErr);
                return res.status(500).send("Failed to process existing logs.");
            }
        }

        // Append the new log entry to the array
        logs.push(logEntry);

        // Write the updated logs back to the file
        fs.writeFile(filePath, JSON.stringify(logs, null, 2), "utf8", (writeErr) => {
            if (writeErr) {
                console.error("Error writing to file:", writeErr);
                return res.status(500).send("Failed to log event.");
            }
            res.send("Event logged successfully.");
        });
    });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
