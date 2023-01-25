<template>
  <div class="container">
    <h4>Invite Members</h4>
    <label class="invite_label">Invite members</label>
    <div class="invite-members-block">
      <div class="invite-members-input-wrapper">
        <tags-input
          v-model="emailTag"
          :tags="emailsList"
          :avoid-adding-duplicates="true"
          @before-adding-tag="updateEmails"
        />
        <div v-if="showValidationError" class="validation-error">
          Email is no valid
        </div>
      </div>
      <div>
        <button class="primary-btn" type="button">Send invite</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";

interface IaddingCallback {
  (): void;
}

const emailTag = ref<string>("");
let emailsList: string[] = reactive([]);
const isValidEmail = ref<boolean>(false);
const showValidationError = ref<boolean>(false);
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
    console.log(tag, addTag);
    isValidEmail.value = !!tag.text.match(
      /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/
    );
    if (isValidEmail.value) {
      addTag();
    } else {
      showValidationError.value = true;
    }
  }, 300);
}
</script>

<style scoped lang="scss">
.invite_label {
  color: $primary-super-gray-color;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
}

.invite-members-block {
  position: relative;
  display: flex;
  flex-direction: row;
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
