# Node.js 기반 Profiler 프로그램 분석 과제 (웹응용기술)

## 0. 프로그램 개요
업로드된 성능 데이터 파일을 분석하여 각 Core, Task 별 평균(AVG) 및 표준편차(STD)를 계산하고, 이를 시각화하는 웹 기반 프로파일러입니다.

- Node.js (Express)
- EJS 템플릿
- Chart.js
- MySQL 연동
- 파일 업로드 처리 (multer)

---

## 1. How to Start?

### Requirements
● Node.js (v16 이상)
● MySQL (로컬 설치)
● 인터넷 연결 (CDN을 통한 Chart.js 사용)

1. MySQL을 설치한 후 profiler_db 데이터베이스를 생성해야 합니다.
2. db.js에서 본인의 환경에 맞게 DB 연결 정보를 수정합니다.
3. 프로젝트 루트 디렉토리에서 다음 명령어를 순차적으로 실행합니다
   
   $ npm install         # 의존성 패키지 설치
   $ node app.js         # 서버 실행


### 📂 주요 파일 구성
node_project/
├── uploads/            # 업로드된 텍스트 파일 저장 위치
├── input_example/      # 샘플 텍스트 파일들 (입력 예제)
├── views/              # EJS 기반 뷰 템플릿  
│   └── result.ejs
│   └── index.ejs
├── app.js              # 서버 진입점
├── parser.js           # 텍스트 분석 및 DB 저장 로직
├── upload.js           # 파일 업로드 처리
├── db.js               # MySQL 연결 정보 설정
├── package.json        # 프로젝트 의존성 관리

---

## 2. 사용 방법

1. 웹에서 inputFile.txt 또는 샘플 파일 업로드

2. core / task 선택

3. 차트 유형 선택 (bar, line, pie, etc.)

4. 그래프 확인

## 📌 DB 구조
```sql
CREATE TABLE profiler_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  core VARCHAR(10),
  task INT,
  min FLOAT,
  max FLOAT,
  avg FLOAT,
  std FLOAT
);

```

## 🛠 기술 스택

Node.js + Express

MySQL

Chart.js

EJS

Multer (파일 업로드)

## 🧑‍💻 개발자
개발자 : 20230851 신아라 


