package com.back.guessgame.repository.entities;

import com.fasterxml.jackson.annotation.JsonFilter;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
@JsonFilter("betOptionFilter")
@Table(name = "bet_option")
public class BetOption {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	private String description;
	private float ods;
	@ManyToOne(targetEntity = Bet.class)
	private Bet bet;
	@OneToMany(targetEntity = UserBet.class)
	private List<UserBet> gamblerBets;
	@Column(name = "is_win")
	private Boolean isWin;
}
