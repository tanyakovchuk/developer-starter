"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.js
  window.Webflow ||= [];
  window.Webflow.push(() => {
    console.log("Webflow Hi!");
  });
})();
//# sourceMappingURL=index.js.map
