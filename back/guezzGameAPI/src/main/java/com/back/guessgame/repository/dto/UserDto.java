package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.User;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

	@JsonProperty("id")
	private Long id;
	@JsonProperty("mail")
	private String mail;
	@JsonProperty("login")
	private String login;
	@Column(nullable = false)
	@JsonProperty("picture")
	private String picture;
	@JsonProperty("nbCoin")
	private Integer nbCoin;
	@JsonProperty("isVip")
	private Boolean isVip;
	@JsonProperty("xpPoint")
	private Integer xpPoint;

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
