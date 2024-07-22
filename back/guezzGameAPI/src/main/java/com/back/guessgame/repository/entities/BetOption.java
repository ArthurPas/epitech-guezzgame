package com.back.guessgame.repository.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class BetOption {
	@Id
	private long id;
	private String description;
	private float ods;
	@OneToMany(targetEntity = User.class)
	private List<Long> gamblersId;
	@Column(name = "is_win")
	private Boolean isWin;
}
