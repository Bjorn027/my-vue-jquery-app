<template>
  <div class="mainbody">
    <v-card color="#333333">
      <section>
        <v-banner color="#800000">
          <div class="centered headline">Group Creation</div>
        </v-banner>
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
        <v-banner color="#800000">
          <div class="headline">Groups List</div>
        </v-banner>
        <v-divider />
        <br />
        <p class="padding">Select a group</p>
        <br />
        <v-container class="d-inline-flex">
          <v-radio-group v-model="groupId" @change="getNotes(groupId)">
            <v-list>
              <v-list-item>
                <v-radio label="All" :value="''" />
                <v-spacer></v-spacer>
              </v-list-item>
              <v-list-item v-for="group in groups" :key="group._id">
                <v-radio :label="group.text" :value="group._id" />
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      small
                      color="success"
                      text
                      class="update"
                      v-on="on"
                      @click="showUpdateGroup(group)"
                    >
                      <v-icon small>mdi-update</v-icon>
                    </v-btn>
                  </template>
                  <span>Update</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      small
                      color="error"
                      v-on="on"
                      text
                      class="delete"
                      @click="removeGroup(group._id); snackbar3 = true"
                    >
                      <v-icon small>mdi-cancel</v-icon>
                    </v-btn>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
                <v-snackbar v-model="snackbar3" :timeout="timeout">
                  {{ text3 }}
                  <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
                </v-snackbar>
              </v-list-item>
            </v-list>
          </v-radio-group>
        </v-container>
        <div v-if="updateGroupField" class="field">
          <v-banner color="#800000">
            <div class="headline">Edit Group</div>
          </v-banner>
          <v-text-field
            @keyup.enter="updateGroup(); snackbar5=true"
            v-model="updateGroupText"
            placeholder="group name"
          ></v-text-field>
          <br />
          <v-btn
            x-small
            color="success"
            class="create black--text"
            @click="updateGroup(); snackbar5=true"
          >Update</v-btn>
          <v-btn x-small color="error" class="black--text" @click="updateGroupField = false">Cancel</v-btn>
        </div>
      </section>
      <br />
      <v-snackbar v-model="snackbar5" :timeout="timeout">
        {{ text5 }}
        <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <section>
        <v-banner color="#800000">
          <div class="centered headline">Note Creation</div>
        </v-banner>
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
        <v-banner color="#800000">
          <div class="headline">Notes</div>
        </v-banner>
        <v-divider />
        <br />
        <v-container class="d-inline-flex">
          <v-list>
            <v-spacer></v-spacer>
            <v-list-item v-for="note in notes" :key="note._id" class="note">
              {{note.text}}
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    color="success"
                    text
                    class="update"
                    v-on="on"
                    @click="showUpdateNote(note)"
                  >
                    <v-icon small>mdi-update</v-icon>
                  </v-btn>
                </template>
                <span>Update</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    color="error"
                    text
                    class="delete"
                    v-on="on"
                    @click="removeNote(note._id); snackbar4=true"
                  >
                    <v-icon small>mdi-cancel</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </v-list-item>
          </v-list>
        </v-container>
        <v-snackbar v-model="snackbar4" :timeout="timeout">
          {{ text4 }}
          <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
        </v-snackbar>
        <div v-if="updateNoteFeild" class="field">
          <v-banner color="#800000">
            <div class="headline">Edit Note</div>
          </v-banner>
          <v-text-field
            @keyup.enter="updateNote(); snackbar6=true"
            v-model="updateNoteText"
            placeholder="Note"
          ></v-text-field>
          <br />
          <v-btn
            x-small
            color="success"
            class="create black--text"
            @click="updateNote();snackbar6=true;"
          >Update</v-btn>
          <v-btn x-small color="error" class="black--text" @click="updateNoteFeild = false">Cancel</v-btn>
        </div>
      </section>
      <v-snackbar v-model="snackbar6" :timeout="timeout">
        {{ text6 }}
        <v-btn color="blue" text @click="snackbar = false">Close</v-btn>
      </v-snackbar>
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
    res: "",
    noteId: "",
    groups: [],
    snackbar: false,
    snackbar2: false,
    snackbar3: false,
    snackbar4: false,
    snackbar5: false,
    snackbar6: false,
    text: "Group Created",
    text2: "Note Saved",
    text3: "Group Deleted",
    text4: "Note Deleted",
    text5: "Group Updated",
    text6: "Note Updated",
    timeout: 2000,
    name: $.get("#username"),
    updateGroupField: false,
    updateNoteFeild: false,
    updateGroupText: "",
    updateNoteText: ""
  }),
  methods: {
    showUpdateNote(note) {
      this.noteId = note._id;
      this.updateNoteText = note.text;
      this.updateNoteFeild = true;
    },
    updateNote() {
      $.post(
        server + "/notes/update",
        {
          text: this.updateNoteText,
          noteId: this.noteId,
          groupId: this.groupId
        },
        res => {
          if (res.success) {
            this.notes = res.notes;
            this.updateNoteText = "";
            this.updateNoteFeild = false;
          } else {
            this.res = res;
          }
        }
      );
    },
    reloadPage() {
      window.location.reload();
    },
    showUpdateGroup(group) {
      this.groupId = group._id;
      this.updateGroupText = group.text;
      this.updateGroupField = true;
    },
    updateGroup() {
      $.post(
        server + "/groups/update",
        {
          text: this.updateGroupText,
          groupId: this.groupId
        },
        res => {
          if (res.success) {
            this.groups = res.groups;
            this.updateGroupText = "";
            this.updateGroupField = false;
          } else {
            this.res = res;
          }
        }
      );
    },
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
    getNotes() {
      $.get(
        server + "/notes",
        { groupId: this.groupId ? this.groupId : null },
        res => {
          if (res.success) {
            this.notes = res.notes;
          } else {
            this.res = res;
          }
        }
      );
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
.padding {
  padding-left: 20px;
}
</style>