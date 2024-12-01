
export default class UsersModel{
    constructor(_id, _username, _email, _password){
        this.id = _id;
        this.userName = _username;
        this.email = _email;
        this.password = _password;
    }

    static get(){
        /**return all user in the list */
        return usersList;
    }

    static add(userObj){
        /* add the user by creating the instance  */
        const lastUserValue = usersList[usersList.length - 1];

        const newUserId = (!lastUserValue) ? usersList.length + 1 : lastUserValue.id + 1;
        const newUser =  new UsersModel(newUserId, userObj.username, userObj.email, userObj.password);

        usersList.push(newUser)
        return newUser;
    }

    static checkUser(userObj){
        /**return the user if the email and password are match */
        return usersList.find((user) => user.email == userObj.email && user.password == userObj.password)
    }

    static findUserByEmail(email){
        return usersList.find((user) => user.email === email);
    }
}

const usersList = [new UsersModel(1, "srihari", "srihariparthasarathi20@gmail.com","this is user password")];

// UsersModel.add({
//     "username": "srihari",
//     "email": "srihariparthasarathi20@gmail.com",
//     "password": "this is user password"
// })