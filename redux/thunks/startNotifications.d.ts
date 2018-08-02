import { Dispatch } from 'redux';
export interface StartNotificationsOptions {
    topic: string;
}
declare const _default: (options: StartNotificationsOptions) => (dispatch: Dispatch<any>) => void;
export default _default;
