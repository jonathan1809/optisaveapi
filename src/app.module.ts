import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommandModule } from 'nestjs-command';
import { ConsultationsModule } from './consultations/consultations.module';
import { SeedModule } from './seed/seed.module';
import { MailModule } from './common/mail/mail.module';
import { PatientsModule } from './patients/patients.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConsultationsModule,
    SeedModule,
    PatientsModule,
    CommonModule,
    CommandModule,
    MailModule,
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('DB_MONGOOSE_URI'),
        connectionFactory: (connection) => {
          connection.on('connected', () => {
            console.log('MongoDB is connected');
          });
          connection._events.connected();
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),

  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
