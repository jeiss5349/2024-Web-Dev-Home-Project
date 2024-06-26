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
        return res;
    });
}

export async function deleteUser(userId:string) {
    return api<User[]>(`users/${userId}`,null,'delete').then((res) => {
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

export async function searchUser(userName : string){
    return api<User>(`users/search/${userName}`);
}

export async function addFriend(userId:string,friendId:string){
    return api<Message>("users/add-friend", { userId , friendId }).then(
        (res) => {
            if (res) {
                session.messages.push(res);
                return true;
            } else return true;
        }
    );
}


export function login(userName: string, password: string) {
    return api<any>(`users/authenticate`, {
        userName,
        password,
    }).then((res) => {
        if ("password" in res && "userName" in res) {
            if (
                res.password === password &&
                (res.userName === userName || res.email === userName)
            ) {
                localStorage.setItem('user',JSON.stringify(res));
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
