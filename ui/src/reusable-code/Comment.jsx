import zIndex from "@mui/material/styles/zIndex";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get dynamic params from the route
const userId = 1;

const Comment = () => {
  const { plantId } = useParams(); // Get the plantId from the URL
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/comment/plant/${plantId}`)
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [plantId]);

  // ******* ADD COMMENT *******
  const handleAddComment = () => {
    const commentData = {
      commentContent: newComment,
      plantId,
      userId, // Assuming userId is 1 for now, replace as needed
    };

    fetch("http://localhost:8080/comment/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((response) => response.json())
      .then((data) => {
        setComments((prevComments) => [...prevComments, data]);
        setNewComment("");
      })
      .catch((error) => console.error("Error adding comment:", error));
  };

  // ******* DELETE COMMENT *******

  const handleDeleteComment = (commentId, userId) => {
    fetch("http://localhost:8080/comment/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: commentId, userId }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete");
        return response.text();
      })
      .then(() => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "33vh",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        borderTop: "2px solid #ccc",
        padding: "1rem",
      }}
    >
      <h2>Community Tips for Plant {plantId}</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={comment.id || index}>
            <strong>User {comment.userId}</strong> ~ "{comment.commentContent}"
            {comment.userId === userId && (
              <button
                style={{ marginLeft: "10px", color: "purple" }}
                onClick={() => handleDeleteComment(comment.id, userId)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "1rem",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EDE7F6",
        }}
      >
        <textarea
          style={{
            marginTop: "1rem",
            width: "50%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button
          onClick={handleAddComment}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#E0F2F1",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default Comment;
