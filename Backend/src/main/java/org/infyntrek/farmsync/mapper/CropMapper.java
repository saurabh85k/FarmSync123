package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.CropDTO;
import org.infyntrek.farmsync.entity.Crop;
import org.springframework.stereotype.Component;

@Component
public class CropMapper {

	public CropDTO toDTO(Crop crop) {
		if(crop == null) {
			return null;
		}
		
		return CropDTO.builder()
				.cropId(crop.getCropId())
				.cropName(crop.getCropName())
				.season(crop.getSeason())
				.sowingDate(crop.getSowingDate())
				.expectedHarvest(crop.getExpectedHarvest())
				.build();
	}
	
	public Crop toEntity(CropDTO cropDTO) {
		if(cropDTO == null) {
			return null;
		}
		
		Crop crop = new Crop();
		
		crop.setCropId(cropDTO.getCropId());
		crop.setCropName(cropDTO.getCropName());
		crop.setSeason(cropDTO.getSeason());
		crop.setSowingDate(cropDTO.getSowingDate());
		crop.setExpectedHarvest(cropDTO.getExpectedHarvest());
		
		return crop;
	}
}
