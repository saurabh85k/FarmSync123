package org.infyntrek.farmsync.repository;

import org.infyntrek.farmsync.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}
