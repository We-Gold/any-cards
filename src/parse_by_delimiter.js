// TODO: remove empty lines

/**
 * Converts the given file string to a matrix of strings (designed based on csv files)
 * @param {string} fileString The file as a single string
 * @param {string} [delimiter] The delimiter of each piece of information in the file (in CSV this is ",")
 * @param {string} [newLineDelimiter] The delimiter of each line of the file (in CSV this is "\n")
 * @returns {string[][]} The resulting matrix of strings
 */
export const parseFileByDelimiter = (
	fileString,
	delimiter = ",",
	newLineDelimiter = "\n"
) => {
	// Split the csv into lines
	const lines = splitFileByLine(fileString, newLineDelimiter)

	// Split each line by commas
	return lines.map((line) => splitFileLineByDelimiter(line, delimiter))
}

/**
 * Splits the given file by line
 * @param {string} csvString The file as a single string
 * @param {string} newLineDelimiter The delimiter for new lines
 * @returns {string[]} The file string split by new lines
 */
const splitFileByLine = (fileString, newLineDelimiter) =>
	fileString.split(newLineDelimiter)

/**
 * Splits the given file line by a given delimiter
 * @param {string} lineString One line of a file
 * @returns {string[]} The line split by the given delimiter
 */
const splitFileLineByDelimiter = (lineString, delimiter) =>
	lineString.split(delimiter)

/* Tests */
if (import.meta.vitest) {
	const { it, expect } = import.meta.vitest

	it("parseFileByDelimiter", () => {
		const file1 = `hello,world\nbye,world`
		const file2 = `hello,world,\nbye,world\nsee,ya`
		const file3 = ""

		expect(parseFileByDelimiter(file1, ",", "\n")).toEqual([
			["hello", "world"],
			["bye", "world"],
		])
		expect(parseFileByDelimiter(file2, ",", "\n")).toEqual([
			["hello", "world", ""],
			["bye", "world"],
			["see", "ya"],
		])
		expect(parseFileByDelimiter(file3, ",", "\n")).toEqual([[""]])
	})

	it("splitFileByLine", () => {
		const file1 = `hello,world\nbye,world`
		const file2 = `hello,world`
		const file3 = ""

		expect(splitFileByLine(file1, "\n")).toEqual([
			"hello,world",
			"bye,world",
		])
		expect(splitFileByLine(file2, "\n")).toEqual(["hello,world"])
		expect(splitFileByLine(file3, "\n")).toEqual([""])
	})

	it("splitFileLineByDelimiter", () => {
		const line1 = `hello,world`
		const line2 = `hello,world,`
		const line3 = ``
		const line4 = `hello\tworld`

		expect(splitFileLineByDelimiter(line1, ",")).toEqual(["hello", "world"])
		expect(splitFileLineByDelimiter(line2, ",")).toEqual([
			"hello",
			"world",
			"",
		])
		expect(splitFileLineByDelimiter(line3, ",")).toEqual([""])
		expect(splitFileLineByDelimiter(line4, "\t")).toEqual([
			"hello",
			"world",
		])
	})
}

