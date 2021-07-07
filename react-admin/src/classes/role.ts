import { Permission } from "./permission";

export class Role {
  id: number;
  name: string;
  permissions: Permission[];

  constructor(id: number = 0, name: string = '', permissions = []) {
    this.id = id;
    this.name = name;
    this.permissions = permissions
  }
}