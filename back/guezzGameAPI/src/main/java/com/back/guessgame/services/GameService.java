package com.back.guessgame.services;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.GameScoreRepository;
import com.back.guessgame.repository.dto.GameDto;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.GameScore;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {
	private final GameRepository gameRepository;

	private final GameScoreRepository gameScoreRepository;

	public GameService(GameRepository gameRepository, GameScoreRepository gameScoreRepository) {
		this.gameRepository = gameRepository;
		this.gameScoreRepository = gameScoreRepository;
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
	public int nbPointsByDate(Long gameId, Long userId, long partyId) {
		List<GameScore> gameScore = gameScoreRepository.findAllByPartyIdAndGameId(partyId, gameId);
		int points = 0;
		List<GameScore> orderedByTime = gameScore.stream().sorted((gs1, gs2) -> gs1.getDate().compareTo(gs2.getDate())).toList();
		for (int i = 0; i < orderedByTime.size(); i++) {
			if(orderedByTime.get(i).getUserId().equals(userId)) {
				points += orderedByTime.get(i).getPoints() / i;
			}
		}
		return points;
	}

	public int calculatePointsByUserByGame(Long gameId, Long userId, long partyId) {
		int points = 0;
		List<GameScore> gameScore = gameScoreRepository.findAllByUserIdAndGameIdAndPartyId(userId, gameId, partyId);
		for (GameScore gs : gameScore) {
			switch (gs.getActionType()) {
				case ADD_POINTS:
					points += gs.getPoints();
					break;
				case LOOSE_POINTS:
					points -= gs.getPoints();
					break;
				case ADD_POINTS_BY_DATE:
					points += this.nbPointsByDate(gameId, userId, partyId);
				default:
					break;
			}
		}
		return points;
	}


}
