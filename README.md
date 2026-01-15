<h1 align="center">졸업 작품 - 스마트 무드등 시스템 Smart Mood Lighting System</h1>

<div align="center">
<h3><b>Smart Mood Lighting System with React Native & Raspberry Pi</b></h3><br>

<!-- 대표 이미지가 있다면 링크 넣기 -->
<img width="800" src="https://github.com/user-attachments/assets/b490e97b-9ecd-4b93-9175-0db0b317be0c" alt="대표 이미지">


<h3><b>조명, 음악, 자동 루틴, QR 공유까지 한 번에</b></h3>
<br>
</div>

<div align="center">
<p>
  📌 이 프로젝트는 모바일 앱으로 LED 무드등을 제어하고,
  사용자 생활 패턴에 맞춰 자동화 루틴과 음악 연동 기능을 제공하는
  IoT 기반 스마트 무드등 시스템입니다.
</p>

<p>
  모바일 앱(React Native), 서버(Express + PostgreSQL),
  그리고 Raspberry Pi 하드웨어가 유기적으로 연결되어
  실제 조명 제어와 자동화가 이루어집니다.
</p>
</div>

<br><br>



# 📖 Table of contents
* [Introduction](#-introduction)
* [Demo](#-demo)
* [API](#-api)
* [System Architecture](#-system-architecture)
* [ERD](#-erd)
* [Tech Stack](#-tech-stack)
* [Monitoring](#-monitoring)
* [Directory Structure](#-directory-structure)
* [How to start](#-how-to-start)
* [Team Members](#-team-members)

<br>

# 📣 Introduction
### URL
> 🗝️ [AILIBI](https://AILIBI.link) 

### Medium
> 🔎 [AILIBI Medium](https://medium.com/@pgc0419/project-ai%EA%B0%80-%EB%A7%8C%EB%93%A4%EC%96%B4-%EC%A3%BC%EB%8A%94-%ED%83%90%EC%A0%95-%EC%8B%9C%EB%AE%AC%EB%A0%88%EC%9D%B4%EC%85%98-%EC%84%9C%EB%B9%84%EC%8A%A4-ailibi-43e02a68a745) &nbsp;

<br>

- **AI 기반 1인용 탐정 시뮬레이션**
- **AI + ALIBl(형사 사건이 발생한 시간에 용의자가 그 범죄 현장에 있지 않았다는 증명)=AILIBI**
- **사용자가 사건 종류,장소,시간을 입력하면 AI(GPT-4)가 매번 새로운 시나리오,용의자,증거를 생성**
- **사용자는 시나리오의 탐정이 되어 용의자를 심문하고 증거를 탐색**
- **진범을 찾아내면 승리**
- **플레이 기록들 열람 가능**

<br>

# 🕺🏻 Demo
### Innit Animation
> AILIBI에 접속하면 가장 먼저 보이는 화면입니다.
<br>
<img align="center" width="1000" alt="Onboarding" src="https://github.com/user-attachments/assets/dd639618-abbe-4ee2-8907-4adfa1d74c6c">
<br><br>

### Login/Register
> E-mail 기반 로그인 및 회원가입으로 손쉽게 로그인 할 수 있습니다.
<br>
<img align="center" width="1000" alt="Login & Sign up" src="https://github.com/user-attachments/assets/1487ef46-1858-4be6-b8a2-51f7d2f5866e">
<br><br>

### Main
> 성공적인 로그인 이후 게임 플레이를 위한 메인 페이지로 이동합니다.
<br>
<img align="center" width="1000" alt="Login & Sign up" src="https://github.com/user-attachments/assets/b44f2bc8-aada-49f1-a099-9112e6edb310">
<br><br>

### Make-Scenario
> 사용자가 탐정 스토리의 주요 배경과 사건을 설정하는 페이지입니다.<br>
> 사건의 종류, 시간, 장소를 선택할 수 있습니다.
<br>
<img align="center" width="1000" alt="Login & Sign up" src="https://github.com/user-attachments/assets/33b7c33a-f3d0-49c6-a216-87081019573f">
<br><br>

### Loading
> 사용자 입력을 기반으로 AI의 시나리오 생성을 기다리는 페이지입니다.<br>
> 평균적으로 약 1분 내외의 시간이 소요되며, 기다림을 달래 줄 2개의 미니게임(슈팅 게임, 스도쿠)이 준비되어 있습니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/a9e54428-3c14-432e-82ba-d698e32e9146">
<br><br>

### Initial-Statement
> 용의자들의 초기 진술을 확인할 수 있는 페이지입니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/a5430541-5017-43d2-97f9-47ddf8518f11">
<br><br>

### Scenario & Evidence
> 생성된 시나리오와 증거를 탐색할 수 있는 페이지 입니다.<br>
> 추리 노트를 사용하여, 사용자만의 추리 내용을 작성할 수 있습니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/1fc8ab99-0bd8-42cd-90d6-ba3e287e6fec"><br><br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/f3c609bb-29cb-4714-9152-d39f017aece2">
<br><br>
  
### Suspect
> 용의자 목록을 확인할 수 있는 페이지입니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/a1c11bd9-ee42-4f69-9b86-da4e547f7240">
<br><br>

### Interrogation
> AI와 Websocket을 기반으로 용의자를 심문하는 페이지입니다.<br>
> STT와 TTS로 보다 몰입도 높은 플레이를 진행할 수 있습니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/716ff1ab-8d4d-44ab-b2ed-f13364d42712">
<br><br>

### Choose
> 앞서 추리한 내용을 기반으로 범인을 지목하는 페이지 입니다.<br>
> 사용자의 선택에 따라 문장이 달라집니다.<br>
> 성공 — You got it right!<br>
> 실패 — Are you serious?
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/91a1e7a1-c103-4657-860f-6a7f004573d1">
<br><br>

### Ending-Credit
> 사건이 종료된 이후의 페이지로, 플레이 결과와 크레딧 화면을 볼 수 있습니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/b3b5ce61-0192-443b-b117-06fd9cf4103d">
<br><br>

### History
> 사용자가 플레이 했던 내역들을 자세하게 확인할 수 있습니다.
<br>
<img align="center" width="1000" alt="" src="https://github.com/user-attachments/assets/200c9fb4-e6a9-4ba2-89d7-fe4bcc0b7a84">
<br><br>

<br>

# 📗 API
<img width="1503" src="https://github.com/user-attachments/assets/bf878657-839e-4c39-9e44-7aa49bfe750e" alt="API 이미지">


<br><br>

# 🛠 ️System Architecture <a name="-system-architecture"></a>
<div align="center">
  <img align="center" width="1000" src="https://github.com/user-attachments/assets/1057e43f-0e78-483f-8942-46b6e5d5aca8">
</div>
<br><br>

# 🔑 ERD
<div align="center">
  <img width="1000" src="https://github.com/user-attachments/assets/b15b3f76-c856-40fb-961b-90f7473f1fef">
</div>
<br><br>


# 💻 Tech Stack

<div align="center">
  <table>
    <tr>
      <th>Field</th>
      <th>Technology of Use</th>
    </tr>
    <tr>
      <td><b>Frontend</b></td>
      <td>
        <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
        <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
        <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
        <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
        <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
        <img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
        <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white">
        <img src="https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
        <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>Backend</b></td>
      <td>
        <img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white">
        <img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=for-the-badge&logo=rabbitmq&logoColor=white">
        <img src="https://img.shields.io/badge/Celery-37814A?style=for-the-badge&logo=celery&logoColor=white">
        <img src="https://img.shields.io/badge/DJANGO_REST_Framework-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709">
        <img src="https://img.shields.io/badge/Django--Channels-34A853?style=for-the-badge&logo=django&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>Database</b></td>
      <td>
        <img src="https://img.shields.io/badge/AmazonS3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white">
        <img src="https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white">
        <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white">
        <img src="https://img.shields.io/badge/AmazonRDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>AI</b></td>
      <td>
        <img src="https://img.shields.io/badge/OpenAI-74aa9c?style=for-the-badge&logo=openai&logoColor=white">
        <img src="https://img.shields.io/badge/DALL·E-1192e8?style=for-the-badge&logo=openai&logoColor=white">
      </td>
      </td>
    </tr>
    <tr>
      <td><b>DevOps</b></td>
      <td>
        <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white">
        <img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=nginx&logoColor=white">
        <img src="https://img.shields.io/badge/AmazonEC2-FF9900?style=for-the-badge&logo=amazon-ec2&logoColor=black">
        <img src="https://img.shields.io/badge/GitHubActions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white">
        <img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>Monitoring</b></td>
      <td>
        <img src="https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white">
        <img src="https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white">
        <img src="https://img.shields.io/badge/cAdvisor-0078D7?style=for-the-badge&logo=google&logoColor=white">
        <img src="https://img.shields.io/badge/NodeExporter-00695C?style=for-the-badge&logo=google&logoColor=white">
        <img src="https://img.shields.io/badge/GrafanaLoki-005571?style=for-the-badge&logo=grafana&logoColor=white">
      </td>
    </tr>
    <tr>
      <td><b>ETC</b></td>
      <td>
        <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white">
        <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white">
        <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white">
        <img src="https://img.shields.io/badge/Zoom-2D8CFF?style=for-the-badge&logo=zoom&logoColor=white">
        <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
        <img src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black">
      </td>
    </tr>
  </table>
</div>
<br><br>

# 📊 Monitoring
<div align="center">
  <h3 align="left">Prometheus & Grafana</h3>
  <table>
        <tr>
            <th colspan="2">Django</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/dfe25a06-b23d-41b4-a95e-2a7f66769b16" alt="Django"></td>
            <td><img src="https://github.com/user-attachments/assets/59e892d8-76d5-463f-90c2-a025d8faf23b" alt="Django2"></td>
        </tr>
        <tr>
            <th colspan="2">Celery</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/074048e6-4ece-43f9-9800-2f2d523f2930" alt="Celery"></td>
            <td><img src="https://github.com/user-attachments/assets/8d67960d-b60e-4a37-9597-7eabeed8c6fb" alt="Celery2"></td>
        </tr>
        <tr>
            <th colspan="2">cAdvisor</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/5c995407-38a8-4949-8807-c6678e15adea" alt="cAdvisor"></td>
            <td><img src="https://github.com/user-attachments/assets/8ec92d68-418e-4d97-a288-88bf7b0e4bac" alt="cAdvisor2"></td>
        </tr>
        <tr>
            <th colspan="2">Node_Exporter</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/ecd13865-d1f4-4f34-af30-2d91b081b7b8"></td>
            <td><img src="https://github.com/user-attachments/assets/cff8c04a-700c-45ad-ad84-017d343d2e3d" alt="Node Exporter2"></td>
        </tr>
        <tr>
            <th colspan="2">RabbitMQ</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/e41beaed-0e21-4f7d-82b0-e86a8a6b9f37"></td>
            <td><img src="https://github.com/user-attachments/assets/1dd07d64-3548-476f-a68a-7b5e613b49cc" alt="Node Exporter2"></td>
        </tr>
        <tr>
          <th>Nginx_Exporter</th>
          <th>Redis</th>
        </tr>
        <tr>
          <td><img src="https://github.com/user-attachments/assets/ef00a11f-e77a-40a2-ad32-b19d67b65e2a"></td>
          <td><img src="https://github.com/user-attachments/assets/67a6e2fb-fa01-4172-9a86-a0b17a847379"></td>
        </tr>
    </table>
  <br>
</div>
<br>
  
  <h3 align="left">Cloud Flare</h3>
<table>
  <tr>
      <th colspan="2">Frontend</th>
  </tr>
  <tr>
      <td><img src="https://github.com/user-attachments/assets/77b5c76c-1567-4e63-b5db-4335749167cb"></td>
      <td><img src="https://github.com/user-attachments/assets/e9429a44-14d5-4711-9124-0a9a83c5abc9" alt="Node Exporter2"></td>
  </tr>
</table>

<br>


# 🔧 Logging
<div align="center">
  <h3 align="left">Loki</h3>
  <table>
        <tr>
            <th colspan="2">Nginx</th>
        </tr>
        <tr>
            <td><img src="https://github.com/user-attachments/assets/fa352ece-f6f7-4862-ba17-22ed53a2378b" alt="Django"></td>
            <td><img src="https://github.com/user-attachments/assets/e9749025-fd86-4203-aee0-30713e96ad5f" alt="Django2"></td>
        </tr>
    </table>
</div>
<br>

# 📂 Directory Structure

<details>
  <summary>AILIBI-Backend</summary>
<pre>
<code>
🗂️AILIBI-Backend
┣ 📂.github
┃ ┣ 📂ISSUE_TEMPLATE
┃ ┗ 📂workflows
┣ 📂Backend
┃ ┣ 📃__init__.py
┃ ┣ 📃asgi.py
┃ ┣ 📃celery.py
┃ ┣ 📃settings.py
┃ ┣ 📃urls.py
┃ ┗ 📃wsgi.py
┣ 📂alertmanager
┃ ┗ 📃alertmanager.yml
┣ 📂chat
┃ ┣ 📂migrations
┃ ┣ 📂templates
┃ ┣ 📃Serializers.py
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃consumers.py
┃ ┣ 📃models.py
┃ ┣ 📃routing.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂evidence
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃models.py
┃ ┣ 📃serializers.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂grafana/data
┃ ┣ 📂alerting/1
┃ ┗ 📃grafana.db
┣ 📂health
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂llm
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂prometheus
┃ ┣ 📃alert-rules.yml
┃ ┗ 📃prometheus.yml
┣ 📂promtail
┃ ┗ 📃config.yaml
┣ 📂scenario
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃models.py
┃ ┣ 📃scenario_urls.py
┃ ┣ 📃serializers.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂staticfiles
┃ ┣ 📂admin
┃ ┣ 📂drf-yasg
┃ ┗ 📂rest_framework
┣ 📂stt
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂suspect
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃models.py
┃ ┣ 📃serializers.py
┃ ┣ 📃suspect_urls.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂tts
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃apps.py
┃ ┣ 📃tasks.py
┃ ┣ 📃urls.py
┃ ┗ 📃views.py
┣ 📂user
┃ ┣ 📂migrations
┃ ┣ 📃__init__.py
┃ ┣ 📃admin.py
┃ ┣ 📃apps.py
┃ ┣ 📃models.py
┃ ┣ 📃serializers.py
┃ ┣ 📃tests.py
┃ ┣ 📃urls.py
┃ ┣ 📃users_urls.py
┃ ┗ 📃views.py
┣ 📃.gitattributes
┣ 📃.gitignore
┣ 📃Dockerfile
┣ 📃README.md
┣ 📃README.md
┣ 📃docker-compose-blue.yml
┣ 📃docker-compose-common.yml
┣ 📃docker-compose-green.yml
┣ 📃grafana.ini
┣ 📃manage.py
┣ 📃nginx.conf
┣ 📃requirements.txt
┗ 📃start_celery_flower.sh
</code>
</pre>
</details>
<details>
    <summary>AILIBI-Frontend</summary>
<pre>
<code>
🗂️AILIBI-Frontend
┣ 📂.github
┃ ┣ 📂ISSUE_TEMPLATE
┃ ┗ 📂workflows
┣ 📂public
┃ ┣ 📂fonts
┃ ┣ 📂images
┃ ┣ 📂mp4
┃ ┣ 📂sounds
┃ ┣ 📃logo.png
┃ ┗ 📃vite.svg
┣ 📂src
┃ ┣ 📂assets
┃ ┃ ┗ 📃react.svg
┃ ┣ 📂components
┃ ┃ ┣ 📃EndingPage.css
┃ ┃ ┣ 📃LogInPage.css
┃ ┃ ┣ 📃SignupBox.css
┃ ┃ ┗ 📃VideoPage.css
┃ ┣ 📂hooks
┃ ┃ ┣ 📃UserContext.tsx
┃ ┃ ┗ 📃axiosInstance.ts
┃ ┣ 📂mocks
┃ ┃ ┗ 📃webSocketService.ts
┃ ┣ 📂pages
┃ ┃ ┣ 📃ChattingPage.tsx
┃ ┃ ┣ 📃ChoosePage.tsx
┃ ┃ ┣ 📃EndingPage.tsx
┃ ┃ ┣ 📃EvidencePage.tsx
┃ ┃ ┣ 📃GamePage1.tsx
┃ ┃ ┣ 📃HistoryNote.tsx
┃ ┃ ┣ 📃HistoryPopUp.tsx
┃ ┃ ┣ 📃InitChatPage.tsx
┃ ┃ ┣ 📃LeftPage.tsx
┃ ┃ ┣ 📃LoadingScenarioPage.tsx
┃ ┃ ┣ 📃LogInPage.tsx
┃ ┃ ┣ 📃LoginBox.tsx
┃ ┃ ┣ 📃MainAudioContext.tsx
┃ ┃ ┣ 📃MainPage.tsx
┃ ┃ ┣ 📃MakeScenarioPage.tsx
┃ ┃ ┣ 📃NotePage.tsx
┃ ┃ ┣ 📃PlayAudioContext.tsx
┃ ┃ ┣ 📃PlayHistoryPage.tsx
┃ ┃ ┣ 📃PlayPage.tsx
┃ ┃ ┣ 📃ResultLoadingPage.tsx
┃ ┃ ┣ 📃RightPage.tsx
┃ ┃ ┣ 📃SignupBox.tsx
┃ ┃ ┣ 📃SudokuGame.tsx
┃ ┃ ┣ 📃SuspectPage.tsx
┃ ┃ ┣ 📃TTSService.tsx
┃ ┃ ┗ 📃vite-env.d.ts
┃ ┣ 📂services
┃ ┃ ┗ 📃vite-env.d.ts
┃ ┣ 📃App.css
┃ ┣ 📃App.tsx
┃ ┣ 📃index.css
┃ ┣ 📃main.tsx
┃ ┗ 📃vite-env.d.ts
┣ 📃.gitignore
┣ 📃Dockerfile
┣ 📃README.md
┣ 📃docker-compose.yml
┣ 📃eslint.config.js
┣ 📃index.html
┣ 📃package-lock.json
┣ 📃package.json
┣ 📃postcss.config.cjs
┣ 📃tailwind.config.js
┣ 📃tsconfig.app.json
┣ 📃tsconfig.json
┣ 📃tsconfig.node.json
┗ 📃vite.config.ts
</code>
</pre>
</details>
<br>

# 🧐 How To Start

### Backend 
```
git clone --recursive https://github.com/2024-Winter-Bootcamp-team-K/AILIBI-Backend.git
```
### env setting in the Backend folder
* Backend/.env
```
DB_ENGINE=
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=

OPENAI_API_KEY=

NAVER_CLIENT_ID=
NAVER_CLIENT_SECRET=

ELEVENLABS_API_KEY=
ELEVENLABS_MODEL_ID=
TASK_1_VOICE_ID=
TASK_2_VOICE_ID=
TASK_3_VOICE_ID=
```
### Run Docker
```
docker-compose -f docker-compose-common.yml -f docker-compose-blue.yml build
docker-compose -f docker-compose-common.yml -f docker-compose-blue.yml up -d
docker-compose -f docker-compose-common.yml -f docker-compose-blue.yml down

docker-compose -f docker-compose-common.yml -f docker-compose-green.yml build
docker-compose -f docker-compose-common.yml -f docker-compose-green.yml up -d
docker-compose -f docker-compose-common.yml -f docker-compose-green.yml down
```
### Frontend
```
git clone --recursive https://github.com/2024-Winter-Bootcamp-team-K/AILIBI-Frontend.git
```
### Install
```
npm run dev
```
<br>

# 👨‍👩‍👧‍👦 Team Members
<table width="1000">
<thead>
</thead>
<tbody>

<tr>
<th>Name</th>
<td width="100" align="center">박근채</td>
<td width="100" align="center">여상윤</td>
<td width="100" align="center">박수용</td>
<td width="100" align="center">김승민</td>
<td width="100" align="center">이수연</td>
<td width="100" align="center">박명남</td>
</tr>

<tr>
<th>Profile</th>
<td width="100" align="center">
<a href="https://github.com/pgc0419">
<img src="https://github.com/user-attachments/assets/fff119c4-3e90-4dd8-8118-4b177ef702b4" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/Grassyeochi">
<img src="https://github.com/user-attachments/assets/9224d530-4af5-445f-9bd2-7c3e93f5a8e9" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/parksooyong03">
<img src="https://github.com/user-attachments/assets/2a707357-62c8-4e35-8725-cdb4fb49fcde" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/ksm0520">
<img src="https://github.com/ksm0520.png" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/URsuyeon">
<img src="https://github.com/user-attachments/assets/daf7e881-fd52-4adc-8852-d8f2e20c530a" width="60" height="60">
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/myungnam1">
<img src="https://github.com/user-attachments/assets/b39d58f3-f09c-4b58-a307-c8e97b6b098c" width="60" height="60">
</a>
</td>
</tr>

<tr>
<th>Role</th>
<td width="190" align="center">
Leader<br>
Full Stack<br>
DevOps<br>
Design<br>
</td>
<td width="190" align="center">
Backend<br>
DevOps<br>
</td>
<td width="190" align="center">
Backend<br>
DevOps<br>
</td>
<td width="190" align="center">
Frontend<br>
Design<br>
</td>
<td width="190" align="center">
Frontend<br>
Design<br>
</td>
<td width="190" align="center">
Frontend<br>
Design<br>
</td>

<tr>
<th>GitHub</th>
<td width="100" align="center">
<a href="https://github.com/pgc0419">
<img src="http://img.shields.io/badge/pgc0419-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/Grassyeochi">
<img src="http://img.shields.io/badge/Grassyeochi-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/parksooyong03">
<img src="http://img.shields.io/badge/parksooyong03-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/ksm0520">
<img src="http://img.shields.io/badge/ksm0520-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/URsuyeon">
<img src="http://img.shields.io/badge/URsuyeon-green?style=social&logo=github"/>
</a>
</td>
<td width="100" align="center">
<a href="https://github.com/myungnam1">
<img src="http://img.shields.io/badge/myungnam1-green?style=social&logo=github"/>
</a>
</td>
</tr>
</tbody>
</table>
<br><br><br><br>

