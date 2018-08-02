"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setNotificationStatus_1 = require("../actions/setNotificationStatus");
var pushNotificationHelper_1 = require("../../helpers/pushNotificationHelper");
exports.default = (function (options) { return function (dispatch) {
    var topic = options.topic;
    var status = pushNotificationHelper_1.statusSubject.getValue();
    if (!status.subscriptions.some(function (t) { return t === topic; })) {
        return;
    }
    if (status.subscriptions.length === 1) {
        dispatch(setNotificationStatus_1.default({
            shouldGetPushNotifications: false,
        }));
    }
    var sub = pushNotificationHelper_1.unsubscribeFromTopic(topic).subscribe(function (status) {
        if (status.initialized && !status.subscriptions.some(function (t) { return t === topic; })) {
            sub.unsubscribe();
        }
    });
}; });
//# sourceMappingURL=stopNotifications.js.map