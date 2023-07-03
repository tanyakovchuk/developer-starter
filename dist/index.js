"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    function getAllDataFromLocalStorage(ttl) {
      const keys = Object.keys(localStorage);
      const data = {};
      for (const key of keys) {
        try {
          const itemStr = localStorage.getItem(key);
          if (itemStr) {
            const item = JSON.parse(itemStr);
            if (Date.now() - item.timestamp > ttl) {
              localStorage.removeItem(key);
            } else {
              data[key] = item.data;
            }
          }
        } catch (e) {
        }
      }
      return data;
    }
    const timerTime = 80 * 1e3;
    getAllDataFromLocalStorage(timerTime);
    class LocalStorageHandler {
      // eslint-disable-next-line no-useless-constructor
      constructor(key, defaultValue, ttl = 60 * 1e3) {
        this.key = key;
        this.defaultValue = defaultValue;
        this.ttl = ttl;
      }
      getData() {
        const rawData = localStorage.getItem(this.key);
        if (!rawData) {
          this.setData(this.defaultValue);
          return this.defaultValue;
        }
        const storedData = JSON.parse(rawData);
        if (Date.now() - storedData.timestamp > this.ttl) {
          this.setData(this.defaultValue);
          return this.defaultValue;
        }
        return storedData.data;
      }
      setData(data) {
        const dataToStore = {
          timestamp: Date.now(),
          data
        };
        localStorage.setItem(this.key, JSON.stringify(dataToStore));
      }
    }
    const elementsToChange = document.querySelectorAll(
      ".writer-status__circle"
    );
    const textToChange = document.querySelectorAll(".writer-status__text");
    const writersList = document.querySelectorAll(".writer-status__photo");
    const writersNames = [];
    writersList.forEach((writer) => {
      const alt = writer.getAttribute("alt");
      if (alt !== null) {
        writersNames.push(alt);
      }
    });
    function updateStatus() {
      for (let i = 0; i < writersNames.length; i++) {
        const circle = elementsToChange[i];
        const text = textToChange[i];
        let color, status;
        const handler = new LocalStorageHandler(writersNames[i], Math.random() < 0.6);
        if (handler.getData()) {
          color = "#319052";
          status = "Online";
        } else {
          color = "#A9A6BA";
          status = "Offline";
        }
        circle.style.backgroundColor = color;
        text.innerHTML = status;
        text.style.color = color;
      }
    }
    updateStatus();
    setInterval(updateStatus, 10 * 1e3);
  });
})();
//# sourceMappingURL=index.js.map
