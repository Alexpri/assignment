export interface IMember {
  img: string;
  status: Status;
  full_name: string;
  inboxes: IInboxes[];
  role: IRole | Record<string, never>;
  member_id: number;
}

export interface IInboxes {
  title: string;
  inbox_id: number;
}

export interface IRole {
  title: RoleTitle;
  role_id: RoleTitleID;
}

export enum Status {
  PENDING = "Pending",
  SENT = "Sent",
}

export enum RoleTitle {
  ADMIN = "Admin",
  AGENT = "Agent",
  MANAGER = "Manager",
  MEMBER = "Member",
}

export enum RoleTitleID {
  Admin,
  Agent,
  Manager,
  Member,
}
