const loadInitialItems = () => {
  fetch(`/api/v1/gargageItem`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    renderItems(data)
  })
  .catch(err => err)
}

const renderItems = (data) => {
  data.map(obj => {
    $('.garage-item-container').append(`
      <button class="garage-item-button" id=${obj.id}>${obj.name}
      </button>
      `)
  })
}
