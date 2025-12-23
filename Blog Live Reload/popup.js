document.addEventListener('DOMContentLoaded', () => {
  const blogSelect = document.getElementById('blogSelect');
  const status = document.getElementById('status');

  chrome_i18n();

  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      if (tab.url && tab.url.includes('blogspot.com')) {
        const option = document.createElement('option');
        option.value = tab.url;
        option.textContent = tab.title || tab.url;
        blogSelect.appendChild(option);
      }
    });
  });

  document.getElementById('saveBtn').addEventListener('click', () => {
    const selectedUrl = blogSelect.value;
    chrome.storage.local.set({ blogUrl: selectedUrl }, () => {
      const message = chrome.i18n.getMessage('blogSelected');
      status.textContent = message;
      setTimeout(() => status.textContent = '', 2000);
    });
  });
});

function chrome_i18n(){
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(element => {
    const key = element.dataset.i18n;
    const message = chrome.i18n.getMessage(key);
    if(message){element.tagName === 'TITLE' ? (document.title = message) : (element.textContent = message);}
  });
}