import { h } from "../../core/vdom/h.js";
import { formatTime } from "../../utils/formatUtils.js";
import { TopicBadge } from "../TopicBadge/TopicBadge.js";
import { AuthorDetails } from "./AuthorDetails/AuthorDetails.js";
import { PostDropDown } from "./PostDropDown/PostDropDown.js";
import { PostLikeButton } from "./PostLikeButton/PostLikeButton.js";
import { useState } from "../../core/hooks/useState.js";
import { getState } from "../../core/GlobalStore.js";
import { PostStats } from "./PostStats/PostStats.js";

export function PostCard(data){

    // content
    // createdAt
    // id
    // imgUrl
    // isUserLiked
    // statsCommentCounts
    // statsLikeCounts
    // statsViewCounts
    // topicCode
    // topicLabel
    // userId
    // userNickname
    // userProfileImgUrl

    const topicCode = data.topicCode;
    const topicLabel = data.topicLabel;
    const content = data.postContent ?? data.content ?? "";
    const imgUrl = data.postImgUrl ?? data.imageUrl ?? data.imgUrl;
    const author = data.userNickname ?? data.nickname ?? "";
    const isUserLiked = data.isUserLiked; 
    const postId = data.id;
    const createdAt = data.createdAt;
    const likeCounts = data.statsLikeCounts;
    const viewCounts = data.statsViewCounts;
    const commentCounts = data.statsCommentCounts;

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    console.log(data);

    const handleToggleDropDown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    return h(
        "section", 
        { className: "post-card" }, 
        TopicBadge({code: topicCode, label: topicLabel}),
        h("div", {className: "post-card-header"}, 
            AuthorDetails({nickname: author, profileImgUrl: imgUrl}),
            PostLikeButton({ isUserLiked, postId}),
            h("span", {className: "created-at"}, formatTime(createdAt)),
        ),
        imgUrl ? h("img", { className: "post-card-image", src: imgUrl, alt: "post image" }) : null,
        h("p", { className: "post-card-content"}, content),
        PostStats({like: likeCounts, comment: commentCounts, view: viewCounts}), 
        data.userId === getState("userId")
        ? [ PostDropDown({
            isOpen: isDropdownOpen,
            onToggle: handleToggleDropDown, 
            clickEvents: {
                "edit": () => console.log("edit"), 
                "delete": () => console.log("delete")
            }
        })]
        : null
    )
}
