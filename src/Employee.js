// ==UserScript==
// @name         Employee
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.3
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=employees_select&e=*
// @match        https://www.logitycoon.com/eu1/index.php?a=employees_sleep&e=*
// @grant        GM_log
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Employee.js
// ==/UserScript==

(function () {
  "use strict";

  function script() {
    const sleep = document.querySelector(`button[onclick="employeesleep()"]`);

    if (sleep === null) {
      window.close();
    } else {
      sleep.click();
    }
  }

  script();
})();
