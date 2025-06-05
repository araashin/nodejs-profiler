# Node.js를 활용한 Profiler 프로그램 분석

> **제출자:** 20230851 신아라
> **과목:** 웹응용기
> **수강반:** 001
> **제출일:** 2024년 6월 9일  
> **GitHub 링크:** https://github.com/araashin/nodejs-profiler

---

## 0. 프로그램 개요

본 프로젝트는 사용자가 웹을 통해 성능 분석 데이터 파일(`inputFile.txt`)을 업로드하면,  
이를 기반으로 Core 및 Task별 통계값(MIN, MAX, AVG, STD)을 계산하고,  
결과를 웹 페이지 상에서 시각적으로 확인할 수 있도록 구성된 **웹 기반 Profiler 시스템**입니다.

교수님께서 제공해주신 Java 기반의 기존 Profiler 예제를 참고하되,  
본인은 이를 **Node.js, Express.js, EJS, Chart.js, MySQL** 등 현대적인 웹 기술 스택으로 **전면 재구현**하였습니다.

---

## 1. 프로그램 수행 절차 분석

### 📥 입력
- 사용자는 웹 브라우저에서 `inputFile.txt` 업로드
- 각 줄은 `core1~5`가 반복되며, `task1~5` 성능 수치를 포함

### ⚙️ 처리 로직
1. 업로드된 텍스트 파일을 `multer`를 통해 서버에 저장
2. `parser.js`에서 각 Core별 Task 데이터를 추출
3. 통계 처리 수행: **MIN / MAX / AVG / STD 계산**
4. 결과를 `MySQL` DB(`profiler_data` 테이블)에 저장
5. 분석 결과를 Chart.js로 시각화하여 브라우저에 출력

### 📤 출력
- 웹 화면에서 Core별로 Task1~5의 평균 및 표준편차가 **막대그래프로 시각화**
- 각 Core에 대한 그래프가 **별도로 그려짐**
- 이상값이 포함된 입력도 처리 가능 (예: `3113`, `3530`)

### 🔄 전체 흐름도
사용자 → inputFile.txt 업로드
↓
서버 수신 및 저장 (upload.js)
↓
통계 계산 (parser.js)
↓
DB 저장 (MySQL)
↓
Chart.js 시각화 (result.ejs)


---

## 2. 소스 코드 구성 및 GitHub 링크

전체 소스는 GitHub에서 확인 가능합니다:  
🔗 https://github.com/araashin/nodejs-profiler

### 📁 주요 파일 구성

| 파일명 | 설명 |
|--------|------|
| `app.js` | 메인 서버 실행 및 라우팅 구성 |
| `upload.js` | 파일 업로드 처리 및 결과 렌더링 |
| `parser.js` | 텍스트 파싱 및 통계 계산, DB 저장 |
| `db.js` | MySQL 연결 설정 |
| `views/index.ejs` | 업로드 페이지 (폼) |
| `views/result.ejs` | Chart.js 기반 결과 그래프 페이지 |
| `README.md` | 보고서 및 전체 문서화 파일 |

### 📋 MySQL 테이블 생성 스크립트

```sql
CREATE DATABASE profiler_db;
USE profiler_db;

CREATE TABLE profiler_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  core VARCHAR(10),
  task INT,
  min INT,
  max INT,
  avg FLOAT,
  std FLOAT
);

```

## 📈 핵심 로직 코드 스니펫

```js
function calcStats(arr) {
  const sum = arr.reduce((a, b) => a + b, 0);
  const avg = sum / arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const std = Math.sqrt(arr.reduce((acc, val) => acc + Math.pow(val - avg, 2), 0) / arr.length);
  return { min, max, avg: avg.toFixed(2), std: std.toFixed(2) };
}

```

## 📊 실행 예시

### 📁 업로드 페이지 (`index.ejs`)
- 사용자는 `inputFile.txt` 파일을 선택 후 업로드합니다.
- 업로드된 파일은 서버에서 처리되어 통계 계산 및 시각화로 이어집니다.

### 📈 결과 페이지 (`result.ejs`)
- 각 Core에 대해 Task1~Task5의 **평균(AVG)** 및 **표준편차(STD)**를 시각화합니다.
- Chart.js를 활용하여 **막대그래프 형태로 시각화**하며, 평균과 표준편차를 한 눈에 비교할 수 있도록 구성되어 있습니다.

---

## 🧪 분석 데이터 예시 (결과 일부)

| Core   | Task | AVG    | STD    |
|--------|------|--------|--------|
| core1  | 1    | 872.4  | 48.9   |
| core1  | 2    | 1122.1 | 835.6  |
| core1  | 3    | 898.3  | 801.2  |
| core2  | 1    | 910.2  | 32.5   |
| core2  | 2    | 831.7  | 44.9   |
| ...    | ...  | ...    | ...    |

> 🔍 **주의할 점**
> - 일부 Task에서 `3113`, `3530` 등의 **이상치(Outlier)**가 존재함.
> - 이로 인해 **표준편차(STD)** 값이 크게 증가하는 현상이 있으며,  
>   이는 **데이터 변동성(분산 정도)** 을 파악하는 데 매우 유용하게 작용합니다.

---

✅ 본 프로젝트는 단순 평균만이 아닌, **표준편차 분석을 통해 이상치를 파악하고**,  
시각화하여 사용자에게 **데이터의 신뢰도와 변동성까지 직관적으로 전달**할 수 있도록 설계되었습니다.





