import { Module } from '@nestjs/common';
import { DealsModule } from './deals/deals.module';
import { AuthModule } from './auth/auth.module';
import { MyModule } from './my/my.module';

@Module({
  imports: [DealsModule, AuthModule, MyModule]
})
export class DomainsModule {}
