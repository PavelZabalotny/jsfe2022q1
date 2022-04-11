const generatePaginationArray = (json = [], shuffle, length = 48) => {
	const generateArray = shuffle(json)
	const result = []
	for (let i = 0; i < length / json.length; i++) {
		result.push(...generateArray)
	}
	return result
}

export {generatePaginationArray}
