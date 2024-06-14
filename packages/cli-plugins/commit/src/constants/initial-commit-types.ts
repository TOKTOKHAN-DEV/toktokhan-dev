import { CommitType } from '..'

export const INITIAL_COMMIT_TYPES: CommitType[] = [
  {
    name: 'deploy',
    description: '프로젝트 배포',
    emoji: '🚀',
  },
  {
    name: 'chore',
    description: '자잘한 수정',
    emoji: '🤖',
  },
  {
    name: 'docs',
    description: '문서 관련',
    emoji: '📝 ',
  },
  {
    name: 'feat',
    description: '새로운 기능, 페이지 추가',
    emoji: '🎸',
  },
  {
    name: 'fix',
    description: '버그 수정',
    emoji: '🐛',
  },
  {
    name: 'perf',
    description: '성능 개선',
    emoji: '👽',
  },
  {
    name: 'refactor',
    description: '코드 리팩토링',
    emoji: '💡',
  },
  {
    name: 'test',
    description: '테스트 관련',
    emoji: '💍',
  },
  {
    name: 'style',
    description: '스타일링 관련',
    emoji: '🎨',
  },
]
