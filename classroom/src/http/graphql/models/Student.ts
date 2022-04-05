import { ObjectType, ID, Field } from '@nestjs/graphql';
import { Enrollment } from './Enrollment';

@ObjectType()
export class Student {
  @Field(() => ID)
  id: string;

  @Field(() => [Enrollment])
  enrollments: Enrollment[];
}
