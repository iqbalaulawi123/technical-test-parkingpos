package com.example.parkingpos.exception;

public class TicketAlreadyPaidException extends RuntimeException{
    public TicketAlreadyPaidException (){
        super("Ticket has been paid");
    }
}
