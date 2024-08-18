package com.back.guessgame.services;

import com.back.guessgame.controllers.PartyController;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.*;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;

@Service
public class PartyService {
	private final PartyRepository partyRepository;
	Logger logger = LoggerFactory.getLogger(PartyController.class);
	private UserRepository userRepository;
	private GameRepository gameRepository;

	public PartyService(PartyRepository partyRepository, UserRepository userRepository, GameRepository gameRepository) {
		this.partyRepository = partyRepository;
		this.userRepository = userRepository;
		this.gameRepository = gameRepository;
	}

	public Set<GeneralPartyDto> findAll() {
		Set<GeneralPartyDto> parties = new HashSet<>();
		Map<Long, Set<User>> usersInSameParty = new HashMap<>();
		for (Party party : partyRepository.findAll()) {
			parties.add(new GeneralPartyDto(party));
		}

		return parties;
	}
	/*return userRepository.findAll().stream().map(PartyDto::new).collect(Collectors.toSet());*/

	public Optional<GeneralPartyDto> findById(Long id) {
		return partyRepository.findById(id).map(GeneralPartyDto::new).stream().findFirst();
	}

	public List<GeneralPartyDto> getPartyByPartyCode(Long partyCode) {
		List<GeneralPartyDto> parties = new ArrayList<>();
		for (Party party : partyRepository.findAllByPartyCode(partyCode)) {
			parties.add(new GeneralPartyDto(party));
		}
		return parties;
	}

	public PartyResultDto getResultScores(long partyCode) {
		List<GeneralPartyDto> parties = getPartyByPartyCode(partyCode);
		List<Score> scores = new ArrayList<>();
		for (GeneralPartyDto party : parties) {
			User user = userRepository.findById(party.getUserId()).orElse(null);
			Score score = new Score(party.getUserId(), "", party.getNbPoints(), user != null ? user.getPicture() : "");
			scores.add(score);
		}
		return new PartyResultDto(scores, parties.get(0).getPartyCode());
	}

	public Long newParty(NewPartyDto partyDto) {
		Party party = new Party();
		party.setPartyCode(partyDto.getPartyCode());
		party.setNbPoints(0);
		addUserToPartyAlreadyCreated(party, partyDto.getUserLogin());
		return partyDto.getPartyCode();
	}

	public long updateParty(Party party, GeneralPartyDto partyDetails) {
		if(party != null) {
			party.setLeaderRank(partyDetails.getLeaderRank());
			party.setNbPoints(partyDetails.getNbPoints());
			party.setUser(userRepository.findById(partyDetails.getUserId()).orElse(null));
			partyRepository.save(party);
			return party.getId();
		}
		throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "Party not found", null, null, null);
	}

	public List<User> getAllUserByPartyId(Long partyId) {
		return userRepository.findAllByParties(partyRepository.findById(partyId).orElse(null));
	}

	public boolean codeAvailable(String code) {
		return partyRepository.findAllByPartyCode(Long.valueOf(code)).isEmpty();
	}

	public Long generateCode() {
		Random random = new Random();
		int code = random.nextInt(9999);
		while (!codeAvailable(String.valueOf(code))) {
			code = random.nextInt(9999);
		}
		return (long) code;
	}

	public void addUserToPartyAlreadyCreated(Party party, String login) {
		User user = userRepository.findByLoginOrMail(login, "").orElse(null);
		party.setUser(user);
		party.setNbPoints(0);
		if(partyRepository.existsPartyByUserAndPartyCode(user, party.getPartyCode())) {
			throw HttpClientErrorException.create(HttpStatus.BAD_REQUEST, "user already joined a party with the same partycode", null, null, null);
		}else {
			partyRepository.save(party);
		}
		partyRepository.save(party);
	}
	public void addUserToParty(NewPartyDto partyDto) {
		Party party = new Party();
		party.setNbPoints(0);
		party.setPartyCode(partyDto.getPartyCode());
		addUserToPartyAlreadyCreated(party, partyDto.getUserLogin());
	}
	public void addGameToParties(Long gameId, Long partyCode) {
		for (Party party : partyRepository.findAllByPartyCode(partyCode)) {
			if(party != null) {
				party.getGames().add(gameRepository.findById(gameId).orElse(null));
				partyRepository.save(party);
			}
		}
	}
	public void removeGameToParties(Long gameId, Long partyCode) {
		for (Party party : partyRepository.findAllByPartyCode(partyCode)) {
			if(party != null) {
				party.getGames().remove(gameRepository.findById(gameId).orElse(null));
				partyRepository.save(party);
			}
		}
	}

}
