package org.infyntrek.farmsync.repository;

import org.infyntrek.farmsync.entity.Farm;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmRepository extends JpaRepository<Farm, Long> {

}
