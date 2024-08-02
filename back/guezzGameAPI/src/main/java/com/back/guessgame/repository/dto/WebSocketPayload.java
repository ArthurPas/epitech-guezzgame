package com.back.guessgame.repository.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WebSocketPayload {
	private ActionType actionType;
	private String from;
	private Date date;
	private int nbPoints;
	private String gameName;
	private String roundNumber;
	private long partyId;
}
