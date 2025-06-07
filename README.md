# Node.js 기반 Profiler 프로그램

## 0. 프로그램 개요
업로드된 성능 데이터 파일을 분석하여 각 Core, Task 별 평균(AVG) 및 표준편차(STD)를 계산하고, 이를 시각화하는 웹 기반 프로파일러입니다.

- Node.js (Express)
- EJS 템플릿
- Chart.js
- MySQL 연동
- 파일 업로드 처리 (multer)

---

## 1. 수행 절차 분석

### 📂 전체 흐름:
1. 사용자가 웹에서 `inputFile.txt`를 업로드
2. 서버에서 파일을 읽고 통계 분석 (MIN, MAX, AVG, STD)
3. 결과를 DB(MySQL)에 저장
4. 분석 결과를 `Chart.js`를 통해 시각화

### 📂 주요 파일 구성
- `app.js`: 메인 서버 진입점
- `upload.js`: 업로드 처리 라우팅
- `parser.js`: 통계 계산 및 DB 저장
- `views/index.ejs`: 업로드 UI
- `views/result.ejs`: 결과 시각화
- `db.js`: DB 연결 설정

---

## 2. 소스 코드 설명

### 📌 parser.js
- `calcStats()`: 평균 및 표준편차 계산 함수
- `insertToDB()`: 통계 결과 DB 저장 함수

### 📌 result.ejs
- `Chart.js`를 사용하여 Core별 Task 결과 시각화

### 📌 DB 구조
```sql
CREATE TABLE profiler_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  core VARCHAR(10),
  task INT,
  min INT,
  max INT,
  avg FLOAT,
  std FLOAT
);
