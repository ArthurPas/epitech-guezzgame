package com.back.guessgame.controllers;

import com.back.guessgame.entities.PartiesGames;
import com.back.guessgame.repository.PartiesGamesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/partiesGames")
public class PartiesGamesController {

	@Autowired
	private PartiesGamesRepository partiesGamesRepository;

	@GetMapping
	public List<PartiesGames> getAllPartiesGames() {
		return partiesGamesRepository.findAll();
	}

	@GetMapping("/{id}")
	public PartiesGames getPartiesGamesById(@PathVariable Long id) {
		return partiesGamesRepository.findById(id).orElse(null);
	}

	@PostMapping
	public PartiesGames createPartiesGames(@RequestBody PartiesGames partiesGames) {
		return partiesGamesRepository.save(partiesGames);
	}

	@PutMapping("/{id}")
	public PartiesGames updatePartiesGames(@PathVariable Long id, @RequestBody PartiesGames partiesGamesDetails) {
		PartiesGames partiesGames = partiesGamesRepository.findById(id).orElse(null);
		if (partiesGames != null) {
			partiesGames.setParty(partiesGamesDetails.getParty());
			partiesGames.setGame(partiesGamesDetails.getGame());
			return partiesGamesRepository.save(partiesGames);
		}
		return null;
	}

	@DeleteMapping("/{id}")
	public void deletePartiesGames(@PathVariable Long id) {
		partiesGamesRepository.deleteById(id);
	}
}
