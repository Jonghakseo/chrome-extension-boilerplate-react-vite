console.log('Example.com Content Script loaded~~!~!!');

// Example.com specific content script logic
const initExampleContentScript = () => {
  // Add your example.com specific logic here
  document.addEventListener('DOMContentLoaded', () => {
    console.log('Example.com page loaded');
  });
};

initExampleContentScript();
