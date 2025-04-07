package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.Comment;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.dto.CommentDTO;
import com.launchcode.dama_devs.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // test
    @GetMapping("/Angie")
    public ResponseEntity<String> getAngieComment() {
        return ResponseEntity.ok("You ROCK!");
    }
    // GET: Fetch all comments
    @GetMapping("/all")
    public List<Comment> getAllComments() {
        return commentService.getAllComments();
    }

    // GET: Fetch a single comment by ID
    @GetMapping("/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable int id) {
        Optional<Comment> comment = commentService.getCommentById(id);
        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST: Create a new comment
    @PostMapping("/comment")
    public ResponseEntity<Comment> createComment(@RequestBody CommentDTO commentDTO) {
        Comment createdComment = commentService.createComment(commentDTO);
        return ResponseEntity.ok(createdComment);
    }

    // PUT: Update an existing comment by ID
    @PutMapping("/edit/{id}")
    public ResponseEntity<String> updateComment(
            @PathVariable int id,
            @RequestBody String newContent) {
        String result = commentService.updateComment(id, newContent);
        return ResponseEntity.ok(result);
    }

    // DELETE: Delete a comment by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable int id) {
        String result = commentService.deleteComment(id);
        return ResponseEntity.ok(result);
    }
}
//    // GET: Fetch all comments
//    @GetMapping("/all")
//    public List<Comment> getAllComments() {
//        return commentService.getAllComments();
//    }
//
//    // GET: Fetch a single comment by ID
//    @GetMapping("/{id}")
//    public ResponseEntity<Comment> getCommentById(@PathVariable int id) {
//        Optional<Comment> comment = commentService.getCommentById(id);
//        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    // POST: Create a new comment
//    @PostMapping
//    public ResponseEntity<Comment> createComment(@RequestBody Comment comment) {
//        Comment createdComment = commentService.createComment(comment);
//        return ResponseEntity.ok(createdComment);
//    }
//
//    // PUT: Update an existing comment by ID
//    @PutMapping("/edit/{id}")
//    public ResponseEntity<String> updateComment(
//            @PathVariable int id,
//            @RequestParam int userId, // Assuming userId is passed as a request parameter
//            @RequestBody String newContent) {
//        String result = commentService.updateComment(id, userId, newContent);
//        return ResponseEntity.ok(result);
//    }
//
//    // DELETE: Delete a comment by ID
//    @DeleteMapping("/delete/{id}")
//    public ResponseEntity<String> deleteComment(
//            @PathVariable int id,
//            @RequestParam int userId) { // Assuming userId is passed as a request parameter
//        String result = commentService.deleteComment(id, userId);
//        return ResponseEntity.ok(result);
//    }
//}
