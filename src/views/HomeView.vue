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
</script>
