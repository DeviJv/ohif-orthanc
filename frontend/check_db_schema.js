
const { PrismaClient } = require('./app/generated/prisma');
const prisma = new PrismaClient();

async function main() {
  try {
    const table = 'SatuSehatIntegration';
    const result = await prisma.$queryRawUnsafe(`
      SELECT
          a.attname as column_name,
          format_type(a.atttypid, a.atttypmod) AS data_type,
          i.indisprimary AS is_primary
      FROM
          pg_index i
      JOIN
          pg_attribute a ON a.attrelid = i.indrelid
                       AND a.attnum = ANY(i.indkey)
      WHERE
          i.indrelid = '"${table}"'::regclass;
    `);
    console.log('Indexes for ' + table + ':', JSON.stringify(result, null, 2));

    const columns = await prisma.$queryRawUnsafe(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = '${table}';
    `);
    console.log('Columns for ' + table + ':', JSON.stringify(columns, null, 2));

  } catch (e) {
    console.error('Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
