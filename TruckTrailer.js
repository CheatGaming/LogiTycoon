// ==UserScript==
// @name         Truck/Trailer
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.logitycoon.com/eu1/index.php?a=garage_truck&t=*
// @match        https://www.logitycoon.com/eu1/index.php?a=garage_trailer&t=*
// @match        https://www.logitycoon.com/eu1/index.php?a=garage_truck_ftlock
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let close = true;

    function IntallParts(){
        let nav = $('button[name=navinstall]');
        if(nav.length > 0){
            close = false;
            nav.click();
        }
        let lock = $('button[name=ftlinstall]');
        if(lock.length > 0){
            close = false;
            lock.click();
        }
    }

    function Repair(){
        let repairTruck = $('button[name=repairtruck]');
        if(repairTruck.length > 0 && !!!repairTruck.attr('disabled')){
            close = false;
            repairTruck.click();
        }

        let repairTrailer = $('button[name=repairtrailer]');
        if(repairTrailer.length > 0 && !!!repairTrailer.attr('disabled')){
            close = false;
            repairTrailer.click();
        }
    }

    Repair();
    IntallParts();

    if(close){
        window.close();
    }
})();
