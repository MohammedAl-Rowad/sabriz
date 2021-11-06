import { FaHashtag, FaMoon, FaSun } from 'react-icons/fa'
import { AiFillFire } from 'react-icons/ai'
import useDarkMode from '../../hooks/useDarkMode'
import { useStore, getMetaData } from '../../store'

const TopNavigation = () => {
  const { host, peer } = useStore(getMetaData)

  return (
    <div className="top-navigation">
      <HashtagIcon />
      <Title host={host} peer={peer} />
      <ThemeIcon />
      {/* <Search /> */}
      {/* <BellIcon /> */}
      <AiFillFire size="24" className="top-navigation-icon text-green-600" />
    </div>
  )
}

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode()
  const handleMode = () => setDarkTheme(!darkTheme)
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  )
}

const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />
const Title = ({ host, peer }: any) => (
  <h5 className="title-text text-green-500 font-extrabold">
    {host ? 'HOST' : peer ? 'PEER' : '🧗‍♂️'}
  </h5>
)

export default TopNavigation
