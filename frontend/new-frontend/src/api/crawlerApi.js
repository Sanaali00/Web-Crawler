const API_BASE_URL = "http://127.0.0.1:8000"; // Adjust if needed

// ✅ Add a new website
export const addWebsite = async (url) => {
    try {
        const response = await fetch(`${API_BASE_URL}/websites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Response: ${errorText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("❌ Error adding website:", error);
        return null;
    }
};

// ✅ Fetch all websites
export const fetchWebsites = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/websites`);
        if (!response.ok) throw new Error("Failed to fetch websites");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching websites:", error);
        return [];
    }
};

// ✅ Start crawling a website
export const startCrawl = async (websiteId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/crawl/${websiteId}`, {
            method: "POST",
        });

        if (!response.ok) throw new Error("Failed to start crawl");
        return await response.json();
    } catch (error) {
        console.error("❌ Error starting crawl:", error);
        return null;
    }
};

// ✅ Fetch crawled data
export const fetchCrawledData = async (websiteId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/crawled-data/${websiteId}`);
        if (!response.ok) throw new Error("Failed to fetch crawled data");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching crawled data:", error);
        return [];
    }
};

// ✅ Get crawl task status
export const getTaskStatus = async (taskId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/task-status/${taskId}`);
        if (!response.ok) throw new Error("Failed to fetch task status");
        return await response.json();
    } catch (error) {
        console.error("❌ Error fetching task status:", error);
        return null;
    }
};
