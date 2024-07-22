package com.back.guessgame.repository.dto;

import lombok.Data;

import java.util.Date;

@Data
public class BetDto {
	private String title;
	private Date endTime;

}
