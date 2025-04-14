package com.launchcode.dama_devs.controllers;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Photo;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.services.PhotoService;
import com.launchcode.dama_devs.services.UserDetailsImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/photo")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Adjust for React
public class PhotoController {

    private final PhotoService photoService;

    private final GardenRepository gardenRepository;

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
            @AuthenticationPrincipal UserDetailsImpl userDetails) throws IOException {
        Integer userId = userDetails.getId();
        return ResponseEntity.ok(photoService.savePhoto(file, photoName, gardenId, userId));
    }

@GetMapping("/gardens/user")
public ResponseEntity<List<Garden>> getGardensByUser( @AuthenticationPrincipal UserDetailsImpl userDetails) {
    Integer userId = userDetails.getId();
    List<Garden> gardens = photoService.getGardensByUserId(userId);
    return ResponseEntity.ok(gardens);
}

@GetMapping("/garden/{gardenId}/user")
public ResponseEntity<List<Photo>> getPhotosByGardenAndUser(
        @PathVariable Integer gardenId,
        @AuthenticationPrincipal UserDetailsImpl userDetails) {
    Integer userId = userDetails.getId();
    return ResponseEntity.ok(photoService.findByGardenIdAndUser_UserId(gardenId, userId));
}


@GetMapping("/gardens-without-photo/user")
public ResponseEntity<List<Garden>> getGardensWithoutPhotoByUser( @AuthenticationPrincipal UserDetailsImpl userDetails) {
    Integer userId = userDetails.getId();
    List<Garden> gardens = photoService.getGardensWithoutPhotosByUserId(userId);
    return ResponseEntity.ok(gardens);
}

@GetMapping("/user")
public ResponseEntity<List<Photo>> getPhotosForCurrentUser(@AuthenticationPrincipal UserDetailsImpl userDetails) {
    Integer userId = userDetails.getId(); // pulled from your UserDetailsImpl
    List<Photo> photos = photoService.findPhotosByUser_UserId(userId);
    return ResponseEntity.ok(photos);
}

}
