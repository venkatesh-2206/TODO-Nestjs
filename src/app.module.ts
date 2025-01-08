import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { BucketModule } from './bucket/bucket.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './common/shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports:[
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '@Venkat2206',
      database: 'TODO_nestjs',
      autoLoadEntities: true,
      synchronize: true,
        }),
    UserModule, BucketModule, TaskModule, SharedModule, DashboardModule, CategoryModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
