<template>
  <div v-if="contact" class="info">
    <h1>
      📇 {{id}}
    </h1>
    <div class="card">
      <h4 v-for="(value, item) in contact" :key="item">
        {{item}}: {{value}}
        <span class="icon-container">
          <span 
            class="icon"
            @click="openEditing(item, value)"
          > 
            ✏️
          </span>
          <span 
            v-if="conformAt!=item"
            @click="setConformAt(item)"
            class="icon"
          >
            ❌
          </span>
          <span
            v-if="conformAt===item"
            class="icon"
            @click="removeItem(item, value)"
          >
            ✔️
          </span>
          <span
            v-if="conformAt===item"
            class="icon"
            @click="clearConform"
          >
            🚫
          </span>
        </span>
      </h4>
    </div>
    <div 
      class="input-group"
      v-if="inputMode==='edit'"
    >
      <h1> ✏️ {{editField}}: </h1>
      <input 
        v-model="inputValue" 
        @keydown.enter="edit"
        placeholder="Enter field"
      >
      <button 
        @click="edit"
      >
        Edit
      </button>
      <div
        v-if="!conformCancelEditing"
        @click="askEditingCancel"
        class="sign"
      >
        🛑 Cancel editing
      </div>
      <div 
          class="icon-container"
          v-if="conformCancelEditing"
      >
        <span
          class="icon"
          @click="cancelEditing"
        >
          ✔️
        </span>
        <span
          class="icon"
          @click="clearCancelConform"
        >
          🚫
        </span>
      </div>
    </div>
    <div 
      class="input-group"
      v-else
    >
      <h1> ⭐ New item: </h1>
      <input
        v-model="inputValue" 
        @keydown.enter="addItem"
        placeholder="Enter your_item:item_value"
      >
      <button
        @click="addItem"
      >
        Add item
      </button>
    </div>
    <div>
      <div 
        v-if="lastAction"
        @click="undo"
        class="sign"
      > 
        ↩️ Undo
      </div>
      <router-link
        :to="'/'"
        tag="div"
        class="sign"
      >
        🔙 Back
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "info",
  methods: {
    addItem() {
      if ((this.inputValue) && (this.inputValue.indexOf(":") >= 0))  {
        let values = this.inputValue.split(":", 2);
        this.$store.commit("addItemToContact", {
          item: values[0],
          value: values[1],
          id: this.id
        });

        this.inputValue = "";
        this.lastAction = "addItem";
        this.lastItem = values[0];
      }
    },
    removeItem(item, value) {
      this.$store.commit("deleteItemFromContact", {
        item,
        id: this.id
      })
      this.lastAction = "removeItem";
      this.lastItem = item;
      this.lastValue = value;
    },
    undo() {
      if (this.lastAction === "addItem") {
        this.removeItem(this.lastItem, this.lastValue);
      } else if (this.lastAction === "removeItem") {
        this.$store.commit("addItemToContact", {
          item: this.lastItem,
          value: this.lastValue,
          id: this.id
        });
      }
      this.lastAction = "";
    },
    openEditing(item, value) {
      this.conformCancelEditing = false;
      this.lastItem = item;
      this.lastValue = value;
      this.inputValue = value;
      this.editField = item;
      this.inputMode = "edit";
    },
    edit() {
      if (this.inputValue) {
        this.$store.commit("addItemToContact", {
          id: this.id,
          item: this.editField,
          value: this.inputValue
        })
        this.inputValue = "";
        this.inputMode = "";
        this.lastAction = "removeItem";
      }
    },
    setConformAt(name) {
      this.conformAt = name;
    },
    clearConform() {
      this.conformAt = "";
    },
    clearCancelConform() {
      this.conformCancelEditing = false;
    },
    askEditingCancel() {
      this.conformCancelEditing = true;
    },
    cancelEditing() {
      this.inputMode = "";
      this.inputValue = "";
    },
  }, 
  data() {
    return {
      inputValue: "",
      lastAction: "",
      lastItem: "",
      lastValue: "",
      inputMode: "create",
      editField: "",
      conformAt: "",
      conformCancelEditing: false
    }
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    contact() {
      return this.$store.getters.contact(this.id);
    },
    inputValues() {
      return this.inputValue.split(":", 2);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.info {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card {
  background-color: #d3d3d3;
  width: 320px;
  border-radius: 15px;
  min-height: 50px;
}
.icon-container {
  padding-left: 30px;
}
.icon {
  cursor: pointer;
}
.sign {
  cursor: pointer;
  margin-top: 30px;
}
.input-group {
  margin-top: 30px;
}
.input-group .icon-container {
  margin-top: 30px;
}
.input-group button {
  width: 100px;
  margin-left: 20px;
  background-color: #2798df;
  padding: 5px 10px;
  cursor: pointer;
  color: #ffffff;
  text-shadow:0px 1px 1px #263666;
  border-radius: 3px;
  border:1px solid #ffffff;
}
.input-group button:active {
	position:relative;
	top:1px;
}
.input-group input {
  border-width: 0 0 3px 0;
  font-size: 1rem;
}
.input-group input:focus, .input-group button:focus {
  outline: none;
}
</style>
