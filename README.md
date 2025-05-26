# 🌠 SpaceForces

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.3-green.svg)](https://spring.io/projects/spring-boot)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.17-black.svg)](https://nextjs.org/)
[![Java](https://img.shields.io/badge/Java-23-orange.svg)](https://openjdk.java.net/)
[![Node.js](https://img.shields.io/badge/Node.js-18.2.0-green.svg)](https://nodejs.org/)

**SpaceForces** is an interactive web application designed for space enthusiasts. It allows users to stay up to date with real-time space news and test their knowledge through dynamically generated quizzes.

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [DevOps & Deployment](#-devops--deployment)
- [Video Demo](#-video--demo)
- [Team](#-team)

## 🚀 Project Overview

The main goal of SpaceForces is to blend **information** and **entertainment** around space exploration. Our platform provides:

- **Real-time Space News**: Stay updated with the latest discoveries and missions
- **Interactive Quizzes**: Test your space knowledge with dynamic questions
- **Competitive Rankings**: Compete with other space enthusiasts
- **Admin Management**: Comprehensive content management system
- **User Profiles**: Personal progress tracking and achievements

### 🎯 Value Proposition

SpaceForces bridges the gap between space education and entertainment, making space science accessible and engaging for enthusiasts of all levels.

## ✨ Features

### 🧩 Quizzes

- **Real-time Competitions**: Regularly hosted space-themed quizzes
- **Difficulty Levels**: Questions categorized by complexity
- **Topic Specialization**: Focus on specific areas like Astronomy, Space Missions, Rockets, Black Holes, Astrobiology
- **Admin Creation Tools**: Content management for quiz creation and review
- **Time-limited Challenges**: Answer within set timeframes

### 🏆 Ranking System

- **Performance-based Rankings**: Users ranked by quiz performance
- **Division Leaderboards**: Updated rankings per category
- **Point System**: Difficulty-based scoring mechanism
- **Achievement Tracking**: Progress monitoring and badges

### 📰 Space News Integration

- **Live Updates**: Latest space discoveries and mission updates
- **Curated Content**: Quality-filtered news from reliable sources
- **Category Filtering**: Organize news by topics and agencies

## 🛠 Technologies Used

### Frontend

- **Framework**: Next.js 14.2.17
- **Language**: TypeScript 5.8.2
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: Radix UI
- **State Management**: Zustand 4.5.2
- **Form Handling**: React Hook Form 7.53.0
- **HTTP Client**: Axios 1.8.4

### Backend

- **Framework**: Spring Boot 3.4.3
- **Language**: Java 23
- **Database**: Oracle Database
- **ORM**: JPA/Hibernate
- **Security**: Spring Security + JWT
- **Build Tool**: Maven 3.9.9

### Cloud & Services

- **Media Storage**: Cloudinary
- **News API**: Spaceflight News API
- **Monitoring**: Prometheus + Grafana
- **Containerization**: Docker
- **Orchestration**: Kubernetes

## Architecture

![architecture](https://mermaid.ink/img/pako:eNpVj8FygjAQhl8ls2dlAiJIDp0RrN5aZ_RU8LCFFWkhYWIyo3V890bFgzkl-33_bvYCpaoIBNQa-wPbpoVk7szzpVbSkKzYmH3QyXg_xx0bj99YmqdY_j7ApteNrFmqlNk9cundyfJPjWVLbL5dswUa_MYjvRjvedYqWzUS9XkAy3ytVUfmQHYYtcpXGvco8SW6hBF0pDtsKvftyw0V4FIdFSDctaI92tYUUMirU9EatTnLEoTRlkagla0Pz4ftKzS0aNBt34HYY3t01R7ll1LdU6r1bdKQdouTzpSVBkTg310QFziB8IPAC6Y8Cv0wTJI4utGzK0fci5OJH8ezME6mnE-uI_i7t-de5DsSzeJpMgkjzmfXf5FmeEU?type=png)

## Getting Started

### Prerequisites
- **Oracle ATP instance**
- **Node.js** >= 18.2.0
- **Java** >= 23
- **Maven** >= 3.9.9
- **Docker** & **Docker Compose**
- **Oracle Database** (or use provided Docker setup)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/spaceforces.git
   cd spaceforces
   ```

2. **Backend Setup**

   ```bash
   cd spaceforces-back
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your configuration
   
   # Install dependencies and run
   mvn clean install
   mvn spring-boot:run
   ```

3. **Frontend Setup**

   ```bash
   cd spaceforces-front
   
   # Install dependencies
   npm install
   
   # Configure environment
   cp .env.local.example .env.local
   # Edit .env.local with your API URLs
   
   # Run development server
   npm run dev
   ```

### Environment Variables

#### Backend (.env)

```env
DB_URL=your_oracle_db_url
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

#### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_NAME=SpaceForces
```

## Test Environments

#### Unit Testing Environment with Mockito

- **Libraries Overview**
  - Mockito for mocking dependencies
  - JUnit 5 for test execution

- **Key Features**
  - Mock object creation and verification
  - Exception testing

- **Testing Approach**

  ```
  Component Under Test → Mocked Dependencies → Assertions
  ```

- **Common Patterns**
  - Service layer testing with repository mocks
  - Controller layer testing with service mocks

- **Benefits**
  - Isolated component testing
  - Fast execution
  - Controlled dependency behavior
  - Predictable test scenarios

#### Integration Testing Environment

##### MockMvc for API Testing

- **Libraries Overview**
  - Spring's MockMvc for HTTP request simulation
  - SpringBootTest for integration testing, as it loads the full application context to test how components work together.

- **Key Features**
  - Full Spring context loading
  - HTTP request/response simulation
  - Response validation

- **Testing Approach**

  ```
  HTTP Request → MockMvc → Spring Context → Database → Response
  ```

- **Common Patterns**
  - Request building and execution
  - Response status verification
  - JSON content validation
- **Benefits**
  - No need for running server
  - Fast test execution
  - Real Spring context
  - Complete request/response cycle

##### H2 Database for Testing

- **Key Features**
  - Isolated test database
  - Schema compatibility with production
  - Fast data operations
  - Transaction rollback support

- **Common Patterns**
  - Test data setup and cleanup
  - Rollback after test

#### Test Configuration Integration

##### Unit Test Setup

```java
@ExtendWith(MockitoExtension.class)
class ServiceTest {
    @Mock
    private Repository repository;
    
    @InjectMocks
    private Service service;
}
```

##### Integration Test Setup

```java
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class IntegrationTest {
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private TestEntityManager entityManager;
}
```

#### Environment-Specific Features

##### Unit Testing

- Fast execution
- Isolated components

##### Integration Testing

- End-to-end flows
- Real database operations

## 🐳 DevOps & Deployment

### Kubernetes Infrastructure

The application runs on a Kubernetes cluster using Minikube for local development.

[![Kubernetes Hierarchy](https://mermaid.ink/img/pako:eNqNVNtunDAQ_RXkKG9kxWW5-a1JelGlRJHSp7J98GIb6IKNDKhJV_n32gsY2Atbr8TOjM85jAfP7EHCMQEQpAJVmfHjfsMMuep22wW-8bqJ1cN4QkmWM_KrA8xAjzzZERF3f8Znls5xM-xTzvJduyXxYBgPnDVIMsQRZUZ7llmOFOWdQc-TIhS1RfP8GuPOMhgqSV2h5BJVrXskz8DwC8fxtjMXwF-ETL1H095egH8ViCKGFDrtzAXwi-AlaTLS1gpfae8CRb75_MaVKn0nbJezWlbpd2f9V5WO6SrFnn9nLfDU6in6q9txHzlcBMGL4uxNWJJwtMSnlLBmgX2xTGc3ToKzgHa00T1vb43X5r3IWdr5SYHqWt5GI1NtRPOigDc0Uj-zlufdEXjjum5v3_3JcZNBp3o7IifDYXuFZE1c6moFJwqtbXRNRDWPYKQhda-CKbVwOOaRBL6Lr6noGzIcJqEhGVMJkY_d7TWRiuMhh4hgGow52IEV0jndHugTkcNoOtR0GuxnkK7WdE-Pj7O7aqZMCjQTHUaJqdtlLMIUOE4PczIbzLHxzVlbm2P7qHpMlU66xDy59IoCTDm4cwxgI1pigpKIEikX7JXYBsg3lWQDoDT7KbgBG_YhaRViPzkvB6bgbZoBSFFRS6-tMGrIY45kl5c6KuRxiHjgLWsAdOy1c1ABcA_eALRdb2UHvhVElm1Z69CXu-8ABt4qXLuRFXihHQaeE3yY4O_hvdbK8wPLc3zH923fDx374x8Oh_Vw?type=png)](https://mermaid.live/edit#pako:eNqNVNtunDAQ_RXkKG9kxWW5-a1JelGlRJHSp7J98GIb6IKNDKhJV_n32gsY2Atbr8TOjM85jAfP7EHCMQEQpAJVmfHjfsMMuep22wW-8bqJ1cN4QkmWM_KrA8xAjzzZERF3f8Znls5xM-xTzvJduyXxYBgPnDVIMsQRZUZ7llmOFOWdQc-TIhS1RfP8GuPOMhgqSV2h5BJVrXskz8DwC8fxtjMXwF-ETL1H095egH8ViCKGFDrtzAXwi-AlaTLS1gpfae8CRb75_MaVKn0nbJezWlbpd2f9V5WO6SrFnn9nLfDU6in6q9txHzlcBMGL4uxNWJJwtMSnlLBmgX2xTGc3ToKzgHa00T1vb43X5r3IWdr5SYHqWt5GI1NtRPOigDc0Uj-zlufdEXjjum5v3_3JcZNBp3o7IifDYXuFZE1c6moFJwqtbXRNRDWPYKQhda-CKbVwOOaRBL6Lr6noGzIcJqEhGVMJkY_d7TWRiuMhh4hgGow52IEV0jndHugTkcNoOtR0GuxnkK7WdE-Pj7O7aqZMCjQTHUaJqdtlLMIUOE4PczIbzLHxzVlbm2P7qHpMlU66xDy59IoCTDm4cwxgI1pigpKIEikX7JXYBsg3lWQDoDT7KbgBG_YhaRViPzkvB6bgbZoBSFFRS6-tMGrIY45kl5c6KuRxiHjgLWsAdOy1c1ABcA_eALRdb2UHvhVElm1Z69CXu-8ABt4qXLuRFXihHQaeE3yY4O_hvdbK8wPLc3zH923fDx374x8Oh_Vw)

### CI/CD Pipeline

Our Jenkins pipeline includes:

1. **Source Code Checkout**
2. **Backend Tests & Build**
3. **Frontend Tests & Build**
4. **Docker Image Creation**
5. **Kubernetes Deployment**
6. **Integration Tests**

[![Jenkins Pipeline](https://mermaid.ink/img/pako:eNqVVWtz4jYU_SuqO9MPHZLlZR6edjuAw24WQgiPZBOT6Qj7GjTYEiPL2aWQ_15Zsoxpux_KB4-le849R7r3mqPlswAsxwoj9s3fYi7Qwl1RJH89by6y9ZTsISIUXtHV1UfU9-Yg0j1yDxTHxEejdA2cgoAE9TZAxasm9xV44DXQgFGBJZ0nDnKZvwNeQTtJ8kVUQXf4DWhOGSiKm-VHN_SNcEZjmRA9Yk7wOoIkx7kKd-MNtuDvWCqkQgB57EbFhp4rDfFYqqLBFtNNwdXPoUJ9OqoMOSJAQyI13jXiU4Y4JXvsQ8i4D8lVKO2ID7-e0Gevv7wdu38OZ_eTxc3ERb8jwVNj4N_ENfZ3Ge825_V7g9EPaBOGOETwhuWpfe37hL548x3Zo3VKouDyGJ_VMUbHvlQAGhjKH_kZbnVYL77oS6NBOcFIqT5nKmNvAYlAJtU3IrYXxRnlBk_ozhuzDaFIsLycaAYbkgh-yKFjJXVXFrpTW5NjPzuEETE-J2cX955G_IKmabIt3NzGeGNualIYmebphlllSvn0815JTvViepZ4uJQwZK3x25p_-KjOHkPM-AFFJCYikWBBYpC99lrOl5mYHXv0kBcHBYzCpYsH5WKmF7Ozi7m33AdYQHl8XNhH7BCfZ2hWqCy8KZPV6fmCMHrZBHOlsCyaILMijInlWfHRKK418Coo5NSp9SxwFkXZSCUCi9QILQsfT8fivi509PNRWXnSi6ez9FcjHebk_6H9dL6DstRXJZVvLdTi2cvbUbbnuVLPKvZyNB8x2axJGonc94vKPk99OahZVfSLV4CTbAMCCH56LROGmEQphxPKX86EUG78A50NXQlAKEm2EFzWUOtejmie-7_mNhGHCFBPJosi52eohXYI5YiEm1gntKFTjhktHfc70PK75biR1fEw9IOgXo6Pi0jYgGo5cm80G2E9DMqRhx9G5iZbA-zQXlGrYsXyw41JIP-SjhlyZYktxLCyHPkaQIhl9VbWir5LKE4Fmx-obznZp7RicZZutmaRqp5zCd5wHFtOiKNE7u4xfWEsNqANz5RytuxM4AOWUmE5rW5NgS3naH23nHqjet1pdxvtWq1a7bYbjWbFOlhOrd26btabtU612bJr7W7Nfq9Yf6n89etqs2k3q7VWq2M3O3an-f43IP5P6g?type=png)](https://mermaid.live/edit#pako:eNqVVWtz4jYU_SuqO9MPHZLlZR6edjuAw24WQgiPZBOT6Qj7GjTYEiPL2aWQ_15Zsoxpux_KB4-le849R7r3mqPlswAsxwoj9s3fYi7Qwl1RJH89by6y9ZTsISIUXtHV1UfU9-Yg0j1yDxTHxEejdA2cgoAE9TZAxasm9xV44DXQgFGBJZ0nDnKZvwNeQTtJ8kVUQXf4DWhOGSiKm-VHN_SNcEZjmRA9Yk7wOoIkx7kKd-MNtuDvWCqkQgB57EbFhp4rDfFYqqLBFtNNwdXPoUJ9OqoMOSJAQyI13jXiU4Y4JXvsQ8i4D8lVKO2ID7-e0Gevv7wdu38OZ_eTxc3ERb8jwVNj4N_ENfZ3Ge825_V7g9EPaBOGOETwhuWpfe37hL548x3Zo3VKouDyGJ_VMUbHvlQAGhjKH_kZbnVYL77oS6NBOcFIqT5nKmNvAYlAJtU3IrYXxRnlBk_ozhuzDaFIsLycaAYbkgh-yKFjJXVXFrpTW5NjPzuEETE-J2cX955G_IKmabIt3NzGeGNualIYmebphlllSvn0815JTvViepZ4uJQwZK3x25p_-KjOHkPM-AFFJCYikWBBYpC99lrOl5mYHXv0kBcHBYzCpYsH5WKmF7Ozi7m33AdYQHl8XNhH7BCfZ2hWqCy8KZPV6fmCMHrZBHOlsCyaILMijInlWfHRKK418Coo5NSp9SxwFkXZSCUCi9QILQsfT8fivi509PNRWXnSi6ez9FcjHebk_6H9dL6DstRXJZVvLdTi2cvbUbbnuVLPKvZyNB8x2axJGonc94vKPk99OahZVfSLV4CTbAMCCH56LROGmEQphxPKX86EUG78A50NXQlAKEm2EFzWUOtejmie-7_mNhGHCFBPJosi52eohXYI5YiEm1gntKFTjhktHfc70PK75biR1fEw9IOgXo6Pi0jYgGo5cm80G2E9DMqRhx9G5iZbA-zQXlGrYsXyw41JIP-SjhlyZYktxLCyHPkaQIhl9VbWir5LKE4Fmx-obznZp7RicZZutmaRqp5zCd5wHFtOiKNE7u4xfWEsNqANz5RytuxM4AOWUmE5rW5NgS3naH23nHqjet1pdxvtWq1a7bYbjWbFOlhOrd26btabtU612bJr7W7Nfq9Yf6n89etqs2k3q7VWq2M3O3an-f43IP5P6g)

## Video Demo

[Watch demo video](videoDemo.mp4)

## Team

- **Idriss El Abidi**
- **Younes Lamnouar**
- **Omar Mandri**
- **Omar Nebag**
