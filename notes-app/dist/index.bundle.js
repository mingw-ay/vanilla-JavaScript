/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://notes-app/./src/css/style.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("__webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\r\n__webpack_require__(/*! ./index.html?raw */ \"./src/index.html?raw\");\r\n\r\n/* 拿到按钮 */\r\ndocument.addEventListener(\"DOMContentLoaded\", () => {\r\n    const container = document.querySelector(\".container\");\r\n    const addButton = document.querySelector(\".add-btn\");\r\n    addButton.addEventListener(\"click\", () => {\r\n        addNote(container);\r\n    });\r\n    /* 添加另外两个按钮的事件处理程序，添加到document对象上 */\r\n    document.addEventListener(\"click\", (e) => handleClick(e, container));\r\n});\r\n\r\n/* 点击按钮添加一个note组件 */\r\nfunction addNote(container) {\r\n    const noteDiv = document.createElement(\"div\");\r\n    noteDiv.classList.add(\"note-div\");\r\n    noteDiv.innerHTML = `\r\n        <div class=\"note-header\">\r\n            <div class=\"write\">\r\n                <i class=\"fa fa-pencil-square-o\" aria-hidden=\"true\"></i>\r\n            </div>\r\n            <div class=\"remove\">\r\n                <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\r\n            </div>\r\n        </div>\r\n        <div class=\"note-body write-mode\">\r\n            <p class=\"text\"></p>\r\n            <textarea class=\"note-text\" cols=\"30\" rows=\"10\"> </textarea>\r\n        </div>`;\r\n    container.appendChild(noteDiv);\r\n    /* 焦点放在新创建的位置 */\r\n    noteDiv.getElementsByClassName(\"note-text\")[0].focus();\r\n}\r\n\r\n// 点击两个按钮的事件处理程序\r\nfunction handleClick(e, container) {\r\n    const target = e.target;\r\n    /* 如果是点击了write按钮 */\r\n    if (\r\n        target.classList.contains(\"write\") ||\r\n        target.classList.contains(\"fa-pencil-square-o\")\r\n    ) {\r\n        /* 拿到所要处理结点note-body */\r\n        let noteHeader = target.parentNode;\r\n        while (!noteHeader.classList.contains(\"note-header\")) {\r\n            noteHeader = noteHeader.parentNode;\r\n        }\r\n        const noteBody = noteHeader.nextElementSibling;\r\n        noteBody.classList.toggle(\"write-mode\");\r\n        if (!noteBody.classList.contains(\"write-mode\")) {\r\n            noteBody.firstElementChild.innerText =\r\n                noteBody.lastElementChild.value;\r\n        } else {\r\n            noteBody.lastElementChild.focus();\r\n        }\r\n    } else if (\r\n        target.classList.contains(\"remove\") ||\r\n        target.classList.contains(\"fa-times\")\r\n    ) {\r\n        let noteDiv = target.parentNode;\r\n        while (!noteDiv.classList.contains(\"note-div\")) {\r\n            noteDiv = noteDiv.parentNode;\r\n        }\r\n        console.log(noteDiv, noteDiv.parentNode);\r\n        container.removeChild(noteDiv);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://notes-app/./src/index.js?");

/***/ }),

/***/ "./src/index.html?raw":
/*!****************************!*\
  !*** ./src/index.html?raw ***!
  \****************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"<!DOCTYPE html>\\r\\n<html lang=\\\"en\\\">\\r\\n    <head>\\r\\n        <meta charset=\\\"UTF-8\\\" />\\r\\n        <meta http-equiv=\\\"X-UA-Compatible\\\" content=\\\"IE=edge\\\" />\\r\\n        <meta name=\\\"viewport\\\" content=\\\"width=device-width, initial-scale=1.0\\\" />\\r\\n        <link\\r\\n            rel=\\\"stylesheet\\\"\\r\\n            href=\\\"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css\\\"\\r\\n            integrity=\\\"sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw==\\\"\\r\\n            crossorigin=\\\"anonymous\\\"\\r\\n            referrerpolicy=\\\"no-referrer\\\"\\r\\n        />\\r\\n        <title>Notes App</title>\\r\\n    </head>\\r\\n    <body>\\r\\n        <div class=\\\"btn add-btn\\\">\\r\\n            <i class=\\\"fa fa-plus\\\" aria-hidden=\\\"true\\\"></i> Write\\r\\n        </div>\\r\\n        <div class=\\\"container\\\"></div>\\r\\n    </body>\\r\\n</html>\\r\\n\";\n\n//# sourceURL=webpack://notes-app/./src/index.html?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;