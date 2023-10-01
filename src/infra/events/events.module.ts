import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { OnQuestionBestAnswerChosen } from '@/domain/notification/application/subscribers/on-question-best-answer-chosen'
import { SendNotificationUseCase } from '@/domain/notification/application/use-cases/send-notification'
import { OnAnswerCreated } from '@/domain/notification/application/subscribers/on-answer-created'

@Module({
  imports: [DatabaseModule],
  providers: [
    OnQuestionBestAnswerChosen,
    SendNotificationUseCase,
    OnAnswerCreated,
  ],
})
export class EventsModule {}
