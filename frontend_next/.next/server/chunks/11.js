"use strict";
exports.id = 11;
exports.ids = [11];
exports.modules = {

/***/ 4011:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AY: () => (/* binding */ getHostels),
/* harmony export */   BX: () => (/* binding */ createHostel),
/* harmony export */   bM: () => (/* binding */ getOwnerHostels)
/* harmony export */ });
/* unused harmony exports fetcher, createCheckoutSession */
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2165);
const API_BASE = ("http://127.0.0.1:8000" || 0) + "/api";

async function fetcher(url, options = {}) {
    const token = (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .getToken */ .LP)();
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const res = await fetch(`${API_BASE}${url}`, {
        headers,
        ...options
    });
    if (!res.ok) {
        const body = await res.text().catch(()=>"");
        let info = body;
        try {
            info = JSON.parse(body);
        } catch  {}
        throw new Error(typeof info === "object" ? info.detail || info.error || JSON.stringify(info) : info || res.statusText);
    }
    return res.json();
}
async function getHostels(city) {
    const qs = city ? `?city=${encodeURIComponent(city)}` : "";
    return fetcher(`/hostels${qs}`);
}
async function getOwnerHostels() {
    return fetcher("/owner/hostels");
}
async function createHostel(data) {
    return fetcher("/owner/hostels", {
        method: "POST",
        body: JSON.stringify(data)
    });
}
async function createCheckoutSession(payload) {
    return fetcher("/create-checkout-session", {
        method: "POST",
        body: JSON.stringify(payload)
    });
}


/***/ })

};
;