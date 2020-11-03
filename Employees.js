// ==UserScript==
// @name         Employees
// @namespace    https://github.com/TransportScripts/TransportAutomation/
// @author       TransportScripts
// @version      0.1
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=employees
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/TransportScripts/TransportAutomation/main/Employees.js
// ==/UserScript==

(function() {
    'use strict';
    let employees = [];

    function OpenNewTab(id){
        window.open('https://www.logitycoon.com/eu1/index.php?a=employees_sleep&e=' + id, '_blank');
    }

    function AutoRefresh( t ) {
        setTimeout("location.reload(true);", t);
    }

    function ParseInnerText(t, percentIndex, actionIndex) {
        if(!!t){
            let split = t.split('\t');
            console.log(split);
            return {
                action: split[actionIndex],
                percent: split[percentIndex]
            };
        }
        return {};
    }

    function Sleep(employee){
        if(employee.action !== 'Nothing'){
            return;
        }
        if(employee.percent === '100 %'){
            return;
        }
        OpenNewTab(employee.id);
    }

    $($('table')[0]).children('tbody')
        .children('tr')
        .each((i,e) => {
        let status = ParseInnerText(e.innerText,4,6);
        employees.push({
            id: $(e).children('td').children('a').attr('href').split('=')[2],
            action: status.action,
            percent: status.percent
        });
    })

    $($('table')[1]).children('tbody')
        .children('tr')
        .each((i,e) => {
        let status = ParseInnerText(e.innerText,4,5);
        employees.push({
            id: $(e).children('td').children('a').attr('href').split('=')[2],
            action: status.action,
            percent: status.percent
        });
    })

    $($('table')[4]).children('tbody')
        .children('tr')
        .each((i,e) => {
        let status = ParseInnerText(e.innerText,3,4);
        employees.push({
            id: $(e).children('td').children('a').attr('href').split('=')[2],
            action: status.action,
            percent: status.percent
        });
    })

    employees.forEach(Sleep);

    AutoRefresh(11000);
})();
