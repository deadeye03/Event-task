import express from "express";
import eventRouter from "./v1/routes/event.route";
import userRouter from "./v1/routes/user.route";
import bookingRouter from "./v1/routes/booking.route";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

const app = express();

app.use(express.json());

const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/v1/events", eventRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);

export default app;
