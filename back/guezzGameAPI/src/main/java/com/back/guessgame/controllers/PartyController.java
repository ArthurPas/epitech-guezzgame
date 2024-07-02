package com.back.guessgame.controllers;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.GeneralPartyDto;
import com.back.guessgame.repository.dto.PartyResultDto;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.PartyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/party")
@CrossOrigin(origins = "http://localhost:3000")
public class PartyController {

	Logger logger = LoggerFactory.getLogger(PartyController.class);
	private PartyRepository partyRepository;

	private PartyService partyService;
	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private UserRepository userRepository;

	public PartyController(PartyRepository partyRepository) {
		this.partyRepository = partyRepository;
		this.partyService = new PartyService(partyRepository);
	}

	@GetMapping("/list")
	public Set<GeneralPartyDto> getAllParties() {

		return partyService.findAll();
	}

	@GetMapping("/{id}")
	public GeneralPartyDto getPartyById(@PathVariable Long id) {
		return partyService.findById(id).orElse(null);
	}

	@PostMapping
	public long createParty(@RequestBody GeneralPartyDto party) {
		User user = userRepository.findById(party.getUserId()).orElse(null);
		List<Game> games = new ArrayList<>(gameRepository.findAllById(party.getGamesId()));
		logger.warn(games.toString());
		if(user == null) {
			throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "User not found", null, null, null);
		}
		if(games.isEmpty()) {
			throw HttpClientErrorException.create(HttpStatus.BAD_REQUEST, "A party cannot have 0 game", null, null, null);
		}
		return partyService.newParty(party, user, games);
	}

	@PutMapping("/{id}")
	public long updateParty(@PathVariable Long id, @RequestBody GeneralPartyDto partyDetails) {
		Party party = partyRepository.findById(id).orElse(null);
		return partyService.updateParty(party, partyDetails);
	}

	@GetMapping("/result/{partycode}")
	public ResponseEntity<PartyResultDto> getResult(@PathVariable long partycode) {
		PartyResultDto partyResultDto = partyService.getResultScores(partycode);
		partyResultDto.getScores().forEach(score -> {
			score.setLogin(userRepository.findById(score.getUserId()).orElse(new User()).getLogin());
		});
		return new ResponseEntity<>(partyResultDto, HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public void deleteParty(@PathVariable Long id) {
		partyRepository.deleteById(id);
	}
}
