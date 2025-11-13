import { getPostDetail } from "../../api/postApi.js";

export async function handlePostDetailView(postId){
  try {
    return await getPostDetail(postId);
  } catch (err) {
    console.log("게시글 상세 조회 실패", err);
  }
}
