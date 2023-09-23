// TODO: Create option for choosing custom columns
// TODO: Create multi-types that only find matches between two strings

const createParser = (delimiter, newLineDelimiter, columns, mimeType) => ({delimiter, newLineDelimiter, columns, mimeType})

export const parsers = {
    "CSV": createParser(",", "\n", [], "text/csv"),
    "OBSIDIAN-INLINE": createParser("::", "\n", [0, 1], "text/markdown"),
    "OBSIDIAN-MULTILINE": createParser("\n?\n", "\n\n", [0, 1], "text/markdown"),
}
