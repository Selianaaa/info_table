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
          id: 55,
          firstName: 'Ran-D',
          lastName: 'Teadori',
        },
        {
          id: 535,
          firstName: 'Ran-M',
          lastName: 'Pface',
        },
        {
          id: 33,
          firstName: 'Ran-P',
          lastName: 'Teadorirr',
        },
      ],
      fullPersonInfo: {},
      searchInput: '',
      searchResults: [],
    };
  },
  methods: {
    getEvents: function() {
      //  TODO: make rows = 1000
      axios.get(url).then(response => {
        if (response.data.length != 0) {
          this.persons = response.data;
        } else {
          M.toast({html: "No data", classes: 'rounded'});
        };
      });
    },
    getMoreInfo: function(person) {
      this.fullPersonInfo = person;
      console.log(this.fullPersonInfo.address.zip);
      $('modal1').modal('open');
    }
  },
  watch: {
    searchInput: function() {
      var elementNumber = '' + this.searchInput;
      this.searchResults.push(
        this.persons.filter(el => el.firstName.indexOf(this.searchInput) !== -1),
        this.persons.filter(el => el.lastName.indexOf(this.searchInput) !== -1)
      );
      console.log(this.searchResults);
    },
  },
  mounted() {
    // this.getEvents();
  },
});
