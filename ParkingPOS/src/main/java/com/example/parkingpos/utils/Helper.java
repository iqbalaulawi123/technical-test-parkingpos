package com.example.parkingpos.utils;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Duration;
import java.time.LocalDateTime;

public class Helper {
    public static Long calculateSecondFromInOutRange(LocalDateTime checkIn, LocalDateTime checkOut) {
        Duration duration = Duration.between(checkIn, checkOut);
        return duration.getSeconds();
    }

    public static String calculateSecondFromInOutRangeFormatted(LocalDateTime checkIn, LocalDateTime checkOut) {
        Duration duration = Duration.between(checkIn, checkOut);
        long totalSeconds = duration.getSeconds();

        long hours = totalSeconds / 3600;
        long minutes = (totalSeconds % 3600) / 60;
        long seconds = totalSeconds % 60;

        return String.format("%dh : %02dm : %02ds", hours, minutes, seconds);
    }

    public static BigDecimal calculatePriceByRateAndSeconds(BigDecimal ratePerHour, Long totalSeconds) {
        if (ratePerHour == null || totalSeconds == null) return BigDecimal.ZERO;

//        long totalHours = (long) Math.ceil(totalSeconds / 3600.0); //pembulatan ke atas
        long totalHours = totalSeconds / 3600;
        BigDecimal hours = BigDecimal.valueOf(totalHours);
        BigDecimal finalPrice = ratePerHour.multiply(hours);

        return finalPrice;
    }

    public static String hashToMd5(String input) {
        try {
            // Static getInstance method is called with hashing MD5
            MessageDigest md = MessageDigest.getInstance("MD5");

            // digest() method is called to calculate message digest
            // of an input digest() return array of byte
            byte[] messageDigest = md.digest(input.getBytes());

            // Convert byte array into signum representation
            BigInteger no = new BigInteger(1, messageDigest);

            // Convert message digest into hex value
            String hashtext = no.toString(16);
            while (hashtext.length() < 32) {
                hashtext = "0" + hashtext;
            }

            return hashtext;
        } catch (NoSuchAlgorithmException e) {
            // Handle the exception (you can log it or rethrow as unchecked)
            throw new RuntimeException("MD5 algorithm not found", e);
        }
    }


}
