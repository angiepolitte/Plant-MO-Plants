import zIndex from "@mui/material/styles/zIndex";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get dynamic params from the route

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

  const handleAddComment = () => {
    const commentData = {
      commentContent: newComment,
      plantId,
      userId: 1, // Assuming userId is 1 for now, replace as needed
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
      <h2>Comments for Plant {plantId}</h2>
      <ul>
        {comments.map((comment, index) => (
          <li key={comment.id || index}>
            <strong>User {comment.userId}</strong>: {comment.commentContent}
          </li>
        ))}
      </ul>
      <div>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Comment;
