package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.Comment;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.dto.CommentDTO;
import com.launchcode.dama_devs.services.CommentService;
import jakarta.persistence.Id;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Get all comments for a specific plant
    @GetMapping("/plant/{plantId}")
    public List<CommentDTO> getCommentsForPlant(@PathVariable int plantId) {
        return commentService.getCommentsByPlantId(plantId);
    }

    // Add a comment to a specific plant
//    @PostMapping("/add")
//    public CommentDTO addComment(@RequestBody Comment comment) {
//        return commentService.addComment(comment);
//    }
    @PostMapping("/add")
    public CommentDTO addComment(@RequestBody CommentDTO commentDTO) {
        return commentService.addCommentFromDTO(commentDTO);
    }

}

