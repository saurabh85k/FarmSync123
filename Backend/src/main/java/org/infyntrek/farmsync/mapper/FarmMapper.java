package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.FarmDTO;
import org.infyntrek.farmsync.entity.Farm;
import org.springframework.stereotype.Component;

@Component
public class FarmMapper {

	public FarmDTO toDTO(Farm farm) {
		if(farm == null) {
			return null;
		}
		
		return FarmDTO.builder()
				.farmId(farm.getFarmId())
				.farmName(farm.getFarmName())
				.location(farm.getLocation())
				.areaSize(farm.getAreaSize())
				.userId(farm.getUser() != null ? farm.getUser().getId() : null)
				.build();
	}
	
	public Farm toEntity(FarmDTO farmDTO) {
		if(farmDTO == null) {
			return null;
		}
		
		Farm farm = new Farm();
		
		farm.setFarmId(farmDTO.getFarmId());
		farm.setFarmName(farmDTO.getFarmName());
		farm.setLocation(farmDTO.getLocation());
		farm.setAreaSize(farmDTO.getAreaSize());
		
		return farm;
	}
}
