package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.User;
import com.back.guessgame.repository.entities.UserBet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserBetRepository extends JpaRepository<UserBet, Long> {
	List<UserBet> findByUser(User user);
}
