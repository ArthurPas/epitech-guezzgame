package com.back.guessgame.repository.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Score {
	@JsonProperty(value = "userId")
	private long userId;
	@JsonProperty(value = "login")
	private String login = "";
	@JsonProperty(value = "nbPoints")
	private int nbPoint;
	@JsonProperty(value = "profilePicture")
	private String profilePicture = "";
	
}
