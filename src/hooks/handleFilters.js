import checkDonationDate from './checkDate'

const handleDonarFilter = (donars, byGroup, byAvailable, byArea) => {
  if (byGroup !== 'All' && byAvailable !== 'All' && byArea) {
    return donars.filter(
      (donar) =>
        donar.bloodGroup === byGroup &&
        (donar.name.toLowerCase().includes(byArea.toLowerCase()) ||
          donar.area.toLowerCase().includes(byArea.toLowerCase()) ||
          donar.district.toLowerCase().includes(byArea.toLowerCase())) &&
        (donar.lastDonation ? checkDonationDate(donar.lastDonation) : true)
    )
  }

  if (byGroup !== 'All' && byArea) {
    return donars.filter(
      (donar) =>
        donar.bloodGroup === byGroup &&
        (donar.name.toLowerCase().includes(byArea.toLowerCase()) ||
          donar.area.toLowerCase().includes(byArea.toLowerCase()) ||
          donar.district.toLowerCase().includes(byArea.toLowerCase()))
    )
  }

  if (byGroup !== 'All' && byAvailable !== 'All') {
    return donars.filter(
      (donar) =>
        donar.bloodGroup === byGroup &&
        (donar.lastDonation ? checkDonationDate(donar.lastDonation) : true)
    )
  }

  if (byArea && byAvailable !== 'All') {
    return donars.filter(
      (donar) =>
        (donar.name.toLowerCase().includes(byArea.toLowerCase()) ||
          donar.area.toLowerCase().includes(byArea.toLowerCase()) ||
          donar.district.toLowerCase().includes(byArea.toLowerCase())) &&
        (donar.lastDonation ? checkDonationDate(donar.lastDonation) : true)
    )
  }

  if (byGroup !== 'All') {
    return donars.filter((donar) => donar.bloodGroup === byGroup)
  }

  if (byArea) {
    return donars.filter(
      (donar) =>
        donar.name.toLowerCase().includes(byArea.toLowerCase()) ||
        donar.area.toLowerCase().includes(byArea.toLowerCase()) ||
        donar.district.toLowerCase().includes(byArea.toLowerCase())
    )
  }

  if (byAvailable !== 'All') {
    return donars.filter((donar) =>
      donar.lastDonation ? checkDonationDate(donar.lastDonation) : true
    )
  }

  return donars
}

const handleRequestFilter = (requests, byGroup, byLocation, byIsManaged) => {
  if (byLocation && byGroup !== 'All' && byIsManaged !== 'All') {
    return requests.filter(
      (r) =>
        r.bloodGroup === byGroup &&
        (r.location.toLowerCase().includes(byLocation.toLowerCase()) ||
          r.district.toLowerCase().includes(byLocation.toLowerCase())) &&
        (byIsManaged === 'Managed' ? r.isManaged : !r.isManaged)
    )
  }

  if (byLocation && byGroup !== 'All') {
    return requests.filter(
      (r) =>
        r.bloodGroup === byGroup &&
        (r.location.toLowerCase().includes(byLocation.toLowerCase()) ||
          r.district.toLowerCase().includes(byLocation.toLowerCase()))
    )
  }

  if (byLocation && byIsManaged !== 'All') {
    return requests.filter(
      (r) =>
        (r.location.toLowerCase().includes(byLocation.toLowerCase()) ||
          r.district.toLowerCase().includes(byLocation.toLowerCase())) &&
        (byIsManaged === 'Managed' ? r.isManaged : !r.isManaged)
    )
  }

  if (byGroup !== 'All' && byIsManaged !== 'All') {
    return requests.filter(
      (r) =>
        r.bloodGroup === byGroup &&
        (byIsManaged === 'Managed' ? r.isManaged : !r.isManaged)
    )
  }

  if (byGroup !== 'All') {
    return requests.filter((r) => r.bloodGroup === byGroup)
  }

  if (byLocation) {
    return requests.filter(
      (r) =>
        r.location.toLowerCase().includes(byLocation.toLowerCase()) ||
        r.district.toLowerCase().includes(byLocation.toLowerCase())
    )
  }

  if (byIsManaged !== 'All') {
    if (byIsManaged === 'Managed') return requests.filter((r) => r.isManaged)

    return requests.filter((r) => !r.isManaged)
  }

  return requests
}

export { handleDonarFilter, handleRequestFilter }
