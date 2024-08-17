package com.back.guessgame.controllers;

import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.*;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.services.JwtService;
import com.back.guessgame.services.PartyService;
import io.swagger.v3.core.util.Json;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
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

	private final JwtService jwtService;

	@Autowired
	SimpMessagingTemplate messagingTemplate;

	public PartyController(PartyRepository partyRepository, GameRepository gameRepository, UserRepository userRepository, JwtService jwtService) {
		this.partyRepository = partyRepository;
		this.gameRepository = gameRepository;
		this.userRepository = userRepository;
		this.jwtService = jwtService;
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
	public Long createParty(@RequestBody NewPartyDto party) {
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

	@GetMapping("/codeExist/{code}")
	public ResponseEntity<String> codeExist(@PathVariable String code) {
		Map<String, Boolean> jsonResponse = new HashMap<>();
		boolean isAvailable = partyService.codeAvailable(code);
		jsonResponse.put("isAvailable", isAvailable);
		if(isAvailable) {
			return new ResponseEntity<>(Json.pretty(jsonResponse), null, 200);
		}
		return new ResponseEntity<>(Json.pretty(jsonResponse), null, 400);
	}

	@GetMapping("/generateRandomCode")
	public ResponseEntity<String> generateCode() {
		Map<String, String> jsonResponse = new HashMap<>();
		Long code = partyService.generateCode();
		jsonResponse.put("code", code.toString());
		return new ResponseEntity<>(Json.pretty(jsonResponse), null, 200);
	}

	@PostMapping("/join")
	public ResponseEntity<String> inviteLink(@RequestBody NewPartyDto partyDto) {
		User user = userRepository.findByLoginOrMail(partyDto.getUserLogin(), "").orElse(null);
		if(user == null) {
			return new ResponseEntity<>(Json.pretty("user not found"), null, 404);
		}
		Map<String, Long> jsonResponse = new HashMap<>();
		jsonResponse.put("userId", user.getId());
		messagingTemplate.convertAndSend("/topic/reply/joinParty", user.getId());
		partyService.addUserToParty(new NewPartyDto(user.getLogin(),partyDto.getPartyCode(),""));
		return new ResponseEntity<>(Json.pretty(jsonResponse), null, 200);
	}

	@PostMapping("/addGame")
	public ResponseEntity<String> addGame(@RequestBody NewPartyDto partyDto) {
		Game game = gameRepository.findOneByName(partyDto.getGameName());
		partyService.addGameToParties(game.getId(), partyDto.getPartyCode());
		if(game == null) {
			return new ResponseEntity<>(Json.pretty("game not found"), null, 404);
		}
		return new ResponseEntity<>(Json.pretty("game added"), null, 200);
	}
	@PostMapping("/removeGame")
	public ResponseEntity<String> removeGame(@RequestBody NewPartyDto partyDto) {
		Game game = gameRepository.findOneByName(partyDto.getGameName());
		partyService.removeGameToParties(game.getId(), partyDto.getPartyCode());
		if(game == null) {
			return new ResponseEntity<>(Json.pretty("game not found"), null, 404);
		}
		return new ResponseEntity<>(Json.pretty("game added"), null, 200);
	}


}
