package com.back.guessgame.repository.dto;

import lombok.Data;

@Data
public class StatDto {
	private FriendDto user;
	private Integer nbWin;
	private Integer nbParties;
	private Integer nbPoints;
	private Integer nbDayStreak;
	private Integer nbBestDayStreak;
//	private Integer nbDayVip;
}
