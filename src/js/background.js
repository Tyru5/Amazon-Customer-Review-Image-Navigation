/**
 * (c) 2020 Tyrus Malmstrom
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

// ############################ Main chrome runtime events ############################
chrome.runtime.onInstalled.addListener( () => {
    console.log('I am in the background.js file and this should run as soon as the extension is installed!');
});


// ############################ Message event listeners ############################
chrome.runtime.onMessage.addListener(( request, sender, sendResponse ) => {
    if ( request.msg === 'showToast' ) {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            // relay finder.js's message to filler.js
            chrome.tabs.sendMessage( tabs[0].id, request );
        })
    }
});
