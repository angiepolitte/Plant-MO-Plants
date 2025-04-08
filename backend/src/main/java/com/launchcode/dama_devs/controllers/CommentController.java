package com.launchcode.dama_devs.controllers;


import com.launchcode.dama_devs.models.dto.CommentDTO;
import com.launchcode.dama_devs.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PostMapping("/add")
    public CommentDTO addComment(@RequestBody CommentDTO commentDTO) {
        return commentService.addCommentFromDTO(commentDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteComment(@RequestBody CommentDTO commentDTO) {
        try {
            commentService.deleteComment(commentDTO.getId(),commentDTO.getUserId());
            return ResponseEntity.ok("No-one will ever know what was written here.");
        } catch (SecurityException e) {
            return ResponseEntity.status(403).body("I don't think so.  Nice try.  This is not yours to delete");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}

