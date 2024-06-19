package com.back.guessgame.dto;

import com.back.guessgame.entities.User;
import jakarta.persistence.Column;
import lombok.Data;
import org.springframework.boot.convert.DataSizeUnit;

@Data
public class UserDto {

	private Long id;
	private String mail;
	private String login;
	private String picture;
	private Integer nbCoin = 0;
	private Boolean isVip = false;
	private Integer xpPoint = 0;

	public UserDto(User user) {
		this.id = user.getId();
		this.mail = user.getMail();
		this.login = user.getLogin();
		this.picture = user.getPicture();
		this.nbCoin = user.getNbCoin();
		this.isVip = user.getIsVip();
		this.xpPoint = user.getXpPoint();
	}
}
