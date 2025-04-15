import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // To get dynamic params from the route

import "../custom-css/PlantDetails.css";

const Comment = () => {
  const { plantId } = useParams(); // Get the plantId from the URL

  const token = localStorage.getItem("JWT_TOKEN");
  const csrfToken = localStorage.getItem("CSRF_TOKEN");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const [editCommentId, setEditCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  //this is only to authenticate an associated user with the comments
  //***************************** */
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/comment/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setCurrentUser(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);
  //******************************************* */

  useEffect(() => {
    fetch(`http://localhost:8080/api/comment/plant?plantId=${plantId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [plantId]);

  // ******* ADD COMMENT *******
  const handleAddComment = () => {
    const commentData = {
      commentContent: newComment,
      plantId,
    };

    fetch("http://localhost:8080/api/comment/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
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

  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (!confirmDelete) return;

    fetch("http://localhost:8080/api/comment/delete", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ id: commentId }),
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

  // ******* UPDATE COMMENT *******
  // ****** EDIT MODE ******
  const handleEditClick = (comment) => {
    setEditCommentId(comment.id);
    setEditCommentText(comment.commentContent);
  };

  // ****** CANCEL EDIT ******
  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditCommentText("");
  };

  // ****** SAVE EDITED COMMENT ******
  const handleSaveEdit = () => {
    fetch(`http://localhost:8080/api/comment/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": csrfToken,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        id: editCommentId, // ✅ include the ID in the body
        commentContent: editCommentText,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to update comment");
        return response.json();
      })
      .then((updatedComment) => {
        // Update the state with the edited comment
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === updatedComment.id ? updatedComment : comment
          )
        );
        setEditCommentId(null); // Reset the edit state
        setEditCommentText(""); // Clear the text area
      })
      .catch((err) => console.error("Edit error:", err));
  };

  return (
    <div
      style={{
        height: "30vh",
        overflowY: "auto",
        backgroundColor: "#f9f9f9",
        borderTop: "2px solid #ccc",
        padding: "2rem",
      }}
    >
      <h2 className="description-header">Community Tips </h2>
      <ul style={{ padding: "5px", marginBottom: "10px" }}>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.username}</strong> ~{" "}
            {editCommentId === comment.id ? (
              <>
                <textarea
                  value={editCommentText}
                  onChange={(e) => setEditCommentText(e.target.value)}
                  style={{ width: "60%" }}
                />
                <button onClick={handleSaveEdit} style={{ marginLeft: "5px" }}>
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  style={{ marginLeft: "5px" }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                "{comment.commentContent}"
                {currentUser && comment.userId === currentUser.id && (
                  <>
                    <button
                      style={{ marginLeft: "10px", color: "purple" }}
                      onClick={() => handleEditClick(comment)}
                    >
                      Edit
                    </button>
                    <button
                      style={{ marginLeft: "5px", color: "purple" }}
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          backgroundColor: "#EDE7F6",
        }}
      >
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          style={{
            marginTop: "1rem",
            marginBottom: "1rem",
            width: "50%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "white",
          }}
        />
        <button
          onClick={handleAddComment}
          style={{
            marginTop: "1rem",
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
