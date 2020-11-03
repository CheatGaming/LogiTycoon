// ==UserScript==
// @name         Trips
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.logitycoon.com/eu1/index.php?a=trips
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    try {
        document.trips.button_1.click();
        $('#submit-trips').click();
    }
    catch (error) {
    }

    function AutoRefresh( t ) {
        setTimeout("location.reload(true);", t);
    }

    AutoRefresh(5000);
})();
