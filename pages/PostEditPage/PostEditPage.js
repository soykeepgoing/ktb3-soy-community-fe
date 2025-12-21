import { getPostDetail } from "../../api/postApi.js";
import { PostEditCard } from "../../components/PostEditCard/PostEditCard.js";
import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { handleImageChanged } from "../../handlers/handleImageChanged.js";
import { handleEditPost as submitEditPost } from "../../handlers/posts/handleEditPost.js";
import { Toast } from "../../components/Toast/Toast.js";
import { router } from "../../core/router.js";;

export function PostEditPage(props) {
    const [content, setContent] = useState(null);
    const [initialContent, setInitialContent] = useState(null);

    const [imgUrl, setImgUrl] = useState(null);
    const [initialImgUrl, setInitialImgUrl] = useState(null);
    const [imgFile, setImgFile] = useState(null);

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    
    const { postId } = props?.params ?? {};
    const [isToastOn, setIsToastOn] = useState(false);

    useEffect(() => {
        if (typeof postId !== "string") return; 

        const fetchPost = async() => {
            const res = await getPostDetail(postId);
            if (res?.success){
                console.log(res);
                const fetchedContent = res.data.content ?? "";
                setContent(fetchedContent);
                setInitialContent(fetchedContent);

                setImgUrl(res.data.imgUrl);
                setInitialImgUrl(res.data.imgUrl);
            }
        }

        fetchPost();
    }, [postId])

    useEffect(() => {
        if (initialContent === null && initialImgUrl === null) return;
        const isContentEqual = content === initialContent;
        const isImgEqual = imgUrl === initialImgUrl; 
        setIsButtonDisabled(isContentEqual && isImgEqual);
    }, [content, initialContent, imgUrl, initialImgUrl]);

    const handleContentChange = (event) => {
        setContent(event.target.value);
    }

    const handleImageChange = async (e) => {
        const { imageUrl, file } = await handleImageChanged(e);
        setImgUrl(imageUrl ?? null);
        setImgFile(file ?? null);
    }

    const handleSubmit = async (event) => {
        console.log(postId);
        event.preventDefault();
        const res = await submitEditPost({
            postContent: content, 
            postImageFile: imgFile,
            postId
        });

        if (res.success) {
            setIsToastOn(true);
            router.navigate(`/posts/${postId}`);
        }
    }

    return h("main", 
        {className: "post-edit-section"},
        h("h1", {}, "게시글 수정"),
        content !== null
        ? PostEditCard({
            content,
            imgUrl,
            isButtonDisabled: isButtonDisabled,
            onContentChange: handleContentChange,
            onImageChange: handleImageChange,
            onButtonClicked: handleSubmit
        })
        : h("main", {}, "로딩 중 ..."),
        ...(isToastOn
            ? [Toast({isToastOn, setIsToastOn, text: "게시글 수정 완료"})]
            : []
        )
    );
}
