package com.back.guessgame.controllers;

import com.back.guessgame.dto.GameDto;
import com.back.guessgame.entities.Game;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.services.GameService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game")
public class GameController {
	private GameRepository gameRepository;

	private final GameService gameService;

	public GameController(GameRepository gameRepository) {
		this.gameRepository = gameRepository;
		this.gameService = new GameService(gameRepository);
	}

	@GetMapping("/list")
	public List<GameDto> getAllGames() {
		return gameService.findAll();
	}

	@GetMapping("/{id}")
	public GameDto getGameById(@PathVariable Long id) {
		return gameService.findById(id).orElse(null);
	}

	@PostMapping
	public long createGame(@RequestBody GameDto gameDto) {
		return gameService.newGame(gameDto);
	}

	@PutMapping("/{id}")
	public GameDto updateGame(@PathVariable Long id, @RequestBody GameDto gameDetails) {
		Game game = gameRepository.findById(id).orElse(null);
		if(game != null) {
			game.setName(gameDetails.getName());
			game.setNbPlayerMax(gameDetails.getNbPlayerMax());
			game.setNbPlayerMin(gameDetails.getNbPlayerMin());
			game.setRules(gameDetails.getRules());
			game.setIsRemoteCompatible(gameDetails.getIsRemoteCompatible());
			gameRepository.save(game);
			return new GameDto(game);
		}
		return null;
	}

	@DeleteMapping("/{id}")
	public void deleteGame(@PathVariable Long id) {
		gameRepository.deleteById(id);
	}
}
