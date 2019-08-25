export default function chunkArray(array, choices) {
  let curr = choices[0]

  let result = [[]]

  array.forEach((el, i) => {
    let lastArray = result[result.length - 1]
    if (lastArray.length < curr) {
      result[result.length - 1].push(el)
    } else {
      let filtered = choices.filter((x) => x !== curr)
      curr = filtered[Math.floor(Math.random() * filtered.length)]
      result.push([el])
    }
  })

  return result
}
