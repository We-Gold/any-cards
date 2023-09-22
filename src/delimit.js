/**
 * Delimits the parsed form of a file with custom delimiters between each column
 * and each line
 * @param {string[][]} parsedFile The parsed file in the form of a matrix of string
 * @param {string} delimiter The delimiter between each column
 * @param {number[]} columns The set of columns to delimit (e.g. [] is all columns, [0,1] is the first two)
 * @param {string} newLineDelimiter The delimiter between each line
 * @returns {string} The final string representing the original data
 */
export const delimitParsedFile = (
	parsedFile,
	delimiter,
	newLineDelimiter,
	columns
) => {
	const filteredDataset = filterColumns(parsedFile, columns)

	// Combine all of strings and lines together with the given delimiters
	const delimitedLines = filteredDataset
		.map((lineArray) => lineArray.join(delimiter))
		.join(newLineDelimiter)

	return delimitedLines
}

/**
 * Remove all but the specified columns from the parsed file
 * @param {string[][]} parsedFile The parsed file in the form of a matrix of string
 * @param {number[]} columns The set of columns to delimit (e.g. [] is all columns, [0,1] is the first two)
 * @returns {string[][]} The filtered dataset with only the selected columns
 */
const filterColumns = (parsedFile, columns) => {
	// Given an empty list of columns, return the original dataset
	if (columns.length === 0) return parsedFile

	// Remove all columns but those selected
	return parsedFile.map((lineArray) =>
		lineArray.filter((_, i) => columns.includes(i))
	)
}

/* Tests */
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest

	const dataset1 = [
		["hello", "world"],
		["bye", "world"],
	]

	const dataset2 = [
		["hello", "world", ""],
		["bye", "world", ""],
		["okay", "world", ""],
	]

	it("filterColumns", () => {
		expect(filterColumns(dataset1, [])).toEqual(dataset1)
		expect(filterColumns(dataset1, [0])).toEqual([["hello"], ["bye"]])
		expect(filterColumns(dataset1, [0, 1])).toEqual(dataset1)
		expect(filterColumns(dataset2, [0, 1])).toEqual([
			["hello", "world"],
			["bye", "world"],
			["okay", "world"],
		])
        expect(filterColumns(dataset2, [0, 2])).toEqual([
			["hello", ""],
			["bye", ""],
			["okay", ""],
		])
	})

    it("delimitParsedFile", () => {
        expect(delimitParsedFile(dataset1, ",", "\n", []), `hello,world\nbye,world`)
        expect(delimitParsedFile(dataset2, ",", "\n", []), `hello,world,\nbye,world,\nokay,world,`)
    })
}

