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

const renderItems = (data) => {
  data.map(obj => {
    $('.list').append(`
      <div id=${obj.id}><br>
        <h2>Gargabe Item:</h2> <h3>${obj.name}</h3>
        <h2>Reason to hang onto this gem:</h2> <h3>${obj.reason}</h3>
        <h2>How filthy is this thing?:</h2> <h3>${obj.cleanliness}</h3>
      </div>`)
  })
}

const postItem = (item) => {
  fetch(`/api/v1/items`, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ itemId: item })
  })
  .then(response => response.json()).then(data => {
    currentItems = data
    renderItems([data[data.length-1]])
  })
  .catch(err => 'err')
}
