import { galleryItems } from "./gallery-items.js";
// Change code below this line
const gallery = document.querySelector("div.gallery");

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

gallery.insertAdjacentHTML("beforeend", createGallery(galleryItems));

function openModalWindow(src, alt) {
  const imageHTML = `<img src="${src}" alt="${alt}" />`;
  const modal = basicLightbox.create(imageHTML, {
    beforeShow: (instance) => {
      const imgEl = instance.element().querySelector("img");
      imgEl.src = src;
      imgEl.alt = alt;
    },
  });

  function closeModalWindow() {
    if (modal.visible()) {
      modal.close();
    }
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModalWindow();
    }
  });

  modal.show();
}

gallery.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName === "IMG") {
    const largeImageSrc = e.target.dataset.source;
    const alt = e.target.alt;
    openModalWindow(largeImageSrc, alt);
  }
});
