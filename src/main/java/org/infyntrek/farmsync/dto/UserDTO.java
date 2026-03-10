package org.infyntrek.farmsync.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

	private long userId;
	private String name;
	private String email;
	private String password;
	private String phone;
	private String role;
}
