// ==UserScript==
// @name         Garage
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.3
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=garage
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Garage.js
// ==/UserScript==

(function() {
    'use strict';
    let trucks = [];
    let trailers = [];
    let windows = [];

    function ParseInnerText(t) {
        try{
            return {
                action: t.split(': ')[1].split('\n')[0]
            }
        }
        catch (e){
            return {
                action: ''
            }
        }
    }

    function AutoRefresh( t ) {
        setTimeout("location.reload(true);", t);
    }

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
            windows.push(window.open('https://www.logitycoon.com/eu1/index.php?a=garage_truck&t=' + id, '_blank'));
        })

        trailers.forEach(id => {
            windows.push(window.open('https://www.logitycoon.com/eu1/index.php?a=garage_trailer&t=' + id, '_blank'));
        })

        if(windows.length > 0) {
            setInterval(() => {
                if(windows.every(w => w.closed)){
                    location.reload();
                }
            }, 500);
        } else {
            AutoRefresh(10000);
        }
    }

    Open();
})();
