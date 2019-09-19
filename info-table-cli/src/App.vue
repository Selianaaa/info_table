<template>
<div id="app">
  <div class="search z-depth-1">
    <div class="input-field">
      <i class="material-icons prefix">search</i>
      <input type="text" id="search-input-field" v-model="searchInput">
      <label for="search-input-field"> Search by Id, First Name, Last Name </label>
    </div>
  </div>
  <div v-if="persons === null" class="table-view z-depth-1 valign-wrapper">
    <div class="progress light-green lighten-4">
      <div class="indeterminate light-green">
      </div>
    </div>
  </div>
  <div v-else class="table-view z-depth-1">
    <table class="centered">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="person in searchResults" class="modal-trigger" href="#modal1" @click="getMoreInfo(person)">
          <td v-text="person.id"></td>
          <td v-text="person.firstName"></td>
          <td v-text="person.lastName"></td>
        </tr>
      </tbody>
    </table>
  </div>
  <HelloWorld/>
</div>
</template>

<script>
import HelloWorld from './components/HelloWorld';

const url = "http://www.filltext.com/?rows=5&id={number|1000}" +
"&firstName={firstName}&delay=3&lastName={lastName}&email={email}" +
"&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}" +
"&description={lorem|32}";

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
  data() {
    return {
      persons: null,
      fullPersonInfo: {},
      searchInput: '',
      searchResults: [],
    };
  },
  methods: {

    //  Get json from api and convert id to string
    getEvents: function() {
      //  TODO: 500 404 status pages
      axios.get(url).then(response => {
        if (response.status === 200) {
          this.persons = response.data;
          this.persons.forEach(person => person.id += '')
        };
      });
    },
  },
  mounted() {
    this.getEvents();
  },
};
</script>

<style>
#app {
  display: grid;
  margin-top: 3%;
  margin-bottom: 3%;
  grid-gap: 2em;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
}

#app > div {
  background-color: white;
}

.search {
  display: grid;
  padding: 0% 5%;
}

.table-view {
  padding: 1%;
  height: calc(60vh - 10px);
  overflow-y: auto;
}

tbody > tr {
  cursor: pointer;
}

tbody > tr:hover {
  background-color: #ccff90;
}

.modal.bottom-sheet {
  border-radius: 5px 5px 0px 0px;
}
.modal.modal-content {
    padding: 15px;
}
</style>
