package com.back.guessgame.repository.dto;

import lombok.Getter;

@Getter
public enum BadgeUrl {
	LEVEL0("https://api.memegen.link/images/spirit/beginner_kit/Includes:/--_no_game/--no_xp_point/--_level_", 0), LEVEL1("https://api.memegen.link/images/aag/GG/level_", 1), LEVEL2("https://api.memegen.link/images/ackbar/GG/level_", 2), LEVEL3("https://api.memegen.link/images/afraid/GG/level_", 3), LEVEL4("https://api.memegen.link/images/agnes/GG/level_", 4), LEVEL5("https://api.memegen.link/images/aint-got-time/GG/level_", 5), LEVEL6("https://api.memegen.link/images/ams/GG/level_", 6), LEVEL7("https://api.memegen.link/images/ants/GG/level_", 7), LEVEL8("https://api.memegen.link/images/apcr/GG/level_", 8), LEVEL9("https://api.memegen.link/images/astronaut/GG/level_", 9), LEVEL10("https://api.memegen.link/images/astronaut/GG/level_", 10), LEVEL11("https://api.memegen.link/images/atis/GG/level_", 11), LEVEL12("https://api.memegen.link/images/away/GG/level_", 12), LEVEL13("https://api.memegen.link/images/bs/GG/level_", 13), LEVEL14("https://api.memegen.link/images/buzz/GG/level_", 14), LEVEL15("https://api.memegen.link/images/cake/GG/level_", 15), LEVEL16("https://api.memegen.link/images/captain/GG/level_", 16), LEVEL17("https://api.memegen.link/images/bad/GG/level_", 17), LEVEL18("https://api.memegen.link/images/badchoice/GG/level_", 18);
	private final String url;

	BadgeUrl(String badgeUrl, int level) {
		this.url = badgeUrl + level + ".png";
	}

}
