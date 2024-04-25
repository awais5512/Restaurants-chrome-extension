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

  if (message.action === 'addRestaurant') {
    fetch('http://localhost:1337/api/restaurants', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
        data: {
          Name: message.restaurantName
        }
      })
		})
    .then(response => response.json())
    .then(data => {
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {
          action: "addRestaurantSuccess",
          data: data
        })
      });
    })
    .catch(error => console.error('Error fetching data:', error));
  }
});
