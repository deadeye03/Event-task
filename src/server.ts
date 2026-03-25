import app from "./app";

import { PORT, SERVER_HOST } from "./utils/config";

app
  .listen(PORT, () => {
    console.log(`⚙️  Server running on ::${PORT}`);
  })
  .on("error", (error) => {
    console.log(error);
  });
