import { Module } from '@nestjs/common';
import { DealsModule } from './deals/deals.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DealsModule, AuthModule]
})
export class DomainsModule {}
