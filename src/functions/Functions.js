const emitEvent = async (eventData) => {
    try {
        const response = await fetch("https://localhost:8443/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventData),
            mode: "cors",  // Explicitly set the CORS mode
        });
        if (!response.ok) throw new Error("Failed to emit event.");
        console.log("Event emitted successfully");
    } catch (error) {
        console.error("Error emitting event:", error);
    }
};

export default emitEvent;


// Usage
// emitEvent({
//     type: "USER_LOGIN",
//     timestamp: new Date().toISOString(),
//     details: {
//         userId: "12345",
//         username: "example_user",
//     },
// });
