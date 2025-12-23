chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "reloadBlogTab") {
    chrome.storage.local.get("blogUrl", ({ blogUrl }) => {
      if (!blogUrl) return;
      chrome.tabs.query({}, (tabs) => {
        const blogTab = tabs.find(tab => tab.url && tab.url.startsWith(blogUrl));
        if (blogTab) {
          chrome.tabs.reload(blogTab.id);
        }
      });
    });
  }
});