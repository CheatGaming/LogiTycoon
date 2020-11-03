// ==UserScript==
// @name         Tasks
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.logitycoon.com/eu1/index.php?a=tasks
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    window.open('https://www.logitycoon.com/eu1/index.php?a=garage', '_blank');
    window.open('https://www.logitycoon.com/eu1/index.php?a=fuelstation&f=10&p=1', '_blank');
    window.open('https://www.logitycoon.com/eu1/index.php?a=trips', '_blank');
    window.open('https://www.logitycoon.com/eu1/index.php?a=employees', '_blank');
    window.open('https://www.logitycoon.com/eu1/index.php?a=warehouse', '_blank');
})();
