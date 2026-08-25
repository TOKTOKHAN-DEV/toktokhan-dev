/**
 * Tailwind v4 CSS 테마 변수 매핑 모음.
 *
 * token.json이 "text-xl" 같은 Tailwind 유틸리티 클래스 어휘가 아니라, CSS에 그대로
 * 박아 넣을 수 있는 "var(--테마변수)" 값을 직접 내보내도록 하기 위한 표다. 이렇게 하면
 * 소비하는 쪽(CSS 생성기)이 어휘를 다시 변수로 번역하는 이중작업을 하지 않아도 된다.
 *
 * 원칙: 여기서 만드는 값은 "CSS에 그대로 박아 써도 되는 값"이어야 한다.
 * - Tailwind v4 테마 변수가 있는 프로퍼티(fontSize/fontWeight/letterSpacing)
 *   → 값이 스케일과 정확히 맞으면 var(--...), 아니면 raw 값(px/em/숫자) 그대로.
 * - 테마 변수가 없는 프로퍼티(lineHeight의 숫자 스케일 leading-3~10은 Tailwind v4에서
 *   calc(var(--spacing) * N)으로 즉석 계산되는 방식이라 참조할 고정 변수가 없음)
 *   → var() 시도 없이 raw 값 그대로.
 * - %처럼 그 자체로 유효한 CSS 값이 아닌 것(letterSpacing) → em 등 유효한 단위로 변환.
 * - fontFamily는 예외: 다운스트림 CSS 생성기가 이미 raw 폰트 이름 → var(--font-*)
 *   매핑을 자체적으로 갖고 있어서, 여기서 미리 var()로 감싸면 그 매핑을 건너뛰고
 *   깨질 수 있다(예: 프로젝트 admin 쪽엔 --font-sans 변수 자체가 없었음). 그래서
 *   fontFamily는 항상 raw 폰트 이름만 반환하고 이 매핑표를 쓰지 않는다.
 *
 * 변수 자체의 "이름"이 아니라 바인딩된 변수의 "실제 값"으로 매칭한다. 변수 이름이
 * 기대와 다르게 지어져 있어도(오타, 다른 네이밍 등) 값만 맞으면 정확히 잡아내기 위함.
 * 값이 표에 없으면(스케일 밖의 임의 값) raw 값 그대로 둔다.
 *
 * ⚠️ Tailwind 메이저 버전이 올라가서 테마 변수 이름/스케일이 바뀌거나, 실제 서비스가
 * 커스텀 테마를 쓰게 되면 이 파일을 맞춰서 수정해야 한다. (자동 동기화 불가 — 이
 * 플러그인은 Figma 샌드박스 안에서 돌아가서 실제 서비스 저장소의 tailwind config를
 * 읽을 수 없음)
 */

// fontSize: px 값 → Tailwind v4 --text-* 변수 이름(접두사 제외). 예: 36 → "4xl" → var(--text-4xl)
export const FONT_SIZE_VALUE_TO_NAME: Record<number, string> = {
  12: 'xs',
  14: 'sm',
  16: 'base',
  18: 'lg',
  20: 'xl',
  24: '2xl',
  30: '3xl',
  36: '4xl',
  48: '5xl',
  60: '6xl',
  72: '7xl',
  96: '8xl',
  128: '9xl',
}

// fontWeight: 숫자 값 → Tailwind v4 --font-weight-* 변수 이름(접두사 제외)
export const FONT_WEIGHT_VALUE_TO_NAME: Record<number, string> = {
  100: 'thin',
  200: 'extralight',
  300: 'light',
  400: 'normal',
  500: 'medium',
  600: 'semibold',
  700: 'bold',
  800: 'extrabold',
  900: 'black',
}

// letterSpacing: em 값 → Tailwind v4 --tracking-* 변수 이름(접두사 제외).
// 이 프로젝트 실측 값이 이 스케일과 정확히 안 맞으면 raw em 값이 그대로 나가는데,
// 그 자체로 이미 유효한 CSS라 문제 없다.
export const LETTER_SPACING_EM_TO_NAME: Record<number, string> = {
  [-0.05]: 'tighter',
  [-0.025]: 'tight',
  [0]: 'normal',
  [0.025]: 'wide',
  [0.05]: 'wider',
  [0.1]: 'widest',
}

/**
 * 신규(Tailwind) 디자인시스템에서 실제 토큰 변수가 들어있는 Figma Variable Collection 이름.
 *
 * 스타일 "이름" 규칙(pre- 등)으로 신/구 시스템을 구분하면, 구버전 이름 규칙이 여러 개거나
 * 앞으로 바뀔 수 있어서 취약하다. 대신 바인딩된 변수가 실제로 이 컬렉션들에 속해 있는지로
 * 판단하면, 이름과 무관하게 데이터 구조 자체로 정확하게 신/구를 구분할 수 있다.
 */
export const NEW_SYSTEM_COLLECTIONS = new Set(['Font', 'Number'])
