// ==UserScript==
// @name         Fuel Station
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.1
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=fuelstation*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/FuelStation.js
// ==/UserScript==

(function() {
    'use strict';

    function Refuel() {
        $('button.blue-madison').click();
        setTimeout(50);
        $('button.red-sunglo').click();
    }

    function AutoRefresh( t ) {
        setTimeout("location.reload(true);", t);
    }

    AutoRefresh(5000);
    Refuel();
})();
