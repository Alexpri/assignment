import { IInboxes, IMember, IRole } from "@/types/main.types";
import { defineStore } from "pinia";

export const useMembersStore = defineStore("members", {
  state: (): { members: IMember[] } => ({
    members: [],
  }),
  actions: {
    set_members(members: IMember[]) {
      this.members = members;
    },
    set_member_inboxes(inboxes: IInboxes[], member_id: number) {
      for (const member of this.members) {
        if (member.member_id === member_id) {
          member.inboxes = inboxes;
          break;
        }
      }
    },
    set_member_role(role: IRole, member_id: number) {
      for (const member of this.members) {
        if (member.member_id === member_id) {
          member.role = role;
          break;
        }
      }
    },
    delete_member(member_id: number) {
      this.members = this.members.filter(
        (item) => item.member_id !== member_id
      );
    },
  },
});
