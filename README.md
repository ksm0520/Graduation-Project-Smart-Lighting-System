<h1 align="center">졸업 작품 - 스마트 무드등 시스템 Smart Mood Lighting System</h1>

<div align="center">
<h3><b>Smart Mood Lighting System with React Native & Raspberry Pi</b></h3><br>

<!-- 대표 이미지가 있다면 링크 넣기 -->
<img width="700" src="https://github.com/user-attachments/assets/b490e97b-9ecd-4b93-9175-0db0b317be0c" alt="대표 이미지">


<h3><b>조명, 음악, 자동 루틴, QR 공유까지 한 번에</b></h3>
<br>
</div>

<div align="center">
<p>
  이 프로젝트는 모바일 앱으로 LED 무드등을 제어하고,사용자 생활 패턴에 맞춰 자동화 루틴과 음악 연동 기능을 제공하는  IoT 기반 스마트 무드등 시스템입니다.
  
   
   모바일 앱(React Native), 서버(Express + PostgreSQL),
  그리고 Raspberry Pi 하드웨어가 유기적으로 연결되어
  실제 조명 제어와 자동화가 이루어집니다.
</p>


</div>

<br><br>



# 📖 Table of contents
* [Introduction](#-introduction)
* [Demo](#-demo)
* [API Endpoints](#-api-endpoints)
* [System Architecture](#-system-architecture)
* [Tech Stack](#-tech-stack)
* [Directory Structure](#-directory-structure)
* [How to start](#-how-to-start)
* [Team Members](#-team-members)

<br>

# 📣 Introduction



<br>

- **IoT 기반 스마트 무드등 시스템**
- **React Native 앱과 Raspberry Pi 하드웨어가 연결되어 동작**
- **사용자가 모바일 앱에서 LED 색상, 밝기, 전원 ON/OFF 조작 가능**
- **시간 기반 자동화 루틴 및 알람 기능 제공**
- **음악 모드와 연동하여 조명과 음악을 동시에 설정 가능**
- **사용자가 만든 루틴 설정을 QR 코드로 저장 및 공유 가능**
- **QR 코드를 통해 다른 기기에서도 동일한 조명 설정을 불러오기 가능**

<br>

# 🕺🏻 Demo
### Home 
> 앱을 실행하면 가장 먼저 보이는 화면입니다.<br>
중앙의 전원 버튼을 눌러 LED를 켜거나 끌 수 있고,
하단 메뉴를 통해 각 기능으로 이동할 수 있습니다.
<br>
<img align="center" width="600" alt="Onboarding" src="https://github.com/user-attachments/assets/a366e0a3-cb0f-4181-bc98-bddc7f7883c8">
<br><br>

### Light Control
> LED 조명 세부 제어 화면입니다.<br>
사용자는 색상 선택, 밝기 조절, 알람 설정 등을 수행할 수 있습니다.
<br>
<img align="center" width="600" alt="Login & Sign up" src="https://github.com/user-attachments/assets/492bfbd3-74ef-4b79-8367-7bdddb3af8ce">
<br><br>

### Music 
> 음악 모드를 선택하고 제어할 수 있는 화면입니다.<br>
4가지 음악 모드 중 선택 가능하며, 음악을 재생/정지할 수 있습니다.
<br>
<img align="center" width="600" alt="Login & Sign up" src="https://github.com/user-attachments/assets/eca115fb-9173-443e-9c45-f3896bbd5c70">
<br><br>

### Routine
> 루틴 설정 화면입니다.<br>
사용자는 루틴 이름, 시간, 음악 모드, LED 색상 등을 지정하여 자동화 루틴을 생성할 수 있습니다.
<br>
<img align="center" width="600" alt="Login & Sign up" src="https://github.com/user-attachments/assets/e1ca0787-d22f-48bf-805b-d961b171617c">
<br><br>

### Share QR
> 생성한 루틴을 QR 코드로 저장하거나 공유하는 화면입니다.<br>
또한 다른 기기에서 QR 코드를 입력하여 루틴을 불러올 수 있습니다.
<br>
<img align="center" width="600" alt="" src="https://github.com/user-attachments/assets/23348453-18d4-4956-b292-1b65c968b6d7">
<br><br>



<br>


# 📚 API Endpoints

| 기능 영역 | Method | Endpoint | 설명 |
|-----------|--------|----------|------|
| LED 상태 조회 | GET | /led | 현재 LED 상태 조회 (색상, 밝기, 전원 포함) |
| LED 설정 | POST | /led | LED 설정 (전원 ON/OFF, 색상, 밝기 조절) |
| 음악 상태 조회 | GET | /music | 현재 음악 상태 조회 |
| 음악 재생 | POST | /music/play | 음악 재생 (모드: classic, rain, study, sleep) |
| 음악 정지 | POST | /music/stop | 음악 정지 |
| 음악 볼륨 조절 | POST | /music/volume | 음악 볼륨 조절 (0~100) |
| 알람 목록 조회 | GET | /alarm | 현재 알람 목록 조회 |
| 알람 추가 | POST | /alarm | 알람 추가 (status, time) |
| 알람 삭제 | DELETE | /alarm/:id | 특정 알람 삭제 |
| 루틴 목록 조회 | GET | /routine | 전체 루틴 조회 |
| 루틴 추가 | POST | /routine | 루틴 추가 (name, time, enabled, actions) |
| 루틴 삭제 | DELETE | /routine/:id | 특정 루틴 삭제 |
| QR 코드 export | POST | /qr/export | 루틴 리스트를 QR 코드로 생성 |
| QR 코드 import | POST | /qr/import | QR 코드로 받은 루틴 저장 |

<br><br>

# 🛠 ️System Architecture <a name="-system-architecture"></a>

다음은 본 스마트 무드등 시스템의 전체 구조입니다.
모바일 앱 → 서버 API → 하드웨어 제어 모듈로 이어지는 흐름을 보여줍니다.

<div align="center">
  <img align="center" width="1000" src="https://github.com/user-attachments/assets/6288bfa4-7640-42ad-805e-0d2d2dab98f6">
</div>
<br><br>



# 💻 Tech Stack




### 📱 Frontend
![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![NativeWind (Tailwind)](https://img.shields.io/badge/NativeWind-38BDF8?logo=tailwindcss&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white)
![React Navigation](https://img.shields.io/badge/React_Navigation-000000?logo=react&logoColor=white)
![React Native SVG](https://img.shields.io/badge/React_Native_SVG-000000?logo=svg&logoColor=white)

### 🖥️ Server & DB
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)

### 🔌 IoT / Hardware
![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)
![Raspberry Pi](https://img.shields.io/badge/Raspberry_Pi-A22846?logo=raspberrypi&logoColor=white)

### 🧰 Tools
![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)


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

