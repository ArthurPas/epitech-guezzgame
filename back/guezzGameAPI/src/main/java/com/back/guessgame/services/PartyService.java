package com.back.guessgame.services;

import com.back.guessgame.controllers.PartyController;
import com.back.guessgame.repository.GameRepository;
import com.back.guessgame.repository.PartyRepository;
import com.back.guessgame.repository.UserRepository;
import com.back.guessgame.repository.dto.GeneralPartyDto;
import com.back.guessgame.repository.dto.NewPartyDto;
import com.back.guessgame.repository.dto.PartyResultDto;
import com.back.guessgame.repository.dto.Score;
import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import java.util.*;
import java.util.stream.Collectors;

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

	public List<GeneralPartyDto> getPartyByPartyCode(long partyCode) {
		List<GeneralPartyDto> toto = partyRepository.findAll().stream().filter(party -> party.getPartyCode() == partyCode).map(GeneralPartyDto::new).collect(Collectors.toList());
		logger.info(toto.toString());
		return toto;

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

	public List<Long> newParty(NewPartyDto partyDto) {
		List<User> users = new ArrayList<>(userRepository.findAllById(partyDto.getUsers()));
		List<Game> games = new ArrayList<>(gameRepository.findAllById(partyDto.getGamesId()));
		if(users.isEmpty()) {
			throw HttpClientErrorException.create(HttpStatus.NOT_FOUND, "Users not found", null, null, null);
		}
		if(games.isEmpty()) {
			throw HttpClientErrorException.create(HttpStatus.BAD_REQUEST, "A party cannot have 0 game", null, null, null);
		}
		List<Long> ids = new ArrayList<>();
		for (User u : users) {
			Party party = new Party();
			party.setPartyCode(partyDto.getPartyCode());
			party.setUser(u);
			for (Game g : games) {
				party.getGames().add(g);
			}
			partyRepository.save(party);
			ids.add(party.getId());
		}
		return ids;
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
}
