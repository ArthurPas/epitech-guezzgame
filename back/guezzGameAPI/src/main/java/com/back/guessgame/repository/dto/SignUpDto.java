package com.back.guessgame.repository.dto;

import lombok.Data;

@Data
public class SignUpDto {
	private String mail;
	private String login;
	private String password;
	private String picture;
}
