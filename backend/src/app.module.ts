import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { RegistationModule } from './registation/registration.module';

@Module({
  imports: [UsersModule, CustomerModule, OrderModule, AuthModule, RegistationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
