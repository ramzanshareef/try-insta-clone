import { createContext } from "react";

const backendURL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/v1";
const postContext = createContext();

const PostState = (props) => {

    const getAllPosts = async () => {
        const response = await fetch(`${backendURL}/user/posts/allPosts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            return { success: true, message: jsonData };
        }
        else {
            return { success: false, error: jsonData };
        }
    }

    const getAllPostsofFollowers = async () => {
        const response = await fetch(`${backendURL}/user/posts/allPostsOfFollowers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        });
        const jsonData = await response.json();
        if (response.status === 200) {
            return { success: true, message: jsonData };
        }
        else {
            return { success: false, error: jsonData };
        }
    }

    const addPost = async (data) => {
        const response = await fetch(`${backendURL}/user/posts/addPost`, {
            "method": "POST",
            "body": data,
            "credentials": "include",
            "redirect": "follow"
        });
        const jsonData = await response.json();
        return jsonData;
    }

    return (
        <postContext.Provider value={{ getAllPosts, getAllPostsofFollowers, addPost }}>
            {props.children}
        </postContext.Provider>
    )
}

export { postContext, PostState }