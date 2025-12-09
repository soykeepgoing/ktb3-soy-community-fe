import { h } from "../../core/vdom/h.js";
import { Header } from "../../components/Header/Header/Header.js"
import { BannerSection } from "../../components/Banner/BannerSection/BannerSection.js";
import { FeedSection } from "../../components/FeedSection/FeedSection.js";
import { FloatingButton } from "../../components/FloatingButton/FloatingButton.js";

export function PostFeedPage() {
  return h("div", { className: "page-container" },
    Header(),

    h("main", { className: "feed-page__content" },
      BannerSection(),
      FeedSection(),
      FloatingButton({
        value: "+",
        url: "/posts/create"
      })
    )
  );
}
