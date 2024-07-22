package com.back.guessgame.services;

import com.back.guessgame.repository.BetOptionRepository;
import com.back.guessgame.repository.BetRepository;
import com.back.guessgame.repository.UserBetRepository;
import com.back.guessgame.repository.dto.BetDto;
import com.back.guessgame.repository.dto.BetOptionDto;
import com.back.guessgame.repository.entities.Bet;
import com.back.guessgame.repository.entities.BetOption;
import com.back.guessgame.repository.entities.User;
import com.back.guessgame.repository.entities.UserBet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class GamblingService {

	private final BetRepository betRepository;
	private final BetOptionRepository betOptionRepository;

	private final UserBetRepository userBetRepository;

	@Autowired
	public GamblingService(BetRepository betRepository, BetOptionRepository betOptionRepository, UserBetRepository userBetRepository) {
		this.betRepository = betRepository;
		this.betOptionRepository = betOptionRepository;
		this.userBetRepository = userBetRepository;
	}

	public Bet createBet(BetDto bet) {
		Bet newBet = new Bet();
		newBet.setTitle(bet.getTitle());
		newBet.setBetOptions(new ArrayList<>());
		newBet.setCreatedAt(new Date());
		newBet.setEndTime(bet.getEndTime());
		return betRepository.save(newBet);
	}

	public Optional<Bet> getBetById(Long id) {

		return betRepository.findById(id);
	}

	public List<Bet> getAllBets() {
		return betRepository.findAll();
	}

	public long updateBet(Long id, BetDto betDetails) {
		Bet bet = betRepository.findById(id).orElseThrow(() -> new RuntimeException("Bet not found for this id :: " + id));
		bet.setTitle(betDetails.getTitle());
		bet.setEndTime(betDetails.getEndTime());
		return betRepository.save(bet).getId();
	}

	public void deleteBet(Long id) {
		Bet bet = betRepository.findById(id).orElseThrow(() -> new RuntimeException("Bet not found for this id :: " + id));
		betRepository.delete(bet);
	}

	public BetOption createBetOption(BetOptionDto betOptionDto) {
		BetOption betOption = new BetOption();
		betOption.setDescription(betOptionDto.getDescription());
		betOption.setGamblerBets(new ArrayList<>());
		betOption.setIsWin(false);
		Bet bet = this.getBetById(betOptionDto.getBetId()).orElseThrow(null);
		betOption.setOds(betOptionDto.getOds());
		betOptionRepository.save(betOption);
		bet.getBetOptions().add(betOption);
		betRepository.save(bet);
		return betOption;
	}

	public Optional<BetOption> getBetOptionById(Long id) {
		return betOptionRepository.findById(id);
	}

	public List<BetOption> getAllBetOptions() {
		return betOptionRepository.findAll();
	}

	public BetOption updateBetOption(Long id, BetOption betOptionDetails) {
		BetOption betOption = betOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("BetOption not found for this id :: " + id));
		betOption.setDescription(betOptionDetails.getDescription());
		betOption.setOds(betOptionDetails.getOds());
		betOption.setGamblerBets(betOptionDetails.getGamblerBets());
		betOption.setIsWin(betOptionDetails.getIsWin());
		return betOptionRepository.save(betOption);
	}

	public void deleteBetOption(Long id) {
		BetOption betOption = betOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("BetOption not found for this id :: " + id));
		betOptionRepository.delete(betOption);
	}

	public void addGamblerToBetOption(Long betOptionId, User gambler, int betAmount) {
		BetOption betOption = betOptionRepository.findById(betOptionId).orElseThrow(null);
		UserBet userBet = new UserBet();
		userBet.setBetAmount(betAmount);
		userBet.setUser(gambler);
		userBet.setBetOption(this.getBetOptionById(betOptionId).orElseThrow(null));
		userBetRepository.save(userBet);
		betOption.getGamblerBets().add(userBet);
		betOptionRepository.save(betOption);
	}


}