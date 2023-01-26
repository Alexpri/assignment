<template>
  <div class="container">
    <h4>Manage team members</h4>
    <template v-if="members.length">
      <div class="manage-board-search-block">
        <div class="manage-board-search-wrapper">
          <i class="search-icon"></i>
          <input
            v-model="searchField"
            class="search-input"
            type="text"
            placeholder="Search"
          />
        </div>
      </div>
      <table class="table">
        <thead class="table-header">
          <tr class="table-row">
            <th class="table-cell table-cell-name">Name</th>
            <th class="table-cell table-cell-inboxes"><i></i>Inboxes</th>
            <th class="table-cell table-cell-role"><i></i>Role</th>
            <th class="table-cell table-cell-action"><i></i>Action</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr
            class="table-row"
            v-for="member of filteredMembers"
            :key="member.member_id"
          >
            <td class="table-cell table-cell-name">
              <div class="table-cell-name-inner">
                <div class="table-cell-name-info">
                  <img
                    v-if="member.img"
                    :src="`${publicPath}${member.img}`"
                    alt="avatar"
                  />
                  <img v-else src="@/assets/placeholder.svg" alt="avatar" />
                  {{ member.full_name }}
                </div>
                <div
                  v-if="member.status === Status.PENDING"
                  class="status-block"
                >
                  <i></i>
                  <span>Pending</span>
                </div>
              </div>
            </td>
            <td class="table-cell table-cell-inboxes">
              <vue-select-multiselect
                :modelValue="member.inboxes"
                @update:modelValue="
                  set_member_inboxes($event, member.member_id)
                "
                :options="inboxesList"
                :multiple="true"
                :searchable="false"
                :close-on-select="false"
                select-label=""
                deselect-label=""
                selected-label=""
                placeholder="Not assigned"
                label="title"
                :ref="
                  (el: VueMultiselect) => {
                    multiselectInboxes[member.member_id] = el;
                  }
                "
                track-by="inbox_id"
                open-direction="bottom"
              >
                <template #selection="{ values }">
                  <span class="multiselect__single" v-if="values.length"
                    >{{ values.length }} inbox{{
                      values.length > 1 ? "es" : ""
                    }}</span
                  ></template
                >

                <template #option="prop">
                  <div class="inbox-option">
                    <div class="inbox-option-checkbox"></div>
                    <div class="inbox-option-text">
                      {{ prop.option.title }}
                    </div>
                  </div>
                </template>
              </vue-select-multiselect>
            </td>
            <td class="table-cell table-cell-role">
              <vue-select-multiselect
                :modelValue="member.role"
                @update:modelValue="set_member_role($event, member.member_id)"
                :options="rolesList"
                :searchable="false"
                :close-on-select="false"
                select-label=""
                deselect-label=""
                selected-label=""
                placeholder="Select"
                label="title"
                :ref="
                  (el: VueMultiselect) => {
                    multiselectRole[member.member_id] = el;
                  }
                "
                track-by="role_id"
                open-direction="bottom"
              >
                <template #option="prop">
                  <div class="role-option">
                    <div class="role-option-text">
                      {{ prop.option.title }}
                    </div>
                  </div>
                </template>
              </vue-select-multiselect>
            </td>
            <td class="table-cell table-cell-action">
              <div class="table-cell-inner">
                <i @click="delete_member(member.member_id)"></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <div v-else>There is no member</div>
  </div>
</template>
<script lang="ts" setup>
import { ref, computed } from "vue";
import { useMembersStore } from "../store";
import { storeToRefs } from "pinia";
import { VueMultiselect } from "vue-multiselect";
import {
  IMember,
  IInboxes,
  Status,
  IRole,
  RoleTitle,
  RoleTitleID,
} from "@/types/main.types";

const store = useMembersStore();
const { members } = storeToRefs(store);
const { set_member_inboxes, set_member_role, delete_member } = store;
const publicPath = process.env.BASE_URL;
const searchField = ref<string>("");
const filteredMembers = computed((): IMember[] => {
  if (!!searchField.value && members) {
    return members.value.filter((member: IMember) => {
      return member.full_name.toLowerCase().includes(searchField.value);
    });
  }
  return members.value;
});

const inboxesList: IInboxes[] = [
  {
    title: "Demo Clerk",
    inbox_id: 1,
  },
  {
    title: "Long inbox title 2023",
    inbox_id: 2,
  },
  {
    title: "Work Inbox",
    inbox_id: 3,
  },
];

const multiselectInboxes = ref<{ [key: number]: null | VueMultiselect }>({});
const multiselectRole = ref<{ [key: number]: null | VueMultiselect }>({});

