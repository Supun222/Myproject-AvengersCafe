import {createContext} from "react";

export const OpenContext = createContext({
    openTable: false,
    setOpenTable: () => {},
});