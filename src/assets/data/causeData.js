import area from '../../assets/images/area.svg'
import connect from '../../assets/images/connect.svg'
import savelife from '../../assets/images/savelife.svg'
import emergency from '../../assets/images/emergency.svg'

const causes = [
  {
    id: 1,
    title: 'Find Donors in your Area',
    text: 'Get connected in a matter of minutes at zero cost. ',
    image: area,
    icon: 'fa-solid fa-magnifying-glass',
  },
  {
    id: 2,
    title: 'Answer to Emergencies',
    text: 'As soon as a new blood request is raised, it is routed among our local volunteer blood donors. We know time matters! So we keep you updated with real-time notifications sent directly to you via SMS (text message) or the installed mobile app',
    image: connect,
    icon: 'fa-regular fa-clock',
  },
  {
    id: 3,
    title: 'Made for Everyone',
    text: "All you need to do is send a text message to 8655, 'blood need (blood-group) in (your-city)', in any language you want. Our system is smart enough to understand anything you write and helps you find a donor within minutes if not seconds.",
    image: emergency,
    icon: 'fa-solid fa-mobile-screen',
  },
  {
    id: 4,
    title: "You are someone's Hero",
    text: "In as little as few minutes, you can become someone's unnamed, unknown, but all-important Hero. Saving a life is a noble work that starts very simply and easily. Donate Blood or donate Money, every form of contribution you make is important, valued and essential in our shared mission to save lives.",
    image: savelife,
    icon: 'fa-solid fa-award',
  },
]

export default causes
