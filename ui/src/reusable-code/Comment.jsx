import { useState, useEffect } from 'react';

export default function Comment({ plantId }) {
    const [angieComment, setAngieComment] = useState("");
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [updateComment, setUpdateComment] = useState('');
    const [commentId, setCommentId] = useState(null);
    const [selectedCommentId, setSelectedCommentId] = useState(null);
    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    
    

  // Fetch Angie's comment
  useEffect(() => {
    fetch("http://localhost:8080/comment/Angie")
      .then((response) => response.text())
      .then((data) => setAngieComment(data))
      .catch((error) => console.error("Error fetching Angie's comment:", error));
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(plantId ? `http://localhost:8080/comment/plant/${plantId}` : "http://localhost:8080/comment/all");
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [plantId]);

  // Create a comment
  const createComment = async () => {
    if (newComment.trim()) {
      const comment = { text: newComment, plantId: plantId }; // Add plantId to the comment
      try {
        await fetch('http://localhost:8080/comment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        });
        setNewComment('');
        fetchComments(); // Refresh comments
      } catch (error) {
        console.error('Error creating comment:', error);
      }
    }
  };

  // Update a comment
  const updateCommentById = async () => {
    if (commentId && updateComment.trim()) {
      try {
        await fetch(`http://localhost:8080/comment/${commentId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: updateComment }),
        });
        setUpdateComment('');
        setCommentId(null);
        setShowUpdate(false);
        fetchComments(); // Refresh comments
      } catch (error) {
        console.error("Error updating comment:", error);
      }
    }
  };

  // Delete a comment
  const deleteCommentById = async () => {
    if (selectedCommentId) {
      const confirmDelete = window.confirm("Are you sure you want to delete this comment?");
      if (confirmDelete) {
        try {
          await fetch(`http://localhost:8080/comment/${selectedCommentId}`, {
            method: "DELETE",
          });
          setShowDelete(false);
          fetchComments(); // Refresh comments
        } catch (error) {
          console.error("Error deleting comment:", error);
        }
      }
    }
  };

  return (
    <div>
        <div>
        <h2>Angie's Comment</h2>
        <p>{angieComment || "No comment available."}</p>
      </div>
      <h2>Comments for Plant {plantId ? `#${plantId}` : 'All Plants'}</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.comment_content}
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={() => { setShowCreate(true); setShowUpdate(false); setShowDelete(false); }}>Create a Comment</button>
        <button onClick={() => { setShowCreate(false); setShowUpdate(true); setShowDelete(false); }}>Update a Comment</button>
        <button onClick={() => { setShowCreate(false); setShowUpdate(false); setShowDelete(true); }}>Delete a Comment</button>
      </div>

      <div>
        {showCreate && (
          <div>
            <input
              type="text"
              placeholder="Enter new comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button onClick={createComment}>Create Comment</button>
          </div>
        )}

        {showUpdate && (
          <div>
            <select value={commentId} onChange={(e) => setCommentId(e.target.value)}>
              <option value="">Select a comment to update</option>
              {comments.map((comment) => (
                <option key={comment.id} value={comment.id}>{comment.comment_content}</option>
              ))}
            </select>
            {commentId && (
              <div>
                <input
                  type="text"
                  placeholder="Update comment"
                  value={updateComment}
                  onChange={(e) => setUpdateComment(e.target.value)}
                />
                <button onClick={updateCommentById}>Update Comment</button>
              </div>
            )}
          </div>
        )}

        {showDelete && (
          <div>
            <select value={selectedCommentId} onChange={(e) => setSelectedCommentId(e.target.value)}>
              <option value="">Select a comment to delete</option>
              {comments.map((comment) => (
                <option key={comment.id} value={comment.id}>{comment.comment_content}</option>
              ))}
            </select>
            <button onClick={deleteCommentById}>Delete Comment</button>
          </div>
        )}
      </div>
    </div>
  );
}