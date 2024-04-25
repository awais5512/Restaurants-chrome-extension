document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({
      currentWindow: true,
      active: true
  });

  const activeTab = tabs[0];

  if (activeTab.url.includes("stackoverflow")) {
    const container = document.getElementById('dataContainer');
    const p = document.createElement('p');

    p.textContent = "This extension shows a modal when you open Stackoverflow.";
    container.appendChild(p);
  } else {
    const container = document.querySelector(".container");

    container.innerHTML = '<div class="title">Please open Stackoverflow in order to use this extension.</div>';
  }
});
