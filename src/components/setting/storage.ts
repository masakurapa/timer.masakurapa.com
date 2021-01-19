import type { timerSetting } from '../../types';
import { setTimerSettings, getCurrent} from '../../storage';

export const storeTimerSettings = (settings: timerSetting[]): void => {
    const storeSettings: timerSetting[] = [];
    settings.forEach(t => {
        const obj = Object.assign({}, {
            title: '',
            time: 0,
            hour: 0,
            minute: 0,
            second: 0,
        });
        obj.title = t.title;
        obj.hour = t.hour;
        obj.minute = t.minute;
        obj.second = t.second;
        storeSettings.push(obj);
    });
    setTimerSettings(getCurrent(), storeSettings);
};
