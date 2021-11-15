import {createContext} from "react";

export const TotalContext = createContext({
    total: 0,
    setTotal: () => {},
});