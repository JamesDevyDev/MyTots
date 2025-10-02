import React, { useState, useEffect } from "react";
import useInteractionStore from "@/utils/zustand/useInteractionStore";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import usePostStore from "@/utils/zustand/usePostStore";

type CommentsModalProps = {
  post: any | null;
};

const CommentsModal = ({ post }: CommentsModalProps) => {
  const { getAllPost } = usePostStore()
  const { authUser } = useAuthStore();
  const { getComments, addComment, currentComment } = useInteractionStore();

  const [newComment, setNewComment] = useState("");

  const handleAddComment = async () => {
    if (!newComment.trim() || !post?._id) return;

    addComment({
      CommenterId: authUser?._id,
      PostId: post?._id,
      comment: newComment,
    });
    await getAllPost();
    setNewComment("");
  };

  useEffect(() => {
    if (post?._id) {
      getComments({ PostId: post._id });
    }
  }, [post]);

  if (!post) {
    return (
      <>
        <input type="checkbox" id="comments_modal" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <p>No post selected</p>
          </div>
          <label className="modal-backdrop" htmlFor="comments_modal">
            Close
          </label>
        </div>
      </>
    );
  }

  return (
    <>
      <input type="checkbox" id="comments_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-0 flex flex-col w-[80vw] md:w-[700px] max-h-[80vh]">
          {/* Post */}
          <div
            className={`relative w-full rounded-xl p-5 flex flex-col flex-none bungee-regular bg-${post.color}-300 text-black`}
          >
            {/* Header */}
            <div
              className={`flex items-center justify-between px-4 py-2 rounded-t-xl text-sm md:text-lg bg-${post.color}-800 text-black`}
            >
              <div className="font-bold">
                {post.posterId?.username || "You"}
              </div>
              <div className="font-bold capitalize">Feeling {post.mood}</div>
            </div>

            {/* Content */}
            <div className="mt-4 text-sm md:text-base break-words whitespace-pre-wrap max-h-[150px] overflow-y-auto pr-2">
              {post.content}
            </div>

            {/* Date */}
            <div className="w-full flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700 italic">
                {new Date(post.createdAt)
                  .toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })
                  .replace(",", "")}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="flex-1 overflow-y-auto w-full px-5 py-4 space-y-3">
            {currentComment?.length > 0 ? (
              currentComment.map((comment: any) => (
                <div
                  key={comment._id}
                  className="w-full bg-gray-100 rounded-lg px-3 py-2 shadow text-black"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {comment.CommenterId?.username || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Box */}
          <div className="w-full px-5 py-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring focus:ring-blue-300 bg-white"
            />
            <button
              onClick={handleAddComment}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>

        {/* Backdrop */}
        <label className="modal-backdrop" htmlFor="comments_modal">
          Close
        </label>
      </div>
    </>
  );
};

export default CommentsModal;
