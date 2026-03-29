package org.infyntrek.farmsync.repository;

import java.util.List;

import org.infyntrek.farmsync.entity.Crop;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CropRepository extends JpaRepository<Crop, Long> {

	List<Crop> findByFarmFarmId(Long farmId);
}