const rolesList: IRole[] = [
  {
    title: RoleTitle.ADMIN,
    role_id: RoleTitleID.Admin,
  },
  {
    title: RoleTitle.AGENT,
    role_id: RoleTitleID.Agent,
  },
  {
    title: RoleTitle.MANAGER,
    role_id: RoleTitleID.Manager,
  },
  {
    title: RoleTitle.MEMBER,
    role_id: RoleTitleID.Member,
  },
];
</script>

<style lang="scss">
.manage-board-search-block {
  padding-bottom: 24px;
}

.manage-board-search-wrapper {
  position: relative;
}

.search-input {
  padding: 4px 12px 4px 40px;
  color: $primary-super-gray-color;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  border: 1px solid $border-field-color;
  border-radius: 4px;
}

.search-icon {
  position: absolute;
  display: block;
  top: 6px;
  left: 11px;
  width: 18px;
  height: 18px;
  background-image: url(@/assets/search.svg);
}

.table {
  width: 100%;
  max-width: 896px;
  box-shadow: 0px 1px 2px rgba(31, 41, 54, 0.16);
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 4px;
  background-color: transparent;
}
.table-header {
  color: $primary-super-gray-color;
  font-size: 12px;
  line-height: 16px;
  background-color: $table-header-bg-color;

  .table-cell {
    padding: 16px 10px;
    font-weight: 500;
  }
}

.table-body {
  .table-row:last-child {
    .table-cell:first-child {
      border-bottom-left-radius: 4px;
    }
  }

  .table-row:last-child {
    .table-cell:last-child {
      border-bottom-right-radius: 4px;
    }
  }

  .table-cell-name {
    padding: 14px 16px;
  }

  .table-cell-inboxes {
    padding: 10px 16px;
  }

  .table-cell-role {
    padding: 10px 16px;
  }
  .table-cell-role {
    padding: 16px;
  }

  .table-cell-action {
    padding: 16px;

    .table-cell-inner {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    i {
      display: block;
      width: 16px;
      height: 18px;
      background-image: url(@/assets/delete.svg);
      background-size: cover;
      background-repeat: no-repeat;
      cursor: pointer;

      &:hover {
        background-image: url(@/assets/delete-red.svg);
      }
    }
  }
}

th {
  border-top: solid 1px $table-border-color;

  &:first-child {
    border-top-left-radius: 4px;
  }

  &:last-child {
    border-top-right-radius: 4px;
  }

  i {
    display: inline-block;
    vertical-align: middle;
    width: 13px;
    height: 13px;
    margin-right: 7px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  &.table-cell-inboxes {
    i {
      background-image: url(@/assets/inboxes.svg);
    }
  }

  &.table-cell-role {
    i {
      background-image: url(@/assets/role.svg);
    }
  }

  &.table-cell-action {
    text-align: center;

    i {
      background-image: url(@/assets/action.svg);
    }
  }
}

.table-cell {
  text-align: left;
  border-right: 1px solid $table-border-color;
  border-bottom: 1px solid $table-border-color;

  &:first-of-type {
    border-left: 1px solid $table-border-color;
  }
}

.table-cell-name {
  width: 40.17%;
}

.table-cell-inboxes {
  width: 25%;
}

.table-cell-role {
  width: 25%;
}

.table-cell-action {
  width: 9.83%;
  text-align: center;
}

.table-cell-name-inner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.table-cell-name-info {
  display: flex;
  align-items: center;

  img {
    margin-right: 8px;
  }
}

.status-block {
  display: flex;
  align-items: center;
  padding: 3px 8px;
  color: $primary-orange-color;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  border: 1px solid $primary-orange-color;
  border-radius: 16px;

  i {
    width: 12px;
    height: 10px;
    margin-right: 5px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url(@/assets/mail.svg);
  }
}

.inbox-option {
  display: flex;
}

.inbox-option-checkbox {
  min-width: 20px;
  width: 20px;
  height: 20px;
  margin-right: 8px;
  background-image: url(@/assets/checkbox.svg);
  background-repeat: no-repeat;
  background-size: cover;
}

.multiselect__option--selected {
  .inbox-option-checkbox {
    margin-right: 10px;
    background-image: url(@/assets/checkbox-active.svg);
  }
}

.multiselect__option--selected {
  position: relative;

  .role-option {
    color: $primary-purple-color;

    &:after {
      position: absolute;
      content: "";
      display: block;
      top: 12px;
      right: 16px;
      width: 16px;
      height: 12px;
      background-image: url("@/assets/tick.svg");
      background-size: cover;
      background-repeat: no-repeat;
    }
  }
}

.inbox-option-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
