package com.marudhan.todoapp.model;
//all the details in the collection

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "todos")
public class Todomodel {
    private String _id;
    private String title;
    private String description;

    public Todomodel (String title, String description) {
        this.title = title;
        this.description = description;
        System.out.println("Todomodel: " + title );
    }
    public String getTitle() {
        System.out.println("getTitle: " + title);
        return title;
    }
    public String getDescription() {
        System.out.println("getDes: " + description);
        return description;
    }
    public void setTitle(String title) {
        this.title = title;
        System.out.println("Todomodel: " + title );
    }

    public void setDescription (String description) {
        this.description = description;
        System.out.println("Todomodel: " + description);
    }

    @Override
    public String toString() {
        return "Todomodel [title=" + title + ", description=" + description +" ]" ;
    }
}
