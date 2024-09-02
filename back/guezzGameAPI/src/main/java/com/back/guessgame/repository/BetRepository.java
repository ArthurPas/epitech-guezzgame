package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.Bet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BetRepository extends JpaRepository<Bet, Long> {
}
