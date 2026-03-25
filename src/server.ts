import app from "./app";

import { PORT, SERVER_HOST } from "./utils/config";

app
  .listen(PORT, SERVER_HOST, () => {
    console.log(`⚙️  Server running on : ${SERVER_HOST}:${PORT}`);
  })
  .on("error", (error) => {
    console.log(error);
  });
