package com.back.guessgame.repository;

import com.back.guessgame.repository.entities.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
	Party findOneById(Long partyId);

	List<Party> findAllByPartyCode(Long partyCode);

	Party findByPartyCode(Long partyCode);
}
