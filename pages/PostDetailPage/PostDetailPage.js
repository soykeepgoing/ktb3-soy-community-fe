import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";
import { getPostDetail } from "../../api/postApi.js";
import { router } from "../../main.js";
import { PostCard } from "../../components/Postcard/PostCard.js";

export function PostDetailPage(){
    const [post, setPost] = useState(null);
    const { postId } = router.params ?? {};

    useEffect(() => {
        if (!postId) return;
        const fetchPost = async () => {
            const res = await getPostDetail(postId);
            console.log(res);
            if (res?.success) {
                setPost(res.data);
            }
        };
        fetchPost();
    }, [postId]);

    if (!postId) {
        return h("main", {}, "잘못된 경로입니다.");
    }

    if (!post) {
        return h("main", {}, "로딩 중...");
    }

    return h("main", {}, 
        PostCard(post)
    );
}
