const generatePaginationArray = (json = [], shuffle, length = 48) => {
	const result = []

	for (let i = 0; i < length / json.length; i++) {
		result.push(...shuffle(json))
	}
	return result
}

export {generatePaginationArray}
