package com.back.guessgame.services;

import com.back.guessgame.controllers.websockets.WebSocketController;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.GameScoreRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.GameDto;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.GameScore;
import com.back.guessgame.repository.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {
	private final GameRepository gameRepository;

	private final GameScoreRepository gameScoreRepository;

	private final UserRepository userRepository;


	private final PartyRepository partyRepository;

	public GameService(GameRepository gameRepository, GameScoreRepository gameScoreRepository, UserRepository userRepository, PartyRepository partyRepository) {
		this.gameRepository = gameRepository;
		this.gameScoreRepository = gameScoreRepository;
		this.userRepository = userRepository;
		this.partyRepository = partyRepository;
	}

	public long newGame(GameDto gameDto) {
		Game game = new Game();
		game.setIsRemoteCompatible(gameDto.getIsRemoteCompatible());
		game.setName(gameDto.getName());
		game.setNbPlayerMax(gameDto.getNbPlayerMax());
		game.setNbPlayerMin(gameDto.getNbPlayerMin());
		game.setRules(gameDto.getRules());
		gameRepository.save(game);
		return game.getId();
	}

	public List<GameDto> findAll() {
		return gameRepository.findAll().stream().map(GameDto::new).collect(Collectors.toList());
	}

	public Optional<GameDto> findById(Long id) {
		return Optional.of(new GameDto(gameRepository.findById(id).orElse(null)));
	}

	// exemple : if i was the user who click the faster I will get nb points / 1 (by my rank)
	// The 5th will have nb points  / 5
	public int nbPointsByDate(Game game, User user, Long partyCode) {
		List<GameScore> gameScore = gameScoreRepository.findAllByPartyCodeAndGame(partyCode, game);
		int points = 0;
		List<GameScore> orderedByTime = gameScore.stream().sorted((gs1, gs2) -> gs1.getDate().compareTo(gs2.getDate())).toList();
		for (int i = 0; i < orderedByTime.size(); i++) {
			if(orderedByTime.get(i).getUser().equals(user)) {
				points += orderedByTime.get(i).getPoints() / i;
			}
		}
		return points;
	}

	public long getTheFasterUserId(Game game, Long partyCode) {
		List<GameScore> gameScore = gameScoreRepository.findAllByPartyCodeAndGame(partyCode, game);
		List<GameScore> orderedByTime = gameScore.stream().sorted((gs1, gs2) -> gs1.getDate().compareTo(gs2.getDate())).toList();
		return orderedByTime.get(0).getUser().getId();
	}

	public long getTheFasterUserIdByRound(Game game, Long partyCode, int nbRound) {
		List<GameScore> gameScore = gameScoreRepository.findAllByPartyCodeAndGameAndNbRound(partyCode, game, nbRound);
		List<GameScore> orderedByTime = gameScore.stream().sorted((gs1, gs2) -> gs1.getDate().compareTo(gs2.getDate())).toList();
		return orderedByTime.get(0).getUser().getId();
	}

	public int calculatePointsByUserByGame(Game game, User user, Long partyCode) {

		Logger logger = LoggerFactory.getLogger(GameService.class);
		logger.warn("Calculating points for user " + user.getId() + " in game " + game.getId() + " in party " + partyCode);
		int points = 0;
		List<GameScore> gameScore = gameScoreRepository.findAllByUserAndGameAndPartyCode(user, game, partyCode);
		for (GameScore gs : gameScore) {
			logger.warn(gs.toString());
			switch (gs.getActionType()) {
				case ADD_POINTS:
					points += gs.getPoints();
					break;
				case LOOSE_POINTS:
					points -= gs.getPoints();
					break;
				case ADD_POINTS_BY_DATE:
					points += this.nbPointsByDate(game, user, partyCode);
				case FASTER_WIN:
					if(user.getId().equals(this.getTheFasterUserId(game, partyCode))) {
						points += gs.getPoints();
					}
				case FASTER_WIN_BY_ROUND:
					if(user.getId().equals(this.getTheFasterUserIdByRound(game, partyCode, gs.getNbRound()))) {
						points += gs.getPoints();
					}
				default:
					break;
			}
		}
		return points;
	}




}
