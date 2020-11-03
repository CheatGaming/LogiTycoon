// ==UserScript==
// @name         Freight
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.logitycoon.com/eu1/index.php?a=freight&n=*
// @grant        none
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
        window.close();
    }

    if(a == '25 %'){
        freightautowhemployee();
        freightautotruck();
        freightstartdriving();
    }

    if(a == '38 %'){ //driving
        window.close();
    }

    if(a == '50 %'){
        freightstartunloading();
    }

    if(a == '63 %'){ //unloading
        window.close();
    }

    if(a == '75 %'){
        freightautowhemployee();
        freightstartfinishing();
    }

    if(a == '88 %'){
        window.close();
    }

    function CheckReady() {
        let ready_text = $('#ready').text();

        if(ready_text == '00:00:02') {
            location.reload(true);
        }
    }

    function AutoRefresh( t ) {
        setTimeout("location.reload(true);", t);
    }

    setInterval(CheckReady, 1000);
    AutoRefresh(10000);
})();
