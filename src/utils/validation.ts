import z from "zod";

export const createEventValidation = z.object({
  title: z.string().min(3, "Event name is required"),
  description: z.string().optional(),
  date: z
    .string()
    .refine((value) => !isNaN(Date.parse(value)), {
      message: "Invalid date format",
    })
    .refine(
      (value) => {
        const date = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "Date cannot be in the past",
      },
    ),
  totalCapacity: z.number().min(1, "Total capacity is required"),
  remainingTickets: z
    .number()
    .min(1, "Remaining tickets is required")
    .optional(),
});

export const createUserValidation = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export const updateUserValidation = z.object({
  name: z.string().min(3, "Name is required").optional(),
  email: z.string().email("Invalid email address").optional(),
});

export const createBookingValidation = z.object({
  userId: z.number().min(1, "User ID is required"),
  eventId: z.number().min(1, "Event ID is required"),
  bookingCode: z
    .string()
    .min(3, "Boocking code minimum length is 3")
    .optional(),
  numberOfTickets: z.number().min(1, "Number of tickets must be at least 1"),
});
