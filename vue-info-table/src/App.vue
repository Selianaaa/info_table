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
      <tbody v-if="searchInput === '' ">
        <tr v-for="person of persons" :key="person.id" class="modal-trigger" href="#modal1" @click="getMoreInfo(person)">
          <td>{{ person.id }}</td>
          <td>{{ person.firstName }}</td>
          <td>{{ person.lastName }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="person of searchResults" :key="person.id" class="modal-trigger" href="#modal1" @click="getMoreInfo(person)">
          <td>{{ person.id }}</td>
          <td>{{ person.firstName }}</td>
          <td>{{ person.lastName }}</td>
        </tr>
      </tbody>
    </table>
    <div id="modal1" class="modal bottom-sheet">
      <div class="modal-content">
        <h4>Full Person Info</h4>
        <p><b>ID:</b> {{ fullPersonInfo.id }}</p>
        <p><b>First Name:</b> {{ fullPersonInfo.firstName }}</p>
        <p><b>Last Name:</b> {{ fullPersonInfo.lastName }}</p>
        <p><b>Email:</b> {{ fullPersonInfo.email }}</p>
        <p><b>Phone:</b> {{ fullPersonInfo.phone }}</p>
        <template v-if="fullPersonInfo.address">
          <p>
            <b>Address:</b>
            {{ fullPersonInfo.address.streetAddress }},
            {{ fullPersonInfo.address.city }},
            {{ fullPersonInfo.address.state }} {{ fullPersonInfo.address.zip }}
          </p>
        </template>
        <p><b>Description:</b> {{ fullPersonInfo.description }}</p>
      </div>
    </div>
  </div>
  <MainPage/>
</div>
</template>

<script>
import MainPage from './components/MainPage';
import axios from 'axios';

const url = "http://www.filltext.com/?rows=5&id={number|1000}" +
"&firstName={firstName}&delay=3&lastName={lastName}&email={email}" +
"&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}" +
"&description={lorem|32}";

export default {
  name: 'app',
  components: {
    MainPage,
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
          this.persons.forEach(person => person.id += '');
        } else if (response.status === 404) {
          M.toast({html: "Not Found", classes: 'rounded'});
        } else if (response.status === 500) {
          M.toast({html: "Enternal Server Error", classes: 'rounded'});
        }
      });
    },

    //  Get more info about clicked person in modal
    getMoreInfo: function(person) {
      this.fullPersonInfo = person;
    },
  },

  watch: {

    // watch search input changes and display matchin persons
    searchInput: function() {
    this.searchResults = this.persons.filter(
      el => el.id.indexOf(this.searchInput) !== -1 ||
      el.firstName.indexOf(this.searchInput) !== -1 ||
      el.lastName.indexOf(this.searchInput) !== -1
      );
    },
  },

  mounted() {
  this.getEvents();
  },
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
