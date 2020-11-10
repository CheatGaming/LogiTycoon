// ==UserScript==
// @name         Trips
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.8
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=trips*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Trips.js
// @require      https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    let urlParams = new URLSearchParams(window.location.search);
    let from = '';
    let type = '';
    let trips = [];

    try{
        if(!urlParams.has('from')){
            Utils.GoTo.warehouse();
        } else {
            from = urlParams.get('from').trim();
        }
        if(urlParams.has('type')){
            type = urlParams.get('type').trim();
        }

        $('tbody').first().find('tr').each((i,e) => {
            let row = $(e);
            let split = e.innerText.split(/\t|\n|€/).filter(Boolean);
            let earnings = parseInt(split[0].replace('.',''));
            let distance = parseInt(split[3]);

            trips.push({
                from: split[1].trim(),
                to: split[2].trim(),
                earnings: earnings,
                distance: distance,
                type: split[4].trim(),
                onClick: row.attr('onclick'),
                profit: earnings/distance
            });
        });

        if(!!from){
            trips = trips.filter(t => t.from === from);
        }
        if(!!type){
            trips = trips.filter(t => t.type === type);
        }
       
        trips.sort((a, b) => b.profit - a.profit );
        eval(trips[0].onClick);
        $('#submit-trips').click();
    } catch (e) {
        Utils.GoTo.warehouse();
        console.log(e)
    }

    Utils.Refresh(10000);
})();
