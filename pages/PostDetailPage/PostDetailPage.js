import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { getPostDetail } from "../../api/postApi.js";
import { PostCard } from "../../components/Postcard/PostCard.js";
import { CommentSection } from "../../components/PostComments/CommentSection.js";

export function PostDetailPage(props){
    const [post, setPost] = useState(null);
    const { postId } = props?.params ?? {};

    useEffect(() => {
        if (typeof postId !== "string") return;

        const fetchPost = async () => {
            const res = await getPostDetail(postId);
            if (res?.success) {
                setPost(res.data);
            }
        };
        fetchPost();
    }, [postId]);

    return h("main", {
        className: "post-detail-page"
    }, 
        ...(post
            ? [
                PostCard(post),
                CommentSection({ postId })
            ]
            : [
                h("main", {}, "로딩중 ... ")
            ]
        )
    );
}
