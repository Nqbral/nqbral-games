import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ _id: false })
export class StatsShadowNetwork {
  @Prop({ default: 0 })
  gamesPlayed: number;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  losses: number;

  @Prop({ default: 0 })
  roundsPlayed: number;
}

@Schema({ _id: false })
export class StatsLastHope {
  @Prop({ default: 0 })
  gamesPlayed: number;

  @Prop({ default: 0 })
  wins: number;

  @Prop({ default: 0 })
  losses: number;
}

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true, default: false })
  isAdmin: boolean;

  @Prop({ type: StatsShadowNetwork, default: () => ({}) })
  statsShadowNetwork: StatsShadowNetwork;

  @Prop({ type: StatsLastHope, default: () => ({}) })
  statsLastHope: StatsLastHope;
}

export const UserSchema = SchemaFactory.createForClass(User);
