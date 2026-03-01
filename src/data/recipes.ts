import type { Recipe } from '../types';

export const INITIAL_RECIPES: Recipe[] = [
  { 
    id: 1, 
    name: '토마토 계란 볶음', 
    ingredients: ['토마토', '계란', '대파'], 
    instructions: '1. 파기름을 낸 뒤 계란을 스크램블합니다. 2. 썰어둔 토마토를 넣고 소금, 설탕으로 간을 하며 볶아주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 2, 
    name: '간장 계란밥', 
    ingredients: ['계란', '간장', '참기름', '밥'], 
    instructions: '1. 계란 프라이를 만듭니다. 2. 밥 위에 계란, 간장 1스푼, 참기름 1스푼을 넣고 비벼주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 3, 
    name: '참치 마요 덮밥', 
    ingredients: ['참치캔', '마요네즈', '계란', '김가루'], 
    instructions: '1. 참치 기름을 빼고 마요네즈와 섞습니다. 2. 계란 스크램블을 만들어 밥 위에 올리고 참치와 김가루를 얹어주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 4, 
    name: '김치 볶음밥', 
    ingredients: ['김치', '햄', '스팸', '참치', '밥', '대파'], 
    instructions: '1. 파와 김치, 햄을 잘게 썰어 볶습니다. 2. 고춧가루와 간장으로 색과 맛을 내고 밥을 넣어 볶아주세요.',
    difficulty: '보통'
  },
  { 
    id: 5, 
    name: '고추장 삼겹살 볶음', 
    ingredients: ['삼겹살', '고추장', '설탕', '양파', '대파'], 
    instructions: '1. 삼겹살을 굽다가 채소를 넣습니다. 2. 고추장 양념장을 넣어 고루 볶아주세요.',
    difficulty: '보통'
  },
  { 
    id: 6, 
    name: '어묵 볶음', 
    ingredients: ['어묵', '간장', '설탕', '양파'], 
    instructions: '1. 어묵과 양파를 먹기 좋게 썹니다. 2. 간장과 설탕으로 간을 하며 빠르게 볶아주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 7, 
    name: '두부 조림', 
    ingredients: ['두부', '간장', '고춧가루', '대파'], 
    instructions: '1. 두부를 부칩니다. 2. 양념장을 끼얹어 약불에서 조려주세요.',
    difficulty: '보통'
  },
  { 
    id: 8, 
    name: '베이컨 크림 파스타', 
    ingredients: ['파스타면', '베이컨', '우유', '치즈', '마늘'], 
    instructions: '1. 마늘과 베이컨을 볶습니다. 2. 우유와 치즈를 넣고 끓인 뒤 삶은 면을 넣어 걸쭉하게 만듭니다.',
    difficulty: '보통'
  },
  { 
    id: 9, 
    name: '감자 채 볶음', 
    ingredients: ['감자', '소금', '식용유'], 
    instructions: '1. 감자를 얇게 채 썰어 물에 헹굽니다. 2. 팬에 기름을 두르고 감자가 투명해질 때까지 볶으세요.',
    difficulty: '쉬움'
  },
  { 
    id: 10, 
    name: '스팸 무스비', 
    ingredients: ['스팸', '밥', '김'], 
    instructions: '1. 스팸을 구워 밥과 함께 김으로 감싸 모양을 잡습니다.',
    difficulty: '쉬움'
  },
  { 
    id: 11, 
    name: '된장찌개', 
    ingredients: ['된장', '두부', '애호박', '양파'], 
    instructions: '1. 물에 된장을 풀고 끓입니다. 2. 썰어둔 채소와 두부를 넣고 한소끔 더 끓여주세요.',
    difficulty: '보통'
  },
  { 
    id: 12, 
    name: '미역국', 
    ingredients: ['미역', '소고기', '국간장', '마늘'], 
    instructions: '1. 미역을 불리고 소고기와 볶습니다. 2. 물을 붓고 국간장으로 간을 해 푹 끓여주세요.',
    difficulty: '보통'
  },
  { 
    id: 13, 
    name: '콩나물 무침', 
    ingredients: ['콩나물', '참기름', '소금', '대파'], 
    instructions: '1. 콩나물을 삶아 찬물에 헹굽니다. 2. 양념을 넣고 조물조물 무쳐주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 14, 
    name: '고등어 구이', 
    ingredients: ['고등어', '소금', '레몬'], 
    instructions: '1. 고등어 손질 후 팬에 앞뒤로 노릇하게 굽습니다.',
    difficulty: '쉬움'
  },
  { 
    id: 15, 
    name: '제육 볶음', 
    ingredients: ['돼지고기', '고추장', '양파', '고춧가루', '설탕'], 
    instructions: '1. 양념에 재운 고기를 팬에 볶습니다. 2. 고기가 익으면 양파를 넣고 마무리하세요.',
    difficulty: '보통'
  },
  { 
    id: 16, 
    name: '비빔국수', 
    ingredients: ['소면', '고추장', '식초', '설탕', '오이'], 
    instructions: '1. 삶은 소면을 찬물에 헹굽니다. 2. 양념장을 만들어 면과 비비고 고명을 올리세요.',
    difficulty: '쉬움'
  },
  { 
    id: 17, 
    name: '골뱅이 소면', 
    ingredients: ['골뱅이캔', '소면', '오이', '고추장'], 
    instructions: '1. 골뱅이와 채소를 양념에 무칩니다. 2. 삶은 소면을 곁들여주세요.',
    difficulty: '보통'
  },
  { 
    id: 18, 
    name: '오이 무침', 
    ingredients: ['오이', '고춧가루', '식초', '설탕'], 
    instructions: '1. 오이를 썰어 소금에 살짝 절입니다. 2. 물기를 짜고 양념에 무쳐주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 19, 
    name: '애호박전', 
    ingredients: ['애호박', '부침가루', '계란'], 
    instructions: '1. 호박을 썰어 가루를 묻히고 계란물을 입힙니다. 2. 팬에 노릇하게 부쳐주세요.',
    difficulty: '쉬움'
  },
  { 
    id: 20, 
    name: '라면 파스타', 
    ingredients: ['라면면', '마늘', '올리브유', '베이컨'], 
    instructions: '1. 면을 삶고 마늘을 올리브유에 볶습니다. 2. 면과 스프 소량을 넣어 볶아 완성하세요.',
    difficulty: '쉬움'
  },
  { 
    id: 21, 
    name: '소고기 뭇국', 
    ingredients: ['소고기', '무', '국간장', '마늘'], 
    instructions: '1. 소고기와 무를 볶다가 물을 붓습니다. 2. 거품을 걷어내며 푹 끓이고 간을 하세요.',
    difficulty: '보통'
  },
  { 
    id: 22, 
    name: '김치전', 
    ingredients: ['김치', '부침가루', '물'], 
    instructions: '1. 김치를 잘게 썰어 부침가루, 물과 섞습니다. 2. 기름을 넉넉히 두르고 바삭하게 부치세요.',
    difficulty: '쉬움'
  },
  { 
    id: 23, 
    name: '떡볶이', 
    ingredients: ['떡', '고추장', '설탕', '어묵', '대파'], 
    instructions: '1. 물에 고추장, 설탕을 풀고 끓입니다. 2. 떡과 어묵을 넣고 소스가 걸쭉해질 때까지 끓여주세요.',
    difficulty: '보통'
  },
  { 
    id: 24, 
    name: '알리오 올리오', 
    ingredients: ['파스타면', '마늘', '올리브유', '페페론치노'], 
    instructions: '1. 마늘을 올리브유에 튀기듯 볶습니다. 2. 삶은 면을 넣고 면수와 함께 볶아 에멀젼을 만듭니다.',
    difficulty: '보통'
  },
  { 
    id: 25, 
    name: '참치전', 
    ingredients: ['참치캔', '계란', '양파'], 
    instructions: '1. 참치 기름을 빼고 다진 양파, 계란과 섞습니다. 2. 한 숟가락씩 떠서 팬에 부치세요.',
    difficulty: '쉬움'
  },
  { 
    id: 26, 
    name: '소시지 야채 볶음', 
    ingredients: ['비엔나소시지', '케첩', '양파', '파프리카'], 
    instructions: '1. 소시지에 칼집을 내고 채소와 볶습니다. 2. 케첩과 설탕으로 맛을 내세요.',
    difficulty: '쉬움'
  },
  { 
    id: 27, 
    name: '콩나물국', 
    ingredients: ['콩나물', '마늘', '소금', '대파'], 
    instructions: '1. 냄비에 콩나물과 물을 넣고 끓입니다. 2. 뚜껑을 열거나 닫거나 하나만 선택해 익히고 간을 합니다.',
    difficulty: '쉬움'
  },
  { 
    id: 28, 
    name: '계란찜', 
    ingredients: ['계란', '물', '소금', '대파'], 
    instructions: '1. 계란과 물을 1:1 비율로 섞습니다. 2. 전자레인지에 3~5분간 돌려 완성하세요.',
    difficulty: '쉬움'
  },
  { 
    id: 29, 
    name: '카레', 
    ingredients: ['카레가루', '감자', '양파', '돼지고기', '당근'], 
    instructions: '1. 고기와 채소를 볶습니다. 2. 물을 붓고 익힌 뒤 카레가루를 풀어 끓여주세요.',
    difficulty: '보통'
  },
  { 
    id: 30, 
    name: '무생채', 
    ingredients: ['무', '고춧가루', '액젓', '식초', '설탕'], 
    instructions: '1. 무를 채 썹니다. 2. 양념을 넣고 숨이 죽을 때까지 버무려주세요.',
    difficulty: '쉬움'
  }
];
