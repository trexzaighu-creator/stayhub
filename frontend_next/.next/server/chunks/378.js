"use strict";
exports.id = 378;
exports.ids = [378];
exports.modules = {

/***/ 2472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ FavoriteButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function FavoriteButton({ hostelId }) {
    const [isFav, setIsFav] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setIsFav(favs.includes(hostelId));
    }, [
        hostelId
    ]);
    const toggle = ()=>{
        const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (isFav) {
            const idx = favs.indexOf(hostelId);
            favs.splice(idx, 1);
        } else {
            favs.push(hostelId);
        }
        localStorage.setItem("favorites", JSON.stringify(favs));
        setIsFav(!isFav);
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        onClick: toggle,
        className: "text-2xl transition-smooth hover:scale-125",
        children: isFav ? "❤️" : "\uD83E\uDD0D"
    });
}


/***/ }),

/***/ 4452:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ ImageCarousel)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function ImageCarousel({ images = [] }) {
    const [index, setIndex] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
    const display = images.length ? images[index] : "/placeholder.jpg";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "w-full",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "overflow-hidden rounded-md",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                    src: display,
                    alt: "hostel",
                    className: "thumbnail w-full"
                })
            }),
            images.length > 1 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "flex gap-2 mt-2",
                children: images.slice(0, 5).map((img, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                        onClick: ()=>setIndex(i),
                        className: `w-16 h-10 rounded-sm overflow-hidden border ${i === index ? "border-indigo-500" : "border-gray-200"}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                            src: img,
                            alt: `thumb-${i}`,
                            className: "w-full h-full object-cover"
                        })
                    }, i))
            })
        ]
    });
}


/***/ }),

/***/ 568:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Rating)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);

function Rating({ value = 4.2 }) {
    const full = Math.floor(value);
    const half = value - full >= 0.5;
    const stars = Array.from({
        length: 5
    }).map((_, i)=>{
        if (i < full) return "full";
        if (i === full && half) return "half";
        return "empty";
    });
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center gap-1 text-sm text-yellow-500",
        children: [
            stars.map((s, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                    className: "leading-none",
                    children: s === "full" ? "★" : s === "half" ? "☆" : "☆"
                }, i)),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "ml-2 text-xs text-gray-600",
                children: value.toFixed(1)
            })
        ]
    });
}


/***/ })

};
;