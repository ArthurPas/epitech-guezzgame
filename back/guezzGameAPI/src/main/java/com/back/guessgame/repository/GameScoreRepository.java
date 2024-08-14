package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.GameScore;
import com.back.guessgame.repository.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GameScoreRepository extends JpaRepository<GameScore, Long> {
	public List<GameScore> findAllByUserAndGameAndPartyCode(User user, Game game, Long partyCode);

	public List<GameScore> findAllByPartyCodeAndGameAndNbRound(Long partyCode, Game game, int nbRound);

	public List<GameScore> findAllByPartyCodeAndGame(Long partyCode, Game game);
}
