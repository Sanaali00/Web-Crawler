import React, { useState } from "react";
import { fetchWebsites, startCrawl, fetchCrawledData, getTaskStatus, addWebsite } from "../api/crawlerApi";

const Home = () => {
    const [url, setUrl] = useState("");
    const [taskId, setTaskId] = useState(null);
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Add Website & Start Crawl
    const handleAddWebsite = async () => {
        setError("");
        setStatus(""); // Reset status on new request
        if (!url.trim()) {
            setError("❌ Please enter a valid URL.");
            return;
        }

        try {
            console.log("🔵 Adding website:", url);
            const website = await addWebsite(url);

            if (website && website.id) {
                console.log("✅ Website added with ID:", website.id);

                const crawlResponse = await startCrawl(website.id);
                if (crawlResponse && crawlResponse.task_id) {
                    console.log("🚀 Crawl started with Task ID:", crawlResponse.task_id);
                    setTaskId(crawlResponse.task_id);
                    setStatus("Crawl Started");
                } else {
                    setError("❌ Failed to start crawling. Try again.");
                }
            } else {
                setError("❌ Failed to add website. Try again.");
            }
        } catch (error) {
            setError("❌ Error connecting to the server.");
            console.error("❌ Error starting crawl:", error);
        }
    };

    // ✅ Check Task Status
    const checkTaskStatus = async () => {
        if (!taskId) {
            setError("❌ No active task found.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            console.log("📡 Checking task status for Task ID:", taskId);
            const statusResponse = await getTaskStatus(taskId);

            if (statusResponse && statusResponse.status) {
                console.log("✅ Task Status:", statusResponse.status);
                setStatus(statusResponse.status);
            } else {
                setError("❌ Invalid response from server.");
            }
        } catch (error) {
            setError("❌ Error checking task status.");
            console.error("❌ Error checking task status:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h1>Start Web Crawling</h1>

            {/* Input Field */}
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter website URL"
                style={styles.input}
            />
            <button onClick={handleAddWebsite} style={styles.button}>
                Start Crawling
            </button>

            {/* Error Message */}
            {error && <p style={styles.error}>{error}</p>}

            {/* Task Status */}
            {taskId && (
                <div style={styles.statusContainer}>
                    <h2>Task Status</h2>
                    <button
                        onClick={checkTaskStatus}
                        disabled={loading}
                        style={loading ? styles.disabledButton : styles.statusButton}
                    >
                        {loading ? "Checking..." : "Check Status"}
                    </button>
                    <p>Status: <strong>{status || "Not Checked Yet"}</strong></p>
                </div>
            )}
        </div>
    );
};

// ✅ Moved Styles to Keep Code Clean
const styles = {
    container: { padding: "20px", fontFamily: "Arial" },
    input: { padding: "8px", marginRight: "10px", width: "300px" },
    button: { padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" },
    statusContainer: { marginTop: "20px" },
    statusButton: { padding: "8px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" },
    disabledButton: { padding: "8px", backgroundColor: "#ccc", color: "white", border: "none", cursor: "not-allowed" },
    error: { color: "red", marginTop: "10px" }
};

export default Home;
