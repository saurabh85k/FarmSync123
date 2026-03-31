package org.infyntrek.farmsync.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Farm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long farmId;
	
	private String farmName;
	private String location;
	private Double areaSize;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	private FarmUser farmUser;
	
	@OneToMany(mappedBy = "farm")
	private List<Crop> crops;
	
}
