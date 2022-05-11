package com.example.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Date;

@Service
public class TodoHardCodedService {

    private static List<Todo> todos = new ArrayList();
    private static int idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "francesca", "Learn React", new Date(), false));
        todos.add(new Todo(++idCounter, "francesca", "Cook dinner", new Date(), false));
        todos.add(new Todo(++idCounter, "francesca", "Do Laundry", new Date(), false));
    }

    public List<Todo> findAll() {
        return todos;
    }

    public Todo deleteById(long id) {
        Todo todo = findById(id);

        if(todo == null) return null;

        if(todos.remove(todo)) {
            return todo;
        };
        return null;
    }

    public Todo findById(long id) {
        for(Todo todo:todos) {
            if(todo.getId() == id) {
                return todo;
            }
        }
        return null;
    }



}