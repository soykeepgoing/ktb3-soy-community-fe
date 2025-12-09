import { TopicBadge } from "../../TopicBadge/TopicBadge.js";
import { createDom } from "../../../core/Renderer.js";

export function PostItem(data){
    const id = data.id;
    const content = data.content;
    const imageUrl = data.postImgUrl;
    const topicCode = data.topicCode;
    const topicLabel = data.topicLabel;
    const userNickname = data.userNickname;
    const userProfileImgUrl = data.userProfileImgUrl;

    const postItemImage = PostItemImage(imageUrl);
    const postItemText = PostItemText({content, topicCode, topicLabel, userNickname, userProfileImgUrl});
    const div = document.createElement("div");
    div.classList.add("postItem");
    div.appendChild(postItemImage);
    div.appendChild(postItemText);
    return div;
}

function PostItemImage(imageUrl){
    const postItemImageData = PostItemImageData(imageUrl);
    const div = document.createElement("div");
    div.classList.add("image");
    div.appendChild(postItemImageData);
    return div;    
}

function PostItemImageData(imageUrl){
    const img = document.createElement("img");
    img.className = "data";
    img.src = imageUrl;
    return img;    
}

function PostItemText({content, topicCode, topicLabel, userNickname, userProfileImgUrl}){
    const postItemTextLeft = PostItemTextLeft({content, topicCode, topicLabel});
    const postItemTextRight = PostItemTextRight(userNickname, userProfileImgUrl);

    const postItem = document.createElement("div");
    postItem.classList.add("text");
    postItem.appendChild(postItemTextLeft);
    postItem.appendChild(postItemTextRight);
    
    return postItem;
}

function PostItemTextLeft({content, topicCode, topicLabel}){
    const postItemTextLeft = document.createElement("div");
    postItemTextLeft.classList.add("left");
    postItemTextLeft.appendChild(PostItemTopicLabel(topicCode, topicLabel));
    postItemTextLeft.appendChild(PostItemContentPreview(content));
    return postItemTextLeft;
}

function PostItemTextRight(nickname, userProfileImgUrl){
    const postItemTextRight = document.createElement("div");
    postItemTextRight.classList.add("right");
    postItemTextRight.appendChild(PostItemAuthor(nickname));
    postItemTextRight.appendChild(PostItemUserImgProfile(userProfileImgUrl));
    return postItemTextRight;  
}

function PostItemTopicLabel(topicCode, topicLabel){
    const badge = createDom(TopicBadge(topicLabel, topicCode));
    return badge;
}

function PostItemContentPreview(content){
    const p = document.createElement("p");
    p.classList.add("preview-body");
    p.innerHTML = content;
    return p;
}

function PostItemAuthor(nickname){
    const p = document.createElement("p");
    p.classList.add("author");
    p.innerHTML = nickname;
    return p;
}


function PostItemUserImgProfile(imageUrl){
    const imgData = PostItemUserImgProfileData(imageUrl);
    const div = document.createElement("div");
    div.classList.add("userProfile");
    div.appendChild(imgData);
    return div;    
}

function PostItemUserImgProfileData(imageUrl){
    const img = document.createElement("img");
    img.className = "data";
    img.src = imageUrl;
    return img;    
}
