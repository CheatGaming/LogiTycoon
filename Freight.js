// ==UserScript==
// @name         Freight
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.2
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=freight&n=*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Freight.js
// ==/UserScript==

(function() {
    'use strict';
    var a = $('span.badge-success:eq(1)').text();

    if(a == '0 %'){
        freightautowhemployee();
        freightautotrailer();
        freightstartloading();
    }

    if(a == '13 %'){ //loading
        BackToWerehouse();
    }

    if(a == '25 %'){
        freightautowhemployee();
        freightautotruck();
        freightstartdriving();
    }

    if(a == '38 %'){ //driving
        BackToWerehouse();
    }

    if(a == '50 %'){
        freightstartunloading();
    }

    if(a == '63 %'){ //unloading
        AcceptFreight();
    }

    if(a == '75 %'){
        freightautowhemployee();
        freightstartfinishing();
    }

    if(a == '88 %'){
        BackToWerehouse();
    }

    function AcceptFreight(){
        let from = $('div.row.static-info:contains(Destination)').find('.value').text().trim();
        const tripsUrl = 'https://www.logitycoon.com/eu1/index.php?a=trips&from=';
        window.location.href = tripsUrl + from;
    }

    function BackToWerehouse(){
        window.location.href = 'https://www.logitycoon.com/eu1/index.php?a=warehouse';
    }

})();
