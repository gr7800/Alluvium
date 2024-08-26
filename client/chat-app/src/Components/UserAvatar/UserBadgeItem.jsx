import { XIcon } from "@heroicons/react/solid"; // Importing XIcon from Heroicons

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <div
      className="inline-flex items-center px-2 py-1 m-1 mb-2 text-sm font-medium text-white bg-purple-500 rounded-lg cursor-pointer"
      onClick={handleFunction}
    >
      <span className="mr-1">
        {user.name}
        {admin === user._id && <span> (Admin)</span>}
      </span>
      <XIcon className="w-3 h-3 ml-1" /> {/* Tailwind class for Close icon */}
    </div>
  );
};

export default UserBadgeItem;
