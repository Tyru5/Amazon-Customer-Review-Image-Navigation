/**
 * (c) 2020 Tyrus Malmstrom.
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

'use strict';

import jQuery from 'jquery';


(function IIFE() {

    let enabledOption = jQuery('.enabled');
    enabledOption.click( handleClick );








    /**
     * Function that handles the user's click to toggle enabling / disabling of the chrome extension.
     *
     * TODO TAM : Allow this to handle the data response relayed from the background.js script to toggle extension
     * functionality.
     */
    function handleClick() {
        chrome.runtime.sendMessage({ msg: "showToast" } );
    }

})();
