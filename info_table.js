new Vue({
  el: '#info-table',
  data() {
    return {
      events: [],
    };
  },
  methods: {
    getEvents: function() {
      // make rows=1000
      this.$http.get('http://www.filltext.com/?rows=5&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32 }').then(function(response){
        this.events = response.body;
        console.log(this.events);
      });
    },
  },
  mounted: function() {
    this.getEvents();
  },
});
