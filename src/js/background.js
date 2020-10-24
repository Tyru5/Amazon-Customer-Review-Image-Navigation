/**
* (c) 2020 Tyrus Malmstrom
* This code is licensed under MIT license (see LICENSE.txt for details)
*/


'use strict';

( function IIFE() {

let extensionStatus;

// ############################ Main chrome runtime events ############################
chrome.runtime.onInstalled.addListener(() => {
    console.log('If you are reading / inspecting this -- I hope you are doing well and having a nice day! :)');
});

/**
 * Get initial status of chrome extension from user's local storage, if it hasn't been saved, set the value.
 */
chrome.storage.local.get( [ 'extensionStatus' ], result => {
    extensionStatus = result.extensionStatus || 'enabled';
    // Update the extension status in the users local storage:
    chrome.storage.local.set( { extensionStatus } );
    updateBrowserToolbarExtensionIcon();
});


chrome.runtime.onMessage.addListener(( request, sender, sendResponse ) => {
    // Handle retrieving the initial extension status :
    if( request.getExtensionStatus ) {
        sendResponse({ extensionStatus: extensionStatus } );
    }

    // Handle if user toggled the extension status :
    if( request.toggleStatus ) {
        const status = updateExtensionStatus();
        sendResponse({ extensionStatus: status } );
    }

    if( request.action === 'showToast' ) {
        chrome.tabs.query({ active: true, currentWindow: true }, function ( tabs) {
            chrome.tabs.sendMessage( tabs[0].id, { extensionStatus : extensionStatus }, ( response ) => {
                if( response ) {
                    if( response.extensionStatus ) {
                        sendResponse({ extensionStatus : response.extensionStatus } );
                    }
                }
            });
        });
    }
    return true; // Required to keep message port open.
});


/**
 * Update how the browser toolbar icon looks.
 *
 * @return {boolean}
 */
function updateBrowserToolbarExtensionIcon() {
    // Disabled Icon image :
    if( extensionStatus === 'disabled' ) {
        chrome.browserAction.setIcon({
            path: {
                16: 'assets/Amazon.Integration.Icons/Amazon.Integration.Icons/Gradiant/icon_16x16disable.png',
                48: 'assets/Amazon.Integration.Icons/Amazon.Integration.Icons/Gradiant/icon_48x48disable.png',
                128: 'assets/Amazon.Integration.Icons/Amazon.Integration.Icons/Gradiant/icon_128x128disable.png',
            },
        });
    }
    // Enabled Icon Image :
    chrome.browserAction.setIcon({
        path: {
            16: 'assets/Amazon.Integration.Icons/Amazon.Integration.Icons/Gradiant/icon_16x16.png',
            48: 'assets/Amazon.Integration.Icons/Amazon.Integration.Icons/Gradiant/icon_48x48.png',
            128: 'assets/Amazon.Integration.Icons/Amazon.Integration.Icons/Gradiant/icon_128x128.png',
        },
    });
}

/**
 * Update the running status of the extension. Enabled or Disabled?
 *
 * @return {string}
 */
function updateExtensionStatus() {
    extensionStatus = extensionStatus === 'enabled' ? 'disabled' : 'enabled';
    chrome.storage.local.set( { extensionStatus } );
    updateBrowserToolbarExtensionIcon();
    return extensionStatus;
}

})();
