package com.back.guessgame.services;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.dto.GameDto;
import com.back.guessgame.repository.entities.Game;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class GameService {
	private final GameRepository gameRepository;

	public GameService(GameRepository gameRepository) {
		this.gameRepository = gameRepository;
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
}
