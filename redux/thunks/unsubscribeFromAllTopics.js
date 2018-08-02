"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var setNotificationStatus_1 = require("../actions/setNotificationStatus");
var pushNotificationHelper_1 = require("../../helpers/pushNotificationHelper");
exports.default = (function () { return function (dispatch) {
    var status = pushNotificationHelper_1.statusSubject.getValue();
    dispatch(setNotificationStatus_1.default({
        shouldGetPushNotifications: false,
    }));
    status.subscriptions.forEach(function (topic) {
        var sub = pushNotificationHelper_1.unsubscribeFromTopic(topic).subscribe(function (status) {
            if (status.initialized && !status.subscriptions.some(function (t) { return t === topic; })) {
                sub.unsubscribe();
            }
        });
    });
}; });
//# sourceMappingURL=unsubscribeFromAllTopics.js.map