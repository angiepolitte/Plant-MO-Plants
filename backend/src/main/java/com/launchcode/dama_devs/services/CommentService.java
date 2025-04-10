package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Comment;
import com.launchcode.dama_devs.models.Plant;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.CommentRepository;
import com.launchcode.dama_devs.models.data.PlantRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import com.launchcode.dama_devs.models.dto.CommentDTO;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PlantRepository plantRepository;

    public List<CommentDTO> getCommentsByPlantId(int plantId) {
        List<Comment> comments = commentRepository.findByPlantId(plantId);
        return comments.stream()
                .map(comment -> new CommentDTO(
                        comment.getId(),
                        comment.getCommentContent(),
                        comment.getPlant().getId(),
                        comment.getUser().getUserId(),
                        comment.getUser().getUsername()))
                .collect(Collectors.toList());
    }

    public CommentDTO addComment(Comment comment) {
        Comment savedComment = commentRepository.save(comment);
        return new CommentDTO(
                savedComment.getId(),
                savedComment.getCommentContent(),
                savedComment.getPlant().getId(),
                savedComment.getUser().getUserId(),
                savedComment.getUser().getUsername());
    }

    @Transactional
    public void deleteComment (int commentId, Integer userId) {
        Optional<Comment> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            if (comment.getUser().getUserId().equals(userId)) {
                commentRepository.delete(comment);
            } else {
                throw new SecurityException("Not so fast.  You are not authorized to delete this comment");
            }
         } else {
            throw new IllegalArgumentException("Woopsies.  No comment found with id: " + commentId);
        }
    }


    public CommentDTO addCommentFromDTO(CommentDTO commentDTO) {
        Optional<User> userOptional = userRepository.findById(commentDTO.getUserId());
        Optional<Plant> plantOptional = plantRepository.findById(commentDTO.getPlantId());

//         User user = userRepository.findById(commentDTO.getUserId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid userId: " + commentDTO.getUserId()));
//
//        Plant plant = plantRepository.findById(commentDTO.getPlantId())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid plantId: " + commentDTO.getPlantId()));

        if (userOptional.isPresent() && plantOptional.isPresent()) {
            Comment comment = new Comment();
            comment.setCommentContent(commentDTO.getCommentContent());
            comment.setUser(userOptional.get());
            comment.setPlant(plantOptional.get());

            Comment savedComment = commentRepository.save(comment);
            return new CommentDTO(
                    savedComment.getId(),
                    savedComment.getCommentContent(),
                    savedComment.getPlant().getId(),
                    savedComment.getUser().getUserId(),
                    savedComment.getUser().getUsername()
            );
        } else {
            throw new IllegalArgumentException("Invalid userId or plantId");
        }
    }


}


