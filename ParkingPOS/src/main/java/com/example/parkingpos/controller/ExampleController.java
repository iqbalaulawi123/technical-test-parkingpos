package com.example.parkingpos.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ExampleController {
    @GetMapping("/api/example")
    public String getExample(){
        return "Return from BE Java";
    }
}
