import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPost,
  getComments,
  getReplies,
  addComment,
  addReply,
} from "../services/api";
import MDEditor from "@uiw/react-md-editor";

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newReply, setNewReply] = useState("");
  const [isSelect, setIsSelect] = useState(-1);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(postId);
        const postData = response.data;
        setPost(postData);

        const commentResponse = await getComments(postId);
        const commentData = commentResponse.data;

        const commentsWithReplies = await Promise.all(
          commentData.map(async (comment) => {
            const replyResponse = await getReplies(postId, comment.c_id);
            const replyData = replyResponse.data;
            return { ...comment, replies: replyData };
          })
        );

        setComments(commentsWithReplies);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleEditPost = () => {
    // Implement the edit functionality here
    console.log("Edit post clicked");
  };

  const handleDeletePost = () => {
    // Implement the delete functionality here
    console.log("Delete post clicked");
  };
  const handleCreateReply = async (e) => {
    console.log(e);
    console.log(newReply);
    await addReply(
      postId,
      e,
      {
        r_content: newReply,
      },
      localStorage.getItem("access")
    );
    setNewReply("");
    //await addReply(postId, e, )
    window.location.reload();
  };
  const handleSelectReply = (e) => {
    setIsSelect(e);
  };
  const handleCommentSubmit = async () => {
    try {
      // Assuming your addComment function sends a POST request to add a new comment
      await addComment(
        postId,
        { contents: newComment },
        localStorage.getItem("access")
      );
      // After adding a new comment, refresh the comments

      // Clear the comment input
      setNewComment("");

      window.location.reload();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
          color: "#333",
        }}
      >
        {post ? (
          <>
            <div
              style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px" }}
            >
              <h2 style={{ color: "#333" }}>{post.b_title}</h2>
            </div>
            {post.b_contents ? (
              <div
                className="markdownDiv"
                data-color-mode="light"
                style={{
                  padding: "15px",
                  marginBottom: "20px",
                  backgroundColor: "#f9f9f9",
                  borderRadius: "8px",
                }}
              >
                <MDEditor.Markdown
                  style={{ padding: "10px", fontSize: "16px" }}
                  source={post.b_contents.replace(/\\n/g, "\n")}
                />
              </div>
            ) : (
              <p>No content available.</p>
            )}
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p>
              <strong>Updated At:</strong>{" "}
              {new Date(post.updatedAt).toLocaleString()}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <div style={{ textAlign: "right", marginTop: "10px" }}>
          <button
            onClick={handleEditPost}
            style={{
              padding: "10px 15px",
              fontSize: "13px",
              marginRight: "10px",
              backgroundColor: "#406893",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Update
          </button>
          <button
            onClick={handleDeletePost}
            style={{
              padding: "10px 15px",
              fontSize: "13px",
              backgroundColor: "#C0392B",
              color: "white",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Comment input section */}
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "#f5f5f5",
          border: "1px solid #ddd",
          borderRadius: "8px",
          padding: "20px",
        }}
      >
        <h3 style={{ color: "#333" }}>Add a Comment</h3>
        <textarea
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            resize: "vertical",
          }}
          placeholder="Write your comment here..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            backgroundColor: "#333344",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Submit Comment
        </button>
      </div>

      {comments.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "20px",
          }}
        >
          <h3 style={{ color: "#333" }}>Comments</h3>
          {comments.map((comment) => (
            <div
              key={comment.c_id}
              style={{
                display: "flex",
                flexDirection: "column",
                marginBottom: "15px",
              }}
            >
              <div
                onClick={() => handleSelectReply(comment.c_id)}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#fff",
                }}
              >
                <p>
                  <strong>user id:</strong> {comment.u_id}
                  <br />
                </p>
                <p>{comment.contents}</p>
                <p>
                  <strong style={{ fontSize: "12px" }}>Created:</strong>{" "}
                  <span style={{ fontSize: "12px" }}>
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </p>
                {isSelect === -1 ? (
                  ""
                ) : isSelect === comment.c_id ? (
                  <div>
                    <hr />
                    <h3 style={{ color: "#333" }}>Add a reply</h3>
                    <textarea
                      style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "10px",
                        borderRadius: "8px",
                        resize: "vertical",
                      }}
                      placeholder="Write your reply here..."
                      value={newReply}
                      onChange={(e) => setNewReply(e.target.value)}
                    />

                    <button
                      onClick={() => handleCreateReply(comment.c_id)}
                      style={{
                        padding: "10px 15px",
                        fontSize: "16px",
                        backgroundColor: "#333344",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Submit reply
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <div style={{ textAlign: "right", marginTop: "10px" }}>
                  {comment.replies.map((reply) => (
                    <div
                      key={reply.r_id}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "10px",
                        backgroundColor: "#f5f5f5",
                        marginTop: "10px",
                      }}
                    >
                      <p>
                        <strong>user id:</strong> {reply.u_id}
                        <br />
                        <br />
                        {reply.r_content}
                      </p>
                      <p>{reply.contents}</p>
                      <p>
                        <strong style={{ fontSize: "12px" }}>Created:</strong>{" "}
                        <span style={{ fontSize: "12px" }}>
                          {new Date(reply.createdAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;
