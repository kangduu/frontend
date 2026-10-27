import login from "./login";
import shop from "./shop";
import myserver from "../request/getRequest";
myserver.parseRoter("login", login)
myserver.parseRoter("shop", shop)
export default myserver