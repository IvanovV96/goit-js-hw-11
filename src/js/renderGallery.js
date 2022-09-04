export function renderGallery(data, domEl) {
    
      data.forEach(item => {
          const markup = `
          <a href="${item.largeImageURL}"><div class="photo-card"><img src="${item.previewURL}"  alt="" loading="lazy" />
          <div class="info">
          <p class="info-item">
            <b>Likes</b> <span>${item.likes}</span>
          </p>
          <p class="info-item">
            <b>Views</b> <span>${item.views}</span>
          </p>
          <p class="info-item">
            <b>Comments</b> <span>${item.comments}</span>
          </p>
          <p class="info-item">
            <b>Downloads</b> <span>${item.downloads}</span>
          </p>
        </div>
        </div>
          </a>`
        domEl.insertAdjacentHTML('beforeend', markup)
      }
      )
  }