/**
 * (c) 2020 Tyrus Malmstrom
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

( function IIFE() {

// Get chrome extension running status:
chrome.runtime.sendMessage({ getExtensionStatus: true }, response => {
    const extensionStatus = response.extensionStatus;
    executeNavigationEvents( extensionStatus );
    return false;
});

/**
 * Register key-up events on the right / left / and Escape button to navigate the pop-up modal that amazon renders.
 *
 * @param extensionStatus
 * @return {boolean}
 */
function executeNavigationEvents( extensionStatus ) {
    chrome.runtime.onMessage.addListener(( request, sender, sendResponse ) => {
        if( request.extensionStatus === 'disabled' ) {
            jQuery( window ).unbind( 'keydown', handleKeyDownEvents );
            return false;
        } else {
            jQuery( window ).keydown( handleKeyDownEvents );
            return false;
        }
    });
    if( extensionStatus === 'enabled' ) {
        jQuery( window ).keydown( handleKeyDownEvents );
    }
}

/**
 * Function to handle key down event.
 *
 * @param event
 * @return {boolean}
 */
function handleKeyDownEvents( event ) {
    let key = event.key;
    if( key === 'ArrowRight' ) {
        jQuery('.next-button').click();
        return false;
    } else if( key === 'ArrowLeft' ) {
        jQuery('.back-button').click();
        return false;
    } else if( key === 'Escape' ) {
        jQuery('.a-button-close').click();
        return false;
    }
}

})();
