package com.back.guessgame.services;

import com.back.guessgame.controllers.websockets.WebSocketController;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.GameScoreRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.ActionType;
import com.back.guessgame.repository.dto.SocketScoreResult;
import com.back.guessgame.repository.dto.WebSocketPayload;
import com.back.guessgame.repository.entities.GameScore;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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

	public GameScore saveGameScore(GameScore gameScore) {
		gameScoreRepository.save(gameScore);
		return gameScore;
	}

	public GameScore createGameScore(WebSocketPayload socketContent, User user) {
		GameScore gameScore = new GameScore();
		gameScore.setUser(user);
		gameScore.setGame(gameRepository.findOneByName(socketContent.getGameName()));
		gameScore.setPartyCode(socketContent.getPartyCode());
		gameScore.setActionType(socketContent.getActionType());
		gameScore.setPoints(socketContent.getNbPoints());
		gameScore.setDate(socketContent.getDate());
		return gameScore;
	}


	public List<SocketScoreResult> getScore(GameScore gameScore) {
		List<SocketScoreResult> userPoints = new ArrayList<>();
		for (Party party : partyRepository.findAllByPartyCode(gameScore.getPartyCode())) {
			User user = userRepository.findById(party.getUser().getId()).orElse(null);
			userPoints.add(new SocketScoreResult(user, gameService.calculatePointsByUserByGame(gameScore.getGame(), user, gameScore.getPartyCode())));
		}
		return userPoints;
	}

	public void clear(Long partyCode) {
		gameScoreRepository.deleteAllByPartyCode(partyCode);
	}

	public void processSocketAction(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		if(!(message.getActionType().equals(ActionType.END_ROUND) || message.getActionType().equals(ActionType.END_GAME) || message.getActionType().equals(ActionType.START_GAME))) {
			saveGameScore(gameScore);
		}
		switch (gameScore.getGame().getName()) {
			case "clickGame":
				tapeTaupesGameplay(gameScore, messagingTemplate);
				break;
			case "BlindTest":
				blindTestGameplay(message, currentUser, gameScore, messagingTemplate);
				break;
			case "MovieGuesser":
				movieGuesserGameplay(message, currentUser, gameScore, messagingTemplate);
				break;
			case "GeoGuezzer":
				geoGuezzerGameplay(message, currentUser, gameScore, messagingTemplate);
				break;
		}
	}

	private void tapeTaupesGameplay(GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		Logger logger = LoggerFactory.getLogger(WebSocketController.class);
		logger.info("\nReceived message type : " + gameScore.getActionType() + "\n \n with payload : " + gameScore);
		ActionType actionType = gameScore.getActionType();
		switch (actionType) {
			case START_GAME -> messagingTemplate.convertAndSend("/topic/reply/startGame", "START_GAME");
			case END_ROUND -> messagingTemplate.convertAndSend("/topic/reply/endRound", "NEXT_ROUND");
			case END_GAME -> {
				messagingTemplate.convertAndSend("/topic/reply/endGame", "END_GAME");
				messagingTemplate.convertAndSend("/topic/reply/score", getScore(gameScore));
				clear(gameScore.getPartyCode());
			}
		}
	}

	private void geoGuezzerGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {

	}

	private void movieGuesserGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
	}

	private void blindTestGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
	}
}
