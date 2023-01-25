<template>
  <div class="home">
    <div class="container">
      <h3>Members</h3>
    </div>
    <hr />
    <InviteMember />
    <hr />
    <ManageBoard />
  </div>
</template>

<script lang="ts" setup>
import InviteMember from "@/components/InviteMember.vue";
import ManageBoard from "@/components/ManageBoard.vue";

const loadedData = [
  {
    name: "Arthur Hayes",
    status: "Pending",
    inboxes: [],
    role: "",
    id: 1,
  },
  {
    name: "David Tennant",
    status: "Sent",
    inboxes: [],
    role: "",
    id: 1,
  },
  {
    name: "Alisia Rininta",
    status: "Sent",
    inboxes: [],
    role: "",
    id: 1,
  },
];

function loadDataHandler(): void {
  console.log(222);
}
</script>
