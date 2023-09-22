// TODO: Create custom option for choosing custom values

const createParser = (delimiter, newLineDelimiter) => ({delimiter, newLineDelimiter})

export const parsers = {
    "CSV": createParser(",", "\n"),
    "OBSIDIAN-INLINE": createParser("::", "\n"),
    "OBSIDIAN-MULTILINE": createParser("\n?\n", "\n\n"),
}
