// ==UserScript==
// @name         Garage
// @namespace    https://github.com/CheatGaming/LogiTycoon/
// @author       TransportScripts
// @version      0.5
// @description  try to take over the world!
// @match        https://www.logitycoon.com/eu1/index.php?a=garage
// @grant GM_log
// @downloadURL  https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/Garage.js
// @require      https://raw.githubusercontent.com/CheatGaming/LogiTycoon/main/src/shared/Utils.js
// ==/UserScript==

(function () {
  "use strict";
  let trucks = [];
  let trailers = [];

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }

  function Open() {
    $(".mt-action-row").each((i, e) => {
      let isNothing = $(e)
        .find(".mt-action-desc")[0]
        .innerText.includes("Nothing");
      let isTruck = $(e)
        .find(".mt-action-author")[0]
        .innerText.includes("Truck");
      let isTrailer = $(e)
        .find(".mt-action-author")[0]
        .innerText.includes("Trailer");
      let id = $(e)
        .find("input[value=Information]")
        .attr("onclick")
        .split("=")[3]
        .split("'")[0];
      let percent = $(e).find("b:contains(%)")[0].innerText;

      if (isNothing && percent !== "100 %") {
        if (isTruck) {
          trucks.push(id);
        }
        if (isTrailer) {
          trailers.push(id);
        }
      }
    });

    trucks = trucks.filter(onlyUnique);
    trailers = trailers.filter(onlyUnique);

    console.log(trailers);
    // Loop through the trucks array
    trucks.forEach((truck) => {
      // Get the button with the matching value
      const button = document.querySelector(
        `button[name="repairtruck"][value="${truck}"]`
      );
      // Click the button
      button.click();
    });

    trailers.forEach((id) => {
      const repair = document.querySelector(
        `button[name="repairtrailer"][value="${id}"]`
      );
      repair.click();
    });

    setTimeout(function () {
      window.location.reload();
    }, 30000);
  }

  Open();
})();
