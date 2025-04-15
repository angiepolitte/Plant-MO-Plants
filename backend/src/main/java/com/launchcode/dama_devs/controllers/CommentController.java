package com.launchcode.dama_devs.controllers;


import com.launchcode.dama_devs.models.Comment;
import com.launchcode.dama_devs.models.dto.CommentDTO;
import com.launchcode.dama_devs.models.dto.CommentUserDTO;
import com.launchcode.dama_devs.models.dto.UserDTO;
import com.launchcode.dama_devs.services.CommentService;
import com.launchcode.dama_devs.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;
// had to add to pass the 401 authenticate
    @GetMapping("/api/user")
    public ResponseEntity<CommentUserDTO> getCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        CommentUserDTO dto = new CommentUserDTO(userDetails.getId(), userDetails.getUsername());
        return ResponseEntity.ok(dto);
    }

    @GetMapping("/plant")
    public List<CommentDTO> getCommentsForPlant(@RequestParam int plantId) {
        return commentService.getCommentsByPlantId(plantId);
    }


    @PostMapping("/add")
    public CommentDTO addComment(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal UserDetailsImpl userDetails) {
        commentDTO.setUserId(userDetails.getId());
        return commentService.addCommentFromDTO(commentDTO);
    }

@DeleteMapping("/delete")
public ResponseEntity<String> deleteComment(@RequestBody CommentDTO commentDTO, @AuthenticationPrincipal UserDetailsImpl userDetails) {
    try {
        // Ensure the user is deleting their own comment
        commentService.deleteComment(commentDTO.getId(), userDetails.getId());
        return ResponseEntity.ok("No-one will ever know what was written here.");
    } catch (SecurityException e) {
        return ResponseEntity.status(403).body("I don't think so. Nice try. This is not yours to delete");
    } catch (IllegalArgumentException e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}

// Edit a comment
@PutMapping("/edit")
public ResponseEntity<CommentDTO> editComment(
        @RequestBody CommentDTO commentDTO, @AuthenticationPrincipal UserDetailsImpl userDetails) {
    try {
        // Update the comment for the authenticated user
        CommentDTO updatedComment = commentService.editComment(commentDTO.getId(), userDetails.getId(), commentDTO.getCommentContent());
        return ResponseEntity.ok(updatedComment);
    } catch (IllegalArgumentException | SecurityException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }
}

}

