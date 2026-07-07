const team = require('../../data/counselors')
const { tapFeedback } = require('../../utils/interaction')

Page({
  data: {
    founder: team.founder,
    counselors: team.counselors
  },
  feedback() {
    tapFeedback()
  }
})
