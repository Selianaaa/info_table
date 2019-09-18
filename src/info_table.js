$(document).ready(function(){
  $('.modal').modal({
    inDuration: 500,
    outDuration: 600,
    opacity: 0.7,
  });
});
//  change rows to 1000
url = "http://www.filltext.com/?rows=5&id={number|1000}" +
"&firstName={firstName}&delay=3&lastName={lastName}&email={email}" +
"&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}" +
"&description={lorem|32}";

new Vue({
  el: '#info-table',
  data() {
    return {
      persons: [],
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
