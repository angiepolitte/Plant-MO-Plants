package com.launchcode.dama_devs.services;

import com.launchcode.dama_devs.models.Garden;
import com.launchcode.dama_devs.models.Photo;
import com.launchcode.dama_devs.models.User;
import com.launchcode.dama_devs.models.data.GardenRepository;
import com.launchcode.dama_devs.models.data.PhotoRepository;
import com.launchcode.dama_devs.models.data.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;
    @Autowired
    private GardenRepository gardenRepository;
    @Autowired
    private UserRepository userRepository;

    public PhotoService(PhotoRepository photoRepository, GardenRepository gardenRepository, UserRepository userRepository) {
        this.photoRepository = photoRepository;
    }

    public Photo savePhoto(MultipartFile file, String photoName, Integer gardenId, Integer userId) throws IOException {
        Garden garden = gardenRepository.findById(gardenId)
                .orElseThrow(() -> new RuntimeException("Garden not found"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Photo photo = new Photo();
        photo.setPhotoName(photoName);
        photo.setPhotoImage(file.getBytes());
        photo.setGarden(garden);
        photo.setUser(user);

        return photoRepository.save(photo);
    }

    public List<Photo> findByGardenIdAndUser_UserId(Integer gardenId, Integer userId) {
        return photoRepository.findByGardenIdAndUser_UserId(gardenId, userId);
    }


    public List<Photo> getAllGardenPhotos() {
        return photoRepository.findAll();
    }
}
//package com.launchcode.dama_devs.services;
//
//import com.launchcode.dama_devs.models.Garden;
//import com.launchcode.dama_devs.models.Photo;
//import com.launchcode.dama_devs.models.User;
//import com.launchcode.dama_devs.models.data.GardenRepository;
//import com.launchcode.dama_devs.models.data.PhotoRepository;
//import com.launchcode.dama_devs.models.data.UserRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.IOException;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@RequiredArgsConstructor
//public class PhotoService {
//
//    private final PhotoRepository photoRepository;
//    private final GardenRepository gardenRepository;
//    private final UserRepository userRepository;
//
//    public Photo savePhoto(MultipartFile file, String photoName, Integer gardenId, Long userId) throws IOException {
//        Garden garden = gardenRepository.findById(gardenId)
//                .orElseThrow(() -> new RuntimeException("Garden not found"));
//
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//
//        Photo photo = new Photo();
//        photo.setPhotoName(photoName);
//        photo.setPhotoImage(file.getBytes());
//        photo.setGarden(garden);
//        photo.setUser(user);
//
//        return photoRepository.save(photo);
//    }
//
//    public List<Photo> findByGardenIdAndUser_UserId(Integer gardenId, Long userId) {
//        return photoRepository.findByGardenIdAndUser_UserId(gardenId, userId);
//    }
//
//
//    public List<Photo> getAllGardenPhotos() {
//        return photoRepository.findAll();
//    }
//}
