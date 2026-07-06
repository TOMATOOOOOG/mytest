const contact = require('../../data/contact')

Page({
  data: {
    contact
  },
  callPhone() {
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  },
  openMap() {
    wx.openLocation(this.data.contact.map)
  }
})
