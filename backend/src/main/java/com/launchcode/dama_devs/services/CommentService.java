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
                        comment.getUser().getUserId()))
                .collect(Collectors.toList());
    }

    public CommentDTO addComment(Comment comment) {
        Comment savedComment = commentRepository.save(comment);
        return new CommentDTO(
                savedComment.getId(),
                savedComment.getCommentContent(),
                savedComment.getPlant().getId(),
                savedComment.getUser().getUserId());
    }

    public CommentDTO addCommentFromDTO(CommentDTO commentDTO) {
        Optional<User> userOptional = userRepository.findById(commentDTO.getUserId());
        Optional<Plant> plantOptional = plantRepository.findById(commentDTO.getPlantId());

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
                    savedComment.getUser().getUserId()
            );
        } else {
            throw new IllegalArgumentException("Invalid userId or plantId");
        }
    }
}


