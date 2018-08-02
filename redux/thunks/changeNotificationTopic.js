"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setNotificationStatus_1 = require("../actions/setNotificationStatus");
var pushNotificationHelper_1 = require("../../helpers/pushNotificationHelper");
exports.default = (function (options) { return function (dispatch) {
    var topic = options.topic;
    var status = pushNotificationHelper_1.statusSubject.getValue();
    dispatch(setNotificationStatus_1.default({
        shouldGetPushNotifications: true,
    }));
    status.subscriptions
        .filter(function (t) { return t !== topic; })
        .forEach(function (topic) {
        var sub = pushNotificationHelper_1.unsubscribeFromTopic(topic).subscribe(function (status) {
            if (status.initialized && !status.subscriptions.some(function (t) { return t === topic; })) {
                sub.unsubscribe();
            }
        });
    });
    if (!status.subscriptions.some(function (t) { return t === topic; })) {
        var sub_1 = pushNotificationHelper_1.subscribeToTopic(topic).subscribe(function (status) {
            if (status.initialized && status.subscriptions.some(function (t) { return t === topic; })) {
                sub_1.unsubscribe();
            }
        });
    }
}; });
//# sourceMappingURL=changeNotificationTopic.js.map