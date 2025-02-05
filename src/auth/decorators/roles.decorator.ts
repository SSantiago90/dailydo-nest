import { SetMetadata } from "@nestjs/common";

function Roles(role: "user" | "admin") {
  return SetMetadata("roles", role);

}

export default Roles;