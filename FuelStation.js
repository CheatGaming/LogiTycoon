// ==UserScript==
// @name         Fuel Station
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.logitycoon.com/eu1/index.php?a=fuelstation*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function Refuel() {
        $('button.blue-madison').click();
        setTimeout(1000);
        $('button.red-sunglo').click();
    }

    function AutoRefresh( t ) {
        setTimeout("location.reload(true);", t);
    }

    AutoRefresh(5000);
    Refuel();
})();
