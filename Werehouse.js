// ==UserScript==
// @name         Werehouse
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       CheatGaming
// @version      0.5
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=warehouse
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Werehouse.js
// ==/UserScript==

(function() {
    'use strict';
    let freights = [];
    let windows = [];

    window.onbeforeunload = function(event) {
        windows.forEach(w => w.close());
    }

    function OpenFreight(freight){
        if(freight.needsAction){
            window.location.href = 'https://www.logitycoon.com/eu1/index.php?a=freight&n=' + freight.id;
        }
    }
    function OpenFuelStation(){
        window.open('https://www.logitycoon.com/eu1/index.php?a=fuelstation', '_blank');
    }

    function Refresh() {
        location.reload(true);
    }

    function Process(){
        let arrived = freights.some(f => f.status === 'Arrived' && f.truckStatus === 'Trucks - Available');
        if(arrived){
            OpenFuelStation();
        }

        let freight = freights.find(f => f.needsAction);
        if(!!freight) {
            OpenFreight(freight);
        }

        if(windows.length){
            setInterval(()=>{
                if(windows.every(w => w.closed)){
                    Refresh();
                }
            }, 500);
        } else {
            setTimeout(Refresh, 10000);
        }
    }

    function GetStatus(){
        let actions = '|Accepted|Loaded|Arrived|Unloaded|';
        let pendingAction = '|Loading...|Driving...|Finishing...|';
        let truckStatuses = '|Trucks - Available|Truck - Selected|';
        let trailerStatuses = '|Trailers - Available|Trailer - Selected|';
        let employeeStatuses = '|Employees - Available|Employees - Selected|Managers - Available|Manager - Selected|Employees - All in use|';

        $('tbody>tr').each((i,e) => {
            let tr = $(e);
            let tds = tr.find('td');
            let status = {
                status: tds[2].innerText.trim()
            };

            let offset = 0;
            if(pendingAction.includes(status.status)){
                offset = 1;
            }

            status.from = tds[4+offset].innerText.trim();
            status.to = tds[5+offset].innerText.trim();
            status.truckStatus = $(tds[8+offset]).find('i').attr('title');
            status.trailerStatus = $(tds[9+offset]).find('i').attr('title');
            status.employeeStatus = $(tds[10+offset]).find('i').attr('title');
            status.id = $(e).attr('onclick').split("=")[3].split("'")[0];
            status.needsAction = actions.includes(status.status);

            if(!!status.truckStatus && status.needsAction && status.status !== 'Accepted'){
                status.needsAction = status.needsAction & truckStatuses.includes(status.truckStatus.trim());
            }
            if(!!status.trailerStatus && status.needsAction){
                status.needsAction = status.needsAction & trailerStatuses.includes(status.trailerStatus.trim());
            }
            if(!!status.employeeStatus && status.needsAction){
                status.needsAction = status.needsAction & employeeStatuses.includes(status.employeeStatus.trim());
            }

            freights.push(status);
        });
    }

    GetStatus();
    Process();

})();
