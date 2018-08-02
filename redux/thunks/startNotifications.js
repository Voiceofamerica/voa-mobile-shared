"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setNotificationStatus_1 = require("../actions/setNotificationStatus");
var pushNotificationHelper_1 = require("../../helpers/pushNotificationHelper");
exports.default = (function (options) { return function (dispatch) {
    var topic = options.topic;
    dispatch(setNotificationStatus_1.default({
        shouldGetPushNotifications: true,
    }));
    var sub = pushNotificationHelper_1.subscribeToTopic(topic).subscribe(function (status) {
        if (status.initialized && status.subscriptions.some(function (t) { return t === topic; })) {
            sub.unsubscribe();
        }
    });
}; });
//# sourceMappingURL=startNotifications.js.map