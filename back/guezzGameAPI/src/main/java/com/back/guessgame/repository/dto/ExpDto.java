package com.back.guessgame.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ExpDto {
	private int level;
	private String badgePictureUrl;

	public ExpDto(int exp) {
		this.level = exp / 10;
		this.badgePictureUrl = BadgeUrl.values()[level].getUrl();

	}
}
