import axios from "axios";
import { useEffect, useState } from "react";
const BASE_URL = 'http://localhost:8000/users';

const UserManagement = (props) => {
    const { users, setFormData, setIsFormPage, editing } = props;
    const [allUsers, setAllUsers] = useState(users);

    // make a DELETE request
    const deleteUser = async (userId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${userId}`);
            console.log(await response.data);
            setAllUsers(users);
        } catch (error) {
            console.log(error.message);
        }
    }

    // make a PUT request
    const updateUser = async (userId) => {
        try {
            const response = await axios.get(`${BASE_URL}/${userId}`);
            const userData = await response.data.data[0];
            // change keys values to lowerCase
            const currentUserData = {};
            for (let keys in userData) {
                currentUserData[keys.toLowerCase()] = userData[keys];
            }
            // remove last element which is ' ' in currentUserData.interest
            currentUserData.interest = currentUserData.interest.split(' ');
            currentUserData.interest.splice(currentUserData.interest.length - 1, 1);

            setFormData(currentUserData);
            editing(true);
            setIsFormPage(true);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
    <div className="users">
        {allUsers.map((user,index) => (
            <div key={user.id} className="user">
                {index + 1}. {user.id} {user.Firstname}, {user.Lastname},
                {user.Age} {user.Gender}, {user.Interest}
                <button className="edit-user" onClick={() => {updateUser(user.id)}}>
                    Edit
                </button>
                <button className="delete-user" onClick={() => {deleteUser(user.id)}}>
                    Delete
                </button>
            </div>
        ))}
    </div>
    )
}

export default UserManagement