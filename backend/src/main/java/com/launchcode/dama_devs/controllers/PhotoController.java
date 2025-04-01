package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.Photo;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.services.PhotoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/photo")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Adjust for React
public class PhotoController {

    private final PhotoService photoService;

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body("File is too large! Please upload a smaller file.");
    }

    @PostMapping("/upload")
    public ResponseEntity<Photo> uploadPhoto(
            @RequestParam("file") MultipartFile file,
            @RequestParam("photoName") String photoName,
            @RequestParam("gardenId") Integer gardenId,
            @RequestParam("userId") Integer userId) throws IOException {
        return ResponseEntity.ok(photoService.savePhoto(file, photoName, gardenId, userId));
    }

    @GetMapping("/garden/{gardenId}/user/{userId}")
    public ResponseEntity<List<Photo>> getPhotosByGardenAndUser(
            @PathVariable Integer gardenId,
            @PathVariable Integer userId) {
        return ResponseEntity.ok(photoService.findByGardenIdAndUser_UserId(gardenId, userId));
    }

    @GetMapping("/all") // New Endpoint to fetch all garden photos for testing
    public ResponseEntity<List<Photo>> getAllGardenPhotos() {
        return ResponseEntity.ok(photoService.getAllGardenPhotos());
    }

}




//package com.launchcode.dama_devs.controllers;
//
//import com.launchcode.dama_devs.models.Photo;
//import com.launchcode.dama_devs.models.User;
//import com.launchcode.dama_devs.services.PhotoService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MaxUploadSizeExceededException;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//
//@RestController
//@RequestMapping("/photo")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "http://localhost:5173") // Adjust for React
//public class PhotoController {
//
//    private final PhotoService photoService;
//
//    @ExceptionHandler(MaxUploadSizeExceededException.class)
//    public ResponseEntity<String> handleMaxSizeException(MaxUploadSizeExceededException exc) {
//        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
//                .body("File is too large! Please upload a smaller file.");
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<Photo> uploadPhoto(
//            @RequestParam("file") MultipartFile file,
//            @RequestParam("photoName") String photoName,
//            @RequestParam("gardenId") Integer gardenId,
//            @RequestParam("userId") Long userId) throws IOException {
//        return ResponseEntity.ok(photoService.savePhoto(file, photoName, gardenId, userId));
//    }
//
//    @GetMapping("/garden/{gardenId}/user/{userId}")
//    public ResponseEntity<List<Photo>> getPhotosByGardenAndUser(
//            @PathVariable Integer gardenId,
//            @PathVariable Long userId) {
//        return ResponseEntity.ok(photoService.findByGardenIdAndUser_UserId(gardenId, userId));
//    }
//
//    @GetMapping("/all") // New Endpoint to fetch all garden photos for testing
//    public ResponseEntity<List<Photo>> getAllGardenPhotos() {
//        return ResponseEntity.ok(photoService.getAllGardenPhotos());
//    }
//
//}
