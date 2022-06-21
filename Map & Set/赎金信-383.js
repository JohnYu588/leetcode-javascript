var canConstruct = function (s, t) {
  if (s.length > t.length) {
    return false
  }
  const table = new Array(26).fill(0)
  for (let i = 0; i < s.length; ++i) {
    table[s.codePointAt(i) - "a".codePointAt(0)]++
  }
  for (let i = 0; i < t.length; ++i) {
    table[t.codePointAt(i) - "a".codePointAt(0)]--
  }
  for (let i = 0; i < s.length; ++i) {
    if (table[s.codePointAt(i) - "a".codePointAt(0)] > 0) {
      return false
    }
  }
  return true
}
