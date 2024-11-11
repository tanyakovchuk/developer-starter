"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/index.js
  console.log("Webflow Hi!");
  var script = document.createElement("script");
  var serverIpUrl = "https://m.essaypro.com/api/auth/ip-fingerprint/";
  script.src = "https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js";
  script.onload = () => {
    const resultDiv = document.querySelector(".result");
    if (!sessionStorage.getItem("fingerprintSent")) {
      FingerprintJS.load().then((fp) => {
        fp.get().then(async (result) => {
          const webGLHashData = await hashDataURL(WebGL_Fingerprinting());
          const canvasHashData = await hashDataURL(getUnicodeEmojisCanvasFingerprint());
          const serverIpUrlResponse = await fetch(serverIpUrl);
          const serverIpUrlJson = await serverIpUrlResponse.json();
          const responseIp = serverIpUrlJson.ip || "";
          const responseFingerprint = serverIpUrlJson.fingerprint || "";
          const visitorIdIp = await hashDataURL(result.visitorId + responseIp);
          const fingerprint = {
            platform: navigator.platform,
            hardwareConcurrency: navigator.hardwareConcurrency || 0,
            screen: `${window.screen.width}x${window.screen.height}`,
            webGLHashData,
            canvasHashData,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            visitorId: result.visitorId,
            visitorIdIp,
            serverHashData: responseFingerprint,
            ip: responseIp
          };
          displayFingerprint(fingerprint);
          sessionStorage.setItem("fingerprintSent", "true");
        });
      });
    } else {
      resultDiv.innerHTML = "<p>Fingerprint \u0432\u0436\u0435 \u0432\u0456\u0434\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0439 \u0443 \u0446\u044C\u043E\u043C\u0443 \u0441\u0435\u0430\u043D\u0441\u0456.</p>";
    }
  };
  document.head.appendChild(script);
  async function hashDataURL(dataURL) {
    const encoder = new TextEncoder();
    const data = encoder.encode(dataURL);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
    return hashHex.substring(0, 40);
  }
  function WebGL_Fingerprinting() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl");
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) {
      return "Not Available";
    }
    return gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) + " " + gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
  }
  function getUnicodeEmojisCanvasFingerprint() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    context.textBaseline = "top";
    context.font = "32px Arial";
    const start = 128512;
    const end = 128591;
    let index = 0;
    for (let code = start; code <= end; code++) {
      const emoji = String.fromCodePoint(code);
      context.fillText(emoji, index % 10 * 35, Math.floor(index / 10) * 35);
      index++;
    }
    return canvas.toDataURL("image/png");
  }
  function displayFingerprint(fingerprint) {
    dataLayer.push({
      event: "fingerprintData",
      data: fingerprint
    });
    const resultDiv = document.querySelector(".result");
    resultDiv.innerHTML = `
    <p><strong>Platform:</strong> ${fingerprint.platform}</p>
    <p><strong>Hardware Concurrency:</strong> ${fingerprint.hardwareConcurrency}</p>
    <p><strong>Screen:</strong> ${fingerprint.screen}</p>
    <p><strong>Canvas Hash Data:</strong> ${fingerprint.canvasHashData}</p>
    <p><strong>WebGL Hash Data:</strong> ${fingerprint.webGLHashData}</p>
    <p><strong>Timezone:</strong> ${fingerprint.timezone}</p>
    <p><strong>Visitor ID:</strong> ${fingerprint.visitorId}</p>
    <p><strong>Visitor ID + IP:</strong> ${fingerprint.visitorIdIp}</p>
    <p><strong>Server Hash Data:</strong> ${fingerprint.serverHashData}</p>
    <p><strong>IP Address:</strong> ${fingerprint.ip}</p>
  `;
  }
})();
//# sourceMappingURL=index.js.map
