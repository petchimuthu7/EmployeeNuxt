import { defineStore } from 'pinia'

export const useStore = defineStore({
    id: 'filter-store',
    state: () => {
        return {
            UserId: "",
            UserName: "",
            EmailAddress: "",
        }
    },
    actions: {
        setUserId(userid) {
            this.UserId = userid;
        },
        setUserName(username) {
            this.UserName = username;
        },
        setEmailAddress(emailaddress) {
            this.EmailAddress = emailaddress;
        },
        clearUserId() {
            this.UserId = "";
        },
        clearUserName() {
            this.UserName = "";
        },
        clearEmailAddress() {
            this.EmailAddress = "";
        },
        logOut() {
            const userId = this.getUserId;
            if (userId != null && userId != undefined && userId != "") {
                setTimeout(() => {
                    this.clearUserId();
                    this.clearUserName();
                    this.clearEmailAddress();
                    location.href = "/"
                });
            }
        },
        checkAuth() {
            const userId = this.getUserId;
            if (userId == null || userId == undefined || userId == "") {
                setTimeout(() => {
                    this.clearUserId();
                    this.clearUserName();
                    this.clearEmailAddress();
                    location.href = "/"
                });
            }
        },
        checklogin() {
            const userId = this.getUserId;
            if (userId != null && userId != undefined && userId != "") {
                setTimeout(() => {
                    location.href = "/dashboard"
                });
            }
        },
    },
    getters: {
        getUserId() {
            if (this.UserId !== undefined && this.UserId !== '') {
                return this.UserId
            }
        },
        getUserName(state) {
            if (state.UserName !== undefined && state.UserName !== '') {
                return state.UserName
            }
        },
        getEmailAddress() {
            if (this.EmailAddress !== undefined && this.EmailAddress !== '') {
                return this.EmailAddress
            }
        },
    },
    persistedState:{
        persist: true
    }
})