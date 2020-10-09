/**
 * (c) 2020 Tyrus Malmstrom
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

// Register key-up events on the right / left / and Escape button to navigate the pop-up modal that amazon renders:
// We only register these key-up events if the user has clicked / selected to view all customer images.
jQuery('.reviews-image-gallery-link').click( function( event ) {
    jQuery(window).keyup( function( e ) {
        let key = e.key;
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
    });
});