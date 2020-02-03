<template>
  <div class="mainbody">
    <v-card color="#333333">
      <section>
        <div class="centered display-1">Group Creation</div>
        <v-divider />
        <v-text-field
          color="success"
          label="Enter Group Name"
          @keyup.enter="createGroup(); snackbar = true"
          v-model="createGroupText"
        />

        <v-btn
          rounded
          class="float-right black--text"
          aria-hidden="true"
          color="success"
          @click="createGroup(); snackbar = true"
        >Create Group</v-btn>

        <v-snackbar v-model="snackbar" :timeout="timeout">
          {{ text }}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <br />
        <br />
        <div class="display-1">Groups List</div>
        <v-divider />
        <br />

        <input type="radio" name="group" v-model="groupId" value @click="getNotes()" /> All
        <div v-for="group in groups" :key="group._id">
          <input
            type="radio"
            name="group"
            v-model="groupId"
            :value="group._id"
            @click="getNotes(group._id)"
          />
          {{group.text}}
          <v-btn small color="error" text class="delete" @click="removeGroup(group._id)">
            <v-icon small>mdi-cancel</v-icon>
          </v-btn>
        </div>
      </section>
      <br />

      <section>
        <h1 class="centered display-1">Note Creation</h1>
        <v-divider />
        <br />
        <v-text-field
          v-model="createNoteText"
          @keyup.enter="createNote(); snackbar2 = true"
          color="success"
          label="Note Text"
        ></v-text-field>
        <br />
        <v-btn
          class="float-right black--text"
          color="success"
          rounded
          @click="createNote(); snackbar2 = true"
        >Create Note</v-btn>
        <v-snackbar v-model="snackbar2" :timeout="timeout">
          {{ text2 }}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <br />
        <br />

        <div class="display-1">Notes</div>
        <v-divider />
        <br />
        <div v-for="note in notes" :key="note._id" class="note">
          {{note.text}}
          <v-btn small color="error" text class="delete" @click="removeNote(note._id)">
            <v-icon small>mdi-cancel</v-icon>
          </v-btn>
        </div>
      </section>
    </v-card>
  </div>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";
export default {
  data: () => ({
    createGroupText: "",
    createNoteText: "",
    notes: [],
    groupId: "",
    groups: [],
    snackbar: false,
    snackbar2: false,
    text: "Group Created",
    text2: "Note Saved",
    timeout: 2000,
    name: $.get("#username")
  }),
  methods: {
    removeGroup(groupId) {
      $.post(server + "/groups/remove", { groupId }, res => {
        if (res.success) {
          this.getGroups();
        } else {
          this.res = res;
        }
      });
    },
    getGroups() {
      $.get(server + "/groups", res => {
        if (res.success) {
          this.groups = res.groups;
        } else {
          this.res = res;
        }
      });
    },
    getNotes(groupId) {
      $.get(server + "/notes", { groupId }, res => {
        if (res.success) {
          this.notes = res.notes;
        } else {
          this.res = res;
        }
      });
    },
    createNote() {
      $.post(
        server + "/notes/create",
        {
          text: this.createNoteText,
          groupId: this.groupId
        },
        res => {
          if (res.success) {
            this.notes = res.notes;
            this.createNoteText = "";
          } else {
            this.res = res;
          }
        }
      );
    },
    logout() {
      $.post(server + "/logout", res => {
        if (res.success) {
          this.loggedIn = false;
          this.username = "";
          this.createGroupText = "";
          this.createNoteText = "";
          this.notes = [];
          this.groups = [];
          this.groupId = "";
        }
      });
    },
    removeNote(noteId) {
      console.log({ noteId });
      $.post(server + "/notes/remove", { noteId }, res => {
        if (res.success) {
          this.getNotes();
        } else {
          this.res = res;
        }
      });
    },
    createGroup() {
      $.post(
        server + "/groups/create",
        {
          text: this.createGroupText
        },
        res => {
          if (res.success) {
            this.groups = res.groups;
            this.createGroupText = "";
          } else {
            this.res = res;
          }
        }
      );
    }
  },
  mounted() {
    this.getGroups();
  }
};
</script>

<style>
.mainbody {
  padding: 40px;
}
.centered {
  text-align: center;
}
</style>