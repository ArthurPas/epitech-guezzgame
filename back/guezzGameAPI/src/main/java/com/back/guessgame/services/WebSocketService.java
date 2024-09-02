package com.back.guessgame.services;

import com.back.guessgame.controllers.websockets.WebSocketController;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.GameScoreRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.ActionType;
import com.back.guessgame.repository.dto.SocketScoreResult;
import com.back.guessgame.repository.dto.WebSocketPayload;
import com.back.guessgame.repository.entities.Game;
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
		GameScore gameScoreSaved = gameScoreRepository.save(gameScore);
		return gameScoreSaved;
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
		Logger logger = LoggerFactory.getLogger(WebSocketController.class);
		logger.warn(partyRepository.findAllByPartyCode(gameScore.getPartyCode()).get(0).toString());

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
		saveGameScore(gameScore);
		if(message.getActionType().equals(ActionType.USER_READY)) {
			checkIfAllUsersReady(currentUser, gameScore, messagingTemplate);
		}
		if(message.getActionType().equals(ActionType.NEXT_GAME)) {
			sendNextGame(gameScore, messagingTemplate);
		}
		if(message.getActionType().equals(ActionType.END_GAME)) {
			messagingTemplate.convertAndSend("/topic/reply/endGame", "END_GAME");
			messagingTemplate.convertAndSend("/topic/reply/score", getScore(gameScore));
			Logger logger = LoggerFactory.getLogger(WebSocketController.class);
			logger.warn(getScore(gameScore).toString() + "score de toto");
			for (Party party : partyRepository.findAllByPartyCode(gameScore.getPartyCode())) {
				party.setNbPoints(party.getNbPoints() + gameScore.getPoints());
				partyRepository.save(party);
			}
//			sendNextGame(gameScore, messagingTemplate);
		}
		switch (gameScore.getGame().getName()) {
			case "CLICK_GAME":
				clickGameGamePlay(gameScore, messagingTemplate);
				break;
			case "BLIND_TEST":
				blindTestGameplay(message, currentUser, gameScore, messagingTemplate);
				break;
			case "MOVIE_GUESSER":
				movieGuesserGameplay(message, currentUser, gameScore, messagingTemplate);
				break;
			case "GEO_GUEZZER":
				geoGuezzerGameplay(message, currentUser, gameScore, messagingTemplate);
				break;
		}

	}

	private void sendNextGame(GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		Party party = partyRepository.findAllByPartyCode(gameScore.getPartyCode()).get(0);
		List<Long> gamesId = party.getGames().stream().map(Game::getId).sorted().toList();
		Logger logger = LoggerFactory.getLogger(WebSocketController.class);
		Long currentGameIndex = gameScore.getGame().getId() + 1;
		logger.warn("gamesId : " + gamesId);
		while (!gamesId.contains(currentGameIndex)) {
			{
				currentGameIndex++;
				logger.warn("CURRENT GAME INDEX : " + currentGameIndex);
				if(currentGameIndex > gameRepository.count() + 1) {
					break;
				}
			}
		}

		if(currentGameIndex > gameRepository.count() + 1) {
			messagingTemplate.convertAndSend("/topic/reply/endGame", "END_PARTY");
			logger.warn("END GAME" + currentGameIndex + " " + gameRepository.count() + " " + gamesId);
		} else {
			Game nextGame = gameRepository.findOneById(gamesId.get(gamesId.indexOf(currentGameIndex)));
			messagingTemplate.convertAndSend("/topic/reply/nextGame", nextGame.getName());
			logger.warn("NEXT GAME : " + nextGame.getName());
		}
	}

	private boolean checkIfAllUsersReady(User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		List<GameScore> gameScores = gameScoreRepository.findAllByPartyCodeAndGame(gameScore.getPartyCode(), gameScore.getGame());
		int nbPlayerReady = 0;
		int nbPlayer = partyRepository.findAllByPartyCode(gameScore.getPartyCode()).size();
		Logger logger = LoggerFactory.getLogger(WebSocketController.class);
		for (GameScore gs : gameScores) {
			if(gs.getActionType().equals(ActionType.USER_READY)) {
				nbPlayerReady++;
			}
		}
		boolean allReady = nbPlayerReady == nbPlayer;
		logger.warn("\nNB PLAYER READY : " + nbPlayerReady + "\n \n NB PLAYER TOTAL : " + nbPlayer);

		messagingTemplate.convertAndSend("/topic/reply/allPlayerReady",allReady);
		return allReady;
	}

	private void clickGameGamePlay(GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		Logger logger = LoggerFactory.getLogger(WebSocketController.class);
		logger.info("\nReceived message type : " + gameScore.getActionType() + "\n \n with payload : " + gameScore.toString());
		ActionType actionType = gameScore.getActionType();
		switch (actionType) {
			case START_GAME -> messagingTemplate.convertAndSend("/topic/reply/startGame", "START_GAME");
			case END_ROUND -> messagingTemplate.convertAndSend("/topic/reply/endRound", "NEXT_ROUND");
			case END_GAME -> {
				messagingTemplate.convertAndSend("/topic/reply/endGame", "END_GAME");
				messagingTemplate.convertAndSend("/topic/reply/score", getScore(gameScore));
			}
		}
	}

	private void geoGuezzerGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		Logger logger = LoggerFactory.getLogger(WebSocketController.class);
		logger.info("\nReceived message type : " + gameScore.getActionType() + "\n \n with payload : " + gameScore);
		ActionType actionType = gameScore.getActionType();
		switch (actionType) {
			case START_GAME -> messagingTemplate.convertAndSend("/topic/reply/startGame", "START_GAME");
			case END_ROUND -> messagingTemplate.convertAndSend("/topic/reply/endRound", "NEXT_ROUND");
			case END_GAME -> {
				logger.warn("finito");
				messagingTemplate.convertAndSend("/topic/reply/endGame", "END_GAME");
				messagingTemplate.convertAndSend("/topic/reply/score", getScore(gameScore));
				logger.warn(getScore(gameScore).toString());
			}
		}
	}

	private void movieGuesserGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {


	}

	private void blindTestGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {

	}

	private void cultureGuezzGameplay(WebSocketPayload message, User currentUser, GameScore gameScore, SimpMessagingTemplate messagingTemplate) {
		ActionType actionType = gameScore.getActionType();
		switch (actionType) {
			case START_GAME -> messagingTemplate.convertAndSend("/topic/reply/startGame", "START_GAME");
			case END_GAME -> {
				messagingTemplate.convertAndSend("/topic/reply/endGame", "END_GAME");
				messagingTemplate.convertAndSend("/topic/reply/score", getScore(gameScore));
			}
		}

	}

}
