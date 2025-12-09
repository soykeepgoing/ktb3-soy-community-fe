import { h } from "../../core/vdom/h.js";
import { useState } from "../../core/hooks/useState.js";
import { useEffect } from "../../core/hooks/useEffect.js";

import { getPosts } from "../../api/postApi.js";
import { PostItem } from "../PostItem/PostItem/PostItem.js";

const DEFAULT_SIZE = 8;

export function FeedSection(){
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const loadMore = async () => {
        if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await getPosts(pageXOffset, DEFAULT_SIZE);
            const newPosts = response.data.postItemResponseList;

            console.log(newPosts);

            if (newPosts.length === 0){
                setHasMore(false);
            } else {
                setPosts(prevPosts => [...prevPosts, ...newPosts]);
                setPage(prevPage => prevPage + 1);
            }
        } catch (error){
            console.error("Failed to load posts, ", error);
        } finally {
            console.log(posts);
            setLoading(false);
        }
    };

    useEffect(() => {
        const observerTarget = document.getElementById("scrollObserver");
        if (!observerTarget) return; 

        const observer = new IntersectionObserver(
            async (entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    console.log("hi");
                    await loadMore();
                }
            }, 
            { threshold: 0.1 }
        );

        observer.observe(observerTarget);
        return () => observer.disconnect();
    }, [page, hasMore, loading]);

    return h(
        "section", 
        {className: "feedSection"}, 
        h("div", {className: "postItemContainer", id: "postItemContainer"}, 
            ...posts.map(post => PostItem(post))
        ), 
        h("div", {
            id: "scrollObserver", 
            className: "scrollObserver", 
        }, loading ? "Loading ... ": "")
    );
}