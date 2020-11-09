// ==UserScript==
// @name         Garage
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.5
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=garage
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Garage.js
// @require      https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    let trucks = [];
    let trailers = [];

    function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    function Open(){
        $('.mt-action-row').each((i,e) => {
            let isNothing = $(e).find('.mt-action-desc')[0].innerText.includes('Nothing');
            let isTruck = $(e).find('.mt-action-author')[0].innerText.includes('Truck');
            let isTrailer = $(e).find('.mt-action-author')[0].innerText.includes('Trailer');
            let id = $(e).find('input[value=Information]').attr('onclick').split('=')[3].split("'")[0];
            let percent = $(e).find('b:contains(%)')[0].innerText;

            if(isNothing && percent !== '100 %'){
                if(isTruck){
                    trucks.push(id);
                }
                if(isTrailer){
                    trailers.push(id);
                }
            }
        })

        trucks = trucks.filter(onlyUnique);
        trailers = trailers.filter(onlyUnique);

        trucks.forEach(id => {
            Utils.Open.truck(id);
        })

        trailers.forEach(id => {
            Utils.Open.trailer(id);
        })

        if(windows.length > 0) {
            setInterval(() => {
                if(Utils.Status.windows.every(w => w.closed)){
                    Utils.Refresh();
                }
            }, 500);
        } else {
            Utils.Refresh(10000);
        }
    }

    Open();
})();
