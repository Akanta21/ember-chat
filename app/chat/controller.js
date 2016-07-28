import Ember from 'ember'

export default Ember.Controller.extend({
  socketIOService: Ember.inject.service('socket-io'),

  init: function () {
    this._super.apply(this, arguments)

    var socket = this.get('socketIOService').socketFor('http://localhost:3000/')

    socket.on('connect', function () {
      console.log('Connected to Chat Socket')
    })
    socket.on('disconnect', function () {
      console.log('Disconnected from Chat Socket')
    })
    socket.on('chat', function (msg) {
      console.log('Received message: ', msg)
    // $('#messages').prepend($('<div class="alert alert-success">').html('<strong>' + msg.user.name + ':</strong> ' + msg.message))
    })
    socket.on('joined', function (user) {
      console.log(user.name + ' joined left the chat.')
      // $('#messages').prepend($('<div class="text-center">').html('<strong>' + user.name + ' joined the chat.' + '<strong> '))
    })
  },

  onMessage: function (data) {
    // This is executed within the ember run loop
  },

  actions: {
    submitMessage () {
      var socket = this.get('socketIOService').socketFor('http://localhost:3000/')
      console.log('Clicked')
      socket.emit('chat', this.get('message'))
    }
  }
})
