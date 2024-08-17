package com.back.guessgame.configuration;

public class Utils {
	public static String extractJwtFromHeader(String bearerToken) {
		if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

}