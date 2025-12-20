import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { getPostDetail } from "../../api/postApi.js";
import { PostCard } from "../../components/Postcard/PostCard.js";

export function PostDetailPage(props){
    const [post, setPost] = useState(null);
    const { postId } = props?.params ?? {};

    console.log(postId, postId);

    useEffect(() => {
        if (typeof postId !== "string") return;

        const fetchPost = async () => {
            const res = await getPostDetail(postId);
            console.log(res);
            if (res?.success) {
                setPost(res.data);
            }
        };
        fetchPost();
    }, [postId]);

    return h("main", {
        className: "post-detail-page"
    }, 
        post
        ? PostCard(post)
        : h("main", {}, "로딩중 ... ")
    );
}
