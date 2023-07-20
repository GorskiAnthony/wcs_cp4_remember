import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as GetFriends from "../../services/form.service";
import { trimDate } from "../../services/calculeDate.services";
import { toastifySuccess } from "../../services/toast.service";
import Modal from "../../components/Modal/Modal";

export default function Friend() {
  const [friend, setFriend] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFriend((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchFriend = async () => {
      const result = await GetFriends.browse(`/friends/${id}`);
      setFriend(result);
      setLoading(false);
    };
    fetchFriend();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    friend.birthday = trimDate(friend.birthday);
    try {
      await GetFriends.edit(`/friends/${id}`, friend);
      toastifySuccess("Modification effectuée avec succès");
      navigate("/friends/users");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    // display a modal to confirm the deletion
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    // Call the delete API or any other logic to perform the deletion
    try {
      await GetFriends.destroy(`/friends/${id}`);
      toastifySuccess("Suppression effectuée avec succès");
      navigate("/friends/users");
    } catch (error) {
      console.error(error);
    }

    // Close the modal after deletion
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit}>
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                    >
                      Nom
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Anniversaire
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Relation
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                      <input
                        type="text"
                        name="name"
                        value={friend.name}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <input
                        type="date"
                        name="birthday"
                        value={trimDate(friend.birthday)}
                        onChange={handleChange}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <select name="be" id="be" onChange={handleChange}>
                        <option value="Famille">Famille</option>
                        <option value="Ami">Ami</option>
                        <option value="Connaissance">Connaissance</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-4 flex justify-around">
                <button
                  onClick={handleDelete}
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                >
                  Supprimer
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mr-5"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          handleDelete={confirmDelete}
        />
      )}
    </div>
  );
}
