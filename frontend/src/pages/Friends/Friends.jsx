import { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import * as GetFriends from "../../services/form.service";

export default function Friends() {
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const fetchFriends = async () => {
      const result = await GetFriends.browse("/friends/users");
      setFriends(result);
    };
    fetchFriends();
  }, []);

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Users
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the users in your account including their name, title,
            email and role.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add user
          </button>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 mt-5">
        {friends.map((friend) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Card key={friend.id_friend} {...friend} />
        ))}
      </div>
    </div>
  );
}
