// ==UserScript==
// @name         Fuel Station
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.4
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=fuelstation*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/FuelStation.js
// ==/UserScript==

(function() {
    'use strict';

    function Refuel() {
        $('button[onclick*=refuelft]').click();
        setTimeout(50);
        $('button[onclick*=refuelfc]').click();
        setTimeout(50);
        $('button[onclick*=refuel]').click();
    }

    function Close( t ) {
        setTimeout("window.close()", t);
    }

    Close(700);
    Refuel();
})();
