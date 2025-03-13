package com.launchcode.dama_devs.models.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import javax.xml.stream.events.Comment;

@Repository
public interface CommentRepository extends CrudRepository<Comment, Integer> {
}
