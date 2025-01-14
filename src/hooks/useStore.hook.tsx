import { useContext } from "react";
import { StoreContext } from "../stores/storeContext.tsx";

// Create a StoreContext provider
const useStore = () => useContext(StoreContext);

export default useStore;
