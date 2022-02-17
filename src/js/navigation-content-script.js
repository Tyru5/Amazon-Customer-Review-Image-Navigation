/**
 * (c) 2020 Tyrus Malmstrom
 * This code is licensed under MIT license (see LICENSE.txt for details)
 */

jQuery(() => {

  // Get chrome extension running status:
  chrome.runtime.sendMessage({ setExtensionStatus: true }, (response) => {
    const extensionStatus = response.extensionStatus;
    executeNavigationEvents(extensionStatus);
    return false;
  });

  /**
   * Register key-up events on the right / left / and Escape button to navigate the pop-up modal that amazon renders.
   *
   * @param extensionStatus
   * @return {boolean}
   */
  function executeNavigationEvents(extensionStatus) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.extensionStatus === "disabled") {
        jQuery(window).off("keydown", handleKeyDownEvents);
        return false;
      } else {
        jQuery(window).on("keydown", handleKeyDownEvents);
        return false;
      }
    });
    if (extensionStatus === "enabled") {
      jQuery(window).on("keydown", handleKeyDownEvents);
    }
  }

  /**
   * Function to handle key down event.
   *
   * @param event
   * @return {boolean}
   */
  function handleKeyDownEvents(event) {
    let key = event.key;
    if (key === "ArrowRight") {
      const rightArrowButton =
        jQuery(".next-button").length > 0
          ? jQuery(".next-button")
          : jQuery("#cr_customers_image_gallery").find(
              ".cr-lightbox-navigator-button.cr-lightbox-navigator-button__next"
            );
      rightArrowButton.trigger("click");
      return false;
    } else if (key === "ArrowLeft") {
      const leftArrowButton =
        jQuery(".back-button").length > 0
          ? jQuery(".back-button")
          : jQuery("#cr_customers_image_gallery").find(
              ".cr-lightbox-navigator-button.cr-lightbox-navigator-button__back"
            );
      leftArrowButton.trigger("click");
      return false;
    } else if (key === "Escape") {
      jQuery(".a-button-close").trigger("click");
      return false;
    }
  }

});
