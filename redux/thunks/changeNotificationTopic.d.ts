import { Dispatch } from 'redux';
export interface ChangeNotificationTopicOptions {
    topic: string;
}
declare const _default: (options: ChangeNotificationTopicOptions) => (dispatch: Dispatch<any>) => void;
export default _default;
