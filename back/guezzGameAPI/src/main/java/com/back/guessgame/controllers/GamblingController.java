package com.back.guessgame.controllers;

import com.back.guessgame.repository.dto.BetDto;
import com.back.guessgame.repository.dto.BetOptionDto;
import com.back.guessgame.services.GamblingService;
import com.fasterxml.jackson.databind.ser.FilterProvider;
import com.fasterxml.jackson.databind.ser.impl.SimpleBeanPropertyFilter;
import com.fasterxml.jackson.databind.ser.impl.SimpleFilterProvider;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/gambling")
@CrossOrigin(origins = "http://localhost:3000")
public class GamblingController {

	SimpleBeanPropertyFilter simpleBeanPropertyFilter = SimpleBeanPropertyFilter.serializeAllExcept("password", "mail", "nbCoin", "friendships", "items", "parties", "betOption", "bet", "xpPoint", "isVip");
	FilterProvider filterProvider = new SimpleFilterProvider().addFilter("userFilter", simpleBeanPropertyFilter).addFilter("userBetFilter", simpleBeanPropertyFilter).addFilter("betOptionFilter", simpleBeanPropertyFilter);
	private GamblingService gamblingService;

	public GamblingController(GamblingService gamblingService) {
		this.gamblingService = gamblingService;
	}

	@PostMapping("/bet")
	public ResponseEntity<?> createBet(@RequestBody BetDto Bet) {
		gamblingService.createBet(Bet);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/bets/{id}")
	public MappingJacksonValue getBetById(@PathVariable Long id) {
		MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(gamblingService.getAllBets());
		mappingJacksonValue.setFilters(filterProvider);
		return mappingJacksonValue;
	}

	@GetMapping("/bets")
	public MappingJacksonValue getAllBets() {
		MappingJacksonValue mappingJacksonValue = new MappingJacksonValue(gamblingService.getAllBets());
		mappingJacksonValue.setFilters(filterProvider);
		return mappingJacksonValue;
	}

	@PutMapping("/bet/{id}")
	public ResponseEntity<?> updateBet(@PathVariable Long id, @RequestBody BetDto Bet) {
		long betId = gamblingService.updateBet(id, Bet);
		return new ResponseEntity<>(betId, HttpStatus.OK);
	}

	@DeleteMapping("/bet/{id}")
	public ResponseEntity<?> deleteBet(@PathVariable Long id) {
		gamblingService.deleteBet(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	@PostMapping("/betOption")
	public ResponseEntity<?> createBetOption(@RequestBody BetOptionDto BetOption) {
		gamblingService.createBetOption(BetOption);
		return new ResponseEntity<>(HttpStatus.CREATED);
	}

}
