import axios from 'axios';
import type { timerSetting } from '../types';

type saveResponse = {
    id: string;
};

// TODO: エラー処理

export const getSettings = async (id: string): Promise<timerSetting|null> => {
    try {
        const resp = await axios.get<timerSetting>(`?id=${id}`);
        if (resp.status !== 200) {
            return null;
        }
        return resp.data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const saveSettings = async (settings: timerSetting[]): Promise<string|null> => {
    try {
        const resp = await axios.post<saveResponse>('', settings, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (resp.status !== 200) {
            return null;
        }
        return resp.data.id;
    } catch (err) {
        console.log(err);
        return null;
    }
};
