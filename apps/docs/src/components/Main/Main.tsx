import React from 'react'

export default function Main() {
  return (
    <>
      <span style={{ color: 'var(--accent-yellow-1)' }}>동시 적용 테스트</span>
      <span className="tokColor-accent.yellow.1">동시 적용 테스트</span>
      <span className="text-accent-yellow-1">노란색 텍스트</span>
      <span className="text-secondary-1">세컨더리 텍스트</span>
      <span className="text-content-3">컨텐츠3 텍스트</span>
    </>
  )
}
