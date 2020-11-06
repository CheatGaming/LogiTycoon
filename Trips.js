// ==UserScript==
// @name         Trips
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.2
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=trips*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Trips.js
// ==/UserScript==

(function() {
    'use strict';
    var urlParams = new URLSearchParams(window.location.search);

    function BackToWerehouse(){
        window.location.href = 'https://www.logitycoon.com/eu1/index.php?a=warehouse';
    }

    try{
        if(urlParams.has('from')){
            const trips = [];
            $('tbody').first().find('tr').each((i,e) => {
                let row = $(e);
                let split = e.innerText.split(/\t|\n|€/).filter(Boolean);
                let earnings = parseInt(split[0].replace('.',''));
                let distance = parseInt(split[3]);
                trips.push({
                    from:  split[1].trim(),
                    to:    split[2].trim(),
                    earnings: earnings,
                    distance: distance,
                    onClick: row.attr('onclick'),
                    profit: earnings/distance
                });
            });
            trips.sort((a, b) => b.profit - a.profit );

            let from = urlParams.get('from').trim();
            let trip = trips.find(t => t.from === from);
            eval(trip.onClick);
            $('#submit-trips').click();
        } else {
            BackToWerehouse();
        }
    } catch (e) {
        BackToWerehouse();
    }

})();
