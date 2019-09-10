//  TODO: add jquery with autocomplete

const url = "http://www.filltext.com/?rows=3&id={number|1000}\
&firstName={firstName}&delay=3&lastName={lastName}\
&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}\
&description={lorem|32}";

new Vue({
  el: '#info-table',
  data() {
    return {
      persons: null,
      fullPersonInfo: {},
    };
  },
  methods: {
    getEvents: function() {
      //  TODO: make rows = 1000
      axios.get(url).then(response => {
        if (response.data.length != 0) {
          this.persons = response.data;
        } else {
          M.toast({html: "No data", classes: 'rounded'})
        };
      });
    },
    getMoreInfo: function(person) {
      this.fullPersonInfo = person;
      console.log(this.fullPersonInfo);
    }
  },
  mounted() {
    this.getEvents();
  },
});
