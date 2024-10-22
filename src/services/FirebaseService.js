import { ref, set, push, get, update, remove } from "firebase/database";
import { database } from "../firebase/firebase";
import usePlatziService from "../services/PlatziService/PlatziService";
import { data } from "@remix-run/router";
import { ErrorResponseImpl } from "@remix-run/router/dist/utils";

const useFirebaseService = () => {
    const { 
        addUser, 
        getUser, 
        getAllUsers,
        updateUser,
        deleteUser,
        addProduct,
        getProduct,
        getAllProducts,
        updateProduct,
        deleteProduct
    } = usePlatziService();

    const addNewEntry = async (data, entity) => {
        const dbRef = ref(data, `${entity}`);
        const newEntRef = await push(dbRef);
        set(newEntRef, data); 
    }

    const createUserFromPlatziById = async (userId) => {
        try {
            const user = await getUser(userId);
            const dbRef = ref(database, `users/${userId}`);
            set(dbRef, user);
            return {success: true, message: "User was saved to database."};
        } catch (error) {
            console.error("Error saving user to firebase: ", error);
            return { success: false, message: error.message };
        }
    }

    const createUser = async (userData) => {
        try {
            const createdUser = await addUser(userData);
            const userRef = push(ref(database, `users`));
            await set(userRef, createdUser);
            return { success: true, message: "User was created and saved to database." };
        } catch(error) {
            console.error("Failed creating user and saving to database: ", error);
            return { success: false, message: error.message };
        }
    }

    const readAllUsers = async () => {
        try {
            const usersRef = ref(database, `users`);
            const usersSnapshot = await get(usersRef);
            if (usersSnapshot.exists()) {
                return { success: true, data: usersSnapshot.val };
            } else {
                return { success: false, message: "No users in database." };
            }
        } catch(error) {
            console.error("Error reading all users from database: ", error);
            return { success: false, message: error.message };
        }
    }

    const readUserById = async (userId) => {
        try {
            const userRef = ref(database, `users/${userId}`);
            const userSnapshot = await get(userRef);
            if (userSnapshot.exists()) {
                return { success: true, data: userSnapshot.val };
            }
            else {
                return { success: false, message: `No user was found by id - ${userId}` };
            }
        } catch (error) {
            console.error(`Error getting user by id - ${userId}: `, error);
            return { success: false, message: error.message };
        }
    }

    const updateUserById = async (userId, newData) => {
        try {
            const userRef = ref(database, `users/${userId}`);
            await update(userRef, newData);
            return { success: true, message: "User was updated in the database." };
        } catch (error) {
            console.error("Error updating user in the database: ", error);
            return { success: false, message: error.message };
        }
    }

    const deleteUserById = async (userId) => {
        try {
            const userRef = ref(database, `users/${userId}`);
            await remove(userRef);
            return { success: true, message: `User with id - ${userId} was deleted from the database.` };
        } catch (error) {
            console.error(`Error deleting user by the id - ${userId} from the database: `, error);
            return { success: false, message: error.message };
        }
    }



    return {
        createUserFromPlatziById,
        createUser,
        readUserById,
        readAllUsers,
        updateUserById,
        deleteUserById
    };
}

export default useFirebaseService;