import type { User } from '../types/user.types';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

// Returns true if a user is currently logged in.
export function isAuthenticated(): boolean {
  return getCurrentUser() !== null;
}

// Returns all registered users.
export function getUsers(): User[] {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Saves all users.
export function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Returns the currently logged-in user.
export function getCurrentUser(): User | null {
  const user = localStorage.getItem(CURRENT_USER_KEY);
  return user ? JSON.parse(user) : null;
}

// Saves the logged-in user.
export function saveCurrentUser(user: User) {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
}

// Synchronizes the updated user with localStorage.
export function updateUser(user: User) {
  const users = getUsers();

  const updatedUsers = users.map((existingUser) => existingUser.email === user.email ? user : existingUser);

  saveUsers(updatedUsers);

  saveCurrentUser(user);
}

// Removes the logged-in user.
export function clearCurrentUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
}

// Registers a new user. Returns false if the email already exists.
export function signup(email: string): boolean {
  const users = getUsers();

  const alreadyExists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());

  if (alreadyExists) {
    return false;
  }

  const newUser: User = {
    email,
    watchlist: [],
  };

  users.push(newUser);

  saveUsers(users);

  saveCurrentUser(newUser);

  return true;
}

// Logs in an existing user.
export function login(email: string): boolean {
  const users = getUsers();

  const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase());

  if (!user) {
    return false;
  }

  saveCurrentUser(user);

  return true;
}