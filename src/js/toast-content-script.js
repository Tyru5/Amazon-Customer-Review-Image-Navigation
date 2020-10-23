/**
* (c) 2020 Tyrus Malmstrom
* This code is licensed under MIT license (see LICENSE.txt for details)
*/

'use strict';

(function IIFE() {

/**
 * chrome runtime onMessage event listener to handle the communication channel from data being sent from the background.js
 * script acting as the middleman to allow this content-script to communicate with the other content-script.
 */
chrome.runtime.onMessage.addListener(( request, sender, sendResponse ) => {
    const status = ( request.extensionStatus === 'disabled') ? 'Enable' : 'Disable';
    if( request ) {
        iziToast.info({
            title: `Extension ${ request.extensionStatus }!`,
            message: `Click Again to ${status} it.`,
            // icon: 'fas fa-times',
            position : 'topCenter',
            // theme : 'dark',
            // progressBarColor: 'rgb(0, 255, 184)',
            onOpening: function(instance, toast){
                console.info('callback abriu!');
            },
            onClosing: function(instance, toast, closedBy){
                console.info('closedBy: ' + closedBy); // tells if it was closed by 'drag' or 'button'
            }
        });
        sendResponse({ extensionStatus : request.extensionStatus } );
    }
});


})();

