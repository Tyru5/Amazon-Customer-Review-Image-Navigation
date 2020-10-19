/**
 * (c) 2020 Tyrus Malmstrom
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

'use strict';

import jQuery from 'jquery';

let enabledOption = jQuery('.enabled');
enabledOption.click( handleClick );


function handleClick() {
    chrome.runtime.sendMessage({ msg: "showToast" } );
}