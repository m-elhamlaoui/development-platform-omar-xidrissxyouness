# 🌠 SpaceForces

**SpaceForces** is an interactive web application designed for space enthusiasts. It allows users to stay up to date with real-time space news and test their knowledge through dynamically generated quizzes.

## Project Overview

The main goal of SpaceForces is to blend **information** and **entertainment** around space exploration. Users can:

- View the latest space-related news via Spaceflight News API integration.
- Participate in interactive quizzes with automatic scoring and rankings.
- Manage their personal user profiles.
- Access an admin panel to create and edit quiz content.

## Technologies Used

| Framework       | Database / ORM         | Integrations / Services |
|----------------|------------------|--------------------------|
| Next.js        |  Oracle Database  | Cloudinary (media)       |
| Spring Boot (Java) |   JPA/Hibernate    | Spaceflight News API (news)         |

## 📡 API Integration

The app integrates with:

- **[Spaceflight News API](https://api.spaceflightnewsapi.net/v4/docs/)** – Fetches up-to-date news about space missions, rockets, and space agencies.

---

## Key Features

### 1. Quizzes

- Regularly hosted **space-themed quizzes**.
- Users compete in real-time, answering questions within a set timeframe.
- Problems categorized by difficulty.
- Administrators can create and submit quizzes.
- Review process to ensure quality and accuracy.

### 2. Ranking System

- Users ranked based on **quiz performance**.
- Leaderboards updated per division.
- Points assigned based on question difficulty.

### 3. Topic-based Challenges

- Quizzes categorized into **Astronomy, Space Missions, Rockets, Black Holes, Astrobiology, etc...**
- Users can choose to specialize in specific topics.

### 4. Space news

- Keep users updated with the latest space discoveries and events.

## Conception

### Use case Diagram

![Usecase diagram](https://img.plantuml.biz/plantuml/png/ZP9DQiCm48NtEiNWhfDL4qW99at0kq9fJp184rl47fcHt2nAxrvBScAdg-wizxvvyuCFFg24eMjLI-S0mO7OkWbWh90Erh7o5yiz2dOmUDBe2RuLm17rfHOti3cvrWayRJUlkwgAZXD3CgbLjTqTdzMFKgZ3A1HZXXI0FeR9JKJJMKvg-b8gzaQkMuBYiqTDPoUQV94wtwOeJWtf2_Ze0zFLfm0TnINrFgvdjUqn45W6xJYG3ndkP-yXM2ZI3wXEsfBwe2zBLq0sq25ZVIz8l2HtoRzbAEwT8tFL4i4XDCJZI1WldmyoIl5yiGnMgt9QyFvShZ0pUTXqp2HCqyp2r5ijoc6zBbCxU87zth9k1qDbgNBOFzpSv8z_83RZt_KB)

### Entity Relationship Diagram

![Entity Relationship Diagram](https://www.plantuml.com/plantuml/png/fLHDRnGn3BtdL-J6QV_0gbfLWXk7bWhEaITnToto4H9FQOluxqocqoRDeh0Ifv76ptvFpo--pWo9PsU5jf2p_1WyO-PFT7zFUhRy97y9ANUIZDpBYOxaMLvTtNu-7DRVvWsdB4ne5z0397s2jA1yOEbdQpSiJ5F21mAcu2jE_1ORzPUPdiTiJ6nnHA4J0gDHqvEQCoRLpEdbzYKEaNIT_GB7h1F5Jd2fhAuf0unChaWgdypWuhaeCoVOHYnaUCI1SE1srYiLpxdZTy7Wtpt4NBZ6FlxOK8hnaKT-nh1qvYfywwRdrhxAVXClvpvRG8WNIQAiT4W9DPVs46oblmF__Mk9oF-ag0zgvpjvrPjoFi31unXLDN_BcCPoIv0zkA5YT41skCY5wsT8HfqWd_vXBnX7VZCNmL-OYhIOhrPh-ysMcGOjCfewjJfm2ub9KuGcE_NnTdxqyUjgMOU4dJ0TNBIuPgj_gqN41tc7TkNE9ufPh5TejpkyR6RVd9HQEZ-I--QqYBT7MB2bgMX56_mnImxY9jRYXdmFACobt0Hwt_WhtZlMQ8sl1SyLr2if_WbnZTwKg_y7)

## DevOps Infrastructure

### Kubernetes Infrastructure

The application runs on a Kubernetes cluster using Minikube for local development.

[![Kubernetes Hierarchy](https://mermaid.ink/img/pako:eNqNVNtunDAQ_RXkKG9kxWW5-a1JelGlRJHSp7J98GIb6IKNDKhJV_n32gsY2Atbr8TOjM85jAfP7EHCMQEQpAJVmfHjfsMMuep22wW-8bqJ1cN4QkmWM_KrA8xAjzzZERF3f8Znls5xM-xTzvJduyXxYBgPnDVIMsQRZUZ7llmOFOWdQc-TIhS1RfP8GuPOMhgqSV2h5BJVrXskz8DwC8fxtjMXwF-ETL1H095egH8ViCKGFDrtzAXwi-AlaTLS1gpfae8CRb75_MaVKn0nbJezWlbpd2f9V5WO6SrFnn9nLfDU6in6q9txHzlcBMGL4uxNWJJwtMSnlLBmgX2xTGc3ToKzgHa00T1vb43X5r3IWdr5SYHqWt5GI1NtRPOigDc0Uj-zlufdEXjjum5v3_3JcZNBp3o7IifDYXuFZE1c6moFJwqtbXRNRDWPYKQhda-CKbVwOOaRBL6Lr6noGzIcJqEhGVMJkY_d7TWRiuMhh4hgGow52IEV0jndHugTkcNoOtR0GuxnkK7WdE-Pj7O7aqZMCjQTHUaJqdtlLMIUOE4PczIbzLHxzVlbm2P7qHpMlU66xDy59IoCTDm4cwxgI1pigpKIEikX7JXYBsg3lWQDoDT7KbgBG_YhaRViPzkvB6bgbZoBSFFRS6-tMGrIY45kl5c6KuRxiHjgLWsAdOy1c1ABcA_eALRdb2UHvhVElm1Z69CXu-8ABt4qXLuRFXihHQaeE3yY4O_hvdbK8wPLc3zH923fDx374x8Oh_Vw?type=png)](https://mermaid.live/edit#pako:eNqNVNtunDAQ_RXkKG9kxWW5-a1JelGlRJHSp7J98GIb6IKNDKhJV_n32gsY2Atbr8TOjM85jAfP7EHCMQEQpAJVmfHjfsMMuep22wW-8bqJ1cN4QkmWM_KrA8xAjzzZERF3f8Znls5xM-xTzvJduyXxYBgPnDVIMsQRZUZ7llmOFOWdQc-TIhS1RfP8GuPOMhgqSV2h5BJVrXskz8DwC8fxtjMXwF-ETL1H095egH8ViCKGFDrtzAXwi-AlaTLS1gpfae8CRb75_MaVKn0nbJezWlbpd2f9V5WO6SrFnn9nLfDU6in6q9txHzlcBMGL4uxNWJJwtMSnlLBmgX2xTGc3ToKzgHa00T1vb43X5r3IWdr5SYHqWt5GI1NtRPOigDc0Uj-zlufdEXjjum5v3_3JcZNBp3o7IifDYXuFZE1c6moFJwqtbXRNRDWPYKQhda-CKbVwOOaRBL6Lr6noGzIcJqEhGVMJkY_d7TWRiuMhh4hgGow52IEV0jndHugTkcNoOtR0GuxnkK7WdE-Pj7O7aqZMCjQTHUaJqdtlLMIUOE4PczIbzLHxzVlbm2P7qHpMlU66xDy59IoCTDm4cwxgI1pigpKIEikX7JXYBsg3lWQDoDT7KbgBG_YhaRViPzkvB6bgbZoBSFFRS6-tMGrIY45kl5c6KuRxiHjgLWsAdOy1c1ABcA_eALRdb2UHvhVElm1Z69CXu-8ABt4qXLuRFXihHQaeE3yY4O_hvdbK8wPLc3zH923fDx374x8Oh_Vw)

### CI/CD Pipeline

Our project uses Jenkins for continuous integration and deployment.

[![Jenkins Pipeline](https://mermaid.ink/img/pako:eNqVVWtz4jYU_SuqO9MPHZLlZR6edjuAw24WQgiPZBOT6Qj7GjTYEiPL2aWQ_15Zsoxpux_KB4-le849R7r3mqPlswAsxwoj9s3fYi7Qwl1RJH89by6y9ZTsISIUXtHV1UfU9-Yg0j1yDxTHxEejdA2cgoAE9TZAxasm9xV44DXQgFGBJZ0nDnKZvwNeQTtJ8kVUQXf4DWhOGSiKm-VHN_SNcEZjmRA9Yk7wOoIkx7kKd-MNtuDvWCqkQgB57EbFhp4rDfFYqqLBFtNNwdXPoUJ9OqoMOSJAQyI13jXiU4Y4JXvsQ8i4D8lVKO2ID7-e0Gevv7wdu38OZ_eTxc3ERb8jwVNj4N_ENfZ3Ge825_V7g9EPaBOGOETwhuWpfe37hL548x3Zo3VKouDyGJ_VMUbHvlQAGhjKH_kZbnVYL77oS6NBOcFIqT5nKmNvAYlAJtU3IrYXxRnlBk_ozhuzDaFIsLycaAYbkgh-yKFjJXVXFrpTW5NjPzuEETE-J2cX955G_IKmabIt3NzGeGNualIYmebphlllSvn0815JTvViepZ4uJQwZK3x25p_-KjOHkPM-AFFJCYikWBBYpC99lrOl5mYHXv0kBcHBYzCpYsH5WKmF7Ozi7m33AdYQHl8XNhH7BCfZ2hWqCy8KZPV6fmCMHrZBHOlsCyaILMijInlWfHRKK418Coo5NSp9SxwFkXZSCUCi9QILQsfT8fivi509PNRWXnSi6ez9FcjHebk_6H9dL6DstRXJZVvLdTi2cvbUbbnuVLPKvZyNB8x2axJGonc94vKPk99OahZVfSLV4CTbAMCCH56LROGmEQphxPKX86EUG78A50NXQlAKEm2EFzWUOtejmie-7_mNhGHCFBPJosi52eohXYI5YiEm1gntKFTjhktHfc70PK75biR1fEw9IOgXo6Pi0jYgGo5cm80G2E9DMqRhx9G5iZbA-zQXlGrYsXyw41JIP-SjhlyZYktxLCyHPkaQIhl9VbWir5LKE4Fmx-obznZp7RicZZutmaRqp5zCd5wHFtOiKNE7u4xfWEsNqANz5RytuxM4AOWUmE5rW5NgS3naH23nHqjet1pdxvtWq1a7bYbjWbFOlhOrd26btabtU612bJr7W7Nfq9Yf6n89etqs2k3q7VWq2M3O3an-f43IP5P6g?type=png)](https://mermaid.live/edit#pako:eNqVVWtz4jYU_SuqO9MPHZLlZR6edjuAw24WQgiPZBOT6Qj7GjTYEiPL2aWQ_15Zsoxpux_KB4-le849R7r3mqPlswAsxwoj9s3fYi7Qwl1RJH89by6y9ZTsISIUXtHV1UfU9-Yg0j1yDxTHxEejdA2cgoAE9TZAxasm9xV44DXQgFGBJZ0nDnKZvwNeQTtJ8kVUQXf4DWhOGSiKm-VHN_SNcEZjmRA9Yk7wOoIkx7kKd-MNtuDvWCqkQgB57EbFhp4rDfFYqqLBFtNNwdXPoUJ9OqoMOSJAQyI13jXiU4Y4JXvsQ8i4D8lVKO2ID7-e0Gevv7wdu38OZ_eTxc3ERb8jwVNj4N_ENfZ3Ge825_V7g9EPaBOGOETwhuWpfe37hL548x3Zo3VKouDyGJ_VMUbHvlQAGhjKH_kZbnVYL77oS6NBOcFIqT5nKmNvAYlAJtU3IrYXxRnlBk_ozhuzDaFIsLycaAYbkgh-yKFjJXVXFrpTW5NjPzuEETE-J2cX955G_IKmabIt3NzGeGNualIYmebphlllSvn0815JTvViepZ4uJQwZK3x25p_-KjOHkPM-AFFJCYikWBBYpC99lrOl5mYHXv0kBcHBYzCpYsH5WKmF7Ozi7m33AdYQHl8XNhH7BCfZ2hWqCy8KZPV6fmCMHrZBHOlsCyaILMijInlWfHRKK418Coo5NSp9SxwFkXZSCUCi9QILQsfT8fivi509PNRWXnSi6ez9FcjHebk_6H9dL6DstRXJZVvLdTi2cvbUbbnuVLPKvZyNB8x2axJGonc94vKPk99OahZVfSLV4CTbAMCCH56LROGmEQphxPKX86EUG78A50NXQlAKEm2EFzWUOtejmie-7_mNhGHCFBPJosi52eohXYI5YiEm1gntKFTjhktHfc70PK75biR1fEw9IOgXo6Pi0jYgGo5cm80G2E9DMqRhx9G5iZbA-zQXlGrYsXyw41JIP-SjhlyZYktxLCyHPkaQIhl9VbWir5LKE4Fmx-obznZp7RicZZutmaRqp5zCd5wHFtOiKNE7u4xfWEsNqANz5RytuxM4AOWUmE5rW5NgS3naH23nHqjet1pdxvtWq1a7bYbjWbFOlhOrd26btabtU612bJr7W7Nfq9Yf6n89etqs2k3q7VWq2M3O3an-f43IP5P6g)

---

## Project Team

- **Idriss El Abidi**
- **Younes Lamnouar**
- **Omar Mandri**
- **Omar Nebag**
