<template>
  <div class="container">
    <h4>Manage team members</h4>
    <div class="manage-board-search-block">
      <div class="manage-board-search-wrapper">
        <i class="search-icon"></i>
        <input class="search-input" type="text" placeholder="Search" />
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
        <tr class="table-row">
          <td class="table-cell table-cell-name">
            <div class="table-cell-name-inner">
              <div class="table-cell-name-info">
                <img src="@/assets/placeholder.svg" alt="avatar" />
                name
              </div>
              <div class="status-block">
                <i></i>
                <span>Pending</span>
              </div>
            </div>
          </td>
          <td class="table-cell table-cell-inboxes">d</td>
          <td class="table-cell table-cell-role"></td>
          <td class="table-cell table-cell-action"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script lang="ts" setup></script>

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
  overflow: hidden;
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
</style>
