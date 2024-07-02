package com.back.guessgame.repository.dto;

import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginDto {
	private String login;
	private String password;
}