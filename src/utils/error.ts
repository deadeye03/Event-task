import { Prisma } from "../generated/prisma/client";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const handlePrismaError = (
  error: any,
): { status: number; message: string } => {
  console.log("error in prisma", error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        return {
          status: 409,
          message: `Duplicate entry: ${error.meta?.target || "field"} already exists`,
        };
      case "P2025":
        return {
          status: 404,
          message: `Record not found: ${error.meta?.modelName || "Resource"} does not exist`,
        };
      case "P2003":
        return {
          status: 400,
          message:
            "We could not find the related item you selected. Please check your selection and try again.",
        };
      case "P2014":
        return {
          status: 400,
          message: `Invalid relation: ${error.meta?.relation_name || "Related data"} is invalid`,
        };
      case "P2016":
        return {
          status: 400,
          message: `Query interpretation error: ${error.message}`,
        };
      case "P2021":
        return {
          status: 404,
          message: `Table does not exist: ${error.meta?.table || "Resource"}`,
        };
      case "P2022":
        return {
          status: 404,
          message: `Column does not exist: ${error.meta?.column || "Field"}`,
        };
      default:
        return {
          status: 400,
          message: `Database error (${error.code}): ${error.message}`,
        };
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      status: 500,
      message: "Unknown database error occurred",
    };
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    return {
      status: 500,
      message: "Database engine error occurred",
    };
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return {
      status: 500,
      message: "Database connection error",
    };
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return {
      status: 400,
      message: `Validation error: ${error.message}`,
    };
  }

  // Generic error fallback
  return {
    status: 500,
    message: error?.message || "An unexpected error occurred",
  };
};

export const handleZodError = (
  error: any,
): { status: number; message: string } => {
  const formattedErrors = error.issues.map((issue: any) => {
    const fieldName = issue.path.join(".");

    // Handle different error types with more meaningful messages
    if (issue.code === "invalid_type" && issue.received === "undefined") {
      return `${fieldName} is required`;
    }

    // For other validation errors, include the field name
    if (issue.message === "Required") {
      return `${fieldName} is required`;
    }

    // For other errors, format as "fieldName: message"
    return fieldName ? `${fieldName}: ${issue.message}` : issue.message;
  });

  return {
    status: 400,
    message: formattedErrors.join(", "),
  };
};
