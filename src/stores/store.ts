import UserStore from "./userStore.ts";

const store = {
  userStore: UserStore.create({
    isFetched: false,
    isLoggedIn: false,
    userData: null,
  }),
};

export default store;
