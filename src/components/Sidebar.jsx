import React, { useContext, useState } from "react";
import { FaHome, FaSearch, FaCompass, FaPlay, FaEnvelope, FaBell, FaPlus, FaUser } from "react-icons/fa";
import { userContext } from "../context/UserState";
import { useNavigate } from "react-router-dom";
import { Loader } from "../modals/LoaderModal";
import { SuccessModal } from "../modals/SuccesModal";
import CreatePostModal from "../modals/CreatePostModal";

const Sidebar = () => {
    const { logout } = useContext(userContext);
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const nav = useNavigate();

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout()
            .then((res) => {
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
            })
            .catch((err) => {
                console.log("Error = ", err);
            })

    }

    return (
        <>
            <div className="fixed flex flex-col h-screen place-content-between px-10 py-10 w-fit border-r-2 border-r-gray-200">
                <div className="w-fit"> <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="Instagram Logo" /> </div>
                <div className="w-fit flex flex-col space-y-6">
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaHome size={30} className="m-1" />
                        <span className="sidebar__text">Home</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaSearch size={30} className="m-1" />
                        <span className="sidebar__text">Search</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaCompass size={30} className="m-1" />
                        <span className="sidebar__text">Explore</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaPlay size={30} className="m-1" />
                        <span className="sidebar__text">Reels</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaEnvelope size={30} className="m-1" />
                        <span className="sidebar__text">Messages</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaBell size={30} className="m-1" />
                        <span className="sidebar__text">Notifications</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer" onClick={()=> setShowCreatePostModal(true)}>
                        <FaPlus size={30} className="m-1" />
                        <span className="sidebar__text" >Create</span>
                    </div>
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <FaUser size={30} className="m-1" />
                        <span className="sidebar__text">Profile</span>
                    </div>
                </div>
                <div className="w-fit">
                    <button className="sidebar__logout" onClick={handleLogout}>Logout</button>
                </div>
            </div>
            <Loader showLoader={showLoader} />
            <SuccessModal showSuccess={showSuccess} message="Logout Successful" onClose={() => setShowSuccess(false)} />
            <CreatePostModal isOpen={showCreatePostModal} onClose={()=> setShowCreatePostModal(false)}  />
        </>
    );
};

export default Sidebar