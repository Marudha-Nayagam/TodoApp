
package com.marudhan.todoapp.controller;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import com.marudhan.todoapp.model.Todomodel;
import com.marudhan.todoapp.repository.Todorepo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



// define all the routes here
@RestController
@CrossOrigin
public class Todocontroller {
    @Autowired
    private Todorepo trepo;

    @GetMapping("/todos")
    public List <Todomodel> getTodo() {
        System.out.println("Get Todo");
        return trepo.findAll();
    }
    
    @PostMapping("/todos")
    public Todomodel addTodo (@RequestBody Todomodel entity) {
        //TODO: process POST request
        System.out.println("Todo Add");

        return trepo.save(entity);
    }
    
    @PutMapping("/todos/{id}")
    public Todomodel updateTodo(@PathVariable String id, @RequestBody Todomodel entity) {
        //TODO: process PUT request

        Todomodel oldEntity = trepo.findById(id).get();
        System.out.println("Put todo" + entity);
        oldEntity.setTitle(entity.getTitle());
        oldEntity.setDescription(entity.getDescription());
        return trepo.save(oldEntity);
    }

    @DeleteMapping ("/todos/{id}")
    public String deleteTodo(@PathVariable String id) {
        //TODO: process DELETE request
        System.out.println("Tode Delete" +id);
        trepo.deleteById(id);
        return id;
    }
   
}