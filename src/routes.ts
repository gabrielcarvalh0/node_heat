import { Router} from "express";
import { AuthenticationUserController } from "./controllers/AuthenticateUserController";
import { CreateMessageController } from "./controllers/CreateMessageController";
import { GetLast3MessagesController } from "./controllers/GetLast3MessagesController";
import { ProfileUserController } from "./controllers/ProfileUserController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
const router = Router();

router.post("/authenticate", new AuthenticationUserController().handle);

// ensureAuthenticated middleware para controlar a authenticate do user
router.post("/messages", ensureAuthenticated, new CreateMessageController().handle);

// rota para pegar as messages
router.get("/messages/last3", new GetLast3MessagesController().handle);

// rota para profile do user

router.get("/profile", ensureAuthenticated, new ProfileUserController().handle);

export {router}