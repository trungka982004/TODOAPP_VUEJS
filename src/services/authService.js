const USERS_KEY = 'todo_app_users'
const CURRENT_USER_KEY = 'todo_app_current_user'

export const authService = {
    getUsers() {
        const users = localStorage.getItem(USERS_KEY)
        return users ? JSON.parse(users) : []
    },
    
    register(username, password) {
    const users = this.getUsers();
    
    const existingUser = users.find(u => u.username === username);
    if (existingUser) {
      throw new Error('This username is already taken!');
    }
    const newUser = {
      id: Date.now().toString(),    
      username,
      password, 
    };
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    return newUser;
  },
  // Login user
  login(username, password) {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
      throw new Error('Incorrect username or password!');
    }
    // Separate password to avoid saving it in the current user session
    const { password: userPassword, ...userInfo } = user;
    
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userInfo));
    
    return userInfo;
  },
  // Get currently logged-in user
  getCurrentUser() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  // Logout user
  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  }
};