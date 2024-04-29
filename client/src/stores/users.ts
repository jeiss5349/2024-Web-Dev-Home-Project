import router from "@/router";
import session, { api } from "./session";
import type { Message } from "./session";


export interface User {
    _id?: any;
    firstName?:String;
    lastName?:String;
    userName?: string;
    password?: string;
    email?: string;
    isAdmin?: boolean;
    profilePicture?: string;
    friends?: User[];
    friendRequests?: string[];
}

export async function getUsers() {
    return api<User[]>(`users`).then((res) => {
        console.log(res)
        return res;
    });
}

export function createUser(data:User) {
    return api<Message>("users/create-user", { ...data }).then(
        (res) => {
            if (res.type === "danger") {
                session.messages.push(res);
                return false;
            } else return true;
        }
    );
}

export function getUser(userName: string) {
    return api<User>(`users/${userName}`);
}


export function login(userName: string, password: string) {
    return api<User | Message>(`users/authenticate`, {
        userName,
        password,
    }).then((res) => {
        if ("password" in res && "userName" in res) {
            if (
                res.password === password &&
                (res.userName === userName || res.email === userName)
            ) {
                session.user = res;
                router.push('/');
            } else {
                session.messages.push({
                    type: "danger",
                    text: "Error fetching userName and password.",
                });
            }
        } else {
            session.messages.push(res);
        }
    });
}
