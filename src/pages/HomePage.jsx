import React, { useContext, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Stories from "../components/Stories";
import HomePagePost from "../components/HomePagePost";
import HomePageUser from "../components/HomePageUser";

const HomePage = () => {
    return (
        <>
            <div className="overflow-auto flex flex-row container">
                <Sidebar />
                <div className="flex flex-col w-fit mx-auto space-y-4">
                    <Stories />
                    <HomePagePost />
                </div>
                <HomePageUser />
            </div>

        </>
    );
};

export default HomePage;