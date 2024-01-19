import { createContext, useState } from "react"
const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/v1";


const userContext = createContext();

const UserState = (props) => {

    const signup = async (user) => {
        const response = await fetch(`${backendURL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200) {
            const jsonData = await response.json();
            return { success: true, message: jsonData };
        }
        else {
            const jsonData = await response.json();
            return { success: false, error: jsonData };
        }
    }

    const login = async (credentials) => {
        const response = await fetch(`${backendURL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(credentials)
        });
        if (response.status === 200) {
            const jsonData = await response.json();
            return { success: true, message: jsonData };
        }
        else {
            const jsonData = await response.json();
            return { success: false, error: jsonData };
        }
    }

    const logout = async () => {
        const response = await fetch(`${backendURL}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        if (response.status === 200) {
            const jsonData = await response.json();
            return jsonData;
        }
    }

    const checkAuth = async () => {
        const response = await fetch(`${backendURL}/auth/isAuthenticated`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        if (response.status === 200) {
            document.cookie = "isAuthenticated=true";
        }
        else {
            document.cookie = "isAuthenticated=false";
        }
    }

    const isAuthenticated = async () => {
        await checkAuth();
        if (document.cookie.includes("isAuthenticated=true")) {
            return true;
        }
        else {
            return false;
        }
    }

    return (
        <userContext.Provider value={{ signup, login, logout, isAuthenticated }}>
            {props.children}
        </userContext.Provider>
    )
}

export { UserState, userContext };