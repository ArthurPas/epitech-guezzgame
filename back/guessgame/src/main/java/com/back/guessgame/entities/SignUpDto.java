package com.back.guessgame.entities;
import lombok.Data;

@Data
public class SignUpDto {
	private String mail;
	private String login;
	private String password;
}
