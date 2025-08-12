## MST-GCN 기반 DRT 정책·운영 대시보드

정책 담당자를 위한 DRT(수요응답형 교통) 서비스 의사결정을 지원하는 대시보드입니다. Next.js 15 + React 19 + TypeScript 기반으로, 정책 도입 전·후 분석과 효과 검증을 한 화면에서 수행하도록 설계되었습니다.

### 주요 기능
- **교통취약지 히트맵** (`/heatmap`): 예측 수요와 미서비스 구역을 지도 히트맵으로 시각화
- **거점별 24h 수요예측** (`/demand-forecast`): 시간대별 수요 변화 차트
- **레드/그린 존 표시** (`/impact-analysis`): KPI 기반 효율성 구역 시각화
- **예산 시뮬레이터** (`/budget-simulator`): 차량/시간/비용 입력 → 예상 수용·예산 산출
- **시나리오 비교** (`/scenario-comparison`): 운영 패턴별 성과 비교
- **구역 분석** (`/zone-analysis`): 도입 전후 지표 비교 및 성과 분석

### 빠른 시작
#### 요구사항
- Node.js >= 18.18
- pnpm >= 8 (설치: `npm i -g pnpm`)

#### 설치 및 실행
```bash
pnpm install          # 의존성 설치
pnpm dev              # 개발 서버 (http://localhost:3000)

# 프로덕션 빌드/실행
pnpm build
pnpm start            # 기본 포트 3000
```

#### 다른 포트로 실행
```bash
PORT=3001 pnpm dev
# 또는
PORT=3001 pnpm start
```

### 폴더 구조 개요
```text
app/
  budget-simulator/
  demand-forecast/
  heatmap/
  impact-analysis/
  scenario-comparison/
  zone-analysis/
  layout.tsx
  page.tsx
components/
hooks/
lib/
public/
styles/
```

### 스크립트
- `pnpm dev`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm start`: 프로덕션 서버 시작
- `pnpm lint`: 린트 실행

### 기술 스택
- Next.js 15, React 19, TypeScript
- Tailwind CSS 4, Radix UI, Recharts

### 트러블슈팅
- 포트 충돌(EADDRINUSE: 3000 사용 중)
  - 현재 사용 중인 프로세스 확인: `ss -tlnp | grep :3000`
  - 프로세스 종료 후 재시작: `kill <PID>`
  - 혹은 다른 포트로 실행: `PORT=3001 pnpm dev`

### 라이선스
프로젝트 정책에 따름.

# DDF_Dashboard_sample
