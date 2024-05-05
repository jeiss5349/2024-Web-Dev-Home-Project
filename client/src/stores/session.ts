
import HttpCall from "@/services/http.service";
import { computed, reactive } from "vue";
import type { User } from "./users";

const localStorageUser = localStorage.getItem('user');
const session = reactive({
    user: localStorageUser ? JSON.parse( localStorageUser) : null,
    users: [] as User[],
    loading: 0,
    error: null as string | null,
    messages: [] as Message[],
});
export function setError(error: string | null) {
    session.error = error;
    if (error) {
        session.messages.push({ type: "danger", text: error });
    }
}

export const isLoading = computed(() => !!session.loading);

export async function api<T>(url: string, data: any = null, method?: string) { 
    session.loading++;
    setError(null);
    try {
        return await HttpCall<T>(url, data, method);
    } catch (error) {
        setError(error as string);
    } finally {
        session.loading--;
    }
    return {} as T;
}

export interface Message {
    text: string;
    type: "danger" | "warning" | "success" | "info";
}

// export function userAdd(firstName: string, lastName: string, adminUser: boolean)
// {
//     if(!session.users.find((u) => u.firstName === firstName && u.lastName === lastName))
//     {
//         const user = new User(firstName, lastName, adminUser);
//         session.users.push(user);
//     }
// }
// export function login(firstName: string, lastName: string, adminUser: boolean) {
//     session.user = {
//         firstName,
//         lastName,
//         adminUser,
//     };
// }

export function login(userName: string) {
    HttpCall<User>(`/users/${userName}`).then((user) => {
        if (user) {
            session.user = user;
        } else {
            setError("Invalid user name");
        }
    });
}

export function logout() {
    session.user = null;
    localStorage.setItem('user','');
}

export function isAdmin() {
    if (isLoggedIn()) {
      return session.user?.isAdmin;
    } else {
      return false;
    }
  }

// export class User {
//     public firstName?: string;
//     public lastName?: string;
//     public adminUser?: boolean;

//     constructor(firstName: string,lastName: string, adminUser: boolean)
//     {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.adminUser = adminUser;
//       }
// }


export function isLoggedIn() {
    return session.user !== null;
}

export default session;