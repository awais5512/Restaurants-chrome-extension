const populateDataContainer = (data) => {
  const modalContainer = document.createElement('div');
  const modalTitle = document.createElement('h2');
  const closeModalButton = document.createElement('button');

  modalTitle.textContent = 'Your Favorite Restaurants';
  modalContainer.appendChild(modalTitle);

  closeModalButton.classList.add('close-modal-button');
  closeModalButton.textContent = 'Close Modal';

  modalContainer.style.display = 'none';
  modalContainer.classList.add('modal-container');

  data.forEach(post => {
    const p = document.createElement('p');
    p.classList.add('restaurant-name');
    p.textContent = post.attributes.Name;
    p.style.backgroundColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;

    modalContainer.appendChild(p);
    modalContainer.style.display = 'block';
  })

  closeModalButton.onclick = function() {
    modalContainer.style.display = 'none';
  }

  modalContainer.appendChild(closeModalButton);

  document.body.appendChild(modalContainer);
}

(() => {
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'fetchedRestaurantsSuccess') {
      populateDataContainer(message.data);
    }
  })
  
  chrome.runtime.sendMessage({ action: 'fetchRestaurants' });
})();
