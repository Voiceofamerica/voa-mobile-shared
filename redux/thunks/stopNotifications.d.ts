import { Dispatch } from 'redux';
export interface StopNotificationsOptions {
    topic: string;
}
declare const _default: (options: StopNotificationsOptions) => (dispatch: Dispatch<any>) => void;
export default _default;
