package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.Game;
import com.back.guessgame.repository.entities.GameScore;
import com.back.guessgame.repository.entities.Party;
import com.back.guessgame.repository.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface GameScoreRepository extends JpaRepository<GameScore, Long> {
	public List<GameScore> findAllByUserAndGameAndParty(User user, Game game, Party party);

	public List<GameScore> findAllByPartyAndGameAndNbRound(Party party, Game game, int nbRound);

	public List<GameScore> findAllByPartyAndGame(Party party, Game game);
}
