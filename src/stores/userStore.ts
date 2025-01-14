import { types } from "mobx-state-tree";
import { GetMeResponse } from "../types/api.ts";

const UserStore = types
  .model("UserStore", {
    isLoggedIn: types.boolean,
    userData: types.maybeNull(
      types.model({
        id: types.number,
        username: types.string,
        email: types.string,
        date_registered: types.string,
        role: types.string,
        profile_image: types.string,
        country: types.string,
        company: types.maybe(types.string),
      })
    ),
  })
  .actions((self) => ({
    setUserData(userData: GetMeResponse) {
      self.userData = userData;
      self.isLoggedIn = true;
    },
    logout() {
      self.userData = null;
      self.isLoggedIn = false;
    },
  }));

export default UserStore;
