import { afterEach, describe, expect, test } from 'bun:test'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  copyProjectDirectory,
  getProjectDirectory,
  normalizeProjectPath,
  removeProjectDirectory,
  writeProjectFile,
} from './project-storage'

const projectId = `storage-test-${crypto.randomUUID()}`
const buildDirectory = resolve(process.cwd(), 'storage/test-builds', projectId)

afterEach(() => {
  removeProjectDirectory(projectId)
  rmSync(buildDirectory, { recursive: true, force: true })
})

describe('project-storage', () => {
  test('cria subdiretórios e grava arquivos de texto', () => {
    writeProjectFile(projectId, 'chapters/introduction.tex', 'Olá, LaTeX!', 'tex')

    const content = readFileSync(
      resolve(getProjectDirectory(projectId), 'chapters/introduction.tex'),
      'utf-8',
    )
    expect(content).toBe('Olá, LaTeX!')
  })

  test('decodifica imagens base64 para bytes físicos', () => {
    const bytes = Buffer.from([0x89, 0x50, 0x4e, 0x47])
    writeProjectFile(projectId, 'figures/chart.png', bytes.toString('base64'), 'image')

    expect(readFileSync(resolve(getProjectDirectory(projectId), 'figures/chart.png'))).toEqual(
      bytes,
    )
  })

  test('bloqueia caminhos que escapam do diretório do projeto', () => {
    expect(() => normalizeProjectPath('../outside.tex')).toThrow('Caminho de arquivo inválido')
    expect(() => normalizeProjectPath('folder/../../outside.tex')).toThrow(
      'Caminho de arquivo inválido',
    )
  })

  test('copia o projeto para compilação sem os metadados Git', () => {
    writeProjectFile(projectId, 'main.tex', 'documento', 'tex')
    mkdirSync(resolve(getProjectDirectory(projectId), '.git'), { recursive: true })
    writeFileSync(resolve(getProjectDirectory(projectId), '.git/config'), 'config')

    copyProjectDirectory(projectId, buildDirectory)

    expect(existsSync(resolve(buildDirectory, 'main.tex'))).toBe(true)
    expect(existsSync(resolve(buildDirectory, '.git'))).toBe(false)
  })
})
