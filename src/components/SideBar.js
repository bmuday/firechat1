import { BsPlus, BsFillLightningFill, BsGearFill } from "react-icons/bs";
import { FaFire, FaPoo } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div
      className="fixed top-0 left-0 flex h-screen w-16 flex-col
                  bg-white shadow-lg dark:bg-gray-900"
    >
      <Link to="/fire">
        <SideBarIcon icon={<FaFire size="28" />} text="logo" />
      </Link>
      <Divider />
      <SideBarIcon icon={<BsPlus size="32" />} text="chat" />
      <SideBarIcon
        icon={<BsFillLightningFill size="20" />}
        text="tweets/status"
      />
      <SideBarIcon icon={<FaPoo size="20" />} text="lives" />
      <Divider />
      <SideBarIcon icon={<BsGearFill size="22" />} text="parametres" />
    </div>
  );
};

const SideBarIcon = ({ icon, text }) => (
  <div className="sidebar-icon group">
    {icon}
    <span className="sidebar-tooltip group-hover:scale-100">{text}</span>
  </div>
);

const Divider = () => <hr className="sidebar-hr" />;

export default SideBar;
