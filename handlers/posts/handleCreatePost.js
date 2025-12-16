import { createPost } from "../../api/postApi.js";

export async function handleCreatePost({ topicCode, postContent, postImageFile }) {
    const formData = new FormData();

    const newPost = {
        topicCode,
        postContent
    };

    formData.append(
        "data",
        new Blob([JSON.stringify(newPost)], { type: "application/json" })
    );

    if (postImageFile) {
        formData.append("postImgFile", postImageFile);
    }

    return await createPost(formData);
}
