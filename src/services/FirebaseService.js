import { ref, set, push, get, update, remove, query, equalTo, orderByChild, child } from "firebase/database";
import { database } from "../firebase/firebase";

const useFirebaseService = () => {

    const createUser = async (userData) => {
        try {
            // Check if a user with the same email already exists in the database
            const usersRef = ref(database, `users`);
            const userQuery = query(usersRef, orderByChild('id'), equalTo(userData.id));
            const snapshot = await get(userQuery);
    
            if (snapshot.exists()) {
                console.log("User already exists in the database.");
                return { success: false, message: "User already exists in the database." };
            }
    
            // Create the user and save to the database
            const newUserRef = push(usersRef); // Create a unique reference for the new user
            await set(newUserRef, userData);
    
            return { success: true, message: "User was created and saved to the database." };
        } catch (error) {
            console.error("Failed creating user and saving to database: ", error);
            return { success: false, message: error.message };
        }
    };

    const readUser = async (userId) => {
        try {
            // Reference to the `users` node in the database
            const usersRef = ref(database, `users`);
            
            // Fetch all users and search for the user with the matching ID
            const snapshot = await get(usersRef);
    
            if (!snapshot.exists()) {
                console.log("No users found in the database.");
                return { success: false, message: "No users found in the database." };
            }
    
            // Find the user by ID in the snapshot
            const users = snapshot.val();
            const userKey = Object.keys(users).find(key => users[key].id === userId);
    
            if (!userKey) {
                console.log(`User with ID ${userId} does not exist.`);
                return { success: false, message: `User with ID ${userId} does not exist.` };
            }
    
            const user = users[userKey];
    
            return { success: true, message: "User found.", data: user };
        } catch (error) {
            console.error("Failed to read user from database: ", error);
            return { success: false, message: error.message };
        }
    };

    const updateUser = async (userId, newUserData) => {
        try {
            // Reference to the `users` node in the database
            const usersRef = ref(database, `users`);
    
            // Fetch all users and search for the user with the matching ID
            const snapshot = await get(usersRef);
    
            if (!snapshot.exists()) {
                console.log("No users found in the database.");
                return { success: false, message: "No users found in the database." };
            }
    
            // Find the user by ID in the snapshot
            const users = snapshot.val();
            const userKey = Object.keys(users).find(key => users[key].id === userId);
    
            if (!userKey) {
                console.log(`User with ID ${userId} does not exist.`);
                return { success: false, message: `User with ID ${userId} does not exist.` };
            }
    
            // Reference to the specific user node
            const userRef = ref(database, `users/${userKey}`);
    
            // Apply updates to the user
            await update(userRef, newUserData);
    
            return { success: true, message: "User updated successfully." };
        } catch (error) {
            console.error("Failed to update user in database: ", error);
            return { success: false, message: error.message };
        }
    };

    const deleteUser = async (userId) => {
        try {
            // Check if a user with the given email exists in the database
            const usersRef = ref(database, `users`);
            const userQuery = query(usersRef, orderByChild('id'), equalTo(userId));
            const snapshot = await get(userQuery);
    
            if (!snapshot.exists()) {
                console.log("User does not exist in the database.");
                return { success: false, message: "User does not exist in the database." };
            }
    
            // Get the first matching user's key
            const firstMatch = Object.keys(snapshot.val())[0];
            const userRef = ref(database, `users/${firstMatch}`);
    
            // Remove the first matching user
            await remove(userRef);
    
            return { success: true, message: "User deleted successfully from the database." };
        } catch (error) {
            console.error("Failed to delete user from database: ", error);
            return { success: false, message: error.message };
        }
    };

    const readAllUsers = async () => {
        try {
            const usersRef = ref(database, `users`);
            const snapshot = await get(usersRef);

            if (!snapshot.exists()) {
                console.log("No users in the database.");
                return { success: false, message: "No users found in the database.", data: [] };
            }

            const users = Object.values(snapshot.val());
            return { success: true, message: "Users retrieved successfully.", data: users };
        } catch (error) {
            console.error("Failed to read users from database: ", error);
            return { success: false, message: error.message, data: [] };
        }
    };

    return {
        createUser,
        readUser,
        updateUser,
        deleteUser,
        readAllUsers
    };
}

export default useFirebaseService;