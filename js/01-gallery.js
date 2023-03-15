import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector("div.gallery");
const galleryMarkup = createGallery(galleryItems);

// gallery.insertAdjacentHTML("beforeend", galleryMarkup);

function createGallery(galleryItems) {
  const images = galleryItems
    .map(({ preview, original, description }) => {
      return `
      <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>`;
    })
    .join("");
  return images;
}

gallery.innerHTML = createGallery(galleryItems);

function openModalWindow(src) {
  const imageHTML = `<img src="" alt="modal image" />`;
  const modal = basicLightbox.create(imageHTML, {
    beforeShow: (instance) => {
      const imgEl = instance.element().querySelector("img");
      imgEl.src = src;
    },
  });
  modal.show();
}

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    const largeImageSrc = e.target.dataset.source;
    openModalWindow(largeImageSrc);
  }
});
