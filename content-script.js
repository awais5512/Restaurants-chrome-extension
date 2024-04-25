const populateDataContainer = (data) => {
	const modalContainer = document.createElement('div');
	const modalTitle = document.createElement('h1');
	const closeModalButton = document.createElement('button');
	const restaurantInput = document.createElement('input');
	const addRestaurantButton = document.createElement('button');

	modalTitle.textContent = 'Food for thought! (and code)';
	modalContainer.appendChild(modalTitle);

	closeModalButton.classList.add('close-modal-button');
	closeModalButton.textContent = 'Close Modal';

	restaurantInput.placeholder = 'Enter restaurant name';
	restaurantInput.classList.add('add-restaurant-field');
	addRestaurantButton.textContent = 'Add Restaurant';
	addRestaurantButton.classList.add('add-restaurant-button');

	modalContainer.classList.add('modal-container');

	data.forEach(post => {
		const p = document.createElement('p');

		p.classList.add('restaurant-name');
		p.textContent = post.attributes.Name;
		p.style.backgroundColor = `rgb(
			${Math.floor(Math.random() * 255)},
			${Math.floor(Math.random() * 255)},
			${Math.floor(Math.random() * 255)}
		)`;

		modalContainer.appendChild(p);
	})

	modalContainer.appendChild(restaurantInput);
	modalContainer.appendChild(addRestaurantButton);

	modalContainer.style.display = 'block';

	closeModalButton.onclick = function() {
		modalContainer.style.display = 'none';
	}

	addRestaurantButton.onclick = async function() {
		const restaurantName = restaurantInput.value;
		
		if (!restaurantName) {
			return;
		}

		chrome.runtime.sendMessage({ action: 'addRestaurant', restaurantName });
	};

	modalContainer.appendChild(closeModalButton);

	document.body.appendChild(modalContainer);
}

const showSuccessAlert = (message) => {
	const modalContainer = document.querySelector('.modal-container');
	const alert = document.createElement('div');

	alert.classList.add('alert-success');
	alert.textContent = message;

	modalContainer.appendChild(alert);

	setTimeout(() => {
		alert.remove();
	}, 3000);
}

(() => {
	chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
		if (message.action === 'fetchedRestaurantsSuccess') {
			populateDataContainer(message.data);
		}

		if (message.action === 'addRestaurantSuccess') {
			showSuccessAlert("Restaurant added successfully!");
		}
	})
	
	chrome.runtime.sendMessage({ action: 'fetchRestaurants' });
})();
