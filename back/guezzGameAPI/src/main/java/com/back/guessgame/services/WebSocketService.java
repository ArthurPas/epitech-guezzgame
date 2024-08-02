package com.back.guessgame.services;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.GameScoreRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.WebSocketPayload;
import com.back.guessgame.repository.entities.GameScore;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {
	private final UserRepository userRepository;
	private final UserService userService;

	private final GameService gameService;

	private final GameRepository gameRepository;

	private final PartyRepository partyRepository;
	private final PartyService partyService;

	private final GameScoreRepository gameScoreRepository;

	public WebSocketService(UserRepository userRepository, GameRepository gameRepository, PartyRepository partyRepository, GameScoreRepository gameScoreRepository) {
		this.userRepository = userRepository;
		this.userService = new UserService(userRepository);
		this.gameRepository = gameRepository;
		this.partyRepository = partyRepository;
		this.gameService = new GameService(gameRepository, gameScoreRepository, userRepository, partyRepository);
		this.gameScoreRepository = gameScoreRepository;
		this.partyService = new PartyService(partyRepository, userRepository, gameRepository);
	}

	public void sendMessage(WebSocketPayload socketContent) {
		// TODO ?
	}

	public void saveSocket(WebSocketPayload socketContent) {
		GameScore gameScore = new GameScore();
		gameScore.setUserId(userRepository.findById(Long.parseLong(socketContent.getFrom())).get().getId());
		gameScore.setGameId(gameRepository.findOneByName(socketContent.getGameName()).getId());
		gameScore.setActionType(socketContent.getActionType());
		gameScore.setPoints(socketContent.getNbPoints());
		gameScore.setDate(socketContent.getDate());
		gameScoreRepository.save(gameScore);
	}


}
