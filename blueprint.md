# **Boodog: 자취생들을 위한 심플한 집 구조 기반 팁 공유 사이트**

## **Overview**
자취생들이 일상에서 겪는 어려움을 해결하기 위해 집안 구역별 팁을 직관적으로 제공하는 서비스입니다. 블루와 화이트 톤의 심플하고 깨끗한 UI를 지향하며, 인터랙티브한 평면도를 통해 각 구역의 팁을 쉽게 탐색할 수 있습니다.

## **Detailed Outline**

### **Design Concept**
- **Color Palette:** 
  - Primary: **Deep Blue** (#1D4ED8 / Blue-700)
  - Secondary: **Sky Blue** (#DBEAFE / Blue-100)
  - Background: **Clean White** (#FFFFFF)
  - Accent: **Light Gray** (#F3F4F6)
- **Style:** 
  - 미니멀리즘 (Minimalism): 불필요한 장식을 배제하고 정보 전달에 집중.
  - 고대비 (High Contrast): 흰색 배경에 파란색 포인트로 가독성 극대화.
  - 플랫 디자인 (Flat Design): 과도한 그림자나 질감 대신 깔끔한 선과 면 활용.

### **Key Features**
1. **Simple Floor Plan UI:** 
    - 직사각형 기반의 깔끔한 구역 구분.
    - 호버 시 파란색 테두리 또는 배경색 변화로 인터랙션 제공.
2. **Tip Feed:** 
    - 카드 형태 대신 깔끔한 리스트 또는 그리드 형태.
    - 파란색 태그를 활용한 카테고리 구분.
3. **Dedicated Sharing & Community:** 
    - **새 팁 공유:** 불필요한 요소를 제거한 깔끔하고 직관적인 팁 등록 폼.
    - **자유 게시판 (커뮤니티):** Disqus를 활용한 별도의 대형 모달 기반 커뮤니티 공간. 사용자 간의 활발한 소통과 정보 공유가 가능하도록 설계.
4. **Refrigerator Recipe (냉장고 파먹기):**
    - 냉장고에 있는 재료를 텍스트로 입력하면 만들 수 있는 요리를 추천해주는 기능.
    - 입력된 재료와 매칭되는 정도에 따라 가중치를 두어 레시피 노출.

### **Data Management**
- **Data Structure:**
  - `src/types.ts`: `Tip`, `Recipe`, `RoomType` 정의.
  - `src/data/tips.ts`: 100개의 실용적인 초기 팁 데이터.
  - `src/data/recipes.ts`: 30개의 자취생 맞춤형 간단 레시피 데이터.
- **External Services:**
  - **Disqus:** 사용자 간 소통 및 댓글 기능을 위해 통합.

## **Implementation Progress**

### **Step 1: Color Theme Update** - **In Progress**
- [ ] Tailwind CSS v4 테마 변수를 블루 & 화이트 조합으로 변경.
- [ ] 글로벌 배경색 및 텍스트 색상 조정.

### **Step 2: Simplified UI Components** - **In Progress**
- [ ] 평면도 디자인을 더 단순한 선형 구조로 변경.
- [ ] 팁 카드 및 모달 디자인 간소화.

### **Step 3: Content Expansion** - **Completed**
- [x] 100개의 실용적인 자취 팁 데이터 생성 및 적용.
- [x] 데이터와 타입 정의를 별도 파일로 분리하여 유지보수성 향상.

### **Step 4: Refrigerator Recipe Feature** - **Completed**
- [x] 냉장고 재료 기반 레시피 추천 로직 구현.
- [x] 전용 UI 및 검색 바 추가.
- [x] 30개의 초기 레시피 데이터 구축.

### **Step 5: Community Integration (Disqus)** - **Completed**
- [x] '커뮤니티' 전용 버튼 및 대형 모달 구현.
- [x] '새 팁 공유'와 '커뮤니티' 기능을 분리하여 사용자 경험 최적화.
- [x] Disqus 댓글 시스템을 커뮤니티 전용 공간에 통합.
- [x] `DisqusComments` 전용 컴포넌트 구현.
