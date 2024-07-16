package com.back.guessgame.controllers;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.GeneralPartyDto;
import com.back.guessgame.repository.dto.NewPartyDto;
import com.back.guessgame.repository.dto.PartyResultDto;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.PartyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/party")
@CrossOrigin(origins = "http://localhost:3000")
public class PartyController {

	Logger logger = LoggerFactory.getLogger(PartyController.class);
	private PartyRepository partyRepository;

	private PartyService partyService;
	private final GameRepository gameRepository;

	private final UserRepository userRepository;

	public PartyController(PartyRepository partyRepository, GameRepository gameRepository, UserRepository userRepository) {
		this.partyRepository = partyRepository;
		this.gameRepository = gameRepository;
		this.userRepository = userRepository;
		this.partyService = new PartyService(partyRepository, userRepository, gameRepository);

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
	public List<Long> createParty(@RequestBody NewPartyDto party) {
		return partyService.newParty(party);
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
