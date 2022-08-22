const maxArea = (arr) => {
  let i = 0,
    j = arr.length - 1,
    res = 0
  while (i < j) {
    res =
      arr[i] < arr[j]
        ? Math.max(res, (j - i) * arr[i++])
        : Math.max(res, (j - i) * arr[j--])
  }
  return res
}
