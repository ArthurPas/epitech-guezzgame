package com.back.guessgame.controllers;

import com.back.guessgame.entities.Game;
import com.back.guessgame.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/games")
public class GameController {

	@Autowired
	private GameRepository gameRepository;

	@GetMapping
	public List<Game> getAllGames() {
		return gameRepository.findAll();
	}

	@GetMapping("/{id}")
	public Game getGameById(@PathVariable Long id) {
		return gameRepository.findById(id).orElse(null);
	}

	@PostMapping
	public Game createGame(@RequestBody Game game) {
		return gameRepository.save(game);
	}

	@PutMapping("/{id}")
	public Game updateGame(@PathVariable Long id, @RequestBody Game gameDetails) {
		Game game = gameRepository.findById(id).orElse(null);
		if (game != null) {
			game.setName(gameDetails.getName());
			game.setNbPlayerMax(gameDetails.getNbPlayerMax());
			game.setNbPlayerMin(gameDetails.getNbPlayerMin());
			game.setRules(gameDetails.getRules());
			game.setIsRemoteCompatible(gameDetails.getIsRemoteCompatible());
			return gameRepository.save(game);
		}
		return null;
	}

	@DeleteMapping("/{id}")
	public void deleteGame(@PathVariable Long id) {
		gameRepository.deleteById(id);
	}
}
