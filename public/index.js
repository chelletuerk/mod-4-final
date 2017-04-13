let currentItems
let clickedTitle
let sortOrder = false

$('document').ready( () => loadInitialItems())

const loadInitialItems = () => {
  fetch(`/api/v1/items`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    renderItems(data, clickedTitle)
  })
  .catch(err => console.error(err))
}

$('.garage-item-input, .reason-input, .clean-input').on('input', (e) => {
  e.target.value.length > 0 ?
  $('.garage-item-submit').prop('disabled', false) :
  $('.garage-item-submit').prop('disabled', true)
})

$('.garage-item-submit').on('click', () => {
  const $garageItem = $('.garage-item-input').val()
  const $reason = $('.reason-input').val()
  const $clean = $('.cleanliness option:selected').text()
  addItemToList($garageItem, $reason, $clean)
  $('.garage-item-input').val('')
  $('.reason-input').val('')
  $('.clean-input').val('')
})

const renderItems = (data, clickedTitle) => {
  if (clickedTitle) {
    data = data.filter(obj => obj.itemId === clickedTitle)
    currentUrls = data
  }

  data.map(obj => {
    $('.list').append(`
      <div id=${obj.id}><br>
        <h2>Garage Item:</h2> <h3 onclick='title'>${obj.name}</h3>
        <h2>Reason to hang onto this gem:</h2> <h3>${obj.reason}</h3>
        <h2>How filthy is this thing?:</h2> <h3>${obj.cleanliness}</h3>
      </div>
    `)
  })
}

$('.garage-item-container').on('click', '.title', (e) => {
  clickedTitle = e.target.id;
  loadInitialItems(clickedTitle)
})

const addItemToList = (name, reason, cleanliness) => {
  fetch(`/api/v1/items`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ itemId: clickedTitle, name, reason, cleanliness })
  })
  .then(response => response.json())
  .then(data => {
    currentItems = data
    renderItems([data[data.length-1]])
  })
  .catch(err => console.error(err))
}
