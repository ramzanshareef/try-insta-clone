import React, { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../context/UserState";
import { SignupError } from "../modals/ErrorModal";
import { SuccessModal } from "../modals/SuccesModal";
import { Loader } from "../modals/LoaderModal";
import Home from "./Home";

const HomeSignup = () => {
    const [credentials, setCredentials] = useState({ "name": "", "email": "", "password": "" });
    const { signup, isAuthenticated } = useContext(userContext);
    const [showSignupError, setShowSignupError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [errors, setErrors] = useState([]);
    const nav = useNavigate();
    const [isAuth, setIsAuth] = useState(false);

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }
    const handleSignup = async (e) => {
        e.preventDefault();
        await signup(credentials)
            .then((data) => {
                if (data.success) {
                    setCredentials({ "name": "", "email": "", "password": "" });
                    setShowLoader(true);
                    setTimeout(() => {
                        setShowLoader(false);
                        setShowSuccess(true);
                        setTimeout(() => {
                            nav("/login");
                        }, 500);
                    }, 1000);
                }
                else {
                    console.log(data)
                    if (data.error.errors) {
                        setErrors(data.error.errors);
                        setShowSignupError(true);
                    }
                    if (data.error.message) {
                        setErrors([{ "msg": data.error.message }]);
                        setShowSignupError(true);
                    }
                }
            })
            .catch((err) => {
                setErrors([{ "msg": err.message }]);
                setShowSignupError(true);
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
                            <div className="flex flex-col justify-center space-y-3">
                                <div className="border border-gray-300">
                                    <img src={require("../images/logo.png")} alt="instagram-logo" className="w-3/5 mx-auto" />
                                    <p className="m-4 w-4/6 mx-auto text-center">
                                        Sign up to see photos and videos from your friends.
                                    </p>
                                    <div>
                                        <form action="" onSubmit={handleSignup} >
                                            <div className="flex flex-col w-4/5 mx-auto space-y-3 pb-3">
                                                <input type="text" className="border-2 border-gray-300 bg-gray-100 p-2 rounded-sm" name="name" onChange={handleOnChange} placeholder="Name" />
                                                <input type="email" className="border-2 border-gray-300 bg-gray-100 p-2 rounded-sm" name="email" onChange={handleOnChange} placeholder="Email" />
                                                <input type="password" className="border-2 border-gray-300 bg-gray-100 p-2 rounded-sm" name="password" onChange={handleOnChange} placeholder="Password" />
                                                <p className="text-xs w-4/5 text-center mx-auto">
                                                    By signing up, you agree to our Terms , Data Policy and Cookies Policy .
                                                </p>
                                                <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 w-full mx-auto p-1 rounded-sm mb-4">Sign Up</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="border border-gray-300">
                                    <div className="p-6 text-center">
                                        <p>Have an account? <Link className="text-blue-500 hover:text-blue-600" to="/login"><button>Login</button></Link>
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
                    <SignupError errors={errors} showError={showSignupError} onClose={() => setShowSignupError(false)} />
                    <SuccessModal showSuccess={showSuccess} message="Signup Successful" onClose={() => setShowSuccess(false)} />
                    <Loader showLoader={showLoader} />
                </>
                :
                <Home />
            }
                </>
    )
}

            export default HomeSignup;