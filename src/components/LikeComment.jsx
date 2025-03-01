import React, { useState, useEffect } from "react";
import useAuthStore from "../zustand/useAuthStore";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";

const LikeComment = ({ commentId }) => {
  const apiKey = import.meta.env.VITE_SERVER_URL;

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // 인가
  const refreshToken = useAuthStore((state) => state.token); // 리프레쉬 토큰
  const accessToken = useAuthStore((state) => state.accessToken); // 유저 토큰

  const [likes, setLikes] = useState(0); // 댓글 좋아요 수
  const [liked, setLiked] = useState(false); // 댓글 좋아요 상태

  // 댓글 좋아요 수, 상태 READ
  const getLikes = async () => {
    try {
      const { data } = await axios.get(`${apiKey}/api/comment/likes/count`, {
        headers: {
          "Content-Type": "application/json",
          AccessToken: accessToken ? accessToken : undefined,
          RefreshToken: refreshToken ? refreshToken : undefined,
        },
      });
      setLikes(data.data.likeCount);
      setLiked(data.data.liked);
      // console.log("댓글 좋아요 조회 성공");
    } catch (error) {
      console.error("댓글 좋아요 조회 실패:", error);
    }
  };

  // 댓글 좋아요 수 UPDATE
  const onLikeHandler = async () => {
    try {
      const response = await axios.post(
        `${apiKey}/api/comment/likes/toggle`,
        { commentId: commentId.id },
        {
          headers: {
            "Content-Type": "application/json",
            AccessToken: accessToken ? accessToken : undefined,
            RefreshToken: refreshToken ? refreshToken : undefined,
          },
        }
      );
      setLiked(response.data.data.liked);
      setLikes(response.data.data.likeCount);
      // console.log("댓글 좋아요 업데이트 성공");
    } catch (error) {
      console.error("댓글 좋아요 업데이트 실패:", error);
    }
  };

  useEffect(() => {
    getLikes();
  }, [isAuthenticated, refreshToken, accessToken, commentId]);

  return (
    <div>
      {/* 댓글 좋아요 버튼 */}
      <button
        className="text-slate-500"
        onClick={onLikeHandler}
        disabled={!isAuthenticated}
      >
        <AiFillLike />
      </button>
      {/* 댓글 좋아요 수 */}
      <span className="m-1 text-slate-500">{likes}</span>
    </div>
  );
};

export default LikeComment;
