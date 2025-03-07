import React, { useState, useEffect } from "react";
import "../styles/global.css";

const Settings = () => {
  const [crawlDepth, setCrawlDepth] = useState(2);
  const [requestDelay, setRequestDelay] = useState(3);
  const [maxPages, setMaxPages] = useState(50);
  const [userAgent, setUserAgent] = useState("Mozilla/5.0");

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem("crawlerSettings"));
    if (savedSettings) {
      setCrawlDepth(savedSettings.crawlDepth);
      setRequestDelay(savedSettings.requestDelay);
      setMaxPages(savedSettings.maxPages);
      setUserAgent(savedSettings.userAgent);
    }
  }, []);

  // Save settings to localStorage
  const handleSaveSettings = () => {
    const settings = { crawlDepth, requestDelay, maxPages, userAgent };
    localStorage.setItem("crawlerSettings", JSON.stringify(settings));
    alert("✅ Settings Saved!");
  };

  return (
    <div className="settings-container">
      <h2>⚙️ Web Crawler Settings</h2>
      <p>Configure crawling parameters below.</p>

      <label>
        Crawl Depth:
        <input
          type="number"
          value={crawlDepth}
          onChange={(e) => setCrawlDepth(Number(e.target.value))}
          min="1"
          className="settings-input"
        />
      </label>

      <label>
        Request Delay (seconds):
        <input
          type="number"
          value={requestDelay}
          onChange={(e) => setRequestDelay(Number(e.target.value))}
          min="1"
          className="settings-input"
        />
      </label>

      <label>
        Max Pages:
        <input
          type="number"
          value={maxPages}
          onChange={(e) => setMaxPages(Number(e.target.value))}
          min="1"
          className="settings-input"
        />
      </label>

      <label>
        User-Agent:
        <input
          type="text"
          value={userAgent}
          onChange={(e) => setUserAgent(e.target.value)}
          className="settings-input"
        />
      </label>

      <button className="save-button" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
};

export default Settings;
