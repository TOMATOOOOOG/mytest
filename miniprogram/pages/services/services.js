const content = require('../../data/content')
const contact = require('../../data/contact')

Page({
  data: {
    services: content.services,
    contact,
    openFaqIndex: -1
  },
  toggleFaq(event) {
    const index = event.currentTarget.dataset.index
    this.setData({ openFaqIndex: this.data.openFaqIndex === index ? -1 : index })
  },
  callPhone() {
    wx.makePhoneCall({ phoneNumber: this.data.contact.phone })
  }
})
