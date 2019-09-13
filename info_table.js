$(document).ready(function(){
  $('.modal').modal({
    inDuration: 500,
    outDuration: 600,
    opacity: 0.7,
  });
});

url = "http://www.filltext.com/?rows=5&id={number|1000}" +
"&firstName={firstName}&delay=3&lastName={lastName}&email={email}" +
"&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}" +
"&description={lorem|32}";

new Vue({
  el: '#info-table',
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
      //  TODO: make rows = 1000
      axios.get(url).then(response => {
        if (response.data.length != 0) {
          this.persons = response.data;
          this.persons.forEach(person => person.id += '');
        } else {
          M.toast({html: "No data", classes: 'rounded'});
        };
      });
    },

    //  Get more info about clicked person in modal
    getMoreInfo: function(person) {
      this.fullPersonInfo = person;
      console.log(this.fullPersonInfo);
      console.log(this.fullPersonInfo.address.zip);
      $('modal1').modal('open');
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
});
