package org.infyntrek.farmsync.repository;

import org.infyntrek.farmsync.entity.FarmUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FarmUserRepository extends JpaRepository<FarmUser, Long> {

}
