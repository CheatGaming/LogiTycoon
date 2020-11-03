// ==UserScript==
// @name         Garage
// @namespace    https://github.com/TransportScripts/TransportAutomation/
// @author       TransportScripts
// @version      0.2
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=garage
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/TransportScripts/TransportAutomation/main/Garage.js
// ==/UserScript==

(function() {
    'use strict';
    let trucks = [];
    let trailers = [];

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

//         $($('.mt-actions')[0]).find('input[value=Information]').each((i,e)=> {
//             trucks.push($(e).attr('onclick').split('=')[3].split("'")[0])
//         });

//         $($('.mt-actions')[1]).find('input[value=Information]').each((i,e)=> {
//             trailers.push($(e).attr('onclick').split('=')[3].split("'")[0])
//         });

        trucks = trucks.filter(onlyUnique);
        trailers = trailers.filter(onlyUnique);

        trucks.forEach(id => {
            window.open('https://www.logitycoon.com/eu1/index.php?a=garage_truck&t=' + id, '_blank');
        })

        trailers.forEach(id => {
            window.open('https://www.logitycoon.com/eu1/index.php?a=garage_trailer&t=' + id, '_blank');
        })

        window.close();
    }

//     function AutoRefresh( t ) {
//         setTimeout("location.reload(true);", t);
//     }
//     AutoRefresh(10000);

    Open();

})();
