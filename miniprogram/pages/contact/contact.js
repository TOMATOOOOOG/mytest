const contact = require('../../data/contact')
const { tapFeedback } = require('../../utils/interaction')

Page({
  data: {
    contact,
    markers: [
      {
        id: 1,
        latitude: contact.map.latitude,
        longitude: contact.map.longitude,
        title: contact.map.name,
        iconPath: '/assets/icons/contact-selected.png',
        width: 34,
        height: 34
      }
    ]
  },
  feedback() {
    tapFeedback()
  },
  callPhone() {
    tapFeedback('medium')
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  },
  openMap() {
    tapFeedback()
    wx.openLocation(this.data.contact.map)
  }
})
