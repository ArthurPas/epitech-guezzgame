package com.back.guessgame.controllers;

import com.back.guessgame.repository.entities.Bet;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/gambling")
public class GamblingController {

	@PostMapping("/bet")
	public ResponseEntity<?> createBet(@RequestBody Bet Bet) {

		return new ResponseEntity<>(HttpStatus.CREATED);
	}

	@GetMapping("/bets/{id}")
	public ResponseEntity<Bet> getBetById(@PathVariable Long id) {
		// Logic to find a bet by id
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/bets")
	public ResponseEntity<List<Bet>> getAllBets() {
		// Logic to return all bets
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PutMapping("/bet/{id}")
	public ResponseEntity<?> updateBet(@PathVariable Long id, @RequestBody Bet Bet) {
		// Logic to update a bet
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@DeleteMapping("/bet/{id}")
	public ResponseEntity<?> deleteBet(@PathVariable Long id) {
		// Logic to delete a bet
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

}
