package org.infyntrek.farmsync.repository;

import java.util.List;

import org.infyntrek.farmsync.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmRepository extends JpaRepository<Farm, Long> {

	List<Farm> findByUserUserId(Long userId);
}
