// ==UserScript==
// @name         Freight
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.3
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=freight&n=*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Freight.js
// @require      https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/shared/Utils.js
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
        Utils.GoTo.warehouse();
    }

    if(a == '25 %'){
        freightautowhemployee();
        freightautotruck();
        freightstartdriving();
    }

    if(a == '38 %'){ //driving
        Utils.GoTo.warehouse();
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
        Utils.GoTo.warehouse();
    }

    function AcceptFreight(){
        let from = $('div.row.static-info:contains(Destination)').find('.value').text().trim();
        let type = $('div.row.static-info:contains(Type)').find('.value').text().trim();
        Utils.GoTo.trips({from: from, type: type});
    }

})();
