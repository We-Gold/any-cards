import { delimitParsedFile } from "./src/delimit"
import { parseFileByDelimiter } from "./src/parse_by_delimiter"
import { parsers } from "./src/standard_conversions"
import "./style.css"

import { saveAs } from 'file-saver'

// Store references to the input and output textboxes
const inputTextarea = document.querySelector("#input")
const outputTextarea = document.querySelector("#output")

// Store references to the input and output type selectors
const inputTypeSelector = document.querySelector("#select-input")
const outputTypeSelector = document.querySelector("#select-output")

// Add all conversion options to the selectors
document.addEventListener("DOMContentLoaded", () => {
	let parserOptions = ""

	for (const parserKey of Object.keys(parsers)) {
		parserOptions += `<option>${parserKey}</option>`
	}

	inputTypeSelector.innerHTML = parserOptions
	outputTypeSelector.innerHTML = parserOptions
})

// Run the current conversion
const runConversion = () => {
	let converted = ""

	// Determine which formats to convert between
	const parser = getParser()
	const builder = getBuilder()

	try {
		// Parse and convert the given file
		const parsedFile = parseFileByDelimiter(
			inputTextarea.value,
			parser.delimiter,
			parser.newLineDelimiter
		)
		converted = delimitParsedFile(
			parsedFile,
			builder.delimiter,
			builder.newLineDelimiter,
			builder.columns
		)
	} catch (error) {
		console.log(error)
	}

	outputTextarea.value = converted
}

const getParser = () => parsers[inputTypeSelector.value]
const getBuilder = () => parsers[outputTypeSelector.value]

// Run the conversion when any related values change
inputTextarea.addEventListener("input", runConversion)
inputTypeSelector.addEventListener("change", runConversion)
outputTypeSelector.addEventListener("change", runConversion)

// Handle file upload events
document.querySelector("#input-upload").addEventListener(
	"change",
	(e) => {
		const [file] = e.target.files

		const reader = new FileReader()

		reader.addEventListener(
			"load",
			() => {
				inputTextarea.value = reader.result
				runConversion()
			},
			false
		)

		if (file) reader.readAsText(file)
	},
	false
)

// Handle download requests
document.querySelector("#download-file").addEventListener("click", () => {
	const blob = new Blob([outputTextarea.value], {type: getBuilder().mimeType})

	saveAs(blob)
})