import { h } from "../../core/vdom/h.js";
import { TopicBadge } from "../TopicBadge/TopicBadge.js";
import { AuthorDetails } from "./AuthorDetails/AuthorDetails.js";
import { LikeActions } from "./LikeActions/LikeActions.js";

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

    console.log(data);

    return h(
        "section", 
        { className: "post-card" }, 
        TopicBadge({code: topicCode, label: topicLabel}),
        AuthorDetails({nickname: author, profileImgUrl: imgUrl}),
        LikeActions({ isUserLiked, postId}),
        h("p", { className: "post-card__content"}, content),
        imgUrl ? h("img", { className: "post-card__image", src: imgUrl, alt: "post image" }) : null,
        author ? h("p", { className: "post-card__author"}, `by ${author}`) : null
    );
}
