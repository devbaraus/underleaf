import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProjectsService } from '@/modules/projects/projects-service'

async function main() {
  console.log('🌱 Iniciando seed do banco de dados Underleaf...')

  // 1. Cria usuário Admin
  const adminUser = await auth.api
    .createUser({
      body: {
        email: 'admin@underleaf.io',
        name: 'Administrador Underleaf',
        password: 'admin123',
      },
    })
    .catch((err) => {
      console.log('Admin já existente ou erro:', err.message)
      return null
    })

  const admin = await prisma.user.findUnique({ where: { email: 'admin@underleaf.io' } })
  if (admin) {
    await prisma.user.update({
      where: { id: admin.id },
      data: {
        emailVerified: true,
        role: 'admin',
        quotaMb: 2000,
      },
    })
    console.log('✅ Usuário Admin configurado: admin@underleaf.io / admin123')
  }

  // 2. Cria usuário Editor de teste
  const editorUser = await auth.api
    .createUser({
      body: {
        email: 'editor@underleaf.io',
        name: 'Editor Pesquisador',
        password: 'editor123',
      },
    })
    .catch((err) => {
      console.log('Editor já existente ou erro:', err.message)
      return null
    })

  const editor = await prisma.user.findUnique({ where: { email: 'editor@underleaf.io' } })
  if (editor) {
    await prisma.user.update({
      where: { id: editor.id },
      data: {
        emailVerified: true,
        role: 'editor',
        quotaMb: 500,
      },
    })
    console.log('✅ Usuário Editor configurado: editor@underleaf.io / editor123')
  }

  // 3. Cria projeto inicial para o admin se não houver projetos
  const targetId = admin?.id || editor?.id
  if (targetId) {
    const existingProjects = await prisma.project.count({ where: { ownerId: targetId } })
    if (existingProjects === 0) {
      const sampleProject = await ProjectsService.create(targetId, {
        title: 'Modelo de Artigo Científico',
        description: 'Template acadêmico inicial com seções, equações matemáticas e bibliografia.',
        template: 'academic-paper',
      })
      console.log(`✅ Projeto de demonstração criado: "${sampleProject.title}" (ID: ${sampleProject.id})`)
    }
  }

  console.log('🚀 Seed concluído com sucesso!')
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
