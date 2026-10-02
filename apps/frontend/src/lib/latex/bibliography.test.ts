import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { citationContext, collectCitations, parseBibtex } from './bibliography'

describe('bibliography autocomplete', () => {
	it('reads keys, nested titles, quoted authors and parenthesized entries', () => {
		const entries = parseBibtex(
			String.raw`
      @article{knuth:1984,
        title = {The {TeX} book, with {nested {braces}}},
        author = "Donald Knuth",
        year = 1984
      }
      @book(silva-2026,
        title = "Research " # {and Science},
        author = {Silva, Ana and Souza, João},
        year = {2026}
      )`,
			'references.bib',
		)
		assert.deepEqual(
			entries.map((entry) => entry.key),
			['knuth:1984', 'silva-2026'],
		)
		assert.equal(entries[0].title, 'The TeX book, with nested braces')
		assert.equal(entries[0].author, 'Donald Knuth')
		assert.equal(entries[1].title, 'Research and Science')
		assert.equal(entries[1].year, '2026')
	})

	it('ignores comments, macros, preambles and @ signs inside entry values', () => {
		const entries = parseBibtex(
			String.raw`
      % @article{commented, title={Hidden}}
      @comment{ @book{alsoHidden, title={Hidden}} }
      @string{journal = "Science"}
      @preamble{"\\newcommand{\\test}{text}"}
      @article{visible,
        % author = {Wrong},
        title = {Contact author@example.com about @book{notAnEntry}},
        author = {Actual Author}
      }`,
			'refs.bib',
		)
		assert.equal(entries.length, 1)
		assert.equal(entries[0].key, 'visible')
		assert.equal(entries[0].author, 'Actual Author')
	})

	it('merges all bibliography files and deduplicates exact keys', () => {
		const entries = collectCitations([
			{ id: 'a', type: 'bib', path: 'refs.bib', content: '@article{one, title={First}}' },
			{
				id: 'b',
				type: 'tex',
				path: 'folder/MORE.BIB',
				content: '@book{one,title={Duplicate}} @book{two,title={Second}}',
			},
			{ id: 'c', type: 'tex', path: 'main.tex', content: '@book{wrong,title={Ignored}}' },
		])
		assert.deepEqual(
			entries.map((entry) => entry.key),
			['one', 'two'],
		)
		assert.equal(entries[0].file, 'refs.bib')
		assert.equal(entries[1].file, 'folder/MORE.BIB')
	})

	it('recognizes common citation commands, optional arguments and multiple keys', () => {
		for (const command of [
			'cite',
			'citep',
			'citet',
			'parencite',
			'textcite',
			'autocite',
			'nocite',
		]) {
			const context = citationContext(`Before \\${command}*[see][p. 4]{first, sil`)
			assert.equal(context?.key, 'sil')
			assert.deepEqual([...context!.usedKeys], ['first'])
		}
		assert.equal(citationContext('\\cite{\n  first,\n  knuth:')?.key, 'knuth:')
		assert.equal(citationContext('\\cite{first, ')?.key, '')
	})

	it('does not offer citations in comments, completed citations or other command arguments', () => {
		for (const prefix of [
			'% \\cite{',
			'\\section{',
			'\\cite{done}',
			'\\\\cite{',
			'\\cite{key % comment',
		]) {
			assert.equal(citationContext(prefix), null)
		}
		assert.equal(citationContext('Escaped \\% \\cite{abc')?.key, 'abc')
		assert.equal(citationContext('\\cite{first, % ignored }\n second')?.key, 'second')
	})

	it('keeps available keys while a bibliography entry is being edited', () => {
		const entries = parseBibtex(
			'@article{complete,title={Done}}\n@book{editing,title={Unfinished',
			'refs.bib',
		)
		assert.deepEqual(
			entries.map((entry) => entry.key),
			['complete', 'editing'],
		)
	})
})
