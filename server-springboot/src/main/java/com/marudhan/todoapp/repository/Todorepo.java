package com.marudhan.todoapp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.marudhan.todoapp.model.Todomodel;

public interface Todorepo extends MongoRepository<Todomodel, String> {
    
    
} 
