let currentItems
let sortOrder = false

$('document').ready( () => loadInitialItems())

const loadInitialItems = () => {
  fetch(`/api/v1/items`, {
    method: 'GET',
  })
  .then(response => response.json())
  .then(data => {
    renderItems(data)
  })
  .catch(err => err)
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
  console.log($garageItem, $reason);
})

const renderItems = (data) => {
  data.map(obj => {
    $('.list').append(`
      <div id=${obj.id}><br>
        <h2>Garage Item:</h2> <h3>${obj.name}</h3>
        <h2>Reason to hang onto this gem:</h2> <h3>${obj.reason}</h3>
        <h2>How filthy is this thing?:</h2> <h3>${obj.cleanliness}</h3>
      </div>`)
  })
}

// $('.sort-by-item-name').on('click', () => {
//   if (!sortOrder) {
//     renderItems(downSort())
//     sortOrder = !sortOrder
//   } else {
//     renderItems(upSort())
//     sortOrder = !sortOrder;
//   }
// })
//
// function upSort(data) {
//   return data.name.sort((a, b) => a > b)
// }
//
// function downSort(data) {
//   return data.name.sort((a, b) => a < b);
// }

const addItemToList = (name, reason, cleanliness) => {
  fetch(`/api/v1/items`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ name, reason, cleanliness })
  })
  .then(response => response.json()).then(data => {
    currentItems = data
    renderItems([data[data.length-1]])
  })
  .catch(err => 'err')
}
