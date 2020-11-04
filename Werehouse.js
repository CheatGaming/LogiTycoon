// ==UserScript==
// @name         Werehouse
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.1
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=warehouse
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Werehouse.js
// ==/UserScript==

(function() {
    'use strict';
    let freight_ids = [];

    function OpenNewTab(freight){
        window.open('https://www.logitycoon.com/eu1/index.php?a=freight&n=' + freight.id, '_blank');
    }

    function Refresh() {
        location.reload(true);
    }

    function Process(){
        freight_ids.forEach(OpenNewTab);
        setTimeout(Refresh, 5000)
    }

    $('span:contains("Unloaded")')
        .closest('tr')
        .each((i,e) => freight_ids.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Unloaded'
        }));
    $('span:contains("Arrived")')
        .closest('tr')
        .each((i,e) => freight_ids.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Arrived'
        }));
    $('span:contains("Loaded")')
        .closest('tr')
        .each((i,e) => freight_ids.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Loaded'
        }));
    $('span:contains("Accepted")')
        .closest('tr')
        .each((i,e) => freight_ids.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Accepted'
        }));

    setTimeout(Process, 2000)
})();
