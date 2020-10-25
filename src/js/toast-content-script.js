/**
* (c) 2020 Tyrus Malmstrom
* This code is licensed under MIT license (see LICENSE.txt for details)
*/

'use strict';

( function IIFE() {

    // Show toast informing the user of extension status :
    const status = ( extensionStatus === 'disabled') ? 'enable' : 'disable';
    iziToast.info({
        title: `Extension ${ status }!`,
        message: `Click again to ${ status } it.`,
        position: 'topCenter',
        onOpening: function (instance, toast) { },
        onClosing: function (instance, toast, closedBy) { }
    });

})();

