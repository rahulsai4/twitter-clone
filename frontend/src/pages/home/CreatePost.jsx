import { CiImageOn } from "react-icons/ci";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";
import { useAuthUser } from "../../hooks/useAuthUser.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CreatePost = () => {
    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const imgRef = useRef(null);

    const { authUser } = useAuthUser();
    const queryClient = useQueryClient();

    const {
        mutate: createPost,
        isPending,
        isError,
        error,
    } = useMutation({
        mutationFn: async ({ text, img }) => {
            try {
                const res = await fetch("/api/posts/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        text,
                        img,
                    }),
                });
                const data = await res.json();
                if (!res.ok || data.error) throw new Error(data.error);
                return data;
            } catch (error) {
                toast.error(error.message || "Failed to create post");
                throw error;
            }
        },
        onSuccess: () => {
            setText("");
            setImg(null);
            imgRef.current.value = null;
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            toast.success("Post created successfully");
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        createPost({ text, img });
    };

    const handleImgChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex p-4 items-start gap-4 border-b border-gray-700">
            <div className="avatar">
                <div className="w-8 rounded-full">
                    <img
                        src={authUser.profileImg || "/avatar-placeholder.png"}
                    />
                </div>
            </div>
            <form
                className="flex flex-col gap-2 w-full"
                onSubmit={handleSubmit}
            >
                <TextareaAutosize
                    className="w-full p-0 text-lg border-none focus:outline-none bg-transparent"
                    placeholder="What is happening?!"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    minRows={1}
                    maxRows={10}
                />
                {img && (
                    <div className="relative w-72 mx-auto">
                        <IoCloseSharp
                            className="absolute top-0 right-0 text-white bg-gray-800 rounded-full w-5 h-5 cursor-pointer"
                            onClick={() => {
                                setImg(null);
                                imgRef.current.value = null;
                            }}
                        />
                        <img
                            src={img}
                            className="w-full mx-auto h-72 object-contain rounded"
                        />
                    </div>
                )}

                <div className="flex justify-between border-t py-2 border-t-gray-700">
                    <div className="flex gap-1 items-center">
                        <CiImageOn
                            className="fill-primary w-6 h-6 cursor-pointer"
                            onClick={() => imgRef.current.click()}
                        />
                        <BsEmojiSmileFill className="fill-primary w-5 h-5 cursor-pointer" />
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        ref={imgRef}
                        onChange={handleImgChange}
                    />
                    <button className="btn btn-primary rounded-full btn-sm text-white px-4">
                        {isPending ? "Posting..." : "Post"}
                    </button>
                </div>
                {isError && <div className="text-red-500">{error.message}</div>}
            </form>
        </div>
    );
};
export default CreatePost;
