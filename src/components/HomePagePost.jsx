import React, { useContext, useEffect, useState } from "react"
import profilePhoto from "../images/demo-profile-pic.jpg"
import { postContext } from "../context/PostState";

const HomePagePost = () => {
    const { getAllPostsofFollowers } = useContext(postContext);
    const [posts, setPosts] = useState([]);
    const [messageToShow, setMessageToShow] = useState("Loading...");

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 5 && messageToShow !== "No more posts to show") {
            getAllPostsofFollowers()
                .then((res) => {
                    setTimeout(() => {
                        const newPosts = res.message.posts.filter((post) => !posts.some((p) => p._id === post._id));
                        if (newPosts.length > 0) {
                            setPosts(prevPosts => [...prevPosts, ...newPosts]);
                        }
                        else {
                            setMessageToShow("No more posts to show");
                        }
                    }, 500);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [posts]);

    useEffect(() => {
        if (posts.length === 0) {
            getAllPostsofFollowers()
                .then((res) => {
                    const newPosts = res.message.posts;
                    if (newPosts.length === 0) {
                        setMessageToShow("No posts to show");
                    }
                    setPosts(newPosts);
                })
                .catch((err) => console.log(err.message));
        }
    }, []);

    return (
        <>
            <div className="overflow-auto w-2/5 mx-auto" onScroll={handleScroll}>
                <div className="flex flex-col space-y-8 p-6">
                    {posts.length > 0 ?
                        posts.map((post, index) => (
                            <div key={index} className="p-4 border-2 border-gray-200 shadow-lg rounded-lg">
                                <div className="flex items-center mb-2">
                                    <img
                                        className="w-8 h-8 rounded-full mr-2"
                                        src={profilePhoto}
                                        alt={post.name}
                                    />
                                    <span className="font-semibold">{post.postedBy.name}</span>
                                </div>
                                {post.photo.contentType === "video/mp4" ?
                                    <video className="w-full rounded-md" controls>
                                        <source src={window.URL.createObjectURL(new Blob([Int8Array.from(post.photo.data.data)], { type: post.photo.contentType }))} type="video/mp4" />
                                    </video>
                                    :
                                    <img className="w-full rounded-md"
                                        src={`${window.URL.createObjectURL(new Blob([Int8Array.from(post.photo.data.data)], { type: post.photo.contentType }))}`
                                        }
                                        alt="Post"
                                    />
                                }
                                <div className="mt-2">
                                    <span className="font-semibold text-sm">{post.likes} likes</span>
                                    <span className="font-semibold text-sm mx-2">{post.comments.length} comments</span>
                                    <span className="block mt-1 text-sm"> <span className="font-semibold text-sm">{post.postedBy.name}</span> {post.caption}</span>
                                    <div className="mt-2">
                                        {post.comments.map((comment, index) => (
                                            <div key={index} className="flex items-center mt-1">
                                                <span className="font-semibold mr-1">{comment.username}</span>
                                                <span>{comment.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                        : <></>
                    }
                    <div className="text-center w-full">{messageToShow}</div>
                </div>
            </div>
        </>
    );
};

export default HomePagePost;