package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.UserBet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserBetRepository extends JpaRepository<UserBet, Long> {
}
