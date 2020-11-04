// ==UserScript==
// @name         Werehouse
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       CheatGaming
// @version      0.2
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=warehouse
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Werehouse.js
// ==/UserScript==

(function() {
    'use strict';
    let freights = [];
    let windows = [];
    

    function OpenNewTab(freight){
        if(freight.needsAction){
            windows.push(window.open('https://www.logitycoon.com/eu1/index.php?a=freight&n=' + freight.id, '_blank'));
        }
    }

    function Refresh() {
        location.reload(true);
    }

    function Process(){
        freights.forEach(OpenNewTab);
        
        if(windows.length){
            setInterval(()=>{
                if(windows.every(w => w.closed){
                    Refresh();
                }
            }, 500);
        } else {
            setTimeout(Refresh, 15000);
        }
    }

    $('span:contains("Accepted")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Accepted',
            needsAction: true
        }));
    $('span:contains("Loading")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Loading',
            needsAction: false
        }));
    
    $('span:contains("Loaded")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Loaded',
            needsAction: true
        }));
    $('span:contains("Driving")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Driving',
            needsAction: false
        }));
    
    $('span:contains("Arrived")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Arrived',
            needsAction: true
        }));
    $('span:contains("Unloading")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Unloading',
            needsAction: false
        }));
    
    $('span:contains("Unloaded")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Unloaded',
            needsAction: true
        }));
    $('span:contains("Finishing")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'Unloaded',
            needsAction: false
        }));
    
    $('span:contains("Out of fuel")')
        .closest('tr')
        .each((i,e) => freights.push({
            id: $(e).attr('onclick').split("=")[3].split("'")[0],
            state: 'OutOfFuel',
            needsAction: true
        }));

    Process();
})();
