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
var setNotificationStatus_1 = require("../actions/setNotificationStatus");
var actorMap_1 = require("../actorMap");
var actors = (_a = {},
    _a[setNotificationStatus_1.type] = function (prev, _a) {
        var shouldGetPushNotifications = _a.shouldGetPushNotifications;
        return (__assign({}, prev, { shouldGetPushNotifications: shouldGetPushNotifications }));
    },
    _a);
exports.INITIAL_STATE = {
    shouldGetPushNotifications: undefined,
};
exports.default = actorMap_1.buildReducer(exports.INITIAL_STATE, actors);
var _a;
//# sourceMappingURL=notificationStatusReducer.js.map