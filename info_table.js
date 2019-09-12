//  TODO: add jquery with autocomplete
$(document).ready(function(){
  $('.modal').modal({
    inDuration: 500,
    outDuration: 600,
    opacity: 0.7,
  });
});

const url = "http://www.filltext.com/?rows=20&id={number|1000}\
&firstName={firstName}&delay=3&lastName={lastName}\
&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}\
&description={lorem|32}";
let searchAttributes = ['id', 'firstName', 'lastName'];

new Vue({
  el: '#info-table',
  data() {
    return {
      // persons: null,
      persons: [
        {
          id: '55',
          firstName: 'Ran',
          lastName: 'Teadori',
        },
        {
          id: '535',
          firstName: 'Unresolved',
          lastName: 'Pface',
        },
        {
          id: '33',
          firstName: 'E-force',
          lastName: 'Teadorirr',
        },
      ],
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
      console.log(this.fullPersonInfo.address.zip);
      $('modal1').modal('open');
    }
  },
  watch: {
    // watch search input changes and display matchin persons
    searchInput: function() {
      // this.searchResults = this.persons.filter(el => el.firstName.indexOf(this.searchInput) !== -1);
      this.searchResults = this.persons.filter(el => el.id.indexOf(this.searchInput) !== -1);
      var lastNameFilter = this.persons.filter(el => el.lastName.indexOf(this.searchInput) !== -1);
      console.log(this.searchResults);
    },
  },
  mounted() {
    // this.getEvents();
  },
});
