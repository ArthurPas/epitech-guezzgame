package com.back.guessgame.controllers;

import com.back.guessgame.dto.GeneralPartyDto;
import com.back.guessgame.dto.PartyResultDto;
import com.back.guessgame.entities.Game;
import com.back.guessgame.entities.Party;
import com.back.guessgame.entities.User;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.services.PartyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/party")
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
		Set<Game> games = gameRepository.findAllById(party.getGamesId()).stream().collect(Collectors.toSet());
		if(user == null) {
			return -1;
		}
		if(games.isEmpty()) {
			return -2;
		}
		return partyService.newParty(party, user, games);
	}

	@PutMapping("/{id}")
	public long updateParty(@PathVariable Long id, @RequestBody GeneralPartyDto partyDetails) {
		Party party = partyRepository.findById(id).orElse(null);
		if(party != null) {
			party.setLeaderRank(partyDetails.getLeaderRank());
			party.setNbPoints(partyDetails.getNbPoints());
			party.setUser(userRepository.findById(partyDetails.getUserId()).orElse(null));
			partyRepository.save(party);
			return party.getId();
		}
		return -1;
	}

	@GetMapping("/result/{partycode}")
	public ResponseEntity<PartyResultDto> getResult(@PathVariable long partycode) {
		return new ResponseEntity<>(partyService.getResultScores(partycode), HttpStatus.OK);
	}

	@DeleteMapping("/{id}")
	public void deleteParty(@PathVariable Long id) {
		partyRepository.deleteById(id);
	}
}
