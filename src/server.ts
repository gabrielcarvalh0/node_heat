import { serverHttp } from "./app";

serverHttp.listen(process.env.APP_URL || "4000", () => console.log('wello word!'))
