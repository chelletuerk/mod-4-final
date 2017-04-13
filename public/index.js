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
        ${obj.name}<br>
        ${obj.reason}<br>
        ${obj.cleanliness}
      </div>`)
  })
}
