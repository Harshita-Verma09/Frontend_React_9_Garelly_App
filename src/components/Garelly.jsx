import React, { useState } from "react";

const Garelly = () => {
    const [search, setSearch] = useState("");
    const [images, setImage] = useState([]);

    const myFun = async () => {
        if (!search.trim()) {
            alert("Please enter a valid search term");
            return;
        }
        try {
            const response = await fetch(
                `https://pixabay.com/api/?key=48722111-bcc658000d5779fe7e239b46b&q=${search}`
            );
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
            const data = await response.json();
            // FIX: API response me `hits` hota hai, `hit` nahi
            setImage(data.hits);
        } catch (err) {
            console.log(err);
        }
    };

    const handleInput = (e) => {
        setSearch(e.target.value);
    };
    const handleDownload = async (imageUrl, imageName) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = imageName || "downloaded-image.jpg"; // Default name if not provided
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    return (
        <div>
            <div className='bg-[url("https://cdn.pixabay.com/photo/2024/06/07/14/45/winter-8814783_1280.jpg")] bg-cover bg-center h-[36rem] w-full'>
                <nav className="text-white font-bold backdrop-blur-md flex items-center justify-between p-4 shadow-md">
                    <ul className="flex items-center gap-4 w-full">
                        <li className="text-lg font-semibold">Pixabay</li>
                        <li className="flex-1">
                            <input
                                onChange={handleInput}
                                value={search}
                                type="text"
                                placeholder="Search for free images"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                            />
                        </li>
                        <button
                            onClick={myFun}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                        >
                            Search
                        </button>
                    </ul>
                </nav>
                <div className="text-white font-bold flex items-center justify-center text-3xl h-[20rem] text-center">
                    Stunning royalty-free images & royalty-free stock
                </div>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} className="flex flex-col items-center">
                            {/* Image */}
                            <img
                                src={image.webformatURL}
                                alt="Downloaded from Pixabay"
                                className="w-full h-auto rounded-md shadow-md"
                            />

                            {/* Download Button */}
                            <button
                                onClick={() => handleDownload(image.largeImageURL, `pixabay-${index}.jpg`)}
                                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                            >
                                Download
                            </button>

                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No image found</p>
                )}
            </div>

        </div>
    );
};

export default Garelly;
