import { AppDataSource } from './data-source';

async function runMigrations() {
  try {
    await AppDataSource.initialize();
    console.log('[typeorm] DataSource initialized. Running migrations...');
    const migrations = await AppDataSource.runMigrations();
    console.log(`[typeorm] Migrations executed:`, migrations);
    await AppDataSource.destroy();
    console.log('[typeorm] DataSource destroyed. Done.');
    process.exit(0);
  } catch (error) {
    console.error('[typeorm] Error running migrations:', error);
    process.exit(1);
  }
}

runMigrations();
