package org.infyntrek.farmsync.service;

import java.util.List;

import org.infyntrek.farmsync.dto.CropDTO;

public interface CropService {

	CropDTO createCrop(CropDTO cropDTO);
	
	CropDTO getCropById(Long cropId);
	
	List<CropDTO> getAllCrops();
	
	List<CropDTO> getCropsByFarmId(Long farmId);
	
	CropDTO updateCrop(Long cropId, CropDTO  cropDTO);
	
	void deleteCrop(Long cropId);
}
