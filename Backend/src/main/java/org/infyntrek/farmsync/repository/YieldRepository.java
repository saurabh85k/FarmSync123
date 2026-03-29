package org.infyntrek.farmsync.repository;

import java.util.List;

import org.infyntrek.farmsync.entity.Yield;
import org.springframework.data.jpa.repository.JpaRepository;

public interface YieldRepository extends JpaRepository<Yield, Long> {

	List<Yield> findByCropCropId(Long CropId);
}
