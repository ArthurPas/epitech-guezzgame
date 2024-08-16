package com.back.guessgame.configuration;

import jakarta.servlet.http.HttpServletRequest;

public class Utils {
	public static String extractJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if(bearerToken != null && bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7);
		}
		return null;
	}

}