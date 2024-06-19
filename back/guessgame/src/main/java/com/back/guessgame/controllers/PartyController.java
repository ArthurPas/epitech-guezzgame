package com.back.guessgame.controllers;

import com.back.guessgame.dto.GeneralPartyDto;
import com.back.guessgame.dto.PartyResultDto;
import com.back.guessgame.entities.Party;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.services.PartyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/parties")
public class PartyController {

	Logger logger = LoggerFactory.getLogger(PartyController.class);
	private PartyRepository partyRepository;

	private PartyService partyService;

	public PartyController(PartyRepository partyRepository) {
		this.partyRepository = partyRepository;
		this.partyService = new PartyService(partyRepository);
	}

	@GetMapping
	public Set<GeneralPartyDto> getAllParties() {

		return partyService.findAll();
	}

	@GetMapping("/{id}")
	public GeneralPartyDto getPartyById(@PathVariable Long id) {
		return partyService.findById(id).orElse(null);
	}

	@PostMapping
	public GeneralPartyDto createParty(@RequestBody GeneralPartyDto party) {
		return partyRepository.save(party);
	}

	@PutMapping("/{id}")
	public long updateParty(@PathVariable Long id, @RequestBody GeneralPartyDto partyDetails) {
		Party party = partyRepository.findById(id).orElse(null);
		if(party != null) {
			party.setRank(partyDetails.getRank());
			party.setNbPoints(partyDetails.getNbPoints());
			/*party.setUser(partyDetails.getUser());*/
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
