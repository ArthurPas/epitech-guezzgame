package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.GameScore;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameScoreRepository extends JpaRepository<GameScore, Long> {
	public List<GameScore> findAllByUserIdAndGameIdAndPartyId(Long userId, Long gameId, Long partyId);

	public List<GameScore> findAllByPartyIdAndGameId(Long partyId, Long gameId);
}
