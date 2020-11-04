// ==UserScript==
// @name         Trips
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.1
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=trips
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Trips.js
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
