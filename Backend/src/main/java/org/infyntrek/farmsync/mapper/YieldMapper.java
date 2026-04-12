package org.infyntrek.farmsync.mapper;

import org.infyntrek.farmsync.dto.YieldDTO;
import org.infyntrek.farmsync.entity.Yield;
import org.springframework.stereotype.Component;

@Component
public class YieldMapper {

	public YieldDTO toDTO(Yield yield) {
		if(yield == null) {
			return null;
		}
		
		return YieldDTO.builder()
				.yieldId(yield.getYieldId())
				.quantity(yield.getQuantity())
				.income(yield.getIncome())
				.harvestDate(yield.getHarvestDate())
				.cropId(yield.getCrop() != null ? yield.getCrop().getCropId() : null)
				.build();
	}
	
	public Yield toEntity(YieldDTO yieldDTO) {
		if(yieldDTO == null) {
			return null;
		}
		
		Yield yield = new Yield();
		
		yield.setYieldId(yieldDTO.getYieldId());
		yield.setQuantity(yieldDTO.getQuantity());
		yield.setIncome(yieldDTO.getIncome());
		yield.setHarvestDate(yieldDTO.getHarvestDate());
		
		return yield;
	}
}
