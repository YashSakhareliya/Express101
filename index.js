const items = ['oil','hairOil', 'cloths', 'shirt']

const selectRandom = () => {
    return items[Math.floor(Math.random()*(items.length))]
}
// pm.variables.set("nameItems",selectRandom)
console.log(selectRandom())