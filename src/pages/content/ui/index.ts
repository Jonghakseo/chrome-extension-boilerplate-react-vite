import('@pages/content/ui/root');

chrome.runtime.sendMessage({action: 'getContent'}, (response) => {
    if (response && response.content) {
        console.log('Received content:', response.content);
    }else{
        console.log('No content received');
    }
});
