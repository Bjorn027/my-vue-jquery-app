<template>
 <div> 
      <section>
        <h4>Groups</h4>
        <input v-model="createGroupText" placeholder="name">
        <button @click="createGroup">Create Group</button>
        <br>
        <input type="radio" name="group" v-model="groupId" value="" @click="getNotes()" /> All
        <div v-for="group in groups" :key="group._id">
          <input type="radio" name="group" v-model="groupId" :value="group._id" @click="getNotes(group._id)" />
          {{group.text}}
          <button class="delete" @click="removeGroup(group._id)">Delete Group</button>
        </div>
      </section>

      <section>
        <h4>Notes</h4>
        <textarea v-model="createNoteText" placeholder="note" cols="100" rows="5"></textarea><br>
        <button @click="createNote">Create Note</button>
        <div v-for="note in notes" :key="note._id" class="note">
          {{note.text}}
          <button class="delete" @click="removeNote(note._id)">Delete Note</button>
        </div>
      </section></div>
</template>

<script>
import Jquery from "jquery";

const $ = Jquery;
const server = "https://supernotes.duckdns.org";
export default {
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
  }
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
  
};
</script>

<style>
</style>