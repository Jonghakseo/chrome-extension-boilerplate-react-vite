import('@pages/content/ui/root');

<<<<<<< HEAD
chrome.runtime.sendMessage({ action: 'getContent' }, response => {
  if (response && response.content) {
    console.log('Received content:', response.content);
  } else {
    console.log('No content received');
  }
=======
chrome.runtime.sendMessage({action: 'getContent'}, (response) => {
    if (response && response.content) {
        console.log('Received content:', response.content);
    }else{
        console.log('No content received');
    }
>>>>>>> 83f2b6e2cd255af07db3a0da46aacba85a21849a
});
