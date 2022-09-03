import axios from "axios"
import { Notify } from "notiflix"
const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery')
}

refs.form.addEventListener('submit', onFormSubmit)

function onFormSubmit(e) {
    e.preventDefault()
    const searchInput = e.currentTarget.searchQuery.value
    axios.get(`https://pixabay.com/api/?key=29694967-6e0e9f35817c8fb05a3954c06&q=${searchInput}&image_type=photo&orientation=horizontal&safesearch=true&page=1&per_page=40`)
        .then(res => {
            if(res.data.hits.length === 0) {
                Notify.info('Sorry, there are no images matching your search query. Please try again.')
            }
            renderGallery(res.data.hits)
        })
        .catch(err => console.log(err))
}

function renderGallery(data) {
    data.forEach(item => {
        const markup = `<div class="photo-card">
        <img src="${item.previewURL}" alt="" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${item.likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${item.views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${item.comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${item.downloads}</b>
          </p>
        </div>
      </div>`
      refs.gallery.insertAdjacentHTML('beforeend', markup)
    }
    )
}