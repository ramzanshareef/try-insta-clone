import { useState, useEffect } from "react";
import profilePhoto from "../images/demo-profile-pic.jpg"

const Stories = () => {
    const stories = [
        { id: 1, imageUrl: 'image1.jpg', username: 'user1' },
        { id: 2, imageUrl: 'image2.jpg', username: 'user2' },
        { id: 3, imageUrl: 'image3.jpg', username: 'user3' },
        { id: 4, imageUrl: 'image4.jpg', username: 'user4' },
        { id: 5, imageUrl: 'image5.jpg', username: 'user5' },
        { id: 6, imageUrl: 'image6.jpg', username: 'user6' },
        { id: 7, imageUrl: 'image7.jpg', username: 'user7' },
        { id: 8, imageUrl: 'image8.jpg', username: 'user8' },
        { id: 9, imageUrl: 'image9.jpg', username: 'user9' },
        { id: 10, imageUrl: 'image10.jpg', username: 'user10' },
        { id: 11, imageUrl: 'image11.jpg', username: 'user11' },
        { id: 12, imageUrl: 'image12.jpg', username: 'user12' },
        { id: 13, imageUrl: 'image13.jpg', username: 'user13' },
        { id: 14, imageUrl: 'image14.jpg', username: 'user14' },
        { id: 15, imageUrl: 'image15.jpg', username: 'user15' },
        { id: 16, imageUrl: 'image16.jpg', username: 'user16' },
        { id: 17, imageUrl: 'image17.jpg', username: 'user17' },
        { id: 18, imageUrl: 'image18.jpg', username: 'user18' },
        { id: 19, imageUrl: 'image19.jpg', username: 'user19' },
        { id: 20, imageUrl: 'image20.jpg', username: 'user20' },
    ];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [storiesPerPage, setStoriesPerPage] = useState(6);
    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth < 768) {
                setStoriesPerPage(4);
            } else if (screenWidth < 1024) {
                setStoriesPerPage(6);
            } else {
                setStoriesPerPage(8);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const totalPages = Math.ceil(stories.length / storiesPerPage);

    const handleNext = () => {
        if (currentIndex === totalPages - 1) {
            return setCurrentIndex(0)
        }
        setCurrentIndex(currentIndex + 1)
    };

    const handlePrev = () => {
        if (currentIndex === 0) {
            return setCurrentIndex(totalPages - 1)
        }
        setCurrentIndex(currentIndex - 1)
    };

    const visibleStories = stories.slice(currentIndex * storiesPerPage, (currentIndex + 1) * storiesPerPage);

    return (
        <div className="flex space-x-4 h-fit overflow-auto w-fit mx-auto pt-4">
            <button onClick={handlePrev} className="rounded-full border border-black w-fit h-fit my-auto ">&lt;</button>
            {visibleStories.map((story) => (
                <div key={story.id} className="flex flex-col items-center w-1/2">
                    <img
                        src={profilePhoto}
                        alt={story.username}
                        className="w-16 h-16 rounded-full border-2 object-cover cursor-pointer hover:scale-110 transition transform duration-200 ease-out"
                    />
                    <span className="text-sm mt-1">{story.username}</span>
                </div>
            ))}
            <button onClick={handleNext} className="rounded-full border border-black w-fit h-fit my-auto ">&gt;</button>
        </div>
    );
};

export default Stories;