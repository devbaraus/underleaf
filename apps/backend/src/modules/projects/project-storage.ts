import {
  cpSync,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { dirname, resolve, sep } from 'node:path'

const PROJECTS_ROOT = resolve(process.cwd(), 'storage/projects')

function invalidPath() {
  const error: any = new Error('Caminho de arquivo inválido')
  error.status = 400
  return error
}

export function normalizeProjectPath(input: string) {
  const normalized = input.replaceAll('\\', '/').replace(/^\/+/, '')
  const parts = normalized.split('/')

  if (
    !normalized ||
    parts.some((part) => !part || part === '.' || part === '..') ||
    normalized.includes('\0')
  ) {
    throw invalidPath()
  }

  return normalized
}

export function getProjectDirectory(projectId: string) {
  return resolve(PROJECTS_ROOT, projectId)
}

export function getProjectFilePath(projectId: string, filePath: string) {
  const projectDirectory = getProjectDirectory(projectId)
  const normalized = normalizeProjectPath(filePath)
  const absolutePath = resolve(projectDirectory, normalized)

  if (!absolutePath.startsWith(`${projectDirectory}${sep}`)) {
    throw invalidPath()
  }

  return absolutePath
}

export function writeProjectFile(
  projectId: string,
  filePath: string,
  content: string,
  type: string,
) {
  const absolutePath = getProjectFilePath(projectId, filePath)
  const data = type === 'image' ? Buffer.from(content, 'base64') : Buffer.from(content, 'utf-8')

  mkdirSync(dirname(absolutePath), { recursive: true })
  writeFileSync(absolutePath, data)
  return data.byteLength
}

export function ensureProjectFile(
  projectId: string,
  file: { path: string; content: string; type: string },
) {
  const absolutePath = getProjectFilePath(projectId, file.path)
  if (!existsSync(absolutePath)) {
    writeProjectFile(projectId, file.path, file.content, file.type)
  }
}

export function readProjectFile(projectId: string, filePath: string, type: string) {
  if (type === 'image') return ''
  return readFileSync(getProjectFilePath(projectId, filePath), 'utf-8')
}

export function removeProjectFile(projectId: string, filePath: string) {
  const projectDirectory = getProjectDirectory(projectId)
  const absolutePath = getProjectFilePath(projectId, filePath)
  rmSync(absolutePath, { force: true })

  let currentDirectory = dirname(absolutePath)
  while (
    currentDirectory !== projectDirectory &&
    currentDirectory.startsWith(`${projectDirectory}${sep}`) &&
    existsSync(currentDirectory) &&
    statSync(currentDirectory).isDirectory() &&
    readdirSync(currentDirectory).length === 0
  ) {
    rmSync(currentDirectory, { recursive: true })
    currentDirectory = dirname(currentDirectory)
  }
}

export function removeProjectDirectory(projectId: string) {
  rmSync(getProjectDirectory(projectId), { recursive: true, force: true })
}

export function copyProjectDirectory(projectId: string, destination: string) {
  const source = getProjectDirectory(projectId)
  mkdirSync(source, { recursive: true })
  mkdirSync(destination, { recursive: true })

  for (const entry of readdirSync(source)) {
    // Dados do repositório não fazem parte do documento enviado ao compilador.
    if (entry === '.git') continue
    cpSync(resolve(source, entry), resolve(destination, entry), { recursive: true })
  }
}
