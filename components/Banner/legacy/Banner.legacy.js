import { BannerTopicLabel, BannerTopicText } from "./BannerTopic.legacy.js";

export function Banner() {
    const section = document.createElement("section");
    section.classList.add("banner__section");

    section.appendChild(BannerTopicLabel());
    section.appendChild(BannerTopicText());

    return section;
}
