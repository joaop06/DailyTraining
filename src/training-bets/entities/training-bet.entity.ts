import {
  Column,
  Entity,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transform } from 'class-transformer';
import { BetDaysEntity } from '../../bet-days/entities/bet-days.entity';
import { ParticipantsEntity } from '../../participants/entities/participants.entity';

@Entity('training_bet')
export class TrainingBetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  duration: number;

  @Column({ type: 'date' })
  initialDate: Date | string;

  @Column({ type: 'date' })
  finalDate: Date | string;

  @Column()
  faultsAllowed: number;

  @Transform(({ value }) => parseFloat(value))
  @Column('decimal', { precision: 10, scale: 2, default: 0.00 })
  minimumPenaltyAmount: number;

  @Column({
    type: 'enum',
    default: 'Agendada',
    enum: ['Encerrada', 'Em Andamento', 'Agendada'],
  })
  status: 'Encerrada' | 'Em Andamento' | 'Agendada';

  @OneToMany(() => ParticipantsEntity, (participant) => participant.trainingBet)
  participants: ParticipantsEntity[];

  @OneToMany(() => BetDaysEntity, (betDay) => betDay.trainingBet)
  betDays: BetDaysEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
