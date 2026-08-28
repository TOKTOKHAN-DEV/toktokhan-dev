/** @type {import("prettier").Config} */
const config = {
  // 패키지 이름 문자열로 넘기면 pnpm 10+ 의 엄격한 의존성 격리 하에서, 이 설정을 cosmiconfig로
  // auto-discover 하는 쪽(이 패키지를 의존성으로 갖지 않는 다른 패키지)에서 prettier 가
  // '@trivago/prettier-plugin-sort-imports' 를 resolve 하지 못해 크래시한다.
  // require.resolve로 이 패키지 자신의 node_modules 기준 절대 경로를 넘겨서 우회한다.
  plugins: [require.resolve('@trivago/prettier-plugin-sort-imports')],

  experimentalTernaries: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  semi: false,
  singleQuote: true,

  // Import Order Plugin Config
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: createOrder([
    [
      // Core Modules
      compact('react'),
      compact('fs'),
      compact('path'),
      compact('os'),
      compact('child_process'),
      compact('crypto'),
      compact('util'),
      compact('assert'),
    ],
    [
      // Framework
      startWith('next'),
      compact('commander'),
    ],

    // Scoped Modules
    [startWith(`@${nagative('/')}`)],

    // External Modules
    [startWith(`${nagative('./@')}`)],

    // Path Alias Modules
    [startWith('@/')],

    // Relative Modules
    [startWith('[.].*/')],

    // Others
    ['.*'],
  ]),
}

function createOrder(orders) {
  return orders.map((patterns) => {
    return `(${patterns.join('|')})`
  })
}

function compact(str) {
  return `^${str}$`
}

function startWith(str) {
  return `^${str}.*`
}

function nagative(str) {
  return `[^${str}]`
}

module.exports = config
