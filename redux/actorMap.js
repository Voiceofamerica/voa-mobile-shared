"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
function buildReducer(initialState, map) {
    return function (prev, action) {
        if (prev === void 0) { prev = initialState; }
        var actor = map[action.type];
        return typeof actor === 'function' ? actor(prev, action) : prev;
    };
}
exports.buildReducer = buildReducer;
function buildArrayReducer(idSelector, childReducer) {
    return function (prev, action) {
        return prev.map(function (item) {
            if (idSelector(item) === action.id) {
                return childReducer(item, action);
            }
            else {
                return item;
            }
        });
    };
}
exports.buildArrayReducer = buildArrayReducer;
function getNewState(prevState, action, defaultReducer) {
    if (typeof defaultReducer === 'function') {
        return defaultReducer(prevState, action);
    }
    else {
        return __assign({}, prevState);
    }
}
function buildFlatMapReducer(childReducer) {
    return function (prevState, action) {
        var newState = getNewState(prevState, action);
        var prevItem = newState[action.id];
        var newItem = childReducer(prevItem, action);
        if (newItem === null || newItem === undefined) {
            delete newState[action.id];
        }
        else {
            newState[action.id] = newItem;
        }
        return newState;
    };
}
exports.buildFlatMapReducer = buildFlatMapReducer;
//# sourceMappingURL=actorMap.js.map