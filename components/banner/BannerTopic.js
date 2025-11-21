export function BannerTopicLabel(){
    const p = document.createElement("p");
    p.classList.add("banner__topic_label");
    p.innerHTML = `셀프 칭찬 커뮤니티: Dancing Tomato Club`;
    return p;
}

export function BannerTopicText(){
    const p = document.createElement("p");
    p.classList.add("banner__topic_text");
    p.innerHTML = `케첩도 주스도 아닌, 춤추는 토마토가 되어보세요`;
    return p;
}