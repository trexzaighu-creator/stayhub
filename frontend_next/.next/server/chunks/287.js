exports.id = 287;
exports.ids = [287];
exports.modules = {

/***/ 9852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2165);





function Header() {
    const [token, setToken] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(null);
    const [showDropdown, setShowDropdown] = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const t = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_4__/* .getToken */ .LP)();
        setToken(t);
        if (t) {
            fetch(("http://127.0.0.1:8000" || 0) + "/api/me", {
                headers: {
                    Authorization: `Bearer ${t}`
                }
            }).then((r)=>r.json()).then((data)=>setUser(data)).catch(()=>{});
        }
    }, []);
    const isActive = (path)=>{
        return router.pathname === path;
    };
    const handleLogout = ()=>{
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setShowDropdown(false);
        router.push("/");
    };
    const navItemClass = (path)=>{
        return `relative transition-all duration-300 font-medium text-gray-700 dark:text-gray-300 ${isActive(path) ? "text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text dark:from-purple-400 dark:to-pink-400" : "hover:text-gray-900 dark:hover:text-gray-100"} after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-full after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 ${isActive(path) ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"}`;
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("header", {
        className: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-purple-200 dark:border-purple-900 shadow-lg sticky top-0 z-50",
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between",
            children: [
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: "/",
                    className: "flex items-center gap-3 group",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all",
                            children: "\uD83C\uDFE8"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                            className: "text-2xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent",
                            children: "StayHub"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
                    className: "flex items-center gap-8 flex-1 justify-end",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/",
                            className: navItemClass("/"),
                            children: "Home"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/hostels",
                            className: navItemClass("/hostels"),
                            children: "Hostels"
                        }),
                        token && user ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "flex items-center gap-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                                        onClick: ()=>setShowDropdown(!showDropdown),
                                        className: "flex items-center gap-2 hover:opacity-80 transition-all",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-sm flex-shrink-0 text-white font-bold shadow-md",
                                                children: user?.name?.charAt(0).toUpperCase()
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "hidden sm:inline text-gray-700 dark:text-gray-300",
                                                children: user?.name
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                                className: `w-4 h-4 text-gray-700 dark:text-gray-300 transition-transform ${showDropdown ? "rotate-180" : ""}`,
                                                fill: "none",
                                                stroke: "currentColor",
                                                viewBox: "0 0 24 24",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M19 14l-7 7m0 0l-7-7m7 7V3"
                                                })
                                            })
                                        ]
                                    }),
                                    showDropdown && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl border border-purple-200 dark:border-purple-900 overflow-hidden z-50",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/profile",
                                                className: "block px-4 py-3 hover:bg-purple-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium transition-colors border-b border-gray-200 dark:border-slate-700",
                                                children: "\uD83D\uDC64 My Profile"
                                            }),
                                            user?.role === "owner" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                                                href: "/owner/dashboard",
                                                className: "block px-4 py-3 hover:bg-purple-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 font-medium transition-colors border-b border-gray-200 dark:border-slate-700",
                                                children: "\uD83D\uDCCA Dashboard"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                                onClick: handleLogout,
                                                className: "w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 font-medium transition-colors",
                                                children: "\uD83D\uDEAA Logout"
                                            })
                                        ]
                                    })
                                ]
                            })
                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                            href: "/auth/login",
                            className: "px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all font-semibold shadow-lg hover:shadow-xl hover:shadow-purple-500/50",
                            children: "Login"
                        })
                    ]
                })
            ]
        })
    });
}


/***/ }),

/***/ 2165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LP: () => (/* binding */ getToken),
/* harmony export */   a$: () => (/* binding */ registerUser),
/* harmony export */   x4: () => (/* binding */ login)
/* harmony export */ });
/* unused harmony exports setToken, authHeaders */
const TOKEN_KEY = "hb_token";
const API_URL =  false ? 0 : "http://localhost:8000";
function setToken(token) {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    else localStorage.removeItem(TOKEN_KEY);
}
function getToken() {
    return  false ? 0 : null;
}
function authHeaders() {
    const t = getToken();
    return t ? {
        Authorization: `Bearer ${t}`
    } : {};
}
async function login(email, password) {
    const url = `${"http://127.0.0.1:8000" || 0}/api/auth/login`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
        if (!res.ok) {
            const errData = await res.json().catch(()=>({
                    detail: "Login failed"
                }));
            throw new Error(errData.detail || errData.error || "Login failed");
        }
        const data = await res.json();
        const token = data.access || data.token;
        if (token) setToken(token);
        return data;
    } catch (err) {
        console.error("Login error:", err);
        throw new Error(err.message || "Failed to connect to server. Please ensure the backend is running.");
    }
}
async function registerUser(payload) {
    const url = `${"http://127.0.0.1:8000" || 0}/api/auth/register`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        if (!res.ok) {
            const errData = await res.json().catch(()=>({
                    detail: "Registration failed"
                }));
            const errorMsg = errData.detail || errData.email?.[0] || errData.error || "Registration failed";
            throw new Error(errorMsg);
        }
        const data = await res.json();
        const token = data.access || data.token;
        if (token) setToken(token);
        return data;
    } catch (err) {
        console.error("Registration error:", err);
        throw new Error(err.message || "Failed to connect to server. Please ensure the backend is running.");
    }
}


/***/ }),

/***/ 4178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5893);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9637);
/* harmony import */ var leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(leaflet_dist_leaflet_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6764);
/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);



function App({ Component, pageProps }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Component, {
        ...pageProps
    });
}


/***/ }),

/***/ 6764:
/***/ (() => {



/***/ })

};
;