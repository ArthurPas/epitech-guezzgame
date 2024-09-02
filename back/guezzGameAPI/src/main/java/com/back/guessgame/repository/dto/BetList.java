package com.back.guessgame.repository.dto;

import com.back.guessgame.repository.entities.Bet;
import com.back.guessgame.repository.entities.BetOption;
import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class BetList {
	private Long id;
	private String title;
	private List<BetOptionDto> betOptions;
	private Date createdAt;
	private Date endTime;

	public BetList(Bet bet, List<BetOption> betOptions) {
		this.id = bet.getId();
		this.title = bet.getTitle();
		this.createdAt = bet.getCreatedAt();
		this.endTime = bet.getEndTime();
		for (BetOption betOption : betOptions) {
			this.betOptions.add(new BetOptionDto(betOption.getId(), betOption.getDescription(), betOption.getOds(), betOption.getGamblerBets()));
		}
	}
}
