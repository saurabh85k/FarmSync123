package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.FarmDTO;

public interface FarmService {

	FarmDTO createFarm(FarmDTO farmDTO);
	
	FarmDTO getFarmById(Long farmId);
	
	List<FarmDTO> getAllFarms();
	
	List<FarmDTO> getFarmsByUserId(Long userId);
	
	FarmDTO updateFarm(Long farmId, FarmDTO farmDTO);
	
	void deleteFarm(Long farmId);
}
