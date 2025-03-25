package com.ensias.spaceforces.user;

import com.ensias.spaceforces.rank.Rank;
import com.ensias.spaceforces.rank.RankRepository;
import com.ensias.spaceforces.user.dto.UserDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final RankRepository rankRepository;

    public UserDTO createUser(UserDTO userDTO) {
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());
        user.setAdmin(userDTO.isAdmin());
        user.setPoints(userDTO.getPoints());
        user.setDescription(userDTO.getDescription());

        if (userDTO.getRankId() != null) {
            Rank rank = rankRepository.findById(userDTO.getRankId())
                    .orElseThrow(() -> new RuntimeException("Rank not found"));
            user.setRank(rank);
        }

        User savedUser = userRepository.save(user);
        return convertToDTO(savedUser);
    }

@Transactional(readOnly = true)
public List<UserDTO> getAllUsers() {
    return userRepository.findAll().stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
}
    public UserDTO getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return convertToDTO(user);
    }

    public UserDTO updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (userDTO.getUsername() != null && !userDTO.getUsername().equals(user.getUsername())) {
            if (userRepository.existsByUsername(userDTO.getUsername())) {
                throw new RuntimeException("Username already exists");
            }
            user.setUsername(userDTO.getUsername());
        }

        if (userDTO.getEmail() != null && !userDTO.getEmail().equals(user.getEmail())) {
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(userDTO.getEmail());
        }

        if (userDTO.getPassword() != null) {
            user.setPassword(userDTO.getPassword());
        }

        if (userDTO.getRankId() != null) {
            Rank rank = rankRepository.findById(userDTO.getRankId())
                    .orElseThrow(() -> new RuntimeException("Rank not found"));
            user.setRank(rank);
        }

        user.setAdmin(userDTO.isAdmin());
        user.setPoints(userDTO.getPoints());
        user.setDescription(userDTO.getDescription());

        User updatedUser = userRepository.save(user);
        return convertToDTO(updatedUser);
    }

    private UserDTO convertToDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setAdmin(user.isAdmin());
        dto.setPoints(user.getPoints());
        dto.setDescription(user.getDescription());

        dto.setRankId(user.getRank() != null ? user.getRank().getId() : null);

        return dto;
    }
}