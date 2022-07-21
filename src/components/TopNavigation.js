import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaMoon,
  FaSun,
  FaBlackberry,
} from "react-icons/fa";
import useDarkMode from "../hooks/useDarkMode";
import Dropdown from "./Dropdown";

const TopNavigation = () => {
  return (
    <div className="top-navigation">
      <div className="top-navigation-groups top-navigation-left">
        <HashtagIcon />
        <Title />
      </div>
      <div className="top-navigation-groups top-navigation-center">
        <ThemeIcon />
        <Search />
      </div>
      <div className="top-navigation-groups top-navigation-right">
        {/* <BellIcon /> */}
        <Dropdown />
      </div>
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="top-navigation-icon" />
      ) : (
        <FaMoon size="24" className="top-navigation-icon" />
      )}
    </span>
  );
};

const Search = () => (
  <div className="search">
    <input className="search-input" type="text" placeholder="Search..." />
    <FaSearch size="18" className="text-secondary my-auto" />
  </div>
);
const BellIcon = () => <FaRegBell size="24" className="top-navigation-icon" />;
const HashtagIcon = () => <FaHashtag size="20" className="title-hashtag" />;
const Title = () => <h5 className="title-text">tailwind-css/babou</h5>;
const Level = () => <h5 className="level-text">Standard/Premium/VIP</h5>;

export default TopNavigation;
