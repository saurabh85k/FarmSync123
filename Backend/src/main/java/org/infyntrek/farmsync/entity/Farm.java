package org.infyntrek.farmsync.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

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
    private User user;              // was FarmUser, now User

    @OneToMany(mappedBy = "farm", cascade = CascadeType.ALL)
    private List<Crop> crops;
}