// ==UserScript==
// @name         Warehouse
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       CheatGaming
// @version      0.12
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=warehouse
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Warehouse.js
// @require      https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/src/shared/Utils.js
// ==/UserScript==

(function() {
    'use strict';
    let freights = [];

    function Process(){
//         window.opener.AddAction(freights);

        let freight = freights.find(f => f.needsAction);

        if(!!freight && freight.needsAction) {
            Utils.GoTo.freight(freight.id);
        }

        if(Utils.Status.windows.length){
            setInterval(()=>{
                if(Utils.Status.windows.every(w => w.closed)){
                    Utils.Refresh();
                }
            }, 500);
        } else {
            Utils.Refresh(10000);
        }
    }

    function GetStatus(){
        let actions = '|Accepted|Loaded|Arrived|Unloaded|Out of Fuel...|';
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
