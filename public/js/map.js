/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/map.js":
/*!***********************!*\
  !*** ./src/js/map.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function() {\r\n\r\n  const lat = document.querySelector('#lat').value || 13.3424296;\r\n  const lng = document.querySelector('#lng').value || -88.4408013;\r\n  const map = L.map('map').setView([lat, lng ], 16);\r\n  let marker\r\n\r\n  // Using Provider ang geocoder\r\n\r\n  const geocoderService = L.esri.Geocoding.geocodeService()\r\n\r\n  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {\r\n      attribution: '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors'\r\n  }).addTo(map);\r\n\r\n  // Add marker\r\n  marker = new L.marker([lat, lng], {\r\n    draggable: true,\r\n    autoPan: true\r\n  })\r\n  .addTo(map)\r\n\r\n  // Check moving marker\r\n  marker.on('moveend', function(event){\r\n    marker = event.target\r\n    const position = marker.getLatLng()\r\n    map.panTo(new L.latLng(position.lat, position.lng))\r\n\r\n    //Get street name\r\n    geocoderService.reverse().latlng(position, 13).run(function(error, result){\r\n      marker.bindPopup(result.address.LongLabel).openPopup()\r\n      document.querySelector('#streetLabel').textContent = result?.address?.Address ?? ''\r\n      document.querySelector('#street').defaultValue = result?.address?.Address ?? ''\r\n      document.querySelector('#lat').defaultValue = result?.latlng?.lat ?? ''\r\n      document.querySelector('#lng').defaultValue = result?.latlng?.lng?? ''\r\n    })\r\n  })\r\n\r\n  \r\n})()\n\n//# sourceURL=webpack://bienes-raices-mvc/./src/js/map.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/map.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;