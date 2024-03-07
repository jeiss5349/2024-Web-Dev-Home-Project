
import { reactive } from "vue";

const session = reactive( {
    user: null as User | null,
    users: [] as User[],
});
export function userAdd(firstName: string, lastName: string, adminUser: boolean)
{
    if(!session.users.find((u) => u.firstName === firstName && u.lastName === lastName))
    {
        const user = new User(firstName, lastName, adminUser);
        session.users.push(user);
    }
}
export function login(firstName: string, lastName: string, adminUser: boolean) {
    session.user = {
        firstName,
        lastName,
        adminUser,
    };
}

export function logout() {
    session.user = null;
}

export class User {
    public firstName?: string;
    public lastName?: string;
    public adminUser?: boolean;

    constructor(firstName: string,lastName: string, adminUser: boolean)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.adminUser = adminUser;
      }
}


export function isLoggedIn() {
    return session.user !== null;
}

export default session;