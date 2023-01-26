<template>
  <div class="container">
    <h4>Invite Members</h4>
    <label class="invite-label">Invite members</label>
    <div class="invite-members-block">
      <div class="invite-members-input-wrapper">
        <tags-input
          v-model="emailTag"
          :tags="emailsList"
          placeholder="Add email"
          :avoid-adding-duplicates="true"
          @before-adding-tag="updateEmails"
        />
        <div v-if="errorMessage" class="validation-error">
          {{ errorMessage }}
        </div>
      </div>
      <div>
        <button class="primary-btn" type="button" @click="inviteHandler">
          Send invite
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

import { useMembersStore } from "../store";
import { IMember, Status, RoleTitle, RoleTitleID } from "@/types/main.types";

const loadedData: IMember[] = [
  {
    full_name: "Arthur Hayes",
    img: "",
    status: Status.PENDING,
    inboxes: [],
    role: {
      title: RoleTitle.ADMIN,
      role_id: RoleTitleID.Admin,
    },
    member_id: 1,
  },
  {
    full_name: "David Tennant",
    status: Status.SENT,
    img: "david.png",
    inboxes: [],
    role: {},
    member_id: 2,
  },
  {
    full_name: "Alisia Rininta",
    img: "alisa.png",
    status: Status.SENT,
    inboxes: [],
    role: {
      title: RoleTitle.MEMBER,
      role_id: RoleTitleID.Member,
    },
    member_id: 3,
  },
];

interface IaddingCallback {
  (): void;
}

const store = useMembersStore();
const { set_members } = store;

const emailTag = ref<string>("");
let emailsList: { text: string }[] = reactive([]);
const isValidEmail = ref<boolean>(false);
const errorMessage = ref<string>("");
const timeoutCounter = ref<ReturnType<typeof setTimeout> | undefined>();

function updateEmails({
  tag,
  addTag,
}: {
  tag: { text: string };
  addTag: IaddingCallback;
}): void {
  clearTimeout(timeoutCounter.value);
  timeoutCounter.value = setTimeout(() => {
    errorMessage.value = "";
    isValidEmail.value = !!tag.text.match(
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (isValidEmail.value) {
      let isExist = false;
      for (const email of emailsList) {
        if (email.text === tag.text) {
          isExist = true;
          break;
        }
      }
      if (!isExist) {
        addTag();
        emailsList.push(tag);
        emailTag.value = "";
      } else {
        errorMessage.value = "Email is no valid";
      }
    } else {
      errorMessage.value = "Email is no valid";
    }
  }, 300);
}

function inviteHandler(): void {
  clearTimeout(timeoutCounter.value);
  if (emailsList.length) {
    set_members(loadedData);
  } else {
    errorMessage.value = "This field is required";
  }
}
</script>

<style scoped lang="scss">
.invite-label {
  display: block;
  margin-bottom: 4px;
  color: $primary-super-gray-color;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}

.invite-members-block {
  position: relative;
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
}
.invite-members-input-wrapper {
  width: 444px;
  margin-right: 24px;
}

.validation-error {
  position: absolute;
  top: 100%;
  left: 0;
  font-size: 11px;
  color: red;
}
</style>
