import { h } from "../../core/vdom/h.js";
import { formatTime } from "../../utils/formatUtils.js";
import { TopicBadge } from "../TopicBadge/TopicBadge.js";
import { AuthorDetails } from "./AuthorDetails/AuthorDetails.js";
import { PostDropDown } from "./PostDropDown/PostDropDown.js";
import { useState } from "../../core/hooks/useState.js";
import { getState } from "../../core/GlobalStore.js";
import { PostStats } from "./PostStats/PostStats.js";
import { PostLikeButton } from "./PostLikeButton/PostLikeButton.js";
import { handleLikePost } from "../../handlers/posts/handleLikePost.js";
import { Modal } from "../Modal/Modal.js";
import { deletePost } from "../../api/postApi.js";
import { Toast } from "../Toast/Toast.js";
import { router } from "../../core/router.js";

export function PostCard(data){
    const topicCode = data.topicCode;
    const topicLabel = data.topicLabel;
    const content = data.postContent ?? data.content ?? "";
    const imgUrl = data.imgUrl;
    const author = data.userNickname ?? data.nickname ?? "";
    const isUserLiked = data.isUserLiked; 
    const postId = data.id;
    const createdAt = data.createdAt;
    const likeCounts = data.statsLikeCounts ?? 0;
    const viewCounts = data.statsViewCounts;
    const commentCounts = data.statsCommentCounts;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteToastOn, setIsDeleteToastOn]= useState(false);
    const [liked, setLiked] = useState(!!isUserLiked);
    const [likeCount, setLikeCount] = useState(likeCounts);

    const deleteToastMsg = "게시글이 삭제되었습니다.";

    console.log(data);

    const handleToggleDropDown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const handleToggleLike = async() => {
        const res = await handleLikePost({isUserLiked: liked, postId});
        if (res?.success) {
            setLiked(prev => !prev);
            setLikeCount(prev => prev + (liked? -1: 1));
        }
    }

    const handleDeletePost = async () => {
        const res = await deletePost(postId);
        if (!res?.success) {
            setIsModalOpen(false);
            return; 
        }
        setIsModalOpen(false);
        setIsDeleteToastOn(true);
        
    }

    return h(
        "section", 
        { className: "post-card" }, 
        TopicBadge({code: topicCode, label: topicLabel}),
        h("div", {className: "post-card-header"}, 
            AuthorDetails({nickname: author, profileImgUrl: imgUrl}),
            PostLikeButton({ isUserLiked: liked, onToggle: handleToggleLike}),
            h("span", {className: "created-at"}, formatTime(createdAt)),
        ),
        imgUrl
        ? h("img", { className: "post-card-image", src: imgUrl, alt: "post image" })
        : null,
        h("p", { className: "post-card-content"}, content),
        PostStats({like: likeCount, comment: commentCounts, view: viewCounts}), 
        data.userId === getState("userId")
        ? PostDropDown({
            isOpen: isDropdownOpen,
            onToggle: handleToggleDropDown, 
            clickEvents: {
                "edit": () => router.navigate(`/posts/${postId}/edit`), 
                "delete": () => setIsModalOpen(true)
            }
        })
        : null,
        isModalOpen
        ? Modal({
            titleMsg: "게시글을 삭제하시겠습니까?", 
            contentMsg: "삭제된 게시글은 복구될 수 없습니다.", 
            onClickConfirm: handleDeletePost, 
            onClickCancel: () => setIsModalOpen(false)
        })
        : null,
        isDeleteToastOn
        ? Toast({
            isToastOn: isDeleteToastOn, 
            setIsToastOn: setIsDeleteToastOn, 
            text: deleteToastMsg
        })
        : null
    )
}
