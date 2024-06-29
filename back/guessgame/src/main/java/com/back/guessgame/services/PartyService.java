package com.back.guessgame.services;

import com.back.guessgame.controllers.PartyController;
import com.back.guessgame.entities.Game;
import com.back.guessgame.entities.Party;
import com.back.guessgame.entities.User;
import com.back.guessgame.entities.dto.GeneralPartyDto;
import com.back.guessgame.entities.dto.PartyResultDto;
import com.back.guessgame.entities.dto.Score;
import com.back.guessgame.services.repository.PartyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PartyService {
	Logger logger = LoggerFactory.getLogger(PartyController.class);

	private final PartyRepository partyRepository;

	public PartyService(PartyRepository partyRepository) {
		this.partyRepository = partyRepository;
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
			Score score = new Score(party.getUserId(), "", party.getNbPoints());
			scores.add(score);
		}
		return new PartyResultDto(scores, parties.get(0).getPartyCode());
	}

	public long newParty(GeneralPartyDto partyDto, User user, Set<Game> games) {
		Party party = new Party();
		party.setPartyCode(partyDto.getPartyCode());
		party.setUser(user);
		party.setLeaderRank(partyDto.getLeaderRank());
		party.setGames(games);
		party.setNbPoints(partyDto.getNbPoints());
		partyRepository.save(party);
		return party.getId();
	}
}
