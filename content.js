// const observer = new MutationObserver(() => {
//   const saveButton = document.querySelector('div[aria-label="Guardar"]');
//   if (saveButton && !saveButton.dataset.reloadAttached) {
//     saveButton.dataset.reloadAttached = 'true';

//     saveButton.addEventListener('click', () => {
//       console.log("Botón Guardar fue clickeado");
//       setTimeout(() => {
//         chrome.runtime.sendMessage({ action: "reloadBlogTab" });
//       }, 1000); // espera un segundo para que el guardado se procese
//     });
//   }
// });

// observer.observe(document.body, { childList: true, subtree: true });

let ctrlSEventAttached = false;
let clickEventAttached = false;

function handleSaveButton() {
  const saveButton = document.querySelector('div[aria-label="Guardar"]');

  if (!saveButton) return;

  // Adjuntar evento Ctrl+S una sola vez
  if (!ctrlSEventAttached) {
    ctrlSEventAttached = true;
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        if (saveButton.getAttribute('aria-disabled') !== 'true') {
          console.log("Ctrl+S detectado. Simulando clic en botón Guardar.");
          saveButton.click();
        } else {
          console.warn("Botón Guardar está deshabilitado.");
        }
      }
    });
  }

  // Adjuntar evento de clic una sola vez
  if (!clickEventAttached) {
    clickEventAttached = true;
    saveButton.addEventListener('click', () => {
      console.log("Botón Guardar fue clickeado");
      setTimeout(() => {
        chrome.runtime.sendMessage({ action: "reloadBlogTab" });
      }, 1000);
    });
  }
}

// Observar el DOM por si el botón se carga más tarde
const observer = new MutationObserver(handleSaveButton);
observer.observe(document.body, { childList: true, subtree: true });

// Ejecutar al inicio por si el botón ya está presente
handleSaveButton();