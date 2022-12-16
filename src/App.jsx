import { useEffect, useState } from 'react';
import ForumPosts from './components/ForumPosts';
import PocketBase from 'pocketbase';


const App = () => {
  // On load we need to get all the posts from pocketbase and store them in the posts variable
  const [posts, setPosts] = useState([
    { id: 1, title: 'Hello World', body: 'Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff Welcome to the forum! text text more stuff ', author: 'Sean', date: '12/15/2022' },
  ]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const [userLogin, setUserLogin] = useState('');
  const [userPassword, setUserPassword] = useState('');


  const [nameSignUp, setNameSignUp] = useState('');
  const [usernameSignUp, setUsernameSignUp] = useState('');
  const [userEmailSignUp, setUserEmailSignUp] = useState('');
  const [userPasswordSignUp, setUserPasswordSignUp] = useState('');

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    updatePosts();
  })


  function logout() {
    setLoggedIn(false);
    setUsername('');
  }

  async function login() {
    // Connect to pocketbase
    const pb = new PocketBase('http://127.0.0.1:8090');
    // Pass credentials to pocketbase and ensure it is a valid login
    await pb.collection('users').authWithPassword(
      userLogin,
      userPassword,
    );

    const records = await pb.collection('posts').getFullList(200 /* batch size */, {
      sort: '-created',
    });

    setPosts(records);
    setLoggedIn(true);
    setUsername(userLogin);
  }

  async function updatePosts() {
    // Connect to pocketbase
    const pb = new PocketBase('http://127.0.0.1:8090');

    // Update all posts from backend
    const records = await pb.collection('posts').getFullList(200 /* batch size */, {
      sort: '-created',
    });

    setPosts(records);
  }

  async function createAccount() {
    // Data used to create account
    const data = {
      "username": usernameSignUp,
      "email": userEmailSignUp,
      "emailVisibility": true,
      "password": userPasswordSignUp,
      "passwordConfirm": userPasswordSignUp,
      "name": nameSignUp
    };

    const pb = new PocketBase('http://127.0.0.1:8090');

    await pb.collection('users').create(data);

    setLoggedIn(true);
    setUsername(usernameSignUp);
  }

  async function createPost() {
    const currentDate = new Date();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const year = currentDate.getFullYear();

    const dateString = `${month}/${day}/${year}`;

    const pb = new PocketBase('http://127.0.0.1:8090');
    const data = {
        "title": title,
        "author": username,
        "date": dateString,
        "body": body
    };
    await pb.collection('posts').create(data);
    await updatePosts();
  }


  function handleCreatePost() {
    createPost();

  }

  return (
    <div className='bg-slate-100 h-full'>
      <div className='flex items-center flex-col pt-12'>
        <h1 className="text-7xl text-center text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">Project 4 Forum Engine</h1>


        <div className={`flex flex-row justify-center outline outline-slate-300 rounded-2xl bg-slate-300 ${loggedIn ? "hidden" : ""}`}>
        <div className='w-1/4 flex flex-col items-center justify-between m-10'>
        <span className='m-5 text-2xl' hidden={loggedIn===true}>Log In:</span>
          <label hidden={loggedIn===true}>Username:</label>
          <input hidden={loggedIn===true} type="text" className='m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onInput={e => setUserLogin(e.target.value)}></input>
          <label hidden={loggedIn===true}>Password:</label>
          <input hidden={loggedIn===true} type="password" className='m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onInput={e => setUserPassword(e.target.value)}></input>
          <button hidden={loggedIn===true} className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline" onClick={login}>Login</button>
        </div>
        <div className='w-1/4 flex flex-col items-center justify-between m-10'>
        <span className='m-5 text-2xl' hidden={loggedIn===true}>Sign Up:</span>
          <label hidden={loggedIn===true}>Name:</label>
          <input hidden={loggedIn===true} type="text" className='m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onInput={e => setNameSignUp(e.target.value)}></input>
          <label hidden={loggedIn===true}>Email:</label>
          <input hidden={loggedIn===true} type="text" className='m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onInput={e => setUserEmailSignUp(e.target.value)}></input>

          <label hidden={loggedIn===true}>Username:</label>
          <input hidden={loggedIn===true} type="text" className='m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onInput={e => setUsernameSignUp(e.target.value)}></input>
          <label hidden={loggedIn===true}>Password:</label>
          <input hidden={loggedIn===true} type="password" className='m-3 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full focus:outline-none p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' onInput={e => setUserPasswordSignUp(e.target.value)}></input>
          <button hidden={loggedIn===true} className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline" onClick={createAccount}>Create</button>
        </div>
        </div>


        <div className='w-3/4 flex flex-row items-center justify-between'>
          <span hidden={loggedIn===false} className='text-2xl'>Logged in as: {username}</span>
          <button hidden={loggedIn===false} className="px-4 py-2 text-lg font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:shadow-outline" onClick={logout}>Logout</button>
        </div>

      {/* Create new posts form */}
      <div className='w-3/4 mt-12' hidden={loggedIn===false}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
          Body
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          id="body"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button hidden={loggedIn===false} className="px-4 py-2 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline" onClick={handleCreatePost}>Create New Post</button>
      </div>
      </div>

      {/* Display forum posts */}
      <ForumPosts posts={posts} username={username} updatePosts={updatePosts}/>
      </div>
    </div>
  );
};

export default App;
