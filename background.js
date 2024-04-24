chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'fetchRestaurants') {
    fetch('http://localhost:1337/api/restaurants')
      .then(response => response.json())
      .then(data => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, {
            action: "fetchedRestaurantsSuccess",
            data: data.data
          })
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }
});
