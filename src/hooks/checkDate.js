import moment from 'moment'

const checkDonationDate = (lastDonation) => {
  return moment(moment(lastDonation).add(121, 'days').toDate()).isBefore()
}

export default checkDonationDate
