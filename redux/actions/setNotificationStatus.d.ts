import { Action } from 'redux';
export declare const type = "@voiceofamerica/voa-shared:SET_NOTIFICATION_STATUS";
export interface SetNotificationStatusOptions {
    shouldGetPushNotifications: boolean;
}
export declare type SetNotificationStatusAction = SetNotificationStatusOptions & Action;
declare const _default: (options: SetNotificationStatusOptions) => SetNotificationStatusAction;
export default _default;
