## 0. 개발배경 🔥🔥🔥
One day, while exploring various blogs, I developed a curiosity about how images were processed and how Markdown-formatted posts were stored. This curiosity sparked a desire for development, leading me to commit to creating a more advanced service. I was intrigued by how existing blog platforms handled image data and stored Markdown-formatted content, and I aimed to learn and experience this firsthand.

Although I anticipated numerous technical challenges, surprisingly, frontend development posed minimal difficulties. Efficient learning was facilitated by well-organized documentation. With this background, I embarked on the development journey, creating a basic frontend and leaving room for detailed enhancements later. The motivation was not only to build a new service but also to progressively improve my technical skills through practical application.
##

## 1. ERD 설계
<img width="500px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/e304f843-b576-401a-86a8-fc0a18ad49f6)">

## 2. url 설계
| URL                            | Method | Description                                       | Token Required in Headers |
| ------------------------------ | ------ | ------------------------------------------------- | -------------------------- |
| `/user`                        | GET    | Return information for all users                 | Yes                        |
| `/user`                        | POST   | Create a new user                                 | No                         |
| `/user/profile`                | GET    | Get the profile of the authenticated user         | Yes                        |
| `/user/{userId}`               | GET    | Get information about a specific user             | No                         |
| `/user/{userId}/board`         | GET    | Get boards created by a specific user             | No                         |
| `/user/{userId}`               | PUT    | Update information of a specific user             | Yes                        |
| `/user/{userId}`               | DELETE | Delete a specific user                            | Yes                        |
| `/user/{userId}/following`     | POST   | Follow a user                                    | Yes                        |
| `/user/{userId}/follower`      | GET    | Get followers of a specific user                  | No                         |
| `/user/{userId}/following`     | GET    | Get users followed by a specific user             | No                         |
| `/user/{userId}/following`     | DELETE | Unfollow a user                                  | Yes                        |
| `/user/{userId}/profile`       | GET    | Get profile information of a specific user        | No                         |
| `/user/{userId}/profile`       | POST   | Update profile information of a specific user    | Yes                        |
| `/auth/login`     | POST   | Log in and get access token                   | No                         |
| `/auth/refresh`   | GET    | Refresh access token                          | Yes                        |
| `/auth/logout`    | POST   | Log out and revoke access token               | Yes                        |
| `/board`         | POST   | Create a new board                            | Yes                        |
| `/board`         | GET    | Get information for all boards               | No                         |
| `/board/{boardId}`| GET    | Get information about a specific board        | No                         |
| `/board/{boardId}`| PUT    | Update information of a specific board        | Yes                        |
| `/board/{boardId}`| DELETE | Delete a specific board                       | Yes                        |
| `/board/{boardId}/comment` | POST   | Create a new comment on a board          | Yes                        |
| `/board/{boardId}/comment` | GET    | Get comments on a board                  | No                         |
| `/board/{boardId}/comment/{commentId}` | GET    | Get information about a specific comment | No                         |
| `/board/{boardId}/comment/{commentId}` | PUT    | Update information of a specific comment | Yes                        |
| `/board/{boardId}/comment/{commentId}` | DELETE | Delete a specific comment                | Yes                        |
| `/board/{boardId}/comment/{commentId}/reply` | POST   | Create a new reply to a comment      | Yes                        |
| `/board/{boardId}/comment/{commentId}/reply` | GET    | Get all replies to a comment         | No                         |
| `/board/{boardId}/comment/{commentId}/reply/{replyId}` | PUT    | Update a specific reply          | Yes                        |
| `/board/{boardId}/comment/{commentId}/reply/{replyId}` | DELETE | Delete a specific reply         | Yes                        |

## 3. UI/UX 및 설명
<!-- Login / Join -->
### login/ join Part
  * preview

    <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/759d8813-fc05-4408-aa9e-0732c0531336" alt="Login/Join Image"> <img  width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/cc9bd69c-8e09-4927-b461-a86a2c3070eb" alt="Login/Join Image">

  * comment
    - 토큰 기반의 로그인 지원/front 에서 유효성 검사 진행
<!-- Main / write post / write comment/ write replies -->
### main/ write post/ write comments/ write replies Part

  * preview

    <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/12c2a8b4-0a19-482d-9812-a60ed127edec" alt="Main/Write Post/Write Comment/Write Replies Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/378b8077-fafc-4103-a438-89ec86b15b80" alt="Main/Write Post/Write Comment/Write Replies Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/ddd57aaf-f9c3-4806-949e-dc4458e6c7ef" alt="Main/Write Post/Write Comment/Write Replies Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/28243ce5-631a-4e1b-926f-08cf9815f597" alt="Main/Write Post/Write Comment/Write Replies Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/1f630f93-2830-4f73-9998-f88e2ea8ca09" alt="Main/Write Post/Write Comment/Write Replies Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/0acd94d2-9a70-4909-b12b-2a066890671b" alt="Main/Write Post/Write Comment/Write Replies Image">

  * comment
    - markdown 형식의 글을 인식하여 블로그 게시판으로 등록 할 수 있음
    - comment 댓글을 게시물 아래에 남길 수 있음
    - 댓글에 reply 기능을 제공하여, 고도화된 블로그 서비스를 제공하고 있음/
    
<!-- Follow -->
### follow Part

  * preview

    <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/0471e083-87b7-4cfc-ac61-965fbbed49b3" alt="Follow Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/97af2a76-bc1a-4fd4-bb0e-8e327a268455" alt="Follow Image"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/829b9fb9-1895-4b22-9155-f10793f5b96b" alt="Follow Image">

  * comment
    - 사용자들 간의 네트워킹 형성을 도모하기 위해, 여러 블로그나 SNS 매체에서 사용하는 follow 기능 추가함.

### profile Part

  * preview

    <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/1d1769c3-7f95-4b74-b649-608e2ad40f9c" alt="Image 1"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/ffa3bd12-8850-4a44-a409-3faad960067e" alt="Image 2"> <img width="200px" src="https://github.com/KNU-K/my_diary_blog/assets/126179088/576221c2-0423-43f7-9a40-54292baf0382" alt="Image 3">

  * comment
    - 가입 시 유저 1명 당 프로필 1개가 1:1 관계로 사상이 되며, 프로필은 기본 사진 제공이 되고 있음.
    - 프로필 사진 변경 및 자기 소개 변경으로, 사용자에 대한 고도화된 서비스 제공하고있음.
