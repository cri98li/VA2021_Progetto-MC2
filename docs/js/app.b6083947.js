(function (t) {
    function e(e) {
        for (var n, o, s = e[0], l = e[1], c = e[2], d = 0, p = []; d < s.length; d++) o = s[d], Object.prototype.hasOwnProperty.call(a, o) && a[o] && p.push(a[o][0]), a[o] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (t[n] = l[n]);
        u && u(e);
        while (p.length) p.shift()();
        return i.push.apply(i, c || []), r()
    }

    function r() {
        for (var t, e = 0; e < i.length; e++) {
            for (var r = i[e], n = !0, s = 1; s < r.length; s++) {
                var l = r[s];
                0 !== a[l] && (n = !1)
            }
            n && (i.splice(e--, 1), t = o(o.s = r[0]))
        }
        return t
    }

    var n = {}, a = {app: 0}, i = [];

    function o(e) {
        if (n[e]) return n[e].exports;
        var r = n[e] = {i: e, l: !1, exports: {}};
        return t[e].call(r.exports, r, r.exports, o), r.l = !0, r.exports
    }

    o.m = t, o.c = n, o.d = function (t, e, r) {
        o.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: r})
    }, o.r = function (t) {
        "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, o.t = function (t, e) {
        if (1 & e && (t = o(t)), 8 & e) return t;
        if (4 & e && "object" === typeof t && t && t.__esModule) return t;
        var r = Object.create(null);
        if (o.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var n in t) o.d(r, n, function (e) {
            return t[e]
        }.bind(null, n));
        return r
    }, o.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t["default"]
        } : function () {
            return t
        };
        return o.d(e, "a", e), e
    }, o.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, o.p = "/VA2021_Progetto-MC2/";
    var s = window["webpackJsonp"] = window["webpackJsonp"] || [], l = s.push.bind(s);
    s.push = e, s = s.slice();
    for (var c = 0; c < s.length; c++) e(s[c]);
    var u = l;
    i.push([0, "chunk-vendors"]), r()
})({
    0: function (t, e, r) {
        t.exports = r("56d7")
    }, "034f": function (t, e, r) {
        "use strict";
        r("85ec")
    }, "03db": function (t, e, r) {
    }, 5313: function (t, e, r) {
        "use strict";
        r("6617")
    }, 5490: function (t, e, r) {
        "use strict";
        r("a6b6")
    }, "56d7": function (t, e, r) {
        "use strict";
        r.r(e);
        r("e260"), r("e6cf"), r("cca6"), r("a79d");
        var n = r("2b0e"), a = function () {
                var t = this, e = t.$createElement, r = t._self._c || e;
                return r("div", {attrs: {id: "app"}}, [r("b-navbar", {
                    staticClass: "shadow",
                    attrs: {type: "dark", variant: "primary"}
                }, [r("b-navbar-brand", [t._v("VAST 2014 - mc2")]), r("b-collapse", {
                    attrs: {
                        id: "nav-text-collapse",
                        "is-nav": ""
                    }
                }, [r("b-navbar-nav", [r("b-nav-text", [t._v("Cristiano Landi")])], 1)], 1)], 1), r("b-overlay", {attrs: {show: 0 != t.loading}}, [r("b-container", {
                    staticStyle: {"padding-bottom": "200px"},
                    attrs: {fluid: "xl"}
                }, [r("b-row", [r("b-col", {
                    staticClass: "xl-no-padding",
                    staticStyle: {"text-align": "center"},
                    attrs: {xl: "8"}
                }, [r("Map", {attrs: {featureCollection: t.pointCollection}})], 1), r("b-col", {
                    staticClass: "xl-no-padding",
                    attrs: {xl: "4"}
                }, [r("idSelector", {
                    attrs: {colorSet: t.colorbrewer_colors}, on: {
                        changeCars: function (e) {
                            return t.updateCar(e)
                        }
                    }
                })], 1)], 1), r("b-row", [r("b-col", {attrs: {cols: "12"}}, [r("TimeControls", {
                    attrs: {
                        ts: t.ts,
                        carColors: t.usersColor
                    }, on: {
                        changeTime: function (e) {
                            return t.updateDate(e)
                        }
                    }
                })], 1)], 1), r("b-row", [r("b-col", {attrs: {cols: "12"}}, [r("h4", [t._v("Transazioni")]), r("MySunburst", {
                    staticStyle: {height: "400px"},
                    attrs: {"users-color": t.usersColor, "time-controls": t.TimeControls, colors: t.colorbrewer_colors}
                })], 1)], 1)], 1)], 1)], 1)
            }, i = [],
            o = (r("d3b7"), r("d81d"), r("159b"), r("caad"), r("2532"), r("4de4"), r("a630"), r("3ca3"), function () {
                var t = this, e = t.$createElement, r = t._self._c || e;
                return r("b-overlay", {attrs: {show: t.loading}}, [r("b-form-group", [r("h4", [t._v("Seleziona una persona")]), r("div", {attrs: {id: "carList"}}, [r("vue-good-table", {
                    ref: "ids",
                    staticClass: "table",
                    attrs: {
                        "select-mode": "multi",
                        rows: t.carIds,
                        columns: t.fields,
                        "fixed-header": !0,
                        "compact-mode": "",
                        "sort-options": {enabled: !0, initialSortBy: {field: "name", type: "asc"}},
                        "select-options": {enabled: !0, disableSelectInfo: !0},
                        "search-options": {enabled: !0},
                        "group-options": {enabled: !0, headerPosition: "top"}
                    },
                    on: {"on-selected-rows-change": t.onRowSelected},
                    scopedSlots: t._u([{
                        key: "table-row", fn: function (e) {
                            return ["color" == e.column.field ? r("span", {staticClass: "wrap"}, [r("span", [r("div", {
                                staticClass: "colorPicker",
                                style: {background: e.formattedRow[e.column.field]}
                            })])]) : r("span", [t._v(" " + t._s(e.formattedRow[e.column.field]) + " ")])]
                        }
                    }])
                })], 1)])], 1)
            }), s = [], l = r("5698"), c = {
                name: "idSelector", props: {
                    colorSet: {
                        type: Array, default: function () {
                            return ["red"]
                        }
                    }
                }, data: function () {
                    return {
                        carIds: [{
                            type: "Loading",
                            children: [{value: 0, name: "Loading", title: "Loading", color: "red"}]
                        }],
                        loading: !0,
                        fields: [{label: "Nome", field: "name"}, {label: "Mansione", field: "title"}, {
                            label: "",
                            field: "color",
                            sortable: !1,
                            globalSearchDisabled: !0
                        }]
                    }
                }, mounted: function () {
                    var t = this;
                    l.csv("/VA2021_Progetto-MC2/nomi.csv").then((function (e) {
                        t.carIds = [];
                        var r = 0, n = {};
                        e.forEach((function (e) {
                            var a = parseInt(e.id), i = e.LastName + " " + e.FirstName, o = e.CurrentEmploymentTitle,
                                s = e.CurrentEmploymentType;
                            "" == o && (o = "Sconosciuto"), "" == s && (s = "Nessuna auto assegnata"), "" == e.LastName && (i = "Sconosciuto", o = "", s = "Auto noleggiate a sconosciuti");
                            var l = {value: a, name: i, title: o, color: t.colorSet[a % t.colorSet.length]};
                            if (void 0 != n[s]) t.carIds[n[s]].children.push(l); else {
                                n[s] = r++;
                                var c = [l];
                                t.carIds[n[s]] = {name: s}, t.carIds[n[s]].children = c
                            }
                        })), t.loading = !1
                    }))
                }, watch: {}, methods: {
                    onRowSelected: function (t) {
                        var e = t.selectedRows.map((function (t) {
                            return t.value
                        })).filter((function (t) {
                            return null != t
                        }));
                        this.$emit("changeCars", e)
                    }
                }
            }, u = c, d = (r("5313"), r("2877")), p = Object(d["a"])(u, o, s, !1, null, "178f6c18", null), m = p.exports,
            h = r("ff3e"), f = r.n(h), g = r("6fda"), b = r.n(g), v = function () {
                var t = this, e = t.$createElement, r = t._self._c || e;
                return r("b-overlay", {attrs: {show: t.loading}}, [r("svg", {
                    staticClass: "map",
                    attrs: {width: "100%", viewBox: "0 0 730 500", preserveAspectRatio: "xMidYMid meet"}
                }, [r("image", {attrs: {href: "MC2-tourist.jpg", height: "500", width: "100%"}}), r("g", {
                    ref: "abila",
                    staticClass: "abila"
                }), r("g", {ref: "routes", staticClass: "routes"})])])
            }, y = [], T = r("5698");

        function w() {
            var t = T.geoEquirectangular(), e = 48e4, r = [24.8673, 36.070512], n = "id", a = "color", i = 730, o = 500;

            function s(s) {
                t = T.geoEquirectangular().scale(e).center(r).translate([i / 2, o / 2]);
                var l = T.geoPath().projection(t), c = s.selectAll("path").data(s.datum().features);
                c.exit().remove(), c.enter().append("path"), s.selectAll("path").attr("class", (function (t) {
                    return t.properties[n] ? "_" + t.properties[n] : "none"
                })).attr("stroke", (function (t) {
                    return t.properties[a] ? t.properties[a] : "none"
                })).attr("d", l)
            }

            return s.projection = function (e) {
                return arguments.length ? (t = e, s) : t
            }, s.scale = function (r) {
                return arguments.length ? (e = r, t.scale(e), s) : e
            }, s.center = function (e) {
                return arguments.length ? (r = e, t.center(r), s) : r
            }, s.height = function (t) {
                return arguments.length ? (o = t, s) : o
            }, s.width = function (t) {
                return arguments.length ? (i = t, s) : i
            }, s.featureClass = function (t) {
                return arguments.length ? (n = t, s) : n
            }, s.colorClass = function (t) {
                return arguments.length ? (a = t, s) : a
            }, s
        }

        var S = w().featureClass("id"), C = r("5698"), x = {
            name: "Map", props: {
                featureCollection: {
                    type: Object, default: function () {
                        return {
                            type: "FeatureCollection",
                            features: [{
                                type: "Feature",
                                properties: {color: "red"},
                                geometry: {type: "LineString", coordinates: [[0, 0], [1, 1]]}
                            }]
                        }
                    }
                }
            }, data: function () {
                return {loading: !0}
            }, mounted: function () {
                var t = C.select(this.$refs.abila), e = C.select(this.$refs.routes);
                C.json("/VA2021_Progetto-MC2/Abila_geo.json").then((function (e) {
                    t.datum(e).call(S)
                })), e.datum(this.featureCollection).call(S), this.loading = !1
            }, methods: {}, watch: {
                featureCollection: function (t) {
                    this.loading = !0;
                    var e = C.select(this.$refs.routes);
                    e.datum(t).call(S), this.loading = !1
                }
            }
        }, _ = x, O = (r("5490"), Object(d["a"])(_, v, y, !1, null, null, null)), D = O.exports, j = function () {
            var t = this, e = t.$createElement, r = t._self._c || e;
            return r("b-overlay", {attrs: {show: t.loading}}, [r("b-form-group", [r("h4", [t._v("Impostazioni temporali")]), r("b-row", {attrs: {"align-v": "center"}}, [r("b-col", {attrs: {cols: "2"}}, [r("label", [t._v("Seleziona un giorno:")])]), r("b-col", [r("b-form-datepicker", {
                attrs: {
                    id: "datepicker",
                    min: "2014-01-06",
                    max: "2014-01-19",
                    locale: "it"
                }, model: {
                    value: t.pickedDate, callback: function (e) {
                        t.pickedDate = e
                    }, expression: "pickedDate"
                }
            })], 1), r("b-col", {attrs: {cols: "2"}}, [r("div", [t._v(t._s(t.datePrettyPrint(t.pickedDate)))])])], 1), r("b-row", {attrs: {"align-v": "center"}}, [r("b-col", {attrs: {cols: "2"}}, [r("label", [t._v("Seleziona un intervallo orario:")])]), r("b-col", [r("rangeSelector", {
                attrs: {
                    "curr-time": t.currTime,
                    timestamps: t.ts,
                    playState: t.playState,
                    carColors: t.carColors
                }, on: {
                    changeTime: function (e) {
                        return t.updateTime(e)
                    }
                }
            })], 1), r("b-col", {attrs: {cols: "2"}}, [r("div", [t._v(t._s(t.timePrettyPrint(t.start))), r("br"), t._v(t._s(t.timePrettyPrint(t.stop)))])])], 1), r("b-row", {attrs: {"align-v": "center"}}, [r("b-col", {
                attrs: {
                    cols: "2",
                    offset: "5"
                }
            }, [r("b-button-group", [r("b-button", {
                attrs: {variant: "outline-primary"}, on: {
                    click: function (e) {
                        return t.slower()
                    }
                }
            }, [r("b-icon", {attrs: {icon: "skip-start"}})], 1), r("b-button", {
                attrs: {
                    pressed: t.playState,
                    variant: "outline-primary"
                }, on: {
                    "update:pressed": function (e) {
                        t.playState = e
                    }
                }
            }, [r("b-icon", {attrs: {hidden: t.playState, icon: "play"}}), r("b-icon", {
                attrs: {
                    hidden: !t.playState,
                    icon: "stop"
                }
            })], 1), r("b-button", {
                attrs: {variant: "outline-primary"}, on: {
                    click: function (e) {
                        return t.faster()
                    }
                }
            }, [r("b-icon", {attrs: {icon: "skip-end"}})], 1)], 1)], 1), r("b-col", {
                attrs: {
                    offset: "3",
                    cols: "2"
                }
            }, [t._v(" " + t._s(t.timePrettyPrint(t.currTime)) + " "), r("br"), t._v(" x" + t._s(t.playSpeed) + " ")])], 1)], 1)], 1)
        }, k = [], M = (r("a9e3"), function () {
            var t = this, e = t.$createElement, r = t._self._c || e;
            return r("svg", {
                ref: "rangeSelector",
                staticClass: "rangeSelector",
                attrs: {width: "100%", height: "70px"}
            })
        }), $ = [], z = (r("ddb0"), r("5698"));

        function P() {
            var t, e = arguments, r = z.dispatch("interval"), n = 17, a = null, i = z.scaleUtc(), o = z.scaleLinear(),
                s = z.brushX().on("end", l);

            function l(t) {
                if (t.selection) {
                    var e = t.selection.map((function (t) {
                        return i.invert(t).getTime()
                    }));
                    r.call("interval", this, e)
                } else r.call("interval", this, [i.invert(0).getTime(), i.invert(a.width).getTime()])
            }

            function c(e) {
                t = e;
                var r = e.datum();
                a = e.node().getBoundingClientRect(), i = i.domain([r.min, r.max]).range([0, a.width]);
                var l = (a.height - n) / r.values.length;
                if (e.selectAll("rect").remove(), e.selectAll("text.nots").remove(), 0 == r.values.length) {
                    var c = e.selectAll("text.nots").data([0]);
                    c.enter().append("text").attr("class", "nots").attr("x", a.width / 2).attr("y", n).attr("height", a.height - n).attr("fill", "red").text("Nessun segnale gps disponibile").attr("dy", "1em").style("font-size", "18px").transition().duration(500)
                }
                for (var u = function (t) {
                    for (var i = [], s = 0, c = r.min; c < r.max; c += r.step) i[s++] = 0;
                    var u = 0;
                    r.values[t].ts.forEach((function (t) {
                        var e = parseInt((t - r.min) / r.step);
                        i[e]++, i[e] > u && (u = i[e])
                    }));
                    var d = a.width / i.length;
                    o.domain([0, u]).range(["white", r.colors[r.values[t].id]]);
                    var p = e.selectAll("rect" + r.values[t].id).data(i);
                    p.enter().append("rect").attr("class", "rect" + r.values[t].id).attr("x", (function (t, e) {
                        return e * d
                    })).attr("y", t * l + n).attr("width", d).attr("height", l).attr("fill", "white").transition().duration(500).attr("fill", o)
                }, d = 0; d < r.values.length; d++) u(d);
                t.call(s);
                var p = z.axisBottom().scale(i).tickFormat(z.utcFormat("%H:%M")), m = e.selectAll("g.axis").data([0]);
                m.append("g").attr("class", "axis").merge(e).call(p), e.select("g.axis").raise()
            }

            return c.on = function (t, e) {
                return r.on(t, e), c
            }, c.paddingTop = function (t) {
                return e.length ? (n = t, c) : n
            }, c.timeScaler = function (t) {
                return e.length ? (i = t, c) : i
            }, c.colorScaler = function (t) {
                return e.length ? (o = t, c) : o
            }, c.updateCircle = function (e) {
                return t.selectAll("circle").remove(), null != e && t.append("circle").attr("cx", i(e)).attr("cy", (a.height + n) / 2).attr("r", 2).attr("fill", "red"), c
            }, c.clearBrush = function () {
                return s.clear(t), c
            }, c
        }

        var q, G, I, N, A, E, W, F = P(), H = r("5698"), L = {
                name: "rangeSelector", created: function () {
                    window.addEventListener("resize", this.pageResize)
                }, destroyed: function () {
                    window.removeEventListener("resize", this.pageResize)
                }, props: {
                    timestamps: {
                        type: Array, default: function () {
                            return []
                        }
                    }, currTime: {
                        type: Number, default: function () {
                            return 0
                        }
                    }, playState: {
                        type: Boolean, default: function () {
                            return !1
                        }
                    }, carColors: {
                        type: Object, default: function () {
                            return {1: "red", 2: "blue"}
                        }
                    }
                }, data: function () {
                    return {min: 0, max: 864e5, step: 6e5}
                }, mounted: function () {
                    var t = this;
                    H.select(this.$refs.rangeSelector).datum(this.makeConfig()).call(F), F.on("interval", (function (e) {
                        t.$emit("changeTime", {start: e[0], stop: e[1]})
                    }))
                }, methods: {
                    makeConfig: function () {
                        var t = this;
                        return {
                            values: this.timestamps.map((function (e) {
                                return {
                                    id: e.id, ts: e.timestamp.map((function (e) {
                                        return e % t.max
                                    }))
                                }
                            })), min: this.min, max: this.max, step: this.step, colors: this.carColors
                        }
                    }, pageResize: function () {
                        H.select(this.$refs.rangeSelector).call(F)
                    }
                }, watch: {
                    timestamps: {
                        handler: function () {
                            H.select(this.$refs.rangeSelector).datum(this.makeConfig()).call(F), F.clearBrush()
                        }
                    }, currTime: {
                        handler: function (t) {
                            this.playState ? F.updateCircle(t % this.max) : F.updateCircle(null)
                        }
                    }
                }
            }, R = L, B = (r("ac24"), Object(d["a"])(R, M, $, !1, null, "5f476b56", null)), J = B.exports, U = {
                name: "TimeControls",
                components: {RangeSelector: J},
                props: {
                    mapTimeStart: {type: Number, default: new Date("2014-01-06 00:00:00 GMT").getTime()},
                    mapTimeStop: {type: Number, default: new Date("2014-01-06 23:59:59 GMT").getTime()},
                    ts: {
                        type: Array, required: !0, default: function () {
                            return []
                        }
                    },
                    carColors: {
                        type: Object, default: function () {
                        }
                    }
                },
                data: function () {
                    return {
                        pickedDate: "2014-01-06",
                        start: new Date("2014-01-06 00:00:00 GMT").getTime(),
                        stop: new Date("2014-01-06 23:59:59 GMT").getTime(),
                        playSpeed: 8,
                        playState: !1,
                        currTime: new Date("2014-01-06 00:00:00 GMT").getTime(),
                        loading: !0
                    }
                },
                mounted: function () {
                    this.loading = !1
                },
                computed: {},
                methods: {
                    updateTime: function (t) {
                        var e = new Date(this.pickedDate).getTime();
                        this.start = t.start + e, this.stop = t.stop + e, this.currTime = this.start, this.playState = !1, this.$emit("changeTime", {
                            start: this.start,
                            stop: this.stop,
                            day: null,
                            playState: this.playState
                        })
                    }, datePrettyPrint: function (t) {
                        return t
                    }, timePrettyPrint: function (t) {
                        var e = new Date(parseInt(t));
                        return e.toLocaleTimeString(["it"], {timeZone: "GMT", hour: "2-digit", minute: "2-digit"})
                    }, animate: function (t, e) {
                        var r = this;
                        if (t > e || !this.playState) return this.playState = !1, void (this.currTime = this.start);
                        this.currTime = t + 6e4, this.$emit("changeTime", {
                            start: t,
                            stop: this.currTime,
                            day: null,
                            playState: this.playState
                        }), setTimeout((function () {
                            r.animate(t + 1e3 * r.playSpeed, e)
                        }), 1e3 / 30)
                    }, slower: function () {
                        this.playSpeed /= 2
                    }, faster: function () {
                        this.playSpeed *= 2
                    }
                },
                watch: {
                    playState: {
                        handler: function (t) {
                            t || this.$emit("changeTime", {
                                start: this.start,
                                stop: this.stop,
                                day: null,
                                playState: this.playState
                            }), this.animate(parseInt(this.currTime), parseInt(this.stop))
                        }
                    }, pickedDate: {
                        handler: function (t) {
                            this.start = new Date(t + " 00:00:00 GMT").getTime(), this.stop = new Date(t + " 23:59:59 GMT").getTime(), this.$emit("changeTime", {
                                start: this.start,
                                stop: this.stop,
                                day: this.start,
                                playState: this.playState
                            })
                        }
                    }
                }
            }, K = U, V = Object(d["a"])(K, j, k, !1, null, "301bb682", null), X = V.exports, Y = function () {
                var t = this, e = t.$createElement, r = t._self._c || e;
                return r("sunburst", {
                    staticClass: "sunburst",
                    attrs: {data: t.data, colorScale: t.colorScale},
                    scopedSlots: t._u([{
                        key: "legend", fn: function (t) {
                            var e = t.nodes, n = t.colorGetter, a = t.width;
                            return r("myBreadcrumbTrail", {
                                attrs: {
                                    current: e.mouseOver,
                                    root: e.root,
                                    colorGetter: n,
                                    from: e.clicked,
                                    width: a,
                                    itemWidth: 150
                                }
                            })
                        }
                    }, {
                        key: "default", fn: function (e) {
                            var n = e.on, a = e.actions;
                            return [r("highlightOnHover", t._b({}, "highlightOnHover", {
                                on: n,
                                actions: a
                            }, !1)), r("zoomOnClick", t._b({}, "zoomOnClick", {on: n, actions: a}, !1))]
                        }
                    }])
                })
            }, Z = [], Q = (r("b64b"), r("b0c0"), r("25f0"), r("4449")), tt = function () {
                var t = this, e = t.$createElement, r = t._self._c || e;
                return r("breadcrumb", t._b({style: {order: t.order}}, "breadcrumb", {
                    colorGetter: t.colorGetter,
                    endText: t.endText,
                    from: t.fromItem,
                    itemHeight: t.itemHeight,
                    itemWidth: t.itemWidth,
                    items: t.items,
                    spacing: t.spacing,
                    tailWidth: t.tailWidth,
                    width: t.width
                }, !1))
            }, et = [], rt = (r("7db0"), r("b680"), function () {
                var t = this, e = t.$createElement, r = t._self._c || e;
                return r("div", {staticClass: "bread-sequence"})
            }), nt = [], at = (r("a15b"), r("00a5")), it = {
                name: "myBreadcrumb",
                props: {
                    items: {required: !0, type: Array},
                    from: {required: !1, type: Object},
                    endText: {required: !1, type: String, default: ""},
                    colorGetter: {required: !0, type: Function},
                    width: {required: !1, type: Number},
                    itemWidth: {required: !1, type: Number, default: 80},
                    itemHeight: {required: !1, type: Number, default: 30},
                    spacing: {required: !1, type: Number, default: 3},
                    tailWidth: {required: !1, type: Number, default: 10}
                },
                mounted: function () {
                    var t = Object(at["a"])(this.$el).append("svg:svg").attr("width", this.width).attr("height", 50).attr("class", "trail").style("overflow", "visible");
                    t.append("svg:text").attr("class", "endlabel").style("fill", "#000")
                },
                methods: {
                    breadcrumbPoints: function (t, e) {
                        var r = [];
                        return r.push("0,0"), r.push(this.itemWidth + ",0"), r.push(this.itemWidth + this.tailWidth + "," + this.itemHeight / 2), r.push(this.itemWidth + "," + this.itemHeight), r.push("0," + this.itemHeight), e > 0 && r.push(this.tailWidth + "," + this.itemHeight / 2), r.join(" ")
                    }, draw: function () {
                        var t = this;
                        if (0 !== this.items.length) {
                            var e = Object(at["a"])(this.$el).select(".trail").selectAll("g").data(this.items, (function (t) {
                                return t.id
                            }));
                            e.exit().remove();
                            var r = e.enter().append("svg:g");
                            r.append("svg:polygon").attr("points", this.breadcrumbPoints).style("fill", this.colorGetter), r.append("svg").attr("x", this.tailWidth).attr("y", 0).attr("width", this.itemWidth - this.tailWidth).attr("heigth", this.itemHeight).insert("svg:text").attr("x", this.itemWidth / 2).attr("y", this.itemHeight / 2).attr("dy", "0.25em").attr("text-anchor", "middle").style("font-size", "12px").text((function (t) {
                                return t.name
                            }));
                            var n = null === this.from ? 0 : this.items.indexOf(this.from);
                            n = n < 0 ? this.items.length : n, r.merge(e).attr("transform", (function (e, r) {
                                return "translate(" + r * (t.itemWidth + t.spacing) + ", 0)"
                            })).transition(500).style("opacity", (function (e) {
                                return t.items.indexOf(e) >= n ? 1 : .5
                            })), Object(at["a"])(this.$el).select(".trail").select(".endlabel").attr("x", this.items.length * (this.itemWidth + this.tailWidth / 2) + 2 * this.spacing).attr("y", this.itemHeight / 2).attr("dy", "0.25em").attr("text-anchor", "left").text(this.endText), Object(at["a"])(this.$el).select(".trail").style("visibility", "")
                        } else Object(at["a"])(this.$el).select(".trail").style("visibility", "hidden")
                    }
                },
                watch: {
                    width: function () {
                        Object(at["a"])(this.$el).select(".trail").attr("width", this.width)
                    }, items: {
                        deep: !0, handler: function () {
                            this.draw()
                        }
                    }, from: function () {
                        this.draw()
                    }
                }
            }, ot = it, st = Object(d["a"])(ot, rt, nt, !1, null, null, null), lt = st.exports, ct = {
                name: "myBreadcrumbTrail",
                components: {breadcrumb: lt},
                props: {
                    root: {required: !1, type: Object},
                    current: {required: !1, type: Object},
                    from: {required: !1, type: Object},
                    colorGetter: {required: !0, type: Function},
                    width: {required: !1, type: Number},
                    order: {required: !1, type: Number, default: 1},
                    itemWidth: {required: !1, type: Number, default: 80},
                    itemHeight: {required: !1, type: Number, default: 30},
                    spacing: {required: !1, type: Number, default: 3},
                    tailWidth: {required: !1, type: Number, default: 10}
                },
                computed: {
                    items: function () {
                        var t = this.current;
                        return t ? t.ancestors().reverse().map((function (t) {
                            return {id: t.data.name + t.depth, data: t.data, name: t.data.name}
                        })) : []
                    }, fromItem: function () {
                        var t = this.from;
                        return t ? this.items.find((function (e) {
                            return e.data === t.data
                        })) : null
                    }, endText: function () {
                        var t = this.current;
                        if (!t) return "";
                        var e = "";
                        return !t.data.loyalty_card && t.data.credit_card && (e = "Nessuna C. Fedelt??"), t.value.toFixed(2) + "$ " + e
                    }
                }
            }, ut = ct, dt = Object(d["a"])(ut, tt, et, !1, null, null, null), pt = dt.exports, mt = r("5698"),
            ht = new b.a, ft = {
                name: "mySunburst",
                components: {
                    myBreadcrumbTrail: pt,
                    highlightOnHover: Q["highlightOnHover"],
                    sunburst: Q["sunburst"],
                    zoomOnClick: Q["zoomOnClick"]
                },
                props: {
                    usersColor: {
                        type: Object, default: function () {
                        }
                    }, TimeControls: {
                        type: Object, default: function () {
                            return {
                                mapTimeStart: new Date("2014-01-06 00:00:00 GMT").getTime(),
                                mapTimeStop: new Date("2014-01-06 00:01:00 GMT").getTime(),
                                mapDate: new Date("2014-01-06 00:00:00 GMT").getTime(),
                                playState: !1
                            }
                        }
                    }, scaler: {type: Function, default: mt.scaleLinear()}, colors: {
                        required: !0, default: function () {
                            return ["red"]
                        }
                    }
                },
                mounted: function () {
                    var t = this;
                    mt.csv("/VA2021_Progetto-MC2/transazioni.csv", (function (t) {
                        var e = null;
                        return "" != t.time && (e = new Date(t.timestamp + " " + t.time + " UTC").getTime()), {
                            id: t.id,
                            date: new Date(t.timestamp + " GMT").getTime(),
                            location: t.location,
                            price: parseFloat(t.price),
                            time: e,
                            credit_card: "True" == t.credit_card,
                            loyalty_card: "True" == t.loyalty_card
                        }
                    })).then((function (e) {
                        q = f()(e), G = q.dimension((function (t) {
                            return t.id
                        })), I = q.dimension((function (t) {
                            return t.date
                        })), N = q.dimension((function (t) {
                            return t.time
                        })), G.filter((function (e) {
                            return Object.keys(t.usersColor).indexOf(e) > -1
                        })), I.filter((function (e) {
                            return e == t.TimeControls.mapDate
                        })), mt.csv("/VA2021_Progetto-MC2/nomi.csv").then((function (e) {
                            e.forEach((function (t) {
                                ht.set(t.id, t.LastName + " " + t.FirstName)
                            })), t.colorScale = mt.scaleOrdinal(t.mappaPersoneColori(), t.colors), t.loading = !1
                        })), t.updateData()
                    }))
                },
                methods: {
                    updateData: function () {
                        var t = G.top(1 / 0), e = this.list_to_tree(t, ["id", "location"]);
                        this.data = e
                    }, list_to_tree: function (t, e) {
                        var r = {name: "Totale", children: []};
                        return t.forEach((function (t) {
                            var n = r.children;
                            e.forEach((function (r, a) {
                                var i;
                                if (n.forEach((function (e, n) {
                                    (t[r] == e.name || "id" == r && ht.get(t[r]) == e.name) && (i = n)
                                })), isNaN(i) && ("id" == r ? n.push({
                                    name: ht.get(t[r]),
                                    children: []
                                }) : n.push({
                                    name: t[r],
                                    children: []
                                }), i = n.length - 1), n = n[i].children, a === e.length - 1) {
                                    var o = "", s = new Date(t.time).getUTCHours(), l = new Date(t.time).getUTCMinutes();
                                    null != t.time ? (o += s < 10 ? "0" + s : s, o += l < 10 ? ":0" + l : ":" + l) : o = "Solo C. Fedelt??", n.push({
                                        size: t.price,
                                        name: o,
                                        loyalty_card: t.loyalty_card,
                                        credit_card: t.credit_card
                                    })
                                }
                            }))
                        })), r
                    }, mappaPersoneColori: function () {
                        for (var t = [], e = 0; e < 59; e++) t[e] = ht.get(e.toString());
                        return t
                    }
                },
                watch: {
                    usersColor: {
                        handler: function (t) {
                            G.filter((function (e) {
                                return Object.keys(t).indexOf(e) > -1
                            })), this.updateData()
                        }
                    }, TimeControls: {
                        handler: function (t) {
                            1 != t.playState && (I.filter((function (e) {
                                return e == t.mapDate
                            })), N.filter((function (e) {
                                return null == e || e > t.mapTimeStart && e < t.mapTimeStop
                            })), this.updateData())
                        }, deep: !0
                    }
                },
                data: function () {
                    return {
                        data: {
                            name: "flare",
                            children: [{
                                name: "analytics",
                                children: [{
                                    name: "cluster",
                                    children: [{name: "AgglomerativeCluster", size: 3938}]
                                }, {name: "optimization", children: [{name: "AspectRatioBanker", size: 7074}]}]
                            }]
                        }, colorScale: mt.scaleOrdinal()
                    }
                }
            }, gt = ft, bt = (r("bac1"), Object(d["a"])(gt, Y, Z, !1, null, null, null)), vt = bt.exports, yt = r("5698"),
            Tt = new b.a, wt = {
                name: "App", components: {MySunburst: vt, IdSelector: m, TimeControls: X, Map: D}, data: function () {
                    return {
                        pointCollection: {
                            type: "FeatureCollection",
                            features: [{
                                type: "Feature",
                                properties: {name: "Default point"},
                                geometry: {type: "LineString", coordinates: [[1, 1], [1, 2]]}
                            }]
                        },
                        ts: [],
                        colorbrewer_colors: ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#a65628", "#f781bf"],
                        usersColor: {},
                        TimeControls: {
                            mapTimeStart: new Date("2014-01-06 00:00:00 GMT").getTime(),
                            mapTimeStop: new Date("2014-01-06 23:59:59 GMT").getTime(),
                            mapDate: new Date("2014-01-06 00:00:00 GMT").getTime(),
                            playState: !1
                        },
                        loading: 2
                    }
                }, mounted: function () {
                    var t = this;
                    fetch("./gps.json").then((function (t) {
                        return t.json()
                    })).then((function (e) {
                        var r = e.map((function (t) {
                            var e = {
                                Timestamp: +new Date(t.Timestamp + " GMT").getTime(),
                                id: +t.id,
                                lat: +t.lat,
                                long: +t.long
                            };
                            return e
                        }));
                        A = f()(r), E = A.dimension((function (t) {
                            return t.id
                        })), W = A.dimension((function (t) {
                            return t.Timestamp
                        })), W.filterRange([parseInt(t.TimeControls.mapDate), parseInt(t.TimeControls.mapDate) + 864e5]), t.loading--
                    })), yt.csv("/VA2021_Progetto-MC2/macchine.csv").then((function (e) {
                        e.forEach((function (t) {
                            Tt.set(parseInt(t.id), parseInt(t.CarID))
                        })), t.loading--
                    }))
                }, methods: {
                    refresh: function (t) {
                        W.filterRange([parseInt(this.TimeControls.mapTimeStart), parseInt(this.TimeControls.mapTimeStop)]), this.pointCollection = this.getGeoJsonFromReports(t.top(1 / 0))
                    }, updateDate: function (t) {
                        this.TimeControls.mapTimeStart = t.start, this.TimeControls.mapTimeStop = t.stop, this.TimeControls.playState = t.playState, null != t.day && (this.TimeControls.mapDate = t.day, W.filterRange([parseInt(this.TimeControls.mapDate), parseInt(this.TimeControls.mapDate) + 864e5]), this.ts = this.getTimestampList(W.top(1 / 0))), this.refresh(W)
                    }, updateCar: function (t) {
                        var e = t.map((function (t) {
                            return Tt.get(t)
                        }));
                        e.includes(void 0) && this.$bvToast.toast("Sono stati selezionati dipendenti senza auto associata, puoi comunque selezionare un intervallo orario per visualizzare le sue transazioni", {
                            title: "Attenzione",
                            autoHideDelay: 5e3
                        }), this.updateColor(t), E.filter((function (t) {
                            return e.indexOf(t) > -1
                        })), this.updateDate({
                            start: this.TimeControls.mapTimeStart,
                            stop: this.TimeControls.mapTimeStop,
                            day: this.TimeControls.mapDate
                        }), this.refresh(E)
                    }, updateColor: function (t) {
                        var e = this;
                        this.usersColor = {}, t.forEach((function (t) {
                            e.usersColor[t] = e.colorbrewer_colors[t % e.colorbrewer_colors.length]
                        }))
                    }, getTimestampList: function (t) {
                        var e = Array.from(yt.group(t, (function (t) {
                            return t.id
                        }))).map((function (t) {
                            return {
                                id: Tt.getKey(t[0]), timestamp: t[1].sort((function (t, e) {
                                    return t.Timestamp - e.Timestamp
                                })).map((function (t) {
                                    return t.Timestamp
                                }))
                            }
                        }));
                        return e
                    }, getGeoJsonFromReports: function (t) {
                        var e = this, r = Array.from(yt.group(t, (function (t) {
                            return t.id
                        }))).map((function (t) {
                            return {
                                id: t[0], trajs: t[1].sort((function (t, e) {
                                    return t.Timestamp - e.Timestamp
                                })).map((function (t) {
                                    return [t.long, t.lat]
                                }))
                            }
                        })), n = {
                            type: "FeatureCollection", features: r.map((function (t) {
                                return {
                                    type: "Feature",
                                    properties: {id: Tt.getKey(t.id), color: e.usersColor[Tt.getKey(t.id)]},
                                    geometry: {type: "LineString", coordinates: t.trajs}
                                }
                            }))
                        };
                        return n
                    }
                }, watch: {}
            }, St = wt, Ct = (r("034f"), Object(d["a"])(St, a, i, !1, null, null, null)), xt = Ct.exports, _t = r("5f5b"),
            Ot = r("b1e0"), Dt = r("f617"), jt = r("36fc");
        r("f9e3"), r("2dd8"), r("dac4"), r("bbb4");
        n["default"].component("verte", jt["a"]), n["default"].use(_t["a"]), n["default"].use(Ot["a"]), n["default"].use(Dt["a"]), n["default"].config.productionTip = !1, new n["default"]({
            render: function (t) {
                return t(xt)
            }
        }).$mount("#app")
    }, 6617: function (t, e, r) {
    }, "85ec": function (t, e, r) {
    }, a6b6: function (t, e, r) {
    }, ac24: function (t, e, r) {
        "use strict";
        r("bebb")
    }, bac1: function (t, e, r) {
        "use strict";
        r("03db")
    }, bebb: function (t, e, r) {
    }
});
//# sourceMappingURL=app.b6083947.js.map