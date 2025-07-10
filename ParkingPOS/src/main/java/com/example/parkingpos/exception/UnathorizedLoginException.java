package com.example.parkingpos.exception;

public class UnathorizedLoginException extends RuntimeException {
    public UnathorizedLoginException(){
        super("Username or password wrong");
    }
}
