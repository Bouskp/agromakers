const bars = document.querySelector('#bars')
const listContainer = document.querySelector('.list-container')

bars.addEventListener('click', () => {
  listContainer.classList.toggle('open')
})
