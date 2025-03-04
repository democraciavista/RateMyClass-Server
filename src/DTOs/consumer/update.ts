import { ConsumerRegisterSchema } from '@DTOs/consumer/register';

export const ConsumerUpdateSchema = ConsumerRegisterSchema.partial().omit({
  userId: true,
});
