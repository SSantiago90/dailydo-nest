import { SetMetadata } from "@nestjs/common";
import { Role } from "../roles.enum";


export const ROLES_KEY = "roles";

function Roles(role: Role) {
  return SetMetadata(ROLES_KEY, role);

}

export default Roles;