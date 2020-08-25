import axios from 'axios';


export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

class AuthenticationService {

    executeJwtAuthenticateService(username, password) {
        console.log(username);
        return axios.post(`http://localhost:8080/authenticate`, {
            username,
            password
        });
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return 'Bearer ' + token;
    }

    // executeBasicAuthenticationService(username, password) {
    //     return axios.get("http://localhost:8080/basicauth",
    //         { headers: { authorization: this.createBasicAuthToken(username, password) } });
    // }


    // createBasicAuthToken(username, password) {
    //     return 'Basic ' + window.btoa(username + ":" + password);
    // }

    //
    // registerSuccessfulLogin(username, password) {
    //     sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    //     this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    // }

    setupAxiosInterceptors(token) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token;
                }
                return config;
            }
        )
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        return user !== null;
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

}

export default new AuthenticationService();