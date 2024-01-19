import React, { useState, useContext, useEffect } from "react"
import { userContext } from "../context/UserState"
import { useNavigate } from "react-router-dom";
import HomeLogin from "./HomeLogin";
import HomePage from "../pages/HomePage";

const Home = () => {
    const { isAuthenticated } = useContext(userContext);
    const [isAuth, setIsAuth] = useState(false);
    const nav = useNavigate();

    // Handle Authentication
    useEffect(() => {
        const handleAuth = async () => {
            await isAuthenticated()
                .then((res) => {
                    if (res === true) {
                        setIsAuth(true);
                    }
                    else {
                        setIsAuth(false);
                        nav("/login");
                    }
                })
                .catch((err) => {
                    console.log("Error = ", err)
                })
        }
        handleAuth();
    }, [isAuth])
    return (
        <>
            {(isAuth === true)
                ?
                <HomePage />
                :
                <>
                    <HomeLogin />
                </>
            }
        </>
    )
}

export default Home