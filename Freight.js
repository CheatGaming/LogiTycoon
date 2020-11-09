// ==UserScript==
// @name         Freight
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.6
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=freight&n=*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Freight.js
// @require      https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    var a = $('a:contains(Progress)>span.badge-success').text();

    if(a == '0 %'){
        freightautowhemployee();
        freightautotrailer();
        freightstartloading();
        setTimeout(()=> Utils.GoTo.warehouse(), 50);
    }

    if(a == '13 %'){ //loading
        Utils.GoTo.warehouse();
    }

    if(a == '25 %'){
        freightautowhemployee();
        freightautotruck();
        freightstartdriving();
        setTimeout(()=> Utils.GoTo.warehouse(), 50);
    }

    if(a == '38 %'){ //driving
        Utils.GoTo.warehouse();
    }

    if(a == '40 %'){ //Out of Fuel
        freightcontinue();
        setTimeout(()=> Utils.GoTo.warehouse(), 50);
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
        setTimeout(()=> Utils.GoTo.warehouse(), 50);
    }

    if(a == '88 %'){
        Utils.GoTo.warehouse();
    }

    function AcceptFreight(){
        let from = $('div.row.static-info:contains(Destination)').find('.value').text().trim();
        let type = $('div.row.static-info:contains(Type)').find('.value').text().trim();

        Utils.GoTo.trips({from: from, type: type});
    }

    Utils.Refresh(10000);

})();
