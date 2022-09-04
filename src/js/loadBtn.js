import { refs } from "./refs"
const { loadBtn } = refs

export function addLoadBtn() {
    loadBtn.classList.remove('d-none')
  }
  
export function removeLoadBtn() {
    loadBtn.classList.add('d-none')
}