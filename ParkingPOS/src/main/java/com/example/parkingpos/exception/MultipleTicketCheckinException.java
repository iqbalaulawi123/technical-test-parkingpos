package com.example.parkingpos.exception;

public class MultipleTicketCheckinException extends RuntimeException {
    public MultipleTicketCheckinException(String vehicleNum){
        super("Duplicate ticket checkin for this vehicle ("+vehicleNum+") in this area");
    }
}
