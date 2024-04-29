import session, { api } from "./session";
import type { Message } from "./session";


export interface Acvtivity {
    _id?: string;
    title?: string;
    date?: Date;
    userId?: string;
    picture?: string;
}

export async function getUserActivity(userId: string) {
    return api<any>(`activity/${userId}`).then(
        (res) => {
            if (res.type === "danger") {
                session.messages.push(res);
                return false;
            }
            return res;
        }
    );
}

export function addUserActivity(activity: Acvtivity) {
    return api<any>(`activity`, activity).then(
        (res) => {
            if (res.type === "danger") {
                session.messages.push(res);
                return false;
            }
            return res;
        }
    );
}