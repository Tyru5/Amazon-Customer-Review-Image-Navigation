/**
* (c) 2020 Tyrus Malmstrom.
* This code is licensed under MIT license (see LICENSE.txt for details)
*/

'use strict';

import jQuery from 'jquery';


(function IIFE() {

/**
 * Get initial extension status, are we running or not?
 */
chrome.runtime.sendMessage({ getExtensionStatus: true }, response => {
    setElementsStatus( response.extensionStatus );
});


let enabledOption = jQuery('.enabled');
let extensionInfo = jQuery('.extension-info');
let developerInfo = jQuery('.developer-info');
let developerSupport = jQuery('.developer-support');

// Register click methods :
enabledOption.click( handleClick );
extensionInfo.click( ( event ) => {
    const extensionInfoUrl = 'https://github.com/Tyru5/Amazon-Customer-Image-Navigation/blob/main/README.md';
    window.open( extensionInfoUrl, '_blank');
});
developerInfo.click( ( event ) => {
    const developerInfoUrl = 'https://github.com/Tyru5';
    window.open( developerInfoUrl , '_blank');
});
developerSupport.click( ( event ) => {
    const developerSupportUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=D48XVG7ZFCBML&' +
                                'item_name=Amazon+Customer+Image+Navigation+Chrome+Extension&currency_code=USD';
    window.open( developerSupportUrl, '_blank');
});

/**
 * Function that handles the user's click to toggle enabling / disabling of the chrome extension.
 * functionality.
 */
function handleClick() {
    chrome.runtime.sendMessage({ action: 'showToast', toggleStatus : true }, response => {
        if( response ) {
            setElementsStatus( response.extensionStatus );
        }
    });
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
