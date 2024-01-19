import React, { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { LoginError } from "../modals/ErrorModal";
import { Loader } from "../modals/LoaderModal";
import { SuccessModal } from "../modals/SuccesModal";
import Home from "./Home";

const HomeLogin = () => {
    const { login, isAuthenticated } = useContext(userContext);
    const [credentials, setCredentials] = useState({ "email": "", "password": "" });
    const nav = useNavigate();
    const [showLoginError, setShowLoginError] = useState(false);
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleLogin = (e) => {
        e.preventDefault();
        login(credentials)
            .then((data) => {
                if (data.success) {
                    setCredentials({ "email": "", "password": "" });
                    setShowLoader(true);
                    setTimeout(() => {
                        setShowLoader(false);
                        setShowSuccess(true);
                        setTimeout(() => {
                            document.cookie = "isAuthenticated=true"
                            setShowSuccess(false);
                            window.location.reload();
                            nav("/");
                        }, 500);
                    }, 1000);
                }
                else {
                    setError(data.error.message);
                    setShowLoginError(true);
                }
            })
            .catch((err) => {
                setError(err.message);
                setShowLoginError(true);
            })
    }

    // Handle Authentication
    useEffect(() => {
        const handleAuth = async () => {
            const res = await isAuthenticated();
            if (res === true) {
                setIsAuth(true);
                nav("/");
            }
        }
        handleAuth();
    }, [isAuth])

    return (
        <>
            {(isAuth !== true) ?
                <>
                    <div className="overflow-auto w-full">
                        <div className="flex items-center justify-center h-screen w-3/5 mx-auto">
                            <img src={require("../images/auth.png")} alt="homepage" />
                            <div className="flex flex-col justify-center space-y-3">
                                <div className="border border-gray-300">
                                    <img src={require("../images/logo.png")} alt="instagram-logo" className="w-4/5 mx-auto" />
                                    <div>
                                        <form action="" onSubmit={handleLogin}>
                                            <div className="flex flex-col w-4/5 mx-auto space-y-2 pb-3">
                                                <input type="email" className="border-2 border-gray-300 bg-gray-100 p-2 rounded-sm" placeholder="Email" name="email" onChange={handleOnChange} />
                                                <input type="password" className="border-2 border-gray-300 bg-gray-100 p-2 rounded-sm" placeholder="Password" name="password" onChange={handleOnChange} />
                                                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 w-full mx-auto p-1 rounded-sm mb-4">Log in</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="border border-gray-300">
                                    <div className="p-6 text-center">
                                        <p>Don't have an account? <Link className="text-blue-500 hover:text-blue-600" to="/signup"><button>Sign up</button></Link>
                                        </p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p className="my-4">Get the app.</p>
                                    <div className="flex flex-row justify-center space-x-2">
                                        <img src={require("../images/playstore.png")} alt="" className="w-28" />
                                        <img src={require("../images/microsoft.png")} alt="" className="w-28" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <LoginError showError={showLoginError} error={error} onClose={() => setShowLoginError(false)} />
                    <Loader showLoader={showLoader} />
                    <SuccessModal showSuccess={showSuccess} message="Login Successful" onClose={() => setShowSuccess(false)} />
                </>
                :
                <>
                    {
                        <Home />
                    }
                </>
            }
        </>
    )
}

export default HomeLogin;