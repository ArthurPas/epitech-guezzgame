package com.back.guessgame.repository.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter

public class Bet {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(nullable = false)
	private String title;
	@Column(nullable = false)
	@OneToMany(targetEntity = BetOption.class)
	private List<BetOption> betOptions;
	@Column(name = "created_at", nullable = false)
	private Date createdAt;
	@Column(name = "end_time", nullable = false)
	private Date endTime;

	public Bet(String title, List<BetOption> betOptions, Date endTime) {
		this.title = title;
		this.betOptions = betOptions;
		this.createdAt = new Date();
		this.endTime = endTime;
	}

	public Bet() {

	}
}
