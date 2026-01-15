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
* [Hardware Components](#-hardware-components)
* [Directory Structure](#-directory-structure)
* [How to start](#-how-to-start)


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

| Field | Technology of Use |
|------|------------------|
| **Frontend** | ![React Native](https://img.shields.io/badge/React_Native-20232A?logo=react&logoColor=61DAFB) ![Expo](https://img.shields.io/badge/Expo-000020?logo=expo&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![NativeWind](https://img.shields.io/badge/NativeWind-38BDF8?logo=tailwindcss&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) ![React Navigation](https://img.shields.io/badge/React_Navigation-000000?logo=react&logoColor=white) |
| **Server** | ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) |
| **IoT / Hardware** | ![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white) ![Raspberry Pi](https://img.shields.io/badge/Raspberry_Pi-A22846?logo=raspberrypi&logoColor=white) |
| **Tools** | ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?logo=notion&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white) |


<br><br>




# 📦 Hardware Components
<img width="500"  alt="image03" src="https://github.com/user-attachments/assets/99559c68-b754-438b-a5d2-ea70d39b0789" />
<img width="500"  alt="image01" src="https://github.com/user-attachments/assets/12f19585-f03c-4a71-bf61-dd488a1f8771" />

| Category | Component | Description |
|---|---|---|
| Main Controller | Raspberry Pi 4 Model B (2GB) | Controls the entire system and communicates with the server |
| Communication | ESP32 Wi-Fi / Bluetooth Board | Wireless communication and future sensor expansion |
| Lighting | WS2812B RGB LED (NeoPixel) | Mood lighting color and brightness control |
| Audio Input | USB Condenser Microphone | Voice input and future voice recognition |
| Audio Output | Mini USB Stereo Speaker | Music and alarm sound output |
| Audio Interface | ReSpeaker 2-Mics Pi HAT | Dual microphone HAT for audio processing |
| Power | 5V 2A Wireless Charging Module | Wireless power supply for user convenience |
| Case | 3D Printed Enclosure | Globe-shaped mood lamp housing |

<br>




# 📂 Directory Structure

<details>
  <summary>App (React Native Mobile App)</summary>
<pre>
<code>
🗂️App
┣ 📂android
┃ ┣ 📂app
┃ ┃ ┣ 📂src
┃ ┃ ┃ ┣ 📂debug
┃ ┃ ┃ ┃ ┗ 📃AndroidManifest.xml
┃ ┃ ┃ ┣ 📂main
┃ ┃ ┃ ┃ ┣ 📂java
┃ ┃ ┃ ┃ ┃ ┗ 📂com
┃ ┃ ┃ ┃ ┃   ┗ 📂ksm0520
┃ ┃ ┃ ┃ ┃     ┗ 📂App
┃ ┃ ┃ ┃ ┃       ┣ 📃MainActivity.kt
┃ ┃ ┃ ┃ ┃       ┗ 📃MainApplication.kt
┃ ┃ ┃ ┃ ┣ 📂res
┃ ┃ ┃ ┃ ┃ ┣ 📂drawable
┃ ┃ ┃ ┃ ┃ ┣ 📂drawable-hdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂drawable-mdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂drawable-xhdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂drawable-xxhdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂drawable-xxxhdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂mipmap-anydpi-v26
┃ ┃ ┃ ┃ ┃ ┣ 📂mipmap-hdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂mipmap-mdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂mipmap-xhdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂mipmap-xxhdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂mipmap-xxxhdpi
┃ ┃ ┃ ┃ ┃ ┣ 📂values
┃ ┃ ┃ ┃ ┃ ┗ 📂values-night
┃ ┃ ┃ ┃ ┗ 📃AndroidManifest.xml
┃ ┃ ┃ ┗ 📃AndroidManifest.xml
┃ ┃ ┣ 📃build.gradle
┃ ┃ ┣ 📃debug.keystore
┃ ┃ ┗ 📃proguard-rules.pro
┃ ┣ 📂gradle
┃ ┃ ┗ 📂wrapper
┃ ┃   ┣ 📃gradle-wrapper.jar
┃ ┃   ┗ 📃gradle-wrapper.properties
┃ ┣ 📃build.gradle
┃ ┣ 📃gradle.properties
┃ ┣ 📃gradlew
┃ ┣ 📃gradlew.bat
┃ ┗ 📃settings.gradle
┣ 📂api
┃ ┗ 📃api.ts
┣ 📂assets
┃ ┣ 📂img
┃ ┃ ┗ 📃Background.png
┃ ┣ 📂sounds
┃ ┃ ┗ 📃BtS.mp3
┃ ┣ 📃adaptive-icon.png
┃ ┣ 📃favicon.png
┃ ┣ 📃icon.png
┃ ┗ 📃splash-icon.png
┣ 📂navigation
┃ ┗ 📃StackNavigator.tsx
┣ 📂screens
┃ ┣ 📃HomeScreen.tsx
┃ ┣ 📃LightControlScreen.tsx
┃ ┣ 📃MusicScreen.tsx
┃ ┣ 📃RoutineScreen.tsx
┃ ┗ 📃ShareQRScreen.tsx
┣ 📃App.tsx
┣ 📃app.json
┣ 📃babel.config.ts
┣ 📃global.d.ts
┣ 📃index.ts
┣ 📃input.css
┣ 📃package.json
┣ 📃package-lock.json
┣ 📃postcss.config.js
┣ 📃tailwind.config.js
┣ 📃tailwind.css
┣ 📃tailwind.json
┗ 📃tsconfig.json
</code>
</pre>
</details>

<details>
  <summary>Server (Express Backend)</summary>
<pre>
<code>
🗂️Server
┣ 📂src
┃ ┣ 📂routes
┃ ┃ ┣ 📃alarm.ts
┃ ┃ ┣ 📃led.ts
┃ ┃ ┣ 📃music.ts
┃ ┃ ┣ 📃qr.ts
┃ ┃ ┗ 📃routine.ts
┃ ┣ 📃db.ts
┃ ┗ 📃index.ts
┣ 📃package.json
┣ 📃package-lock.json
┗ 📃tsconfig.json
</code>
</pre>
</details>

<details>
  <summary>Iot (Raspberry Pi Hardware Control)</summary>
<pre>
<code>
🗂️Iot
┣ 📃alarm_control.txt
┣ 📃api_client.txt
┣ 📃led_control.txt
┣ 📃main.txt
┣ 📃mic_control.txt
┣ 📃music_control.txt
┣ 📃routuine.txt
┣ 📃user_setting.txt
┗ 📃코드 전체적인 구성.txt
</code>
</pre>
</details>
<br>

# 🧐 How To Start



### 1) Backend (Server)

```bash
git clone https://github.com/ksm0520/Graduation-Project-Smart-Lighting-System.git
cd Graduation-Project-Smart-Lighting-System/Server
```

#### Environment Setting
Create `Server/.env` and add:

```env
DATABASE_URL=postgresql://user:password@host:port/database
PORT=3000
```

#### Install & Run Backend

```bash
npm install
npm start
```

---

### 2) Mobile App (React Native)

```bash
cd ../App
npm install
npm start
```




---

### 3) IoT (Raspberry Pi)

```bash
cd ../Iot
pip install -r requirements.txt
python main.py
```

#### Hardware Connection
- Connect Raspberry Pi ↔ WS2812B RGB LED
- Connect RTC module (DS3231)
- Connect ESP32 & other sensors (if used)
- Power adapter 연결

