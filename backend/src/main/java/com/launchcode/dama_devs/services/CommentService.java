package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Comment;
import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.CommentRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import com.launchcode.dama_devs.models.dto.CommentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRepository plantRepository;

    // Fetch all comments
    public List<Comment> getAllComments() {
        return (List<Comment>) commentRepository.findAll();
    }

    // Fetch a comment by ID
    public Optional<Comment> getCommentById(int id) {
        return commentRepository.findById(id);
    }

    // Create a new comment
//    public Comment createComment(Comment comment) {
//        return commentRepository.save(comment);
//    }

    public Comment createComment(CommentDTO commentDTO) {
        Optional<User> userOpt = userRepository.findById(commentDTO.getUserId());
        Optional<Plant> plantOpt = plantRepository.findById(commentDTO.getPlantId());

        if (userOpt.isEmpty() || plantOpt.isEmpty()) {
            throw new IllegalArgumentException("User or Plant not found.");
        }
        Comment comment = new Comment(
                userOpt.get(),
                plantOpt.get(),
                commentDTO.getCommentContent()
        );
        return commentRepository.save(comment);
    }


    // Update an existing comment
    public String updateComment(int commentId, String newContent) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isPresent()) {
            Comment comment = commentOpt.get();
            comment.setCommentContent(newContent); // Update content without user check
            commentRepository.save(comment);
            return "Comment updated successfully!";
        } else {
            return "Comment not found.";
        }
    }

    // Delete a comment
    public String deleteComment(int commentId) {
        Optional<Comment> commentOpt = commentRepository.findById(commentId);
        if (commentOpt.isPresent()) {
            commentRepository.delete(commentOpt.get()); // No user check, just delete
            return "Comment deleted successfully!";
        } else {
            return "Comment not found.";
        }
    }


//    // Update an existing comment
//    public String updateComment(int commentId, int userId, String newContent) {
//        Optional<Comment> commentOpt = commentRepository.findById(commentId);
//        if (commentOpt.isPresent()) {
//            Comment comment = commentOpt.get();
//            if (comment.getUser().getUserId() == userId) {
//                comment.setCommentContent(newContent);
//                commentRepository.save(comment);
//                return "Comment updated successfully!";
//            } else {
//                return "You cannot update someone else's comment.";
//            }
//        } else {
//            return "Comment not found.";
//        }
//    }

//    // Delete a comment
//    public String deleteComment(int commentId, int userId) {
//        Optional<Comment> commentOpt = commentRepository.findById(commentId);
//        if (commentOpt.isPresent()) {
//            Comment comment = commentOpt.get();
//            if (comment.getUser().getUserId() == userId) {
//                commentRepository.delete(comment);
//                return "Comment deleted successfully!";
//            } else {
//                return "You cannot delete someone else's comment.";
//            }
//        } else {
//            return "Comment not found.";
//        }
//    }
}
