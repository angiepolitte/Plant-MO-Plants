import { createContext, useContext, useState, useEffect } from "react";

const GlobalDataContext = createContext();

export function GlobalDataProvider({ children }) {

    // set your variables to access your return from the endpoint
    const [messageExOne, setMessageExOne] = useState("Loading...");
    const [messageExTwo, setMessageExTwo] = useState("Loading...");

    // create a fetch to access the endpoint in Spring
    useEffect(() => {
        fetch("http://localhost:8080/api/example-one")
            .then((response) => response.text())
            .then((data) => setMessageExOne(data))
            .catch(() => setMessageExOne("Failed to load message 1"));

        fetch("http://localhost:8080/api/example-two")
            .then((response) => response.text())
            .then((data) => setMessageExTwo(data))
            .catch(() => setMessageExTwo("Failed to load message 2"));

    }, []);

    // set your variable in the parameters
    return (
        <GlobalDataContext.Provider value={{ messageExOne, messageExTwo }}>
            {children}
        </GlobalDataContext.Provider>
    );
}


export function useGlobalData() {
    return useContext(GlobalDataContext);
  }