import React, { useContext, useState } from "react";
import CloseButton from "../images/CloseButton";
import { SuccessModal } from "./SuccesModal";
import { Error } from "./ErrorModal";
import { postContext } from "../context/PostState";

const CreatePostModal = ({ isOpen, onClose }) => {
    const { addPost } = useContext(postContext);
    const [showSuccess, setShowSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [imageURL, setImageURL] = useState(null);
    const [post, setPost] = useState({
        caption: "",
        photo: null
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setImageURL(imageURL);
        setPost({ ...post, photo: file });
        console.log(post)
    };

    const handleOnChange = (e) => {
        setPost({ ...post, caption: e.target.value });
    }

    const handlePost = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        formData.append("photo", post.photo);
        formData.append("caption", post.caption);
        addPost(formData)
            .then((res)=>{
                setMessage(res.message);
                setShowSuccess(true);
                setTimeout(() => {
                    onClose();
                    setImageURL(null);
                }, 1000);
            })
    };

    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 bg-gray-500 bg-opacity-40 flex items-center justify-center">
                    <div className="w-4/5 lg:w-2/5 mx-auto p-6 mt-10 bg-white shadow-md rounded-md overflow-y-auto max-h-screen">
                        <h2 className="text-2xl font-semibold mb-4">Create a Post
                            <button className="relative float-right m-2 text-gray-500 hover:text-gray-700" onClick={() => {
                                onClose();
                                setImageURL(null);
                            }}>
                                {<CloseButton />}
                            </button>
                        </h2>
                        <form className="flex flex-col space-y-4" encType="multipart/form-data" method="POST" onSubmit={handlePost}>
                            <div className="flex flex-row space-x-2">
                                {imageURL ? (
                                    <div className="relative w-1/2">
                                        <button className="absolute top-0 left-0 p-2 text-gray-500 hover:text-gray-700" onClick={() => setImageURL(null)}>
                                            <CloseButton />
                                        </button>
                                        <img src={imageURL} alt="Uploaded Image" className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    // this is image upload button
                                    <div className="w-1/2">
                                        <input type="file" name="photo" className="border border-gray-300 p-2 rounded w-full h-full" accept=".jpeg, .png, .jpg" onChange={handleImageChange} />
                                    </div>
                                )}
                                <div className="w-1/2">
                                    <textarea type="text" name="caption" id="caption" placeholder="Caption" className="border border-gray-300 p-2 rounded w-full h-full" onChange={handleOnChange} />
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end">Post</button>
                        </form>
                    </div>
                    <SuccessModal showSuccess={showSuccess} message={message} onClose={() => setShowSuccess(false)} />
                    <Error showError={showError} error={error} onClose={() => setShowError(false)} />
                </div>
            )}
        </>
    );
};

export default CreatePostModal;