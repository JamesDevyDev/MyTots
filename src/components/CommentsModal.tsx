import React, { useState, useEffect } from "react";
import useInteractionStore from "@/utils/zustand/useInteractionStore";
import useAuthStore from "@/utils/zustand/useAuthUserStore";
import { Loader2 } from "lucide-react";

type CommentsModalProps = {
  post: any | null;
};

const CommentsModal = ({ post }: CommentsModalProps) => {
  const { authUser } = useAuthStore();
  const { getComments, addComment, currentComment } = useInteractionStore();

  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);

  const handleAddComment = async () => {
    if (!newComment.trim() || !post?._id || sendingComment) return;

    setSendingComment(true);
    await addComment({
      CommenterId: authUser?._id,
      PostId: post?._id,
      comment: newComment,
    });
    setNewComment("");

    // Re-fetch all comments after sending
    await getComments({ PostId: post._id });

    setSendingComment(false);
  };

  useEffect(() => {
    if (post?._id) {
      const load = async () => {
        setLoadingComments(true);
        await getComments({ PostId: post._id });
        setLoadingComments(false);
      };
      load();
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
          <label className="modal-backdrop" htmlFor="comments_modal">Close</label>
        </div>
      </>
    );
  }

  return (
    <>
      <input type="checkbox" id="comments_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-0 flex flex-col w-[80vw] md:w-[700px] max-h-[80vh] bg-neutral-700">

          {/* Post */}
          <div className={`relative w-full p-5 flex flex-col flex-none bungee-regular bg-${post.color}-300 text-black`}>
            <div className={`flex items-center justify-between px-4 py-2 rounded-t-xl text-sm md:text-lg bg-${post.color}-800 text-black`}>
              <div className="font-bold">{post.posterId?.username || "You"}</div>
              <div className="font-bold capitalize">Feeling {post.mood}</div>
            </div>

            <div className="mt-4 text-sm md:text-base break-words whitespace-pre-wrap max-h-[150px] overflow-y-auto pr-2">
              {post.content}
            </div>

            <div className="w-full flex items-center justify-between mt-4">
              <div className="text-sm text-gray-700 italic">
                {new Date(post.createdAt)
                  .toLocaleString("en-US", {
                    month: "short", day: "numeric", year: "numeric",
                    hour: "numeric", minute: "2-digit", hour12: true,
                  })
                  .replace(",", "")}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className={`flex-1 overflow-y-auto w-full px-5 py-4 space-y-3 bg-${post.color}-300 min-h-[50px]`}>
            {loadingComments ? (
              <div className="flex items-center justify-center h-full py-6">
                <Loader2 className="animate-spin text-gray-500 w-6 h-6" />
              </div>
            ) : currentComment?.length > 0 ? (
              currentComment.map((comment: any) => (
                <div key={comment._id} className="w-full bg-gray-100 rounded-lg px-3 py-2 shadow text-black">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {comment.CommenterId?.username || "Unknown"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }).replace(",", "")}
                    </span>
                  </div>
                  <p className="text-sm mt-1 break-all">{comment.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 font-bold">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Box */}
          {authUser && (
            <form
              onSubmit={(e) => { e.preventDefault(); handleAddComment(); }}
              className={`w-full px-5 py-3 border-t flex flex-col gap-2 bg-${post.color}-300`}
            >
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => {
                    if (e.target.value.length <= 500) setNewComment(e.target.value);
                  }}
                  disabled={sendingComment}
                  className="w-full border rounded-lg px-3 py-2 text-base text-black bg-white disabled:opacity-50 pr-16"
                />
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${newComment.length >= 500 ? "text-red-500 font-bold" : "text-gray-400"}`}>
                  {newComment.length}/500
                </span>
              </div>

              <div className="flex gap-2">
                <div className="flex-1" />
                <button
                  type="submit"
                  disabled={sendingComment || newComment.length === 0}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 flex items-center cursor-pointer justify-center min-w-[64px]"
                >
                  {sendingComment
                    ? <Loader2 className="animate-spin w-4 h-4" />
                    : "Send"
                  }
                </button>
              </div>
            </form>
          )}
        </div>

        <label className="modal-backdrop" htmlFor="comments_modal">Close</label>
      </div>
    </>
  );
};

export default CommentsModal;