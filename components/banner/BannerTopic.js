export function BannerTopicLabel(){
    const p = document.createElement("p");
    p.classList.add("banner__topic_label");
    p.innerHTML = `셀프 칭찬 커뮤니티: Dancing Tomato Club`;
    return p;
}

export function BannerTopicText(){
    const p = document.createElement("p");
    p.classList.add("banner__topic_text");
    p.innerHTML = `우리는 모두 각자의 리듬으로 춤추는 토마토, 여기서 나를 칭찬해보세요.`;
    return p;
}