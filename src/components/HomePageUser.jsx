import React, { useContext, useState } from "react";

const HomePageUser = () => {

    return (
        <>
            <div className="fixed right-0 flex flex-col h-screen place-content-between px-10 py-10 w-1/5 text-sm">
                <div className="w-fit flex flex-col space-y-6">
                    <div className="flex flex-row items-center space-x-4 pr-4 hover:bg-gray-200 hover:cursor-pointer">
                        <img className="w-10 h-10 rounded-full" src="https://picsum.photos/seed/picsum/200" alt="" />
                        <div className="flex flex-col">
                            <span className="font-semibold">username</span>
                            <span className="text-gray-500">Full Name</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePageUser