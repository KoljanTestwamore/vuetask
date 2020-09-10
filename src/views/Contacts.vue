<template>
  <div class="contacts">
    <h1> 📚 Contacts </h1>
    <div class="main-container">
      <div 
        class="contact"
        v-for="(value,name) in contacts" 
        :key="name" 
      >
        <div class="icons">
          <span 
            v-if="conformAt!=name"
            class="icon"
            @click="setConformAt(name)"
          > 
            ❌ 
          </span>
          <span
            v-if="conformAt===name"
            class="icon"
            @click="deleteContact(name)" 
          >
            ✔️
          </span>
          <span
            v-if="conformAt===name"
            class="icon"
            @click="clearConform"
          >
            🚫
          </span>
        </div>
        <router-link 
          class="contact__title"
          tag="h4" 
          :to="'/info/' + name"
        >
          {{name}}
        </router-link>
        <div 
          v-for="(contactItemValue,contactItem) in value" 
          :key="contactItemValue" 
          class="contact-item"
        >
          {{contactItem}}: {{contactItemValue}}
        </div>
      </div>
    </div>
    <h1> ⭐ New contact: </h1>
    <div>
      <input 
        v-model="inputValue"
        @keydown.enter="addContact"
        class="input-new-contact"
        placeholder="Contact name"
      >
      <button 
        @click="addContact"
        class="button-new-contact"
      >
        Add contact
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name:  "contacts",
  methods: {
    addContact() {
      if (this.inputValue) {
          let res = this.$store.commit("createContact", this.inputValue);
          console.log(res);
          localStorage.setItem("name", this.inputValue);
          this.inputValue = "";
        }
    },
    deleteContact(name) {
      this.$store.commit("deleteContact", name);
      this.conformAt = ""
    },
    setConformAt(name) {
      this.conformAt = name;
    },
    clearConform() {
      this.conformAt = "";
    }
  },
  data() {
    return {
      inputValue: "",
      conformAt: ""
    }
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
  },
  watch: {
    inputValue(iv) {
      console.log(iv);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-container{
  display: flex;
  align-items: center;
  flex-direction: column;
  min-width: 100%;
}
.contact {
  background-color:#d3d3d3;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  width: 320px;
  transition: 0.3s;
}
.contact:hover {
  background-color: #E0E0E0;
}
.contact-item {
  text-align: left;
  padding-bottom: 5px;
}
.contact__title {
  display: inline;
  margin: 0 0 20px 0;
  text-align: left;
  font-size: 2rem;
  cursor: pointer;
  min-width: 30px;
}
.icons {
  position: relative;
  top: 8px;
  left: 85%;
  width: 0;
  height: 0;
  user-select: none;
  display: flex;
  flex-direction: row;
}
.icon {
  cursor: pointer;
}
.button-new-contact {
  margin-left: 20px;
  background-color: #2798df;
  padding: 5px 10px;
  cursor: pointer;
  color: #ffffff;
  text-shadow:0px 1px 1px #263666;
  border-radius: 3px;
  border:1px solid #ffffff;
}
.button-new-contact:active {
	position:relative;
	top:1px;
}
.input-new-contact {
  border-width: 0 0 3px 0;
  font-size: 1rem;
}
.input-new-contact:focus, .button-new-contact:focus {
  outline: none;
}
</style>
