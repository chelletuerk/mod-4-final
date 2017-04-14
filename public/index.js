$('document').ready( () => loadInitialItems())

const cleanlinessCount = (data) => {
  let sparkling = 0
  let dusty = 0
  let rancid = 0

  data.forEach((obj) => {
    const objectCleanliness = obj.cleanliness

    if (objectCleanliness === 'Rancid') rancid += 1
    if (objectCleanliness === 'Dusty') dusty += 1
    if (objectCleanliness === 'Sparkling') sparkling += 1

    $('.cleanliness-count').html(`
      <p>Rancid: ${rancid}</p>
      <p>Dusty: ${dusty}</p>
      <p>Sparkling: ${sparkling}</p>
    `)
  })
}

const loadSingleItem = (id) => {
  fetch(`/api/v1/items/${id}`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    $('.list').empty()
    cleanlinessCount(data)
    renderItems(data)
  })
  .catch(err => console.error(err))
}

const loadInitialItems = () => {
  fetch(`/api/v1/items`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    $('.list').empty()
    cleanlinessCount(data)
    renderItems(data)
  })
  .catch(err => console.error(err))
}

$('.sort-by-item-name').on('click', () => {
  loadSortedItems()
})

$('.load-all-items').on('click', () => {
  loadInitialItems()
})

const loadSortedItems = () => {
  fetch(`/api/v1/sorted_items`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    $('.list').empty()
    cleanlinessCount(data)
    renderItems(data)
  })
  .catch(err => console.error(err))
}

$('.garage-door-opener').on('click', () => {
  $('.check').attr('checked', false)
})

$('.garage-item-input, .reason-input, .clean-input').on('input', (e) => {
  e.target.value.length > 0 ?
  $('.garage-item-submit').prop('disabled', false) :
  $('.garage-item-submit').prop('disabled', true)
})

$('.garage-item-submit').on('click', () => {
  const $garageVal = $('.garage-item-input').val()
  const $garageItem = $garageVal.toLowerCase()
  const $reason = $('.reason-input').val()
  const $clean = $('.cleanliness option:selected').text()
  addItemToList($garageItem, $reason, $clean)
  $('.garage-item-input').val('')
  $('.reason-input').val('')
  $('.clean-input').val('')
})

$('.list, .garage-title').on('click', (e) => {
  const id = e.target.id
  loadSingleItem(id)
})

const renderItems = (data) => {
  data.map(obj => {
    $('.list').append(`
      <div><br>
        <h2 id=${obj.id} class="garage-title">Garage Item: ${obj.name}</h2>
        <h2>Reason to hang onto this gem:</h2> <h3>${obj.reason}</h3>
        <h2>How filthy is this thing?:</h2> <h3>${obj.cleanliness}</h3>
      </div>
    `)
  })
}

const addItemToList = (name, reason, cleanliness) => {
  fetch(`/api/v1/items`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name, reason, cleanliness })
  })
  .then(response => response.json())
  .then(data => {
    currentItems = data
    $('.list').empty()
    cleanlinessCount(data)
    renderItems(data)
  })
  .catch(err => console.error(err))
}
