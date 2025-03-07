import React, { useEffect, useState, useCallback } from "react";
import { fetchWebsites, addWebsite, fetchCrawledData, startCrawl } from "../api/crawlerApi";

const Dashboard = () => {
    const [websites, setWebsites] = useState([]);
    const [newWebsite, setNewWebsite] = useState("");
    const [crawledData, setCrawledData] = useState([]);
    const [taskId, setTaskId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ✅ Load websites on mount
    useEffect(() => {
        loadWebsites();
    }, []);

    // ✅ Fetch websites
    const loadWebsites = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const sites = await fetchWebsites();
            setWebsites(sites || []);
        } catch (error) {
            console.error("❌ Error fetching websites:", error);
            setError("❌ Failed to fetch websites!");
        } finally {
            setLoading(false);
        }
    }, []);

    // ✅ Add website and start crawling
    const handleAddWebsite = async () => {
        if (!newWebsite.trim()) {
            setError("❌ Please enter a valid URL.");
            return;
        }

        if (websites.some((site) => site.url === newWebsite)) {
            setError("⚠️ This website is already added.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const website = await addWebsite(newWebsite);
            if (website?.id) {
                const crawlResponse = await startCrawl(website.id);
                if (crawlResponse?.task_id) {
                    setTaskId(crawlResponse.task_id);
                }
                setNewWebsite(""); // Clear input
                await loadWebsites(); // Refresh website list
            } else {
                setError("❌ Error: Website response missing ID.");
            }
        } catch (error) {
            console.error("❌ Error adding website:", error);
            setError("❌ Error adding website.");
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch crawled data
    const handleFetchData = async (websiteId) => {
        setLoading(true);
        setError("");
        try {
            const data = await fetchCrawledData(websiteId);
            setCrawledData(data || []);
        } catch (error) {
            console.error("❌ Error fetching crawled data:", error);
            setError("❌ Failed to fetch crawled data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "20px", fontFamily: "Arial" }}>
            <h1>Web Crawler Dashboard</h1>

            {/* Error Message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Add Website */}
            <input
                type="text"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="Enter website URL"
                style={{ padding: "8px", marginRight: "10px", width: "300px" }}
            />
            <button
                onClick={handleAddWebsite}
                disabled={loading}
                style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
            >
                {loading ? "Adding..." : "Start Crawling"}
            </button>

            {/* Website List */}
            <h2>Websites to Crawl</h2>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {websites.length > 0 ? (
                        websites.map((site) => (
                            <li key={site.id}>
                                {site.url} - {site.status}
                                <button
                                    onClick={() => handleFetchData(site.id)}
                                    style={{ marginLeft: "10px", padding: "5px", cursor: "pointer" }}
                                >
                                    View Crawled Data
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>⚠️ No websites added yet.</p>
                    )}
                </ul>
            )}

            {/* Crawled Data */}
            <h2>Crawled Data</h2>
            {loading ? <p>Loading data...</p> : (
                <ul>
                    {crawledData.length > 0 ? (
                        crawledData.map((data) => (
                            <li key={data.id}>{data.page_url}</li>
                        ))
                    ) : (
                        <p>⚠️ No crawled data available.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Dashboard;
