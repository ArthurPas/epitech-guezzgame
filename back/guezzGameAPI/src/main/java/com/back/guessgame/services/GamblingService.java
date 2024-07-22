package com.back.guessgame.services;

import com.back.guessgame.repository.BetOptionRepository;
import com.back.guessgame.repository.BetRepository;
import com.back.guessgame.repository.entities.Bet;
import com.back.guessgame.repository.entities.BetOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamblingService {

	private final BetRepository betRepository;
	private final BetOptionRepository betOptionRepository;

	@Autowired
	public GamblingService(BetRepository betRepository, BetOptionRepository betOptionRepository) {
		this.betRepository = betRepository;
		this.betOptionRepository = betOptionRepository;
	}

	public Bet createBet(Bet bet) {
		return betRepository.save(bet);
	}

	public Optional<Bet> getBetById(Long id) {
		return betRepository.findById(id);
	}

	public List<Bet> getAllBets() {
		return betRepository.findAll();
	}

	public Bet updateBet(Long id, Bet betDetails) {
		Bet bet = betRepository.findById(id).orElseThrow(() -> new RuntimeException("Bet not found for this id :: " + id));
		bet.setTitle(betDetails.getTitle());
		bet.setBetOptions(betDetails.getBetOptions());
		bet.setWinnerId(betDetails.getWinnerId());
		bet.setCreatedAt(betDetails.getCreatedAt());
		bet.setEndTime(betDetails.getEndTime());
		return betRepository.save(bet);
	}

	public void deleteBet(Long id) {
		Bet bet = betRepository.findById(id).orElseThrow(() -> new RuntimeException("Bet not found for this id :: " + id));
		betRepository.delete(bet);
	}

	public BetOption createBetOption(BetOption betOption) {
		return betOptionRepository.save(betOption);
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
		betOption.setGamblersId(betOptionDetails.getGamblersId());
		betOption.setIsWin(betOptionDetails.getIsWin());
		return betOptionRepository.save(betOption);
	}

	public void deleteBetOption(Long id) {
		BetOption betOption = betOptionRepository.findById(id).orElseThrow(() -> new RuntimeException("BetOption not found for this id :: " + id));
		betOptionRepository.delete(betOption);
	}

	public Long addGamblerToBetOption(Long betOptionId, Long gamblerId) {
		BetOption betOption = betOptionRepository.findById(betOptionId).orElseThrow(null);
		betOption.getGamblersId().add(gamblerId);
		return betOptionRepository.save(betOption).getId();
	}
}