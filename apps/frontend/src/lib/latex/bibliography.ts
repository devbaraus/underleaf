export interface BibliographyFile {
	id: string
	path: string
	type: string
	content: string
}

export interface CitationEntry {
	key: string
	type: string
	title: string
	author: string
	year: string
	file: string
}

function groupEnd(text: string, start: number): number {
	const parenthesized = text[start] === '('
	let braces = parenthesized ? 0 : 1
	let parentheses = parenthesized ? 1 : 0
	let quoted = false
	for (let index = start + 1; index < text.length; index++) {
		const char = text[index]
		if (char === '\\') {
			index++
			continue
		}
		if (char === '"' && braces <= (parenthesized ? 0 : 1)) quoted = !quoted
		if (quoted) continue
		if (char === '%' && braces <= (parenthesized ? 0 : 1)) {
			const newline = text.indexOf('\n', index)
			if (newline === -1) return text.length
			index = newline
		} else if (char === '{') braces++
		else if (char === '}') {
			braces--
			if (!parenthesized && braces === 0) return index
		} else if (parenthesized && braces === 0) {
			if (char === '(') parentheses++
			if (char === ')' && --parentheses === 0) return index
		}
	}
	return text.length
}

function fieldsFrom(body: string): Record<string, string> {
	const fields: Record<string, string> = {}
	let index = 0
	while (index < body.length) {
		if (body[index] === '%') {
			const newline = body.indexOf('\n', index)
			index = newline === -1 ? body.length : newline + 1
			continue
		}
		const match = /^\s*,?\s*([\w-]+)\s*=\s*/.exec(body.slice(index))
		if (!match) {
			index++
			continue
		}
		const name = match[1].toLowerCase()
		index += match[0].length
		const parts: string[] = []
		do {
			while (/\s/.test(body[index] || '') && index < body.length) index++
			if (body[index] === '{') {
				const end = groupEnd(body, index)
				parts.push(body.slice(index + 1, end))
				index = end + 1
			} else if (body[index] === '"') {
				const start = ++index
				while (index < body.length && body[index] !== '"') {
					if (body[index] === '\\') index++
					index++
				}
				parts.push(body.slice(start, index))
				index++
			} else {
				const value = /^[^,#\s]+/.exec(body.slice(index))?.[0] || ''
				parts.push(value)
				index += value.length
			}
			while (index < body.length && /\s/.test(body[index])) index++
			if (body[index] !== '#') break
			index++
		} while (index < body.length)
		fields[name] = parts.join('').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim()
	}
	return fields
}

// Read citation keys and display fields without interpreting LaTeX or expanding macros.
export function parseBibtex(content: string, file: string): CitationEntry[] {
	const entries: CitationEntry[] = []
	let index = 0
	while (index < content.length) {
		if (content[index] === '%') {
			const newline = content.indexOf('\n', index)
			index = newline === -1 ? content.length : newline + 1
			continue
		}
		const header = /^@([a-z]+)\s*([{(])\s*/i.exec(content.slice(index))
		if (!header) {
			index++
			continue
		}
		const type = header[1].toLowerCase()
		const opener = index + header[0].indexOf(header[2])
		const end = groupEnd(content, opener)
		const body = content.slice(opener + 1, end)
		index = end + 1
		if (['comment', 'string', 'preamble'].includes(type)) continue
		const comma = body.indexOf(',')
		if (comma === -1) continue
		const key = body.slice(0, comma).trim()
		if (!key || /[\s{}(),]/.test(key)) continue
		const fields = fieldsFrom(body.slice(comma + 1))
		entries.push({
			key,
			type,
			title: fields.title || '',
			author: fields.author || '',
			year: fields.year || '',
			file,
		})
	}
	return entries
}

export function collectCitations(files: BibliographyFile[]): CitationEntry[] {
	const entries = new Map<string, CitationEntry>()
	for (const file of files) {
		if (file.type !== 'bib' && !file.path.toLowerCase().endsWith('.bib')) continue
		for (const entry of parseBibtex(file.content, file.path)) {
			if (!entries.has(entry.key)) entries.set(entry.key, entry)
		}
	}
	return [...entries.values()]
}

export function citationContext(prefix: string): { key: string; usedKeys: Set<string> } | null {
	// Discard LaTeX line comments, preserving escaped percent signs and line boundaries.
	let cleaned = ''
	for (let index = 0; index < prefix.length; index++) {
		if (prefix[index] === '\\') {
			cleaned += prefix[index] + (prefix[++index] || '')
		} else if (prefix[index] === '%') {
			const newline = prefix.indexOf('\n', index)
			if (newline === -1) return null
			cleaned += '\n'
			index = newline
		} else cleaned += prefix[index]
	}
	const match =
		/(?<!\\)\\(?:cite(?:p|t|alp|alt|author|year(?:par)?)?|auto(?:cite|citep)|paren(?:cite|cites)|text(?:cite|cites)|foot(?:cite|citetext)|smartcite|supercite|nocite)\*?(?:\s*\[[^\]]*\]){0,2}\s*\{([^{}]*)$/.exec(
			cleaned,
		)
	if (!match) return null
	const keys = match[1].split(',')
	const current = keys.pop() || ''
	const key = /[^\s,{}]*$/.exec(current)?.[0] || ''
	return { key, usedKeys: new Set(keys.map((value) => value.trim())) }
}
