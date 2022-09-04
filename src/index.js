
import { Notify } from "notiflix"
import  SimpleLightbox  from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchGalleryData } from "./js/fetchGallery";
import { refs } from "./js/refs";
import { renderGallery } from "./js/renderGallery";
import { addLoadBtn, removeLoadBtn } from "./js/loadBtn";

const simple = new SimpleLightbox(('.gallery a'))

const { form, gallery, loadBtn } = refs

let page = 1
let currentHits = 0

form.addEventListener('submit', onFormSubmit)
loadBtn.addEventListener('click', onLoadBtnClick)

async function onFormSubmit(e) {
    e.preventDefault()
    const searchInput = e.currentTarget.searchQuery.value
    const response = await fetchGalleryData(searchInput, page)
    const data = response.data

    page = 1
    removeLoadBtn()
    clearGallery()
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    currentHits = data.hits.length
    if(searchInput === '') return
    if(data.totalHits > 40) {
      addLoadBtn()
    } else {
      removeLoadBtn()
    }
    try {
      if(data.totalHits > 0) {
        Notify.success(`Hooray! We found ${data.totalHits} images.`)
        gallery.innerHTML = ''
        renderGallery(data.hits, gallery)
        simple.refresh()
      }
      if(data.totalHits === 0) {
        gallery.innerHTML === ''
        removeLoadBtn()
        Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }  

    } catch (error) {
      console.log(error)
    }

}

async function onLoadBtnClick() {
  page += 1

  const response = await fetchGalleryData(form.elements.searchQuery.value, page)
  const data = response.data

  currentHits += data.hits.length
  
  renderGallery(data.hits, gallery)
  simple.refresh()

  if(currentHits >= data.totalHits) {
    Notify.info("We're sorry, but you've reached the end of search results.")
    removeLoadBtn()
  }

  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}

function clearGallery() {
  gallery.innerHTML = ''
}






