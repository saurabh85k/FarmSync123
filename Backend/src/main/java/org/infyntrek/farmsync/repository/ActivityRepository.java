package org.infyntrek.farmsync.repository;

import java.util.List;

import org.infyntrek.farmsync.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityRepository extends JpaRepository<Activity, Long> {

	List<Activity> findByCropCropId(Long cropId);
}
