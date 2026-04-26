const { PrismaClient } = require('../app/generated/prisma');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Dynamic RBAC system...');

  // 1. Define Core Permissions
  const permissionsData = [
    'view-dashboard',
    'view-worklist',
    'view-viewer',
    'run-ai',
    'sync-satusehat',
    'manage-users',
    'manage-roles',
    'manage-settings',
    'view-reports',
    'manage-all' // special for ROOT
  ];

  const permissions = [];
  for (const name of permissionsData) {
    const p = await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    permissions.push(p);
  }
  console.log(`✅ ${permissions.length} permissions ready.`);

  // 2. Define Roles
  const roles = [
    { 
      name: 'ROOT', 
      perms: ['manage-all'] 
    },
    { 
      name: 'SUPER-ADMIN', 
      perms: ['view-dashboard', 'manage-users', 'manage-roles', 'manage-settings', 'view-worklist', 'view-reports'] 
    },
    { 
      name: 'DOCTOR', 
      perms: ['view-dashboard', 'view-worklist', 'view-viewer', 'run-ai', 'sync-satusehat', 'view-reports'] 
    },
    { 
      name: 'RADIOGRAPHER', 
      perms: ['view-dashboard', 'view-worklist'] 
    }
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { name: r.name },
      update: {
        permissions: {
          connect: r.perms.map(name => ({ name }))
        }
      },
      create: {
        name: r.name,
        permissions: {
          connect: r.perms.map(name => ({ name }))
        }
      },
    });
  }
  console.log('✅ Default roles ready.');

  // 3. Seed Super Admin User (ROOT)
  const adminEmail = 'admin@pacs.com';
  const hashedPassword = bcrypt.hashSync('adminpassword', 10);
  
  const rootRole = await prisma.role.findUnique({ where: { name: 'ROOT' } });

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { 
      password: hashedPassword,
      roleId: rootRole.id
    },
    create: {
      email: adminEmail,
      name: 'Root Administrator',
      password: hashedPassword,
      roleId: rootRole.id
    },
  });
  console.log('✅ Root user ready:', admin.email);

  // 4. Seeding SatuSehat settings as before...
  console.log('🌱 Seeding SatuSehat settings...');
  const STG_BASE = 'https://api-satusehat-stg.dto.kemkes.go.id/fhir-r4/v1';
  await prisma.satuSehatSetting.upsert({
    where: { id: 1 },
    update: {}, 
    create: {
      id: 1,
      environment: 'staging',
      stgOrganizationId: 'bf3d3d7d-620a-406a-b790-80d501a1f821',
      stgClientId: '',
      stgClientSecret: '',
      stgAuthUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      stgBaseUrl: STG_BASE,
      organizationId: 'bf3d3d7d-620a-406a-b790-80d501a1f821',
      authUrl: 'https://api-satusehat-stg.dto.kemkes.go.id/oauth2/v1/accesstoken?grant_type=client_credentials',
      baseUrl: STG_BASE,
      isActive: true,
    },
  });

  await prisma.appConfig.upsert({
    where: { key: 'SATUSEHAT_ENABLED' },
    update: { value: 'true' },
    create: { key: 'SATUSEHAT_ENABLED', value: 'true' },
  });

  console.log('✅ Seeding complete.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
