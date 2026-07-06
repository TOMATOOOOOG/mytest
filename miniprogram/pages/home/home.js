const content = require('../../data/content')
const contact = require('../../data/contact')

Page({
  data: {
    home: content.home,
    contact
  },
  goServices() {
    wx.switchTab({ url: '/pages/services/services' })
  },
  goTeam() {
    wx.switchTab({ url: '/pages/team/team' })
  },
  goContact() {
    wx.switchTab({ url: '/pages/contact/contact' })
  },
  callPhone() {
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  }
})
