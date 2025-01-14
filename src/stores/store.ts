import UserStore from "./userStore.ts";

const store = {
  userStore: UserStore.create({
    isLoggedIn: false,
    userData: null,
  }),
};

export default store;
