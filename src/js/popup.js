/**
* (c) 2020 Tyrus Malmstrom.
* This code is licensed under MIT license (see LICENSE.txt for details)
*/

'use strict';

import jQuery from 'jquery';
import tippy from 'tippy.js';


( function IIFE() {

/**
 * Set the initial extension status, are we running or not? Yup! We are :)
 */
chrome.runtime.sendMessage({ setExtensionStatus: true }, response => {
    setElementsStatus( response.extensionStatus );
});

// Different options the user could click on the default popup.html page :
let enabledOption = jQuery('.enabled');
let extensionInfo = jQuery('.extension-info');
let developerInfo = jQuery('.developer-info');
let developerSupport = jQuery('.developer-support');

// Invoke Tippy.js with array of button elements :
tippy( [ enabledOption[0], extensionInfo[0], developerInfo[0], developerSupport[0] ] );

// TODO TAM clean : I know -- there is a better way of doing this, just learning / messing around with the tippy.js
// library for now!
enabledOption[0]._tippy.setProps( { animation : 'scale', content : 'Extension Status' } );
extensionInfo[0]._tippy.setProps( { animation : 'scale',content : 'Extension Info' } );
developerInfo[0]._tippy.setProps( { animation : 'scale', content : 'Developer Info' } );
developerSupport[0]._tippy.setProps( { animation : 'scale', content : 'Donate' } );

// Register click methods for button options :
enabledOption.click( handleChromeExtensionStatusClick );
extensionInfo.click( handleExtensionInfoClick )
developerInfo.click( handleDeveloperInfoClick );
developerSupport.click( handleDeveloperSupportClick );

/**
 * Function that handles the user's click to toggle enabling / disabling of the chrome extension.
 *
 * Also Programmatically injects other content-script(s) that handle displaying the toast informing the user of the
 * extension running state.
 */
function handleChromeExtensionStatusClick() {
    chrome.runtime.sendMessage({ toggleStatus : true }, response => {

        if( response ) {
            setElementsStatus( response.extensionStatus );
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.insertCSS( tabs[0].id, {
                    file: './assets/css/iziToast.css',
                    runAt: 'document_idle'
                }, function () {
                    chrome.tabs.executeScript( tabs[0].id, {
                        file: './assets/js/iziToast.js',
                        runAt: 'document_idle'
                    }, function () {
                        chrome.tabs.executeScript( tabs[0].id, {
                            code: `var extensionStatus = '${ response.extensionStatus}'` }, function() {
                            chrome.tabs.executeScript( tabs[0].id, {
                                file: './dist/js/toast-content-script.min.js',
                                runAt: 'document_idle'
                            }, function () {
                                chrome.tabs.sendMessage( tabs[0] .id, { extensionStatus : response.extensionStatus } );
                            });
                        });
                    });
                });
            });
        }

    });
}

/**
 * Helper function to handle click for extension information, redirects to README.md of github repo.
 */
function handleExtensionInfoClick() {
    const extensionInfoUrl = 'https://www.tiru5.com/portfolio/chrome-extension-project/';
    window.open( extensionInfoUrl, '_blank', 'noopener');
}

/**
 * Helper function to handle click for developer information, redirects to my github profile!
 */
function handleDeveloperInfoClick() {
    const developerInfoUrl = 'https://www.tiru5.com/about-me/';
    window.open( developerInfoUrl , '_blank', 'noopener');
}

/**
 * Helper function to handle click for developer support / donations, redirects user to my paypal donation button.
 * By no means to individuals have to feel like they need to donate! Just put this option here if they feel so inclined!
 * Which by the way, if you do feel that way I really appreciate you, thank you! :)
 *
 * - Ti <3
 */
function handleDeveloperSupportClick() {
    const developerSupportUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=D48XVG7ZFCBML&' +
        'item_name=Amazon+Customer+Image+Navigation+Chrome+Extension&currency_code=USD';
    window.open( developerSupportUrl, '_blank','noopener');
}

/**
 * Set Elements Status
 *
 * @param extensionStatus Current status of the chrome extension -- Running or not.
 */
function setElementsStatus( extensionStatus ) {
    if( typeof( extensionStatus ) === 'undefined' || extensionStatus === 'enabled' ) {
        enabledOption.attr('class', 'box enabled');
        enabledOption.find('i').attr('class', 'enabled fa-fw fas fa-check');
    } else {
        enabledOption.attr('class', 'box disabled');
        enabledOption.find('i').attr('class', 'fa-fw fas fa-times');
    }
}

})();
