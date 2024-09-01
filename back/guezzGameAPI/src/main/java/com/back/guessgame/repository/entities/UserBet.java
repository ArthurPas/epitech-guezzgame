package com.back.guessgame.repository.entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@JsonFilter("userBetFilter")
public class UserBet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne(targetEntity = User.class)
	private User user;

	@ManyToOne
	private BetOption betOption;
	private Integer betAmount;

	public UserBet() {

	}
}
