import axios from "axios"
export async function fetchGalleryData(input, page) {
    const galleryData = await axios.get(`https://pixabay.com/api/?key=29694967-6e0e9f35817c8fb05a3954c06&q=${input}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40&min_width=300&min_height=500`)
    return galleryData
  }